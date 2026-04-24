import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterKey = 'All' | 'AI/ML' | 'Full Stack' | 'Capstone'

interface Project {
  id: string
  name: string
  tag: string
  type: string
  desc: string
  tech: string[]
  accentColor: string
  category: FilterKey[]
  github?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED = {
  name: 'ZenHire',
  tag: 'AI-Powered Hiring Platform',
  desc: 'An end-to-end AI hiring platform — from resume intelligence to interview evaluation to hiring decisions. Built with a production-grade backend, multi-agent architecture, and designed for real deployment at scale.',
  tech: ['Python', 'FastAPI', 'Next.js 14', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
}

const PROJECTS: Project[] = [
  {
    id: 'aura-ats',
    name: 'Aura ATS',
    tag: 'AI Resume Analyser',
    type: 'Solo Build',
    desc: '4-stage modular pipeline — text extraction → skill analysis → match scoring → structured feedback. Validated by 12 unit tests. Exposed via REST API for external hiring workflow integration.',
    tech: ['Python', 'OpenAI API', 'REST API', 'Unit Testing'],
    accentColor: '#7B61FF',
    category: ['AI/ML'],
    github: 'https://github.com/romesh45/resume-analyzer',
  },
  {
    id: 'ai-interview-coach',
    name: 'AI Interview Coach',
    tag: 'Adaptive Interview Engine',
    type: 'Solo Build',
    desc: 'Ingests resume + job description, generates role-specific questions via OpenAI, evaluates responses, returns structured feedback with targeted improvement guidance.',
    tech: ['Python', 'OpenAI API', 'LangChain', 'REST API'],
    accentColor: '#00D9FF',
    category: ['AI/ML'],
    github: 'https://github.com/romesh45/AI-Interview-Coach',
  },
  {
    id: 'easyway-logistics',
    name: 'EasyWay Logistics',
    tag: 'Intelligent Logistics Platform',
    type: 'Capstone · Core Dev',
    desc: 'Full-stack freight platform replacing informal broker networks in India. Multi-constraint matching engine with real-time tracking, UPI payments, and driver accountability scoring.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    accentColor: '#10b981',
    category: ['Full Stack', 'Capstone'],
    github: 'https://github.com/romesh45/easyway-logistics',
  },
  {
    id: 'easyway-ai-chatbot',
    name: 'EasyWay AI Chatbot',
    tag: 'Conversational Logistics AI',
    type: 'Solo Build',
    desc: 'AI conversational layer built on top of the EasyWay platform. Natural language interface for freight queries, load matching, and shipment status updates.',
    tech: ['Python', 'LangChain', 'REST API'],
    accentColor: '#10b981',
    category: ['AI/ML', 'Full Stack'],
    github: 'https://github.com/romesh45/easyway-ai-chatbot',
  },
  {
    id: 'conv-ai-chatbot',
    name: 'Conversational AI Chatbot',
    tag: 'Multi-turn NLP System',
    type: 'Solo Build',
    desc: 'Multi-turn chatbot with LangChain prompt chaining and context management. Configurable Gradio interface for testing distinct conversation strategies and API response handling patterns.',
    tech: ['Python', 'OpenAI API', 'LangChain', 'Gradio', 'HuggingFace'],
    accentColor: '#FF2D6B',
    category: ['AI/ML'],
    github: 'https://github.com/romesh45/ChatbotwithOpenAI',
  },
  {
    id: 'house-rental',
    name: 'House Rental System',
    tag: 'Full-Stack Property Platform',
    type: 'Collaboration',
    desc: 'Role-based platform across three user types — Owner, Tenant, Admin. Modular Angular 18 frontend with relational MySQL schema and clean separation of data access and business logic.',
    tech: ['Angular 18', 'Node.js', 'TypeScript', 'MySQL'],
    accentColor: '#888888',
    category: ['Full Stack'],
    github: 'https://github.com/SHemanth0112/Online-House-Rental-Tenant-Management-System',
  },
]

const FILTERS: FilterKey[] = ['All', 'AI/ML', 'Full Stack', 'Capstone']
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// ─── Tech Pill ────────────────────────────────────────────────────────────────

function TechPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md font-mono text-xs"
      style={{
        background: `rgba(${hexToRgb(color)}, 0.1)`,
        border: `1px solid rgba(${hexToRgb(color)}, 0.28)`,
        color,
      }}
    >
      {label}
    </span>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full rounded-2xl overflow-hidden p-8 md:p-10 transition-all duration-500"
      data-cursor-hover
      style={{
        background: 'var(--void)',
        border: `1px solid ${hovered ? 'rgba(123,97,255,0.55)' : 'rgba(123,97,255,0.2)'}`,
        boxShadow: hovered
          ? '0 0 60px rgba(123,97,255,0.18), 0 0 120px rgba(123,97,255,0.08), inset 0 0 60px rgba(123,97,255,0.04)'
          : '0 0 30px rgba(123,97,255,0.06)',
      }}
    >
      {/* Animated top glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.8), transparent)',
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Corner radial */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Badge — top right */}
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)' }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: '#FBBF24', boxShadow: '0 0 6px rgba(251,191,36,0.8)' }}
        />
        <span className="font-mono text-xs tracking-widest" style={{ color: '#FBBF24' }}>
          FLAGSHIP · IN DEVELOPMENT
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-8">
        {/* Left — text */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3
              className="font-grotesk font-bold"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--star-white)' }}
            >
              {FEATURED.name}
            </h3>
            <span
              className="font-mono text-sm tracking-wide"
              style={{ color: 'var(--cyber-cyan)' }}
            >
              {FEATURED.tag}
            </span>
          </div>

          <p
            className="font-inter leading-relaxed max-w-2xl"
            style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8 }}
          >
            {FEATURED.desc}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {FEATURED.tech.map(t => (
              <TechPill key={t} label={t} color="#7B61FF" />
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#FBBF24', boxShadow: '0 0 8px rgba(251,191,36,0.7)' }}
            />
            <span className="font-mono text-xs tracking-wide" style={{ color: '#FBBF24' }}>
              Private · In Development
            </span>
          </div>
        </div>

        {/* Right — visual tag stack */}
        <div className="hidden md:flex flex-col justify-center gap-3 flex-shrink-0">
          {['Multi-Agent Architecture', 'Production Backend', 'Resume Intelligence', 'Interview Evaluation'].map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
              style={{
                background: 'rgba(123,97,255,0.06)',
                border: '1px solid rgba(123,97,255,0.15)',
                opacity: 1 - i * 0.08,
                transform: `translateX(${i * 8}px)`,
              }}
            >
              <span className="w-1 h-4 rounded-full" style={{ background: 'var(--neon-violet)', opacity: 0.7 }} />
              <span className="font-inter text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Flip Card ────────────────────────────────────────────────────────────────

function FlipCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: EASE }}
      className="relative w-full"
      style={{ perspective: '1200px', height: 320 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      data-cursor-hover
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl p-6 flex flex-col gap-4 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(13,13,31,0.9)',
            border: `1px solid rgba(${hexToRgb(project.accentColor)}, 0.2)`,
            borderTop: `3px solid ${project.accentColor}`,
          }}
        >
          {/* Type badge */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-mono text-xs tracking-wider px-2 py-1 rounded"
              style={{
                background: `rgba(${hexToRgb(project.accentColor)}, 0.1)`,
                color: project.accentColor,
                border: `1px solid rgba(${hexToRgb(project.accentColor)}, 0.25)`,
              }}
            >
              {project.type}
            </span>
            {/* Flip icon */}
            <span
              className="text-base leading-none select-none"
              style={{ color: 'rgba(136,136,136,0.28)' }}
              title="Hover to flip"
            >
              ↻
            </span>
          </div>

          {/* Title & tag */}
          <div className="flex flex-col gap-1">
            <h3
              className="font-grotesk font-bold"
              style={{ fontSize: '1.2rem', color: 'var(--star-white)' }}
            >
              {project.name}
            </h3>
            <span
              className="font-mono text-xs tracking-wide"
              style={{ color: project.accentColor }}
            >
              {project.tag}
            </span>
          </div>

          {/* Description */}
          <p
            className="font-inter leading-relaxed flex-1 line-clamp-4"
            style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75 }}
          >
            {project.desc}
          </p>

          {/* Tech pills row */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 3).map(t => (
              <TechPill key={t} label={t} color={project.accentColor} />
            ))}
            {project.tech.length > 3 && (
              <span
                className="px-2.5 py-1 rounded-md font-mono text-xs"
                style={{ color: 'var(--muted)', border: '1px solid rgba(136,136,136,0.2)' }}
              >
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl p-6 flex flex-col gap-5 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `rgba(${hexToRgb(project.accentColor)}, 0.05)`,
            border: `1px solid rgba(${hexToRgb(project.accentColor)}, 0.4)`,
            boxShadow: `inset 0 0 40px rgba(${hexToRgb(project.accentColor)}, 0.07)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className="font-grotesk font-bold text-base"
              style={{ color: 'var(--star-white)' }}
            >
              {project.name}
            </span>
            <span
              className="font-mono text-xs px-2 py-1 rounded-full"
              style={{
                background: `rgba(${hexToRgb(project.accentColor)}, 0.15)`,
                color: project.accentColor,
                border: `1px solid rgba(${hexToRgb(project.accentColor)}, 0.3)`,
              }}
            >
              {project.category[0]}
            </span>
          </div>

          {/* Full tech stack */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <TechPill key={t} label={t} color={project.accentColor} />
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* GitHub button */}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex items-center justify-center gap-2.5 py-3 rounded-lg font-grotesk font-semibold text-sm tracking-wide transition-all duration-200"
              style={{
                background: `rgba(${hexToRgb(project.accentColor)}, 0.15)`,
                border: `1px solid rgba(${hexToRgb(project.accentColor)}, 0.4)`,
                color: project.accentColor,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${hexToRgb(project.accentColor)}, 0.28)`
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px rgba(${hexToRgb(project.accentColor)}, 0.3)`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${hexToRgb(project.accentColor)}, 0.15)`
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
              }}
              onClick={e => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          ) : (
            <div
              className="flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-xs"
              style={{
                border: '1px solid rgba(136,136,136,0.15)',
                color: 'var(--muted)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FBBF24' }} />
              Private Repository
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({ active, onChange }: { active: FilterKey; onChange: (k: FilterKey) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-2 flex-wrap"
    >
      {FILTERS.map(f => {
        const isActive = f === active
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            data-cursor-hover
            className="relative px-4 py-2 rounded-lg font-mono text-xs tracking-wide transition-colors duration-200 overflow-hidden"
            style={{
              background: isActive ? 'rgba(123,97,255,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isActive ? 'rgba(123,97,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
              color: isActive ? 'var(--neon-violet)' : 'var(--muted)',
            }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: 'rgba(123,97,255,0.12)' }}
                transition={{ duration: 0.25, ease: EASE }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        )
      })}
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(activeFilter))

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'var(--deep-space)' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.35), transparent)' }}
      />

      {/* Radial violet glow — top center */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(123,97,255,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col gap-14">
        {/* ── Header ── */}
        <div className="flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--neon-violet)' }}
          >
            {'< PROJECTS />'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-grotesk font-bold"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--star-white)' }}
          >
            Systems built.{' '}
            <span style={{ color: 'var(--neon-violet)', textShadow: '0 0 20px rgba(123,97,255,0.6)' }}>
              Problems solved.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="font-inter max-w-2xl"
            style={{ fontSize: '0.93rem', color: 'var(--muted)', lineHeight: 1.8 }}
          >
            Every project ships with a limitations analysis — because knowing what it can't do yet
            is how you design what comes next.
          </motion.p>
        </div>

        {/* ── Featured Card ── */}
        <FeaturedCard />

        {/* ── Filter Bar + Grid ── */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-xs"
              style={{ color: 'var(--muted)' }}
            >
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </motion.span>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <FlipCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,217,255,0.2), transparent)' }}
      />
    </section>
  )
}
