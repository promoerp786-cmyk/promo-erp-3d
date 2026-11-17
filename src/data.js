// Content sourced from https://promoerp.it/ and https://promoautomations.vercel.app/
// Edit this file to update the site's copy without touching markup.

export const brand = {
  name: 'Promo ERP',
  tagline: 'Synchronize Your Entire Operation in Real-Time',
  description:
    'A robust, all-in-one Business Automation and Enterprise Resource Planning platform built to streamline operations, eliminate inefficiencies and boost profitability.',
  demoUrl: 'https://project-app-wheat-gamma.vercel.app/',
  phone: '+92 321 8833616',
  phoneRaw: '+923218833616',
  whatsapp: 'https://wa.me/923218833616',
  whatsappCreds: 'https://wa.me/923004439445',
  emails: {
    primary: 'promoerp786@gmail.com',
    corporate: 'info@promoerp.it',
  },
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/promo-erp' },
    { label: 'Facebook', href: 'https://facebook.com/promoerp786' },
    { label: 'YouTube', href: 'https://www.youtube.com/@PromoERP' },
  ],
  sites: [
    { label: 'Promo ERP Site', href: 'https://sites.google.com/view/promoerp/home' },
    { label: 'Promo ERP Solutions', href: 'https://sites.google.com/view/promoersolutions/home' },
  ],
};

export const nav = [
  { label: 'Platform', href: '#platform' },
  { label: 'Tools', href: '#tools' },
  { label: 'AI', href: '#ai' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: 21, suffix: '', label: 'hosted & ready tools' },
  { value: 100, suffix: '%', label: 'open-source ownership' },
  { value: 0, suffix: '', label: 'per-user license fee' },
  { value: 24, suffix: '/7', label: 'engineer SLA support' },
];

export const features = [
  {
    icon: 'activity',
    title: 'Real-Time Workflow & Task Tracking',
    body: 'Assign, monitor and complete tasks with absolute transparency. Stop letting projects slip through the cracks.',
  },
  {
    icon: 'factory',
    title: 'Advanced Operations & Production Logs',
    body: 'Track raw materials, mold usage, machine output, operator efficiency and finished-goods inventory in real time.',
  },
  {
    icon: 'network',
    title: 'Unified Department Coordination',
    body: 'Instantly bridge the gap between sales, procurement, HR, production and finance.',
  },
  {
    icon: 'chart',
    title: 'Visual Project Dashboards',
    body: 'Manage timelines with flexible layouts: Kanban boards for pipelines, Gantt charts for scheduling and calendars for deadlines.',
  },
  {
    icon: 'shield',
    title: 'Role-Based Staff Permissions',
    body: 'Ensure data security by granting employees access only to the specific modules and information their role requires.',
  },
  {
    icon: 'devices',
    title: 'Cross-Platform Accessibility',
    body: 'Manage the enterprise seamlessly from any device with full web and mobile app support.',
  },
];

export const industries = [
  {
    title: 'Factories & Manufacturing Units',
    body: 'Track machinery, operators, shift outputs and raw material utilisation across every line.',
    stat: 'Shop floor',
  },
  {
    title: 'Trading Companies & Distributors',
    body: 'Monitor multi-location stock, supply chains, sales pipelines and vendor status in one view.',
    stat: 'Multi-location',
  },
  {
    title: 'Service Providers & Corporate Offices',
    body: 'Streamline client onboarding, project delivery milestones and HR workflows end to end.',
    stat: 'Client delivery',
  },
  {
    title: 'Growing Enterprises',
    body: 'Scale your infrastructure from a small team up to large-scale operations without losing control.',
    stat: 'Scales with you',
  },
];

export const toolCategories = [
  'All',
  'ERP & Core',
  'CRM & Sales',
  'HRM & Payroll',
  'Accounting',
  'Production',
  'Project Mgmt',
  'AI Automation',
];

export const tools = [
  {
    name: 'ERPNext',
    category: 'ERP & Core',
    deploy: 'On-Premise',
    status: 'Hosted',
    tagline: 'Complete industrial manufacturing and core business ERP.',
    body: 'Multi-level BOMs, work orders, job cards, subcontracting, inventory valuation and full sales and purchase cycles.',
    problem: 'Eliminates disconnected inventory, blind shop-floor scrap rates and manual paper job cards.',
  },
  {
    name: 'Odoo Community',
    category: 'ERP & Core',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Modular enterprise operations and integrated inventory.',
    body: 'Sales orders, double-entry inventory control, vendor RFQ automation and point-of-sale in one modular suite.',
    problem: 'Solves siloed departmental communication and untracked warehouse stock leaks.',
  },
  {
    name: 'Point of Sale',
    category: 'ERP & Core',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Point-of-sale built for your industry.',
    body: 'A till that adapts to clinics, salons, workshops and studios as easily as counters and dining rooms.',
    problem: 'Removes hidden inventory and accounts leakage across every sale.',
  },
  {
    name: 'E-commerce Store',
    category: 'ERP & Core',
    deploy: 'Private Cloud',
    status: 'Soon',
    tagline: 'Your online store, built and grown for you.',
    body: 'Store setup, product listing, checkout, then Facebook, Instagram and Google Shopping ads.',
    problem: 'Takes you from store to sales with one accountable team.',
  },
  {
    name: 'Manager.io',
    category: 'Accounting',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Reliable double-entry accounting and ledger audit engine.',
    body: 'Complete offline capability, multi-currency ledgers and comprehensive tax audit logs.',
    problem: 'Replaces clunky pirated desktop accounting with a clean, audited ledger.',
  },
  {
    name: 'OrangeHRM',
    category: 'HRM & Payroll',
    deploy: 'On-Premise',
    status: 'Hosted',
    tagline: 'Biometric attendance, industrial shifts and compliant payroll.',
    body: 'Biometric machine sync, multi-tier shift rosters, leave allowances and audited salary slips.',
    problem: 'Eliminates ghost workers, buddy-punching and month-end overtime disputes.',
  },
  {
    name: 'AI HR Suite',
    category: 'HRM & Payroll',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'The complete HR system, with AI alongside your team.',
    body: 'Attendance, payroll, recruitment and performance in one place, with AI handling the repetitive work.',
    problem: 'Gives your HR team time back and better data to act on.',
  },
  {
    name: 'Promo ERP Task Manager',
    category: 'Project Mgmt',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Shop-floor task delegation and daily shift accountability.',
    body: 'Assign routines to shift supervisors, log maintenance tickets and enforce SLA turnarounds.',
    problem: "Ends the \"I told him but he forgot\" cycle between managers and supervisors.",
  },
  {
    name: 'Plane',
    category: 'Project Mgmt',
    deploy: 'Docker',
    status: 'Hosted',
    tagline: 'Modern agile engineering, workstreams and sprints.',
    body: 'An open-source alternative to Jira and Linear for sprints, milestones and operational workstreams.',
    problem: 'Stops plant-setup projects stalling on opaque task ownership.',
  },
  {
    name: 'ProjeQtOr',
    category: 'Project Mgmt',
    deploy: 'On-Premise',
    status: 'Hosted',
    tagline: 'Stakeholders, planning and task execution in one place.',
    body: 'Manage projects, tasks, stakeholders, clients, contacts, resources and ticketing together.',
    problem: 'Eliminates fragmented task tracking and manual team synchronisation.',
  },
  {
    name: 'Taiga',
    category: 'Project Mgmt',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Agile project and task management.',
    body: 'Backlogs, sprints and kanban boards for teams that ship continuously.',
    problem: 'Keeps project work visible, owned and moving.',
  },
  {
    name: 'OpenProject',
    category: 'Project Mgmt',
    deploy: 'On-Premise',
    status: 'Soon',
    tagline: 'Industrial Gantt scheduling, resource leveling and budgets.',
    body: 'Interactive Gantt timelines, capacity leveling, time tracking and capital project budget control.',
    problem: 'Prevents budget overruns and schedule slippage on large projects.',
  },
  {
    name: 'Vikunja',
    category: 'Project Mgmt',
    deploy: 'Docker',
    status: 'Soon',
    tagline: 'Direct task assignment and operational checklists.',
    body: 'Structured routines, recurring shift reminders and kanban boards for supervisors.',
    problem: 'Ends lost verbal instructions on the shop floor.',
  },
  {
    name: 'Action Tracking Sheet',
    category: 'Project Mgmt',
    deploy: 'Private Cloud',
    status: 'Soon',
    tagline: 'Track progress on every delegated task.',
    body: 'A custom web app that follows each task you hand to each employee.',
    problem: 'Brings accountability to delegated work.',
  },
  {
    name: 'OpenMES',
    category: 'Production',
    deploy: 'Docker',
    status: 'Hosted',
    tagline: 'Open-source manufacturing execution system.',
    body: 'Real-time production tracking, drag-and-drop scheduling, work orders, QC checks and MQTT machine data.',
    problem: 'Eliminates paper logs and delayed production visibility.',
  },
  {
    name: 'Production Tracking App',
    category: 'Production',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'End-to-end visibility across the manufacturing lifecycle.',
    body: 'Hierarchical architecture, live dashboards, process and stage management, Gantt, Kanban and calendar views.',
    problem: 'Removes blind spots between planning and the shop floor.',
  },
  {
    name: 'Maintenance & Ticketing',
    category: 'Production',
    deploy: 'On-Premise',
    status: 'Soon',
    tagline: 'Preventive maintenance and breakdown dispatch.',
    body: 'Log line stoppages in seconds, dispatch mechanics, track spare parts and schedule recurring servicing.',
    problem: 'Replaces reactive firefighting with scheduled servicing.',
  },
  {
    name: 'CRM (Frappe & Pipeline)',
    category: 'CRM & Sales',
    deploy: 'Private Cloud',
    status: 'Soon',
    tagline: 'High-velocity B2B pipeline and quoting.',
    body: 'Track leads, proposals, quotation revisions and customer communication histories in one view.',
    problem: 'Stops contacts being hoarded on personal WhatsApp.',
  },
  {
    name: 'WhatsApp CRM',
    category: 'CRM & Sales',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Your automated WhatsApp partner, built for SMEs.',
    body: 'Never miss a client again across salons, grocery stores, clinics, restaurants and co-working spaces.',
    problem: 'Syncs every client conversation with your operation.',
  },
  {
    name: 'Promo AI Assistant',
    category: 'AI Automation',
    deploy: 'On-Premise',
    status: 'Hosted',
    tagline: 'Your own private AI. Nothing ever leaves your server.',
    body: 'Ask about production numbers, draft emails, summarise reports or query documents on open-source Llama 3.1 via Open WebUI.',
    problem: 'Stops confidential data going into public AI tools.',
  },
  {
    name: 'ERP AI Assistant',
    category: 'AI Automation',
    deploy: 'Private Cloud',
    status: 'Hosted',
    tagline: 'Natural-language queries against live ERP data.',
    body: 'Ask for inventory status, reorder levels, stock allocation, invoices, customers and reports without building them.',
    problem: 'Eliminates manual stock reconciliation and delayed reporting.',
  },
];

export const aiCapabilities = [
  {
    icon: 'sparkles',
    title: 'Intelligent Agents',
    body: 'Automated workflows and smart decision-making. Let AI handle routine approvals and routing based on your business rules.',
  },
  {
    icon: 'cpu',
    title: 'Automated Data Entry',
    body: 'Reduce manual data input and human error. Extract information from documents, emails and forms automatically.',
  },
  {
    icon: 'bell',
    title: 'Smart Notifications',
    body: 'Intelligent alerts based on business rules. Get notified only when human intervention is truly needed.',
  },
  {
    icon: 'trend',
    title: 'Predictive Insights',
    body: 'Data-driven forecasting. Anticipate inventory needs, sales trends and potential bottlenecks before they happen.',
  },
  {
    icon: 'workflow',
    title: 'Workflow Automation',
    body: 'AI triggers actions on specific conditions, automating repetitive tasks across your business processes.',
  },
  {
    icon: 'decision',
    title: 'Automated Decision-Making',
    body: 'Set rules for AI to make routine decisions automatically, freeing your team to focus on strategy.',
  },
];

export const agenticTier = [
  {
    title: 'Private Local LLMs',
    body: 'Air-gapped open weights (DeepSeek, Llama 3, Qwen) on your own factory workstation. Zero cloud leakage guarantee.',
  },
  {
    title: 'WhatsApp Industrial Reporting',
    body: 'Automated 08:00 production summaries in the management group: units produced, line stoppages and ledger balances.',
  },
  {
    title: 'Autonomous Procurement Agents',
    body: 'AI monitors raw-material burn rates against work orders and drafts RFQs for approved vendors at reorder thresholds.',
  },
  {
    title: 'RAG Shop-Floor Knowledgebase',
    body: 'Digitise 500-page machine manuals. Technicians ask in English or Urdu and get step-by-step diagnostic checklists.',
  },
];

export const maturity = [
  { level: 0, title: 'No system', body: 'Records exist only in memory or verbally. No central trail.' },
  { level: 1, title: 'Paper registers', body: 'Handwritten ledgers and paper gate passes with no digital record.' },
  { level: 2, title: 'Excel / Google Sheets', body: 'Spreadsheet-managed operations, formula breaks, no multi-user lock.' },
  { level: 3, title: 'Small accounting tool', body: 'Basic, often unlicensed accounting; siloed from sales and production.' },
  { level: 4, title: 'Small ERP', body: 'A lightweight ERP covering only part of operations with manual workarounds.' },
  { level: 5, title: 'Full ERP, customising', body: 'Complete ERP implemented; configuration, BOMs and workflows still being refined.' },
  { level: 6, title: 'ERP running smoothly', body: 'Stable, fully adopted across all departments with no major gaps.' },
  { level: 7, title: 'Ready for the AI layer', body: 'Clean data, ready for agentic AI and automation on top.' },
];

export const methodology = [
  {
    step: '01',
    title: 'Assess & Audit',
    body: 'Eliminate bad workflows before writing code. We examine dispatch registers, Excel formulas and material handovers.',
    deliverables: ['Operational gap analysis', 'Master data cleansing template', 'Hardware & server spec'],
  },
  {
    step: '02',
    title: 'Design & Architecture',
    body: 'Custom blueprinting for your specific industry, from multi-tier charts of accounts to role-based permissions.',
    deliverables: ['System blueprint document', 'Approval workflow rules', 'Tax / FBR / ZATCA schemas'],
  },
  {
    step: '03',
    title: 'Implement & Deploy',
    body: 'On-premise hardening and staff training. We migrate historical balances and train supervisors in Urdu and English.',
    deliverables: ['Production go-live', 'Historical balance migration', 'Supervisor video guides'],
  },
  {
    step: '04',
    title: 'Sustain & Scale',
    body: 'Guaranteed 24/7 SLA and continuous evolution, with automated encrypted backups and ongoing custom reporting.',
    deliverables: ['Dedicated WhatsApp support', 'Automated offsite backups', 'Monthly performance audits'],
  },
];

export const pricing = [
  {
    name: 'Starter',
    tagline: 'Perfect for small teams looking to digitise operations.',
    popular: false,
    features: [
      'Real-time workflow & task tracking',
      'Unified department coordination',
      'Visual project dashboards',
      'Role-based staff permissions',
      'Cross-platform accessibility',
      'Email support',
      'Up to 10 users',
    ],
  },
  {
    name: 'Professional',
    tagline: 'Ideal for growing businesses with advanced needs.',
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced operations & production logs',
      'Comprehensive activity logs',
      'Custom reporting tools',
      'Priority email & phone support',
      'Up to 50 users',
      'API access for integrations',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'Complete solution for large-scale operations.',
    popular: false,
    features: [
      'Everything in Professional',
      'Unlimited users',
      'Scale infrastructure easily',
      'Custom module development',
      'Dedicated account manager',
      '24/7 priority support',
      'On-premise deployment option',
    ],
  },
];

export const integrations = [
  { group: 'Accounting', items: ['QuickBooks', 'Xero'] },
  { group: 'CRM', items: ['Salesforce', 'HubSpot'] },
  { group: 'Databases', items: ['MySQL', 'PostgreSQL', 'Oracle'] },
  { group: 'Payments', items: ['Stripe', 'PayPal'] },
  { group: 'Email', items: ['Gmail', 'Outlook', 'SendGrid'] },
  { group: 'Messaging', items: ['WhatsApp', 'Slack', 'Teams'] },
];

export const integrationMarquee = [
  'ERPNext', 'Odoo', 'Manager.io', 'OrangeHRM', 'Plane', 'OpenProject', 'ProjeQtOr',
  'Vikunja', 'Taiga', 'OpenMES', 'QuickBooks', 'Xero', 'Salesforce', 'HubSpot',
  'MySQL', 'PostgreSQL', 'Oracle', 'Stripe', 'PayPal', 'Gmail', 'Outlook', 'SendGrid',
  'WhatsApp', 'Slack', 'Teams',
];
