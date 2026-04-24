import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface Cert {
  id: string
  issuer: string
  name: string
  code?: string
  date: string
  desc: string
  accentColor: string
  monogram: string
  offset: number           // horizontal stagger offset px (depth illusion)
}

const CERTS: Cert[] = [
  {
    id: 'az900',
    issuer: 'Microsoft',
    name: 'Azure Fundamentals',
    code: 'AZ-900',
    date: 'September 2024',
    desc: 'Foundation in cloud concepts, Azure architecture, security, compliance, and core Azure services.',
    accentColor: '#0078D4',
    monogram: 'AZ',
    offset: 0,
  },
  {
    id: 'ibm-ds',
    issuer: 'IBM',
    name: 'Getting Started with Enterprise Data Science',
    date: 'February 2024',
    desc: 'Enterprise data science methodologies, workflow design, and applied analytics for real-world business problems.',
    accentColor: '#1F70C1',
    monogram: 'IBM',
    offset: 24,
  },
  {
    id: 'ibm-cloud',
    issuer: 'IBM',
    name: 'Journey to Cloud: Envisioning Your Solution',
    date: 'February 2024',
    desc: 'Cloud adoption strategy, solution architecture thinking, and migration planning for enterprise environments.',
    accentColor: '#1F70C1',
    monogram: 'IBM',
    offset: 48,
  },
]

const IN_PROGRESS = [
  { label: 'Google Cloud Professional', color: '#F9AB00' },
  { label: 'AWS Solutions Architect',   color: '#FF9900' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// ─── Cert Card ────────────────────────────────────────────────────────────────

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
      // depth stagger — each card is shifted right slightly
      style={{ marginLeft: cert.offset }}
    >
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group relative flex overflow-hidden rounded-xl"
        data-cursor-hover
        style={{
          background: 'rgba(13,13,31,0.95)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* ── Left accent bar ── */}
        <div
          className="flex-shrink-0 w-1.5 transition-all duration-300"
          style={{
            background: `linear-gradient(to bottom, ${cert.accentColor}, ${cert.accentColor}88)`,
            boxShadow: `4px 0 20px rgba(${hexToRgb(cert.accentColor)}, 0)`,
          }}
          // We animate via CSS group-hover via inline approach
        />

        {/* ── Glow overlay from left edge ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `linear-gradient(to right, rgba(${hexToRgb(cert.accentColor)}, 0.08), transparent)`,
          }}
        />

        {/* ── Card body ── */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 w-full px-7 py-6">

          {/* Badge circle */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm"
            style={{
              background: `rgba(${hexToRgb(cert.accentColor)}, 0.12)`,
              border: `1.5px solid rgba(${hexToRgb(cert.accentColor)}, 0.45)`,
              color: cert.accentColor,
              letterSpacing: cert.monogram.length > 2 ? '-0.03em' : '0.05em',
              fontSize: cert.monogram.length > 2 ? '0.65rem' : '0.8rem',
              boxShadow: `0 0 20px rgba(${hexToRgb(cert.accentColor)}, 0.12)`,
            }}
          >
            {cert.monogram}
          </div>

          {/* Text content */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {/* Issuer pill */}
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full font-mono text-xs tracking-wide"
                style={{
                  background: `rgba(${hexToRgb(cert.accentColor)}, 0.1)`,
                  border: `1px solid rgba(${hexToRgb(cert.accentColor)}, 0.3)`,
                  color: cert.accentColor,
                }}
              >
                {cert.issuer}
              </span>
              {cert.code && (
                <span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {cert.code}
                </span>
              )}
            </div>

            {/* Cert name */}
            <h3
              className="font-grotesk font-semibold leading-snug"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--star-white)' }}
            >
              {cert.name}
            </h3>

            {/* Description */}
            <p
              className="font-inter leading-relaxed"
              style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75 }}
            >
              {cert.desc}
            </p>
          </div>

          {/* Right: date + VERIFIED */}
          <div className="flex md:flex-col items-center md:items-end gap-3 flex-shrink-0 md:self-start md:pt-1">
            {/* Date badge */}
            <span
              className="font-mono text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--muted)',
              }}
            >
              {cert.date}
            </span>

            {/* VERIFIED stamp */}
            <motion.div
              initial={{ rotate: 12 }}
              whileHover={{ rotate: 15, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="px-2.5 py-1 rounded font-mono text-xs tracking-widest uppercase select-none"
              style={{
                border: '1.5px solid rgba(16,185,129,0.55)',
                color: 'rgba(16,185,129,0.75)',
                background: 'rgba(16,185,129,0.06)',
                transform: 'rotate(12deg)',
                boxShadow: '0 0 10px rgba(16,185,129,0.08)',
              }}
            >
              ✓ Verified
            </motion.div>
          </div>
        </div>

        {/* Hover: brighten the accent bar via pseudo-overlay */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-l-xl"
          style={{
            background: cert.accentColor,
            boxShadow: `4px 0 24px rgba(${hexToRgb(cert.accentColor)}, 0.6)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// ─── In-Progress Pill ─────────────────────────────────────────────────────────

function InProgressPill({ label, color }: { label: string; color: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wide"
      style={{
        border: `1px solid rgba(${hexToRgb(color)}, 0.35)`,
        background: `rgba(${hexToRgb(color)}, 0.06)`,
        color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {label}
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'var(--void)' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,217,255,0.3), transparent)' }}
      />

      {/* Cyan radial glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto flex flex-col gap-12">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--neon-violet)' }}
          >
            {'< CERTIFICATIONS />'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-grotesk font-bold"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--star-white)' }}
          >
            Verified. Validated.{' '}
            <span
              style={{
                color: 'var(--neon-violet)',
                textShadow: '0 0 20px rgba(123,97,255,0.6)',
              }}
            >
              Built on.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="font-inter max-w-xl"
            style={{ fontSize: '0.93rem', color: 'var(--muted)', lineHeight: 1.8 }}
          >
            Certifications that shaped how I think about systems, cloud, and data at scale.
          </motion.p>
        </div>

        {/* ── Cert Cards ── */}
        <div className="flex flex-col gap-4">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col items-center gap-6"
        >
          {/* Divider with label */}
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="font-mono text-xs tracking-widest whitespace-nowrap" style={{ color: 'var(--muted)' }}>
              More certifications in progress
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* In-progress pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {IN_PROGRESS.map(({ label, color }) => (
              <InProgressPill key={label} label={label} color={color} />
            ))}
          </div>

          {/* Footer note */}
          <p
            className="font-mono text-xs tracking-wide"
            style={{ color: 'rgba(136,136,136,0.5)' }}
          >
            Continuously expanding. Always building.
          </p>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.2), transparent)' }}
      />
    </section>
  )
}
