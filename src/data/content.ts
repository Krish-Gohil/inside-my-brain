export interface Project {
  slug: string
  num: string
  name: string
  tags: string
  year: string
  desc: string
  impact: string
  accent: string
  image?: string
  github?: string
  live: string
  stack: string
  highlights: string[]
  pipeline: string[]
}

export const identity = {
  name: 'Krish Gohil',
  role: 'Full Stack Developer',
  focus: 'Cloud APIs · Full Stack · Geospatial · Mobile',
  pitch: 'Open to software engineering internships',
  location: 'building things on the internet',
}

export const bio = {
  headline: 'Full Stack Developer · cloud systems & product interfaces',
  paragraphs: [
    `Hey — I'm Krish. I build full-stack products across cloud APIs, geospatial systems, and mobile interfaces. ${identity.pitch}.`,
    `I care about clarity over cleverness: secure defaults, measurable performance, and interfaces people can trust under real constraints.`,
    `When I'm not shipping, I'm deepening system design, Dockerized workflows, and the tooling that makes complex systems feel simple.`,
  ],
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Krish-Gohil', icon: 'github' as const },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/krish-gohil-3ab0a3280/',
    icon: 'linkedin' as const,
  },
  { label: 'Email', href: 'mailto:krishgohil843@gmail.com', icon: 'email' as const },
]

export const projects: Project[] = [
  {
    slug: 'online-ide',
    num: '01',
    name: 'Online IDE',
    tags: 'Full Stack · Docker · Cloud',
    year: '2025',
    desc: 'Cloud code execution with Monaco, Redis jobs, and locked-down Docker runtimes.',
    impact: '200 TPS · 50+ concurrent scripts · 5 languages',
    accent: '#7DCFB6',
    image: '/projects/online-ide.png',
    github: 'https://github.com/krish-Gohil/onlineIde',
    live: 'https://online-ide-five-psi.vercel.app',
    stack: 'Next.js · Express · Prisma · PostgreSQL · Redis · Docker · JWT',
    highlights: [
      'Async Redis queue decouples API from Docker workers',
      'Hard limits: 128–256MB memory, 10s timeout, no network',
      'JWT HttpOnly sessions + tiered rate limiting',
    ],
    pipeline: ['Edit', 'Queue', 'Isolate', 'Execute', 'Poll'],
  },
  {
    slug: 'ttc-transit-map',
    num: '02',
    name: 'Transit Maps',
    tags: 'Geospatial · Full Stack · Maps',
    year: '2025',
    desc: 'Real-time TTC navigation with PostGIS proximity search and live ETAs on Leaflet.',
    impact: '9,317+ stops · sub-second queries · 60s ETA polling',
    accent: '#6EB5E0',
    github: 'https://github.com/Krish-Gohil/transit-maps',
    live: '#',
    stack: 'React · Vite · Zustand · Leaflet · Express · PostgreSQL · PostGIS',
    highlights: [
      'PostGIS ST_DWithin for nearby-stop search',
      'Interactive Leaflet map with Bezier route overlays',
      'GPS + IP fallback location and favorite stops',
    ],
    pipeline: ['Locate', 'Query', 'Route', 'Overlay', 'ETA'],
  },
  {
    slug: 'fragments',
    num: '03',
    name: 'Fragments',
    tags: 'Cloud · API · Security',
    year: '2024',
    desc: 'Secure document API with JWT auth, S3 storage, DynamoDB metadata, and Sharp.',
    impact: '45% smaller uploads · sub-10ms metadata · 92% coverage',
    accent: '#E8C4A0',
    github: 'https://github.com/Krish-Gohil/fragments',
    live: '#',
    stack: 'Node.js · Express · Passport JWT · DynamoDB · S3 · Sharp · Jest',
    highlights: [
      'Stateless Express API over S3 + DynamoDB',
      'Sharp middleware cuts image upload size by 45%',
      'Jest, Supertest, and Hurl for unit through e2e coverage',
    ],
    pipeline: ['Auth', 'Validate', 'Process', 'Store', 'Query'],
  },
  {
    slug: 'netpulse',
    num: '04',
    name: 'NetPulse',
    tags: 'Mobile · React Native · Expo',
    year: '2025',
    desc: 'Mobile network monitor with animated charts, Canada map pins, and swipeable alerts.',
    impact: 'Live on Vercel · dark/light themes · alert feed',
    accent: '#9BB8D4',
    live: 'https://nettpulse.vercel.app/',
    stack: 'React Native · Expo · Expo Router · Reanimated · Gesture Handler',
    highlights: [
      'Dashboard stats, status ring, and recent alerts',
      'Canada map with color-coded node pins + detail sheets',
      'Swipeable alerts and dark/light theme settings',
    ],
    pipeline: ['Dashboard', 'Map', 'Node', 'Alerts', 'Settings'],
  },
]
