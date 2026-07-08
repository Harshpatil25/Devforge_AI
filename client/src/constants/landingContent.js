import {
  BrainCircuit,
  Bug,
  Compass,
  Sparkles,
  Search,
  BarChart3,
  Blocks,
  Cpu,
  Database,
  Bot,
  Send,
  PenTool,
} from 'lucide-react'

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

export const techStack = [
  { name: 'React', icon: Cpu, description: 'Fast, composable interfaces.' },
  { name: 'Express', icon: Blocks, description: 'Reliable backend foundations.' },
  { name: 'Supabase', icon: Database, description: 'Managed data and auth.' },
  { name: 'Gemini', icon: Bot, description: 'Context-aware AI assistance.' },
  { name: 'Resend', icon: Send, description: 'Thoughtful email delivery.' },
  { name: 'Tailwind CSS', icon: PenTool, description: 'Clear, expressive styling.' },
]

export const features = [
  { title: 'Memory Vault', description: 'Capture architecture notes, decisions, runtime context, and snippets without losing momentum.', icon: BrainCircuit },
  { title: 'Bug Vault', description: 'Track regressions and root cause notes so the same issue is easier to solve next time.', icon: Bug },
  { title: 'AI Workspace', description: 'Generate documentation, summaries, and next steps directly from the work you are already doing.', icon: Sparkles },
  { title: 'Knowledge Base', description: 'Keep onboarding notes, checklists, and references in one searchable home.', icon: Compass },
  { title: 'Smart Search', description: 'Search across projects, conversations, bugs, and docs with precision and context.', icon: Search },
  { title: 'Developer Analytics', description: 'Spot patterns in your workflow and understand where your time goes.', icon: BarChart3 },
]

export const steps = [
  { title: 'Capture', description: 'Save decisions, bugs, and project context as you work.', icon: BrainCircuit },
  { title: 'Organize', description: 'Group knowledge by project, milestone, or topic.', icon: Compass },
  { title: 'Search', description: 'Find anything instantly when you need to recall it.', icon: Search },
  { title: 'Improve', description: 'Use AI to turn your history into documentation and next steps.', icon: Sparkles },
]

export const faqs = [
  {
    question: 'Is DevForge only for large engineering teams?',
    answer: 'No. It is designed for solo developers, founders, and teams that want a better way to retain and retrieve knowledge over time.',
  },
  {
    question: 'Can I use it alongside GitHub and my editor?',
    answer: 'Yes. DevForge fits into your workflow as a memory layer for projects, notes, bugs, and generated documentation.',
  },
  {
    question: 'How much of the experience is AI-powered?',
    answer: 'AI helps summarize, generate docs, and connect context, while the core memory and search experience remains practical and reliable.',
  },
  {
    question: 'What happens to my data?',
    answer: 'Your workspace is designed to be structured and searchable with the flexibility to connect to Supabase-managed storage and auth.',
  },
]

export const footerLinks = [
  { title: 'Quick Links', links: [{ label: 'Features', href: '#features' }, { label: 'How it Works', href: '#how-it-works' }, { label: 'FAQ', href: '#faq' }] },
  { title: 'Resources', links: [{ label: 'Documentation', href: '#features' }, { label: 'GitHub', href: 'https://github.com' }, { label: 'Support', href: '/login' }] },
]
