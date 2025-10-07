import projectContent from './projectContent.json'

export interface Project {
  id: string
  name: string
  description: string
  content: string
  images: string[]
  category: string
  year: string
  status: string
}

export const projects: Project[] = [
  {
    id: 'fede-casabona',
    name: 'FEDE CASABONA',
    description: 'Product Designer & AI builder',
    content: projectContent['federico-casabona'],
    images: [
      '/images/projects/fede-casabona/fede.jpg'
    ],
    category: 'Personal',
    year: '2024',
    status: 'Active'
  },
  {
    id: 'ninjas',
    name: 'NINJAS',
    description: 'Stealth Design for Production Agency',
    content: projectContent['ninjas'],
    images: [
      '/images/projects/ninjas/Home.webp',
      '/images/projects/ninjas/About.webp',
      '/images/projects/ninjas/LIVE.webp',
      '/images/projects/ninjas/Mac-Ninja.webp',
      '/images/projects/ninjas/ninja-attack.webp'
    ],
    category: 'Platform',
    year: '2024',
    status: 'In Development'
  },
  {
    id: 'collective',
    name: 'COLLECTIVE',
    description: 'Creative Collaboration Platform',
    content: projectContent['collective'],
    images: [
      '/images/projects/collective/Collective-cover.webp',
      '/images/projects/collective/app-angle.webp',
      '/images/projects/collective/screens.webp',
      '/images/projects/collective/members.gif'
    ],
    category: 'Platform',
    year: '2023',
    status: 'Live'
  },
  {
    id: 'travel-assistant',
    name: 'TRAVEL ASSISTANT',
    description: 'AI-Powered Travel Planning',
    content: projectContent['travel-assistant'],
    images: [
      '/images/projects/travel-assistant/dashboard1.jpg',
      '/images/projects/travel-assistant/mobile2.jpg',
      '/images/projects/travel-assistant/ai3.jpg'
    ],
    category: 'AI/ML',
    year: '2024',
    status: 'Beta'
  },
  {
    id: 'ai-brain',
    name: 'AI—BRAIN',
    description: 'Advanced AI Interface System',
    content: projectContent['ai-brain'],
    images: [
      '/images/projects/ai-brain/interface1.jpg',
      '/images/projects/ai-brain/neural2.jpg',
      '/images/projects/ai-brain/ai3.jpg'
    ],
    category: 'AI/ML',
    year: '2024',
    status: 'Research'
  },
  {
    id: 'sportify',
    name: 'SPORTIFY',
    description: 'Sports Analytics Platform',
    content: projectContent['sportify'],
    images: [
      '/images/projects/sportify/analytics1.jpg',
      '/images/projects/sportify/tracking2.jpg',
      '/images/projects/sportify/team3.jpg'
    ],
    category: 'Sports',
    year: '2023',
    status: 'Live'
  },
  {
    id: 'marine-chartering',
    name: 'Marine Chartering Platform',
    description: 'Luxury Yacht Charter Marketplace',
    content: projectContent['marine-chartering'],
    images: [
      '/images/projects/marine-chartering/yacht1.jpg',
      '/images/projects/marine-chartering/booking2.jpg',
      '/images/projects/marine-chartering/virtual3.jpg'
    ],
    category: 'Maritime',
    year: '2023',
    status: 'Live'
  },
  {
    id: '11fs',
    name: '11:FS / Content Hub',
    description: 'Financial Services Content Platform',
    content: projectContent['11fs'],
    images: [
      '/images/projects/11fs/content1.jpg',
      '/images/projects/11fs/research2.jpg',
      '/images/projects/11fs/insights3.jpg'
    ],
    category: 'Fintech',
    year: '2023',
    status: 'Live'
  },
  {
    id: 'bytes',
    name: 'BYTES',
    description: 'Developer Tools Platform',
    content: projectContent['bytes'],
    images: [
      '/images/projects/bytes/editor1.jpg',
      '/images/projects/bytes/api2.jpg',
      '/images/projects/bytes/collaboration3.jpg'
    ],
    category: 'Developer Tools',
    year: '2024',
    status: 'Beta'
  },
  {
    id: 'greed',
    name: 'Greed',
    description: 'Typography & Brand Identity',
    content: projectContent['greed'],
    images: [
      '/images/projects/greed/typography1.jpg',
      '/images/projects/greed/brand2.jpg',
      '/images/projects/greed/motion3.jpg'
    ],
    category: 'Typography',
    year: '2024',
    status: 'Completed'
  },
  {
    id: 'enter',
    name: 'Enter',
    description: 'Immersive Digital Experience',
    content: projectContent['enter'],
    images: [
      '/images/projects/enter/virtual1.jpg',
      '/images/projects/enter/interaction2.jpg',
      '/images/projects/enter/ar3.jpg'
    ],
    category: 'Immersive Tech',
    year: '2024',
    status: 'Prototype'
  },
  {
    id: 'observer',
    name: 'Observer',
    description: 'Data Visualization Platform',
    content: projectContent['observer'],
    images: [
      '/images/projects/observer/dashboard1.jpg',
      '/images/projects/observer/visualizations2.jpg',
      '/images/projects/observer/charts3.jpg'
    ],
    category: 'Data Viz',
    year: '2023',
    status: 'Live'
  },
  {
    id: 'casa',
    name: 'Casa',
    description: 'Architectural Visualization',
    content: projectContent['casa'],
    images: [
      '/images/projects/casa/architectural1.jpg',
      '/images/projects/casa/virtual2.jpg',
      '/images/projects/casa/modeling3.jpg'
    ],
    category: 'Architecture',
    year: '2023',
    status: 'Live'
  },
  {
    id: 'magic-places',
    name: 'Magic Places',
    description: 'Location-Based Discovery App',
    content: projectContent['magic-places'],
    images: [
      '/images/projects/magic-places/app1.jpg',
      '/images/projects/magic-places/ar2.jpg',
      '/images/projects/magic-places/discovery3.jpg'
    ],
    category: 'Travel',
    year: '2024',
    status: 'Live'
  }
]
