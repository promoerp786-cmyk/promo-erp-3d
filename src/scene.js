import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowPower = window.matchMedia('(max-width: 760px)').matches;

/* A soft radial sprite used for particles and the core halo. */
function radialTexture(size = 64) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createScene(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
  } catch (err) {
    document.body.classList.add('no-webgl');
    return { resize() {}, setScroll() {}, render() {} };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.75 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050a18, 0.028);

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 140);
  camera.position.set(0, 0, 15);

  /* ---------- Environment & backdrop ---------- */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  pmrem.dispose();

  const backdrop = new THREE.Mesh(
    new THREE.SphereGeometry(80, 32, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        top: { value: new THREE.Color('#0b1530') },
        mid: { value: new THREE.Color('#060c1e') },
        bottom: { value: new THREE.Color('#03060f') },
      },
      vertexShader: /* glsl */ `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vPos;
        uniform vec3 top;
        uniform vec3 mid;
        uniform vec3 bottom;
        void main() {
          float h = normalize(vPos).y * 0.5 + 0.5;
          vec3 c = mix(bottom, mid, smoothstep(0.0, 0.55, h));
          c = mix(c, top, smoothstep(0.55, 1.0, h));
          gl_FragColor = vec4(c, 1.0);
        }
      `,
    })
  );
  scene.add(backdrop);

  /* ---------- Lighting ---------- */
  scene.add(new THREE.AmbientLight(0x1a2a55, 0.9));

  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(5, 9, 7);
  scene.add(key);

  const rimA = new THREE.PointLight(0x2f6bff, 90, 46, 2);
  rimA.position.set(-9, 4, -6);
  scene.add(rimA);

  const rimB = new THREE.PointLight(0x22d3ee, 70, 46, 2);
  rimB.position.set(9, -5, -3);
  scene.add(rimB);

  const rimC = new THREE.PointLight(0x8b5cf6, 60, 40, 2);
  rimC.position.set(0, -8, 5);
  scene.add(rimC);

  /* ---------- Hero assembly ---------- */
  const hero = new THREE.Group();
  scene.add(hero);

  // Metallic core
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.95, 2),
    new THREE.MeshPhysicalMaterial({
      color: 0x2f6bff,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 0.6,
      iridescenceIOR: 1.32,
      envMapIntensity: 1.55,
      emissive: 0x0a2470,
      emissiveIntensity: 0.22,
      flatShading: true,
    })
  );
  hero.add(core);

  // Wireframe lattice
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.05, 1),
    new THREE.MeshBasicMaterial({
      color: 0x5b9dff,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    })
  );
  hero.add(shell);

  // Core halo
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture(),
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  halo.scale.setScalar(6.2);
  hero.add(halo);

  // Orbit rings
  const rings = new THREE.Group();
  const ringColors = [0x3b82f6, 0x22d3ee, 0x818cf8];
  ringColors.forEach((color, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.55 + i * 0.62, 0.008, 6, 220),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    ring.rotation.x = Math.PI / 2 + (i - 1) * 0.35;
    ring.rotation.y = i * 0.7;
    ring.userData.speed = 0.05 + i * 0.035;
    rings.add(ring);
  });
  hero.add(rings);

  /* ---------- Orbiting module nodes ---------- */
  const nodeColors = [0x22d3ee, 0x3b82f6, 0x818cf8, 0xa78bfa, 0x2dd4bf, 0x60a5fa, 0x67e8f9, 0xc084fc, 0x38bdf8];
  const nodeGeo = new THREE.SphereGeometry(0.095, 12, 12);
  const nodes = [];

  for (let i = 0; i < 9; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: nodeColors[i % nodeColors.length] });
    const mesh = new THREE.Mesh(nodeGeo, mat);
    hero.add(mesh);

    nodes.push({
      mesh,
      radius: 3.15 + Math.random() * 1.5,
      speed: 0.16 + Math.random() * 0.16,
      phase: (i / 9) * Math.PI * 2 + Math.random() * 0.5,
      tilt: new THREE.Euler(
        0.15 + Math.random() * 0.9,
        Math.random() * Math.PI,
        0.1 + Math.random() * 0.7
      ),
      spin: 0.008 + Math.random() * 0.02,
      baseY: 0,
    });
  }

  // Live connection lines from the core to each node
  const linePositions = new Float32Array(nodes.length * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  hero.add(lines);

  /* ---------- Particle field ---------- */
  const count = lowPower ? 900 : 1900;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color('#3b82f6'),
    new THREE.Color('#22d3ee'),
    new THREE.Color('#818cf8'),
    new THREE.Color('#a78bfa'),
    new THREE.Color('#e2ecff'),
  ];

  for (let i = 0; i < count; i++) {
    const r = 6 + Math.pow(Math.random(), 0.6) * 11;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.75;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const c = palette[Math.floor(Math.random() * palette.length)];
    const dim = 0.45 + Math.random() * 0.55;
    colors[i * 3] = c.r * dim;
    colors[i * 3 + 1] = c.g * dim;
    colors[i * 3 + 2] = c.b * dim;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      size: 0.075,
      map: radialTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  /* ---------- Optional floor grid ---------- */
  const grid = new THREE.GridHelper(60, 60, 0x2f6bff, 0x122a55);
  grid.position.y = -5.2;
  grid.material.transparent = true;
  grid.material.opacity = 0.14;
  grid.material.depthWrite = false;
  scene.add(grid);

  /* ---------- Post-processing ---------- */
  let composer = null;
  let bloom = null;
  if (!lowPower) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,
      0.75,
      0.8
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  /* ---------- Interaction state ---------- */
  const pointer = new THREE.Vector2(0, 0);
  let targetScroll = 0;
  let easedScroll = 0;
  const startedAt = performance.now();
  const AXIS_Y = new THREE.Vector3(0, 1, 0);
  const tmp = new THREE.Vector3();

  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );

  /* ---------- Resize ---------- */
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (composer) composer.setSize(w, h);
    if (bloom) bloom.setSize(w, h);
  }

  /* ---------- Frame ---------- */
  function render() {
    const raw = (performance.now() - startedAt) / 1000;
    const t = reducedMotion ? raw * 0.25 : raw;

    easedScroll += (targetScroll - easedScroll) * 0.06;

    // Core motion
    core.rotation.y = t * 0.18;
    core.rotation.x = Math.sin(t * 0.24) * 0.16;
    core.scale.setScalar(1 + Math.sin(t * 0.9) * 0.025);
    shell.rotation.y = -t * 0.07;
    shell.rotation.x = t * 0.04;
    halo.material.opacity = 0.36 + Math.sin(t * 1.1) * 0.06;

    rings.children.forEach((ring) => {
      ring.rotation.z += ring.userData.speed * 0.01;
    });

    // Orbiting nodes + connection lines
    nodes.forEach((n, i) => {
      const angle = t * n.speed + n.phase;
      tmp
        .set(n.radius, 0, 0)
        .applyAxisAngle(AXIS_Y, angle)
        .applyEuler(n.tilt);

      n.mesh.position.copy(tmp);
      n.mesh.rotation.y += n.spin;
      n.mesh.rotation.x += n.spin * 0.6;

      const o = i * 6;
      linePositions[o] = 0;
      linePositions[o + 1] = 0;
      linePositions[o + 2] = 0;
      linePositions[o + 3] = tmp.x;
      linePositions[o + 4] = tmp.y;
      linePositions[o + 5] = tmp.z;
    });
    lineGeo.attributes.position.needsUpdate = true;

    // Particle drift
    particles.rotation.y = t * 0.012;
    particles.rotation.x = Math.sin(t * 0.05) * 0.05;

    // Pointer parallax on the assembly
    hero.rotation.y += (pointer.x * 0.3 - hero.rotation.y) * 0.045;
    hero.rotation.x += (-pointer.y * 0.18 - hero.rotation.x) * 0.045;

    // Scroll-driven camera path
    const p = easedScroll;
    const camZ = 15 - p * 7.6;
    const camY = 0.2 + p * 1.7;
    camera.position.z += (camZ - camera.position.z) * 0.06;
    camera.position.y += (camY - camera.position.y) * 0.06;
    camera.position.x += (pointer.x * 1.3 - camera.position.x) * 0.04;
    camera.lookAt(0, 0.2, 0);

    // Dim the scene as content takes over
    const dim = THREE.MathUtils.smoothstep(p, 0.05, 0.6);
    renderer.toneMappingExposure = 1.12 - dim * 0.62;
    grid.material.opacity = 0.14 * (1 - dim * 0.7);

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  return {
    resize,
    render,
    setScroll(p) {
      targetScroll = Math.min(Math.max(p, 0), 1);
    },
  };
}
