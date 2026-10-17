// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — everything the project wall and detail panels show.
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'logitrust',
    name: 'LogiTrust',
    kind: 'AI · IoT · Blockchain',
    tagline: 'AI, IoT and Blockchain Supply Chain Platform',
    color: 'orange',
    problem:
      'When goods travel through a supply chain, conditions can go wrong on the way. Teams need to see it early — and trust the record afterwards.',
    overview:
      'A supply-chain monitoring platform concept that brings together sensor telemetry, anomaly detection, risk scoring and spoilage-event analysis, with blockchain used for trustworthy records.',
    capabilities: [
      'Supply-chain monitoring from sensor telemetry',
      'Anomaly detection on incoming readings',
      'Risk scoring for shipments',
      'Spoilage-event analysis',
    ],
    tech: ['Node.js', 'PostgreSQL', 'MQTT', 'FastAPI', 'Solidity', 'Docker'],
    contribution: null, // TODO: [PASTE MY 1-3 SENTENCES FOR EACH PROJECT]
    screenshots: [
      {
        src: './photos/logitrust-admin.png',
        caption: 'Admin Console: Platform overview, live tracking, and blockchain event log',
      },
      {
        src: './photos/logitrust-roles.png',
        caption: 'Role-based dashboard access: Admin, Shipper, Receiver',
      },
    ],
    repos: [
      {
        label: 'Repository',
        url: 'https://github.com/Parwath116/LogiTrust-main',
      },
    ],
  },
  {
    id: 'blockme',
    name: 'BlockMe',
    kind: 'Chrome Extension',
    tagline: 'Focus and Productivity Chrome Extension',
    color: 'cyan',
    problem:
      'Distractions are one tab away — and staying focused is easier when other people are doing it with you.',
    overview:
      'A Chrome extension (Manifest V3) for focus sessions: timers, collaborative focus rooms, shared blocklists, live chat and AI-powered summarisation.',
    capabilities: [
      'Focus timers',
      'Collaborative focus rooms',
      'Shared blocklists',
      'Live chat',
      'AI-powered summarisation',
    ],
    tech: ['JavaScript', 'Chrome Manifest V3', 'Firebase', 'Gemini API'],
    contribution: null, // TODO: [PASTE MY 1-3 SENTENCES FOR EACH PROJECT]
    screenshots: [
      {
        src: './photos/blockme-popup.png',
        caption: 'Focus timer, XP and streaks',
      },
      {
        src: './photos/blockme-group.png',
        caption: 'Group study rooms',
      },
    ],
    repos: [
      {
        label: 'Repository',
        url: 'https://github.com/Parwath116/BlockMe-Project',
      },
    ],
  },
  {
    id: 'securevote',
    name: 'SecureVote',
    kind: 'Cryptography',
    tagline: 'Hybrid Cryptography-Based Secure Voting System',
    color: 'pink',
    problem:
      'A vote has to stay private, yet any tampering with the result has to be detectable.',
    overview:
      'A secure voting system that combines RSA and AES-256 in a hybrid scheme, with a defined voting workflow, cryptographic verification and tamper detection.',
    capabilities: [
      'Defined voting workflow',
      'Cryptographic verification',
      'Tamper detection',
      'Hybrid RSA + AES-256 encryption',
    ],
    tech: ['Python', 'Flask', 'Firebase', 'RSA', 'AES-256'],
    contribution: null, // TODO: [PASTE MY 1-3 SENTENCES FOR EACH PROJECT]
    screenshots: [
      {
        src: './photos/securevote-landing.png',
        caption: 'Encrypted ballot system landing page and registration',
      },
      {
        src: './photos/securevote-register.png',
        caption: 'Voter registration and key generation',
      },
    ],
    repos: [
      {
        label: 'Repository',
        url: 'https://github.com/Parwath116/Secure_voting',
      },
    ],
  },
  {
    id: 'automation',
    name: 'AI Workflow Automation Suite',
    kind: 'Automation',
    tagline: 'Event-driven and scheduled AI workflows',
    color: 'yellow',
    problem:
      'Repetitive tasks — content, data handling, notifications — eat time that people could spend on real work.',
    overview:
      'A suite of automations covering event-driven and scheduled workflows, AI-powered content generation, automated data processing and audit logging.',
    capabilities: [
      'Event-driven and scheduled workflows',
      'AI-powered content generation',
      'Automated data processing',
      'Audit logging',
    ],
    tech: ['n8n', 'OpenAI API', 'Google Sheets API', 'Gmail API', 'Telegram Bot API', 'REST APIs'],
    contribution:
      'Started exploring n8n on my own after a college workshop, building mail automations that expanded into event-driven and scheduled workflows across Google Sheets, Telegram, and REST APIs.',
    screenshots: [
      {
        src: './photos/n8n-interview-generator.png',
        caption: 'Interview question generator workflow',
      },
      {
        src: './photos/n8n-email-outreach.png',
        caption: 'Personalised email outreach workflow',
      },
    ],
    repos: [
      {
        label: 'Interview question generator',
        url: 'https://github.com/N8Nautomationsorganization/ai-interview-question-generator',
      },
      {
        label: 'Personalised email outreach',
        url: 'https://github.com/N8Nautomationsorganization/ai-personalized-email-outreach-automation',
      },
    ],
  },
]
