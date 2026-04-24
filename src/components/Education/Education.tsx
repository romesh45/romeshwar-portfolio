import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Types & Data ─────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface TimelineEntry {
  id: string
  year: string
  degree: string
  field?: string
  board?: string
  institution: string
  location?: string
  grade: string
  accent: string
  side: 'left' | 'right'
  featured?: boolean
  status?: string
  highlight?: string
  coursework?: string[]
}

const ENTRIES: TimelineEntry[] = [
  {
    id: 'btech',
    year: '2022 — 2026',
    degree: 'Bachelor of Technology',
    field: 'Information Technology',
    institution: 'K. Ramakrishnan College of Engineering (Autonomous)',
    location: 'Trichy, Tamil Nadu',
    grade: '7.65 / 10',
    accent: '#7B61FF',
    side: 'left',
    featured: true,
    status: 'Graduating 2026',
    highlight: 'EasyWay Logistics Platform',
    coursework: [
      'Data Structures & Algorithms',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'Probability & Statistics',
      'Software Engineering',
    ],
  },
  {
    id: 'class12',
    year: '2022',
    degree: 'Higher Secondary Certificate',
    board: 'CBSE',
    institution: 'SRM Public School',
    grade: '74.4%',
    accent: '#00D9FF',
    side: 'right',
  },
  {
    id: 'class10',
    year: '2020',
    degree: 'Secondary School Leaving Certificate',
    board: 'CBSE',
    institution: 'SRM Public School',
    grade: '72.6%',
    accent: '#888888',
    side: 'left',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// ─── Featured B.Tech Card ─────────────────────────────────────────────────────

function FeaturedCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex flex-col gap-5 p-6"
      style={{
        background: 'rgba(5,5,16,0.95)',
        border: '1px solid rgba(123,97,255,0.35)',
        boxShadow: '0 0 40px rgba(123,97,255,0.1), 0 0 80px rgba(123,97,255,0.05)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, var(--neon-violet), rgba(123,97,255,0.2))' }}
      />

      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none">🎓</span>
          <div className="flex flex-col">
            <span
              className="font-grotesk font-bold"
              style={{ fontSize: '1.15rem', color: 'var(--star-white)' }}
            >
              {entry.degree}
            </span>
            <span className="font-mono text-xs tracking-wide mt-0.5" style={{ color: 'var(--neon-violet)' }}>
              {entry.field}
            </span>
          </div>
        </div>

        {/* Graduating badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }}
          />
          <span className="font-mono text-xs tracking-wide" style={{ color: '#10b981' }}>
            {entry.status}
          </span>
        </div>
      </div>

      {/* Institution */}
      <div className="flex flex-col gap-1">
        <p className="font-inter text-sm" style={{ color: 'var(--muted)' }}>
          {entry.institution}
        </p>
        {entry.location && (
          <p className="font-mono text-xs" style={{ color: 'rgba(136,136,136,0.5)' }}>
            📍 {entry.location}
          </p>
        )}
      </div>

      {/* CGPA */}
      <div className="flex items-baseline gap-1">
        <span
          className="font-grotesk font-bold"
          style={{
            fontSize: '2rem',
            color: 'var(--neon-violet)',
            textShadow: '0 0 20px rgba(123,97,255,0.5)',
          }}
        >
          {entry.grade.split(' / ')[0]}
        </span>
        <span className="font-grotesk font-medium text-lg" style={{ color: 'var(--muted)' }}>
          {' '}/ 10
        </span>
        <span
          className="ml-2 font-mono text-xs tracking-widest uppercase"
          style={{ color: 'rgba(136,136,136,0.5)' }}
        >
          CGPA
        </span>
      </div>

      {/* Final Year Project callout */}
      {entry.highlight && (
        <div
          className="flex flex-col gap-1 p-4 rounded-lg"
          style={{
            background: 'rgba(5,5,16,0.8)',
            borderLeft: '3px solid #10b981',
            border: '1px solid rgba(16,185,129,0.15)',
            borderLeftWidth: 3,
            borderLeftColor: '#10b981',
          }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#10b981' }}>
            Final Year Project
          </span>
          <span className="font-grotesk font-semibold text-sm" style={{ color: 'var(--star-white)' }}>
            {entry.highlight}
          </span>
          <span className="font-inter text-xs" style={{ color: 'var(--muted)' }}>
            Intelligent freight platform · Node.js · MongoDB · Multi-constraint matching engine
          </span>
        </div>
      )}

      {/* Coursework pills */}
      {entry.coursework && (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(136,136,136,0.5)' }}>
            Core Coursework
          </span>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {entry.coursework.map((c) => (
              <motion.span
                key={c}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
                }}
                className="px-2.5 py-1 rounded-md font-mono text-xs"
                style={{
                  background: 'rgba(123,97,255,0.08)',
                  border: '1px solid rgba(123,97,255,0.22)',
                  color: 'var(--neon-violet)',
                }}
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

// ─── Standard Card ────────────────────────────────────────────────────────────

function StandardCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div
      className="relative rounded-xl p-5 flex flex-col gap-3"
      style={{
        background: 'rgba(13,13,31,0.9)',
        border: `1px solid rgba(${hexToRgb(entry.accent)}, 0.2)`,
        borderTop: `2px solid ${entry.accent}`,
      }}
    >
      {/* Degree + board row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="font-grotesk font-semibold text-sm" style={{ color: 'var(--star-white)' }}>
            {entry.degree}
          </span>
          {entry.board && (
            <span
              className="font-mono text-xs px-2 py-0.5 rounded self-start"
              style={{
                background: `rgba(${hexToRgb(entry.accent)}, 0.1)`,
                border: `1px solid rgba(${hexToRgb(entry.accent)}, 0.25)`,
                color: entry.accent,
              }}
            >
              {entry.board}
            </span>
          )}
        </div>
      </div>

      {/* Institution */}
      <p className="font-inter text-xs" style={{ color: 'var(--muted)' }}>
        {entry.institution}
      </p>

      {/* Grade */}
      <div className="flex items-baseline gap-1.5 mt-1">
        <span
          className="font-grotesk font-bold text-lg"
          style={{ color: entry.accent }}
        >
          {entry.grade}
        </span>
      </div>
    </div>
  )
}

// ─── Timeline Node ────────────────────────────────────────────────────────────

function TimelineNode({
  accent,
  featured,
  delay,
}: {
  accent: string
  featured?: boolean
  delay: number
}) {
  const size = featured ? 18 : 13

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, delay }}
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Pulsing outer ring — only for featured */}
      {featured && (
        <motion.div
          animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full"
          style={{ background: accent }}
        />
      )}
      {/* Filled circle */}
      <div
        className="rounded-full z-10"
        style={{
          width: size,
          height: size,
          background: accent,
          boxShadow: `0 0 ${featured ? 16 : 8}px rgba(${hexToRgb(accent)}, 0.7)`,
        }}
      />
    </motion.div>
  )
}

// ─── Timeline Row ─────────────────────────────────────────────────────────────

function TimelineRow({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isLeft = entry.side === 'left'
  const delay = index * 0.2

  const CardEl = entry.featured ? FeaturedCard : StandardCard

  // Mobile: always left-aligned (node | card)
  // Desktop: alternating (card | node | card)
  return (
    <>
      {/* ── MOBILE layout ─────────────────────────── */}
      <div className="md:hidden grid grid-cols-[auto_1fr] items-start gap-0">
        {/* Node + line segment column */}
        <div className="flex flex-col items-center pr-4 pt-1 relative z-10" style={{ width: 32 }}>
          <TimelineNode accent={entry.accent} featured={entry.featured} delay={delay} />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.1 }}
            className="font-mono text-xs tracking-widest mt-2 text-center"
            style={{ color: 'rgba(136,136,136,0.45)', fontSize: '0.6rem', lineHeight: 1.4 }}
          >
            {entry.year.replace(' — ', '\n')}
          </motion.span>
        </div>
        {/* Card column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE }}
          className="w-full pb-2"
        >
          <CardEl entry={entry} />
        </motion.div>
      </div>

      {/* ── DESKTOP layout ────────────────────────── */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-start gap-0">
        {/* Left slot */}
        <div className="flex justify-end pr-8">
          {isLeft ? (
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: delay + 0.15, ease: EASE }}
            >
              <CardEl entry={entry} />
            </motion.div>
          ) : (
            <div className="flex items-start justify-end pt-1">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 0.1 }}
                className="font-mono text-xs tracking-widest"
                style={{ color: 'rgba(136,136,136,0.45)' }}
              >
                {entry.year}
              </motion.span>
            </div>
          )}
        </div>

        {/* Center: node */}
        <div className="flex flex-col items-center gap-2 pt-1 relative z-10">
          <TimelineNode accent={entry.accent} featured={entry.featured} delay={delay} />
          {isLeft && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
              className="font-mono text-xs tracking-widest text-center"
              style={{ color: 'rgba(136,136,136,0.45)' }}
            >
              {entry.year}
            </motion.span>
          )}
        </div>

        {/* Right slot */}
        <div className="flex justify-start pl-8">
          {!isLeft ? (
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: delay + 0.15, ease: EASE }}
            >
              <CardEl entry={entry} />
            </motion.div>
          ) : (
            <div className="pt-1" aria-hidden />
          )}
        </div>
      </div>
    </>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const lineInView = useInView(lineRef, { once: true, margin: '-80px' })

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'var(--deep-space)',
        backgroundImage: `
          linear-gradient(rgba(123,97,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,97,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.3), transparent)' }}
      />

      {/* Violet ambient glow top-right */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto flex flex-col gap-14">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--neon-violet)' }}
          >
            {'< EDUCATION />'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-grotesk font-bold"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--star-white)' }}
          >
            Where it{' '}
            <span
              style={{
                color: 'var(--neon-violet)',
                textShadow: '0 0 20px rgba(123,97,255,0.6)',
              }}
            >
              all started.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="font-inter mx-auto"
            style={{ fontSize: '0.93rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 400 }}
          >
            The foundation that made everything else possible.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div ref={lineRef} className="relative flex flex-col gap-12">

          {/* Vertical timeline line — left edge on mobile, center on desktop */}
          <div
            className="absolute top-0 bottom-0 w-0.5 pointer-events-none
                        left-[15px] md:left-1/2 md:-translate-x-1/2"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 origin-top"
              style={{
                background: 'linear-gradient(to bottom, #7B61FF 0%, #00D9FF 55%, #888888 100%)',
              }}
            />
          </div>

          {/* Rows */}
          {ENTRIES.map((entry, i) => (
            <TimelineRow key={entry.id} entry={entry} index={i} />
          ))}
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
