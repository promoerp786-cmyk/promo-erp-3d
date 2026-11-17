import './style.css';
import { createScene } from './scene.js';
import { initUI } from './ui.js';

// Build the content first so the DOM exists before the scene sizes itself.
initUI();

const canvas = document.getElementById('scene');
const world = createScene(canvas);

/* Map page scroll (0 → 1) onto the camera path. */
function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

function syncScroll() {
  world.setScroll(scrollProgress());
}

syncScroll();
window.addEventListener('scroll', syncScroll, { passive: true });
window.addEventListener('resize', () => {
  world.resize();
  syncScroll();
});
window.addEventListener('orientationchange', () => world.resize());

/* Render loop, paused while the tab is hidden. */
let running = true;
function loop() {
  if (!running) return;
  world.render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    running = false;
  } else if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
});

/* Reveal the page once the first frames have painted. */
const loader = document.getElementById('loader');
function hideLoader() {
  if (loader) loader.classList.add('done');
}
window.addEventListener('load', () => setTimeout(hideLoader, 450));
setTimeout(hideLoader, 3200);
