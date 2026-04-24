import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '7+', label: 'Projects Shipped' },
  { value: '20+', label: 'Technologies' },
  { value: '3', label: 'Certifications' },
  { value: '1', label: 'Production SaaS' },
]

const RESEARCH_TAGS = [
  'ML for Real-World Systems',
  'NLP Pipeline Design & Failure Analysis',
  'Data-Driven Matching & Optimisation',
  'Scalable AI System Architecture',
]

const TERMINAL_LINES = [
  { type: 'key', text: 'profile' },
  { type: 'brace', text: ' = {' },
  { type: 'entry', key: '"name"', value: '"Romeshwar K"' },
  { type: 'entry', key: '"role"', value: '"AI Systems Engineer"' },
  { type: 'entry', key: '"education"', value: '"B.Tech IT — CGPA 7.65"' },
  { type: 'entry', key: '"focus"', value: '"Production AI Systems"' },
  { type: 'entry', key: '"status"', value: '"Building ZenHire 🚀"' },
  { type: 'brace', text: '}' },
]

// ─── Variants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: EASE },
  }),
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.15}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col items-center justify-center p-5 rounded-xl text-center group"
      style={{
        background: 'rgba(123,97,255,0.04)',
        border: '1px solid rgba(123,97,255,0.15)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 0 24px rgba(123,97,255,0.2), inset 0 0 24px rgba(123,97,255,0.05)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(123,97,255,0.4)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(123,97,255,0.15)'
      }}
    >
      {/* Corner accent */}
      <span
        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'var(--neon-violet)' }}
      />
      <span
        className="font-grotesk font-bold leading-none mb-1"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          color: 'var(--neon-violet)',
          textShadow: '0 0 20px rgba(123,97,255,0.5)',
        }}
      >
        {value}
      </span>
      <span
        className="font-inter text-xs tracking-wide uppercase"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

// ─── Terminal Card ────────────────────────────────────────────────────────────

function TerminalCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [visibleLines, setVisibleLines] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= TERMINAL_LINES.length) clearInterval(id)
    }, 120)
    return () => clearInterval(id)
  }, [inView])

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(5,5,16,0.85)',
        border: '1px solid rgba(123,97,255,0.15)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Traffic-light bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: 'rgba(13,13,31,0.9)', borderBottom: '1px solid rgba(123,97,255,0.1)' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span
          className="ml-3 font-mono text-xs"
          style={{ color: 'var(--muted)' }}
        >
          profile.json
        </span>
      </div>

      {/* Code body */}
      <div className="px-5 py-4 font-mono text-sm leading-7">
        {TERMINAL_LINES.map((line, i) => {
          const visible = i < visibleLines
          const isLast = i === visibleLines - 1

          if (!visible) return null

          if (line.type === 'key') {
            return (
              <div key={i}>
                <span style={{ color: 'var(--cyber-cyan)' }}>{line.text}</span>
                {isLast && showCursor && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                    style={{ background: 'var(--neon-violet)' }}
                  />
                )}
              </div>
            )
          }

          if (line.type === 'brace') {
            return (
              <div key={i}>
                <span style={{ color: 'var(--star-white)' }}>{line.text}</span>
                {isLast && showCursor && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                    style={{ background: 'var(--neon-violet)' }}
                  />
                )}
              </div>
            )
          }

          // entry
          return (
            <div key={i} className="ml-4">
              <span style={{ color: '#E5C07B' }}>{line.key}</span>
              <span style={{ color: 'var(--muted)' }}>: </span>
              <span style={{ color: '#98C379' }}>{line.value}</span>
              {i < TERMINAL_LINES.length - 2 && (
                <span style={{ color: 'var(--muted)' }}>,</span>
              )}
              {isLast && showCursor && (
                <span
                  className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                  style={{ background: 'var(--neon-violet)' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'var(--deep-space)' }}
    >
      {/* Background gradient blobs */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.3), transparent)' }}
      />
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-7"
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-mono text-xs tracking-widest"
              style={{ color: 'var(--neon-violet)' }}
            >
              {'< ABOUT ME />'}
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-grotesk font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--star-white)' }}
            >
              Building systems that
              <br />
              <span
                style={{
                  color: 'var(--neon-violet)',
                  textShadow: '0 0 20px rgba(123,97,255,0.6)',
                }}
              >
                actually work.
              </span>
            </motion.h2>

            {/* Paragraphs */}
            {[
              `I'm an AI Systems Engineer and Full-Stack Developer from Trichy, Tamil Nadu. I build production-grade AI systems with real architecture, real failure analysis, and real deployment targets — not tutorials, not demos. Every system I ship comes with a limitations analysis, because knowing exactly what your system can't do yet is how you design what comes next.`,
              `Outside of building, I'm always doing something — studying Japanese from scratch, disappearing into research papers for hours, or on the football field resetting before coming back sharper. Discipline doesn't announce itself. It just shows up.`,
              `When a deadline hit and the backend had bugs, I stayed composed, fixed the highest-impact issues first, and quietly helped teammates unblock without adding pressure. We shipped on time. That's the kind of engineer I am.`,
            ].map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="font-inter leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 1.5vw, 0.975rem)',
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                }}
              >
                {para}
              </motion.p>
            ))}

            {/* Opportunity pill */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full"
              style={{
                border: '1px solid rgba(0,217,255,0.25)',
                background: 'rgba(0,217,255,0.05)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'var(--cyber-cyan)',
                  boxShadow: '0 0 8px rgba(0,217,255,0.8)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <span
                className="font-mono text-xs tracking-wide"
                style={{ color: 'var(--cyber-cyan)' }}
              >
                Open to Research &amp; Engineering Opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {/* Stats 2×2 */}
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </motion.div>

            {/* Research Interests */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="rounded-xl p-5"
              style={{
                background: 'rgba(0,217,255,0.03)',
                border: '1px solid rgba(0,217,255,0.12)',
              }}
            >
              <h3
                className="font-mono text-sm mb-4 tracking-wide"
                style={{ color: 'var(--cyber-cyan)' }}
              >
                // Research Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {RESEARCH_TAGS.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md font-inter text-xs tracking-wide transition-all duration-200"
                    style={{
                      border: '1px solid rgba(123,97,255,0.3)',
                      background: 'rgba(123,97,255,0.06)',
                      color: 'var(--star-white)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(123,97,255,0.7)'
                      ;(e.currentTarget as HTMLSpanElement).style.background = 'rgba(123,97,255,0.15)'
                      ;(e.currentTarget as HTMLSpanElement).style.color = 'var(--neon-violet)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(123,97,255,0.3)'
                      ;(e.currentTarget as HTMLSpanElement).style.background = 'rgba(123,97,255,0.06)'
                      ;(e.currentTarget as HTMLSpanElement).style.color = 'var(--star-white)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Terminal card */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <TerminalCard />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.2), transparent)' }}
      />
    </section>
  )
}
