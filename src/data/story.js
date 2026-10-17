// ─────────────────────────────────────────────────────────────────────────────
// STORY CONTENT — chapter titles and the facts shown in each chapter.
// Facts come from the project brief. Copy marked DRAFT is written in your voice
// from the brief's themes — read it and edit it until it sounds like you.
// ─────────────────────────────────────────────────────────────────────────────

export const CHAPTERS = [
  {
    id: 'origin',
    n: 1,
    title: 'THE ORIGIN STORY',
    short: 'Origin',
    subtitle: 'The early wins, the unexpected detours.',
    accent: 'orange',
  },
  {
    id: 'builder',
    n: 2,
    title: 'THE BUILDER ERA',
    short: 'Builder',
    subtitle: 'From learning to building.',
    accent: 'cyan',
  },
  {
    id: 'breakthrough',
    n: 3,
    title: 'THE BREAKTHROUGH',
    short: 'Breakthrough',
    subtitle: 'Entering the real world.',
    accent: 'pink',
  },
  {
    id: 'next',
    n: 4,
    title: 'THE NEXT VERSION OF ME',
    short: 'Future',
    subtitle: 'The story is still being written.',
    accent: 'yellow',
  },
]

export const INTRO_LINE = 'Hey! Let me show you my story.'

// ── Chapter 1 ────────────────────────────────────────────────────────────────
export const ORIGIN_LEAD =
  "I'm an only child, and I grew up in the old commercial streets of Bangalore, where my family runs a gold ornament manufacturing shop. Watching how a business runs fot me curious to learn more about it. School and PU gave me the wins. Competitive exams gave me the detours."

export const WINS = [
  { big: '94.2%', label: 'ICSE', note: "St Ann's High School", color: 'yellow', r: -3 },
  { big: '95.6%', label: 'PCMC', note: 'MES Kishora Kendra PU College', color: 'cyan', r: 2 },
  { big: 'NATIONAL', label: 'Abacus achievement', note: 'National-level, during school', color: 'pink', r: -2 },
  { big: '9th', label: 'Rank', note: 'National Level Maths Talent Exam', color: 'orange', r: 3 },
  { big: "'A'", label: 'NCC Certificate', note: 'NCC "A" Certificate', color: 'cyan', r: -2 },
  { big: '4', label: 'NCC camps', note: 'Participated in four camps', color: 'yellow', r: 2 },
]

export const DETOURS = [
  { id: 'jee', title: 'JEE', note: 'Did not work out as hoped.', state: 'crossed' },
  { id: 'bitsat', title: 'BITSAT', note: 'Did not lead to the branch I wanted.', state: 'crossed' },
  {
    id: 'kcet',
    title: 'KCET → BIT',
    note: 'Hoped for a drop year, but my parents said no. Counselling got me into Bangalore Institute of Technology—and the detour became the route.',
    state: 'ok',
  },
]

export const ORIGIN_NARRATOR = 'Plan A did not survive. Plan B turned out to be the plot.'

// ── Chapter 2 ────────────────────────────────────────────────────────────────
export const BUILDER_SCENES = [
  { id: 'levelup', label: 'LEVEL UP', hint: 'Grades & branch upgrade' },
  { id: 'stage', label: 'ON STAGE & ON DUTY', hint: 'Dance & Rotaract' },
  { id: 'hack', label: 'HACK & BUILD', hint: 'Hackathons & projects' },
]

export const BUILDER_NARRATOR = {
  levelup: 'First year changed my branch. Third year brought the comeback.',
  stage: 'Not every skill lives on a laptop.',
  hack: 'These are the projects that I have built.',
}

export const LEVEL_UP_STEPS = [
  {
    title: 'First Project',
    text: 'Built a railway booking system in Java (Swing) for a school Computer Science project in 9th/10th grade.',
  },
  {
    title: 'Robotics & AI',
    text: 'Started engineering at Bangalore Institute of Technology.',
  },
  {
    title: 'First-year CGPA',
    text: 'Achieved 9.03 in the first year.',
    stat: 9.03,
  },
  {
    title: 'Branch change',
    text: 'Moved to CSE (IoT, Cybersecurity, Blockchain) through academic performance. The branch change was hard: I left friends I made in Robotics & AI (RAI) and my GPA dipped a bit, but I made new friends, bonded with faculty, left my mark in the new branch too, and I’m still close to my RAI friends.',
  },
  {
    title: 'The comeback',
    text: "The dip didn't last. In my third year, the college recognised me with the Department Academic Excellence award for securing the third top position in the department.",
    photos: [
      {
        src: '/photos/felicitation-stage.jpg',
        alt: "Receiving the Department Academic Excellence award on stage at BIT's annual day",
        caption: "On stage at BIT's annual day",
      },
      {
        src: '/photos/felicitation-plaque.jpg',
        alt: 'Department Academic Excellence plaque for the Third Top Position in Third Year',
        caption: 'The Department Academic Excellence plaque',
      },
      {
        src: '/photos/graduation-day.jpg',
        alt: 'With fellow award recipients at Abhyudaya Graduation Day 2026, BIT',
        caption: 'Abhyudaya Graduation Day 2026',
      },
    ],
  },
]

export const STAGE_CARDS = [
  {
    title: 'College Dance Club',
    text: 'Member of the college dance club and a participant in college dance events. Dance started as a hobby.',
    // TODO: [ADD ONE LINE ABOUT WHAT DANCE GIVES ME]
    color: 'pink',
    photos: [
      {
        src: './photos/dance-event.jpg',
        alt: 'Performing at a college dance event, BIT',
        caption: 'Performing at a college dance event, BIT',
      },
      {
        src: './photos/dance-group.jpg',
        alt: 'With the dance team',
        caption: 'With the dance team',
      },
      {
        src: '/photos/navy-jackets-group.jpg',
        alt: 'With the team in navy jackets at BIT',
        caption: 'With the team in navy jackets, BIT',
      },
    ],
    photo: 'dance',
    photoLabel: 'Dance event photo',
    photoUsage: 'A photo of you at a college dance event or with the dance club.',
  },
  {
    title: 'Joint Secretary, Rotaract Club of BIT',
    text: 'Served during my fifth semester. Managed event accounts, documentation and records.',
    color: 'cyan',
    photos: [
      {
        src: './photos/rotaract-appointment.jpg',
        alt: 'Receiving my appointment letter as Joint Secretary, Rotaract Club of BIT',
        caption: 'Receiving my appointment letter as Joint Secretary, Rotaract Club of BIT',
      },
      {
        src: './photos/rotaract-team-black.jpg',
        alt: 'With the Rotaract team',
        caption: 'With the Rotaract team',
      },
      {
        src: './photos/rotaract-speaking.jpg',
        alt: 'Speaking at a Rotaract event',
        caption: 'Speaking at a Rotaract event',
      },
      {
        src: '/photos/rotaract-emerald-citation.jpg',
        alt: 'Receiving the Emerald Citation with the Rotaract team, Rotaract District 3191',
        caption: 'Receiving the Emerald Citation with the Rotaract team',
      },
    ],
    photo: 'rotaract',
    photoLabel: 'Rotaract photo',
    photoUsage: 'A Rotaract event or team photo from your fifth semester.',
  },
]

export const HACKATHONS = [
  {
    rank: '4th',
    of: 'of 120 teams',
    name: 'Casethon',
    where: 'BNMIT, Bengaluru',
    when: 'July 2025',
    color: 'orange',
  },
  {
    rank: '7th',
    of: 'of 105 teams',
    name: 'HackFinity',
    where: 'MIT Mysore',
    when: 'May 2025',
    color: 'cyan',
  },
]

// ── Chapter 3 ────────────────────────────────────────────────────────────────
export const INTERNSHIP = {
  company: 'GyanSys',
  date: '25 August 2026',
  lead:
    'On 25 August 2026, in my seventh semester, I secured an internship at GyanSys through on-campus placements.',
  meaning:
    'It is the moment the classroom starts meeting the real world. Four years of learning, building and falling short now get a place to be useful.',
  whoIAm: [
    "I'm an ambivert who adapts. When my branch changed I had to leave a friend group I'd just built; it took effort, but I found my footing, made new friends and kept the old ones.",
    "I also learn by doing: after a college workshop on n8n I started exploring it on my own and built mail automations, which grew into my automation project.",
  ],
  lookingForward: [
    "Right now I'm exploring Azure (Foundry, RAG) and SAP, so I can start with a head start.",
    "I want to see how real client problems become working solutions, and how the teams and the business side work.",
    "I'm looking forward to making new connections and learning from experienced people around me.",
    "Above all, I want to contribute to GyanSys while building a strong, positive career for myself.",
  ],
  hopes: [
    "I'm an ambivert who adapts. When my branch changed I had to leave a friend group I'd just built; it took effort, but I found my footing, made new friends and kept the old ones.",
    "I also learn by doing: after a college workshop on n8n I started exploring it on my own and built mail automations, which grew into my automation project.",
    "Right now I'm exploring Azure (Foundry, RAG) and SAP, so I can start with a head start.",
    "I want to see how real client problems become working solutions, and how the teams and the business side work.",
    "I'm looking forward to making new connections and learning from experienced people around me.",
    "Above all, I want to contribute to GyanSys while building a strong, positive career for myself.",
  ],
}

export const MILESTONES = [
  { date: '25 Aug 2026', text: 'Secured the GyanSys internship', done: true },
  // TODO: [OPTIONAL: add real milestone: ___]
]

// ── Chapter 4 ────────────────────────────────────────────────────────────────
export const FUTURE = {
  statement:
    'I want to be an engineer who keeps learning in public, builds systems people can trust, and stays curious about how technology can be made more useful. Beyond that, the wall is still blank.',
  closing: 'The plan changed. The dream didn’t stop. The story continues.',
  signature: 'Parwath Sri Raju K.',
}
