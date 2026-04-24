import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// ─── Socials ──────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/romesh45',
    color: '#EAEAEA',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/romeshwark4504/',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/user9694nN/',
    color: '#FFA116',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:romeshwar.k45@gmail.com',
    color: '#7B61FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

// ─── Floating Label Field ─────────────────────────────────────────────────────

interface FieldProps {
  id: string
  label: string
  type?: string
  value: string
  placeholder: string
  error?: string
  rows?: number
  onChange: (v: string) => void
  onFocus: () => void
  onBlur: () => void
  isFocused: boolean
}

function Field({
  id, label, type = 'text', value, placeholder, error,
  rows, onChange, onFocus, onBlur, isFocused,
}: FieldProps) {
  const floating = isFocused || value.length > 0
  const isTextarea = !!rows
  const inputClass = `
    w-full bg-transparent font-mono text-sm outline-none transition-all duration-200
    ${isTextarea ? 'pt-6 pb-3 px-4 resize-none' : 'pt-6 pb-2.5 px-4'}
  `
  const borderColor = error
    ? 'rgba(255,45,107,0.7)'
    : isFocused
    ? 'rgba(123,97,255,0.7)'
    : 'rgba(255,255,255,0.08)'
  const glowColor = error
    ? '0 0 0 3px rgba(255,45,107,0.08)'
    : isFocused
    ? '0 0 0 3px rgba(123,97,255,0.1)'
    : 'none'

  return (
    <motion.div
      animate={error ? { x: [0, -8, 8, -5, 5, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all duration-200"
        style={{
          background: 'rgba(5,5,16,0.8)',
          border: `1px solid ${borderColor}`,
          boxShadow: glowColor,
        }}
      >
        {/* Floating label */}
        <label
          htmlFor={id}
          className="absolute left-4 font-mono transition-all duration-200 pointer-events-none select-none"
          style={{
            top: floating ? '8px' : isTextarea ? '18px' : '50%',
            transform: floating ? 'none' : isTextarea ? 'none' : 'translateY(-50%)',
            fontSize: floating ? '0.65rem' : '0.8rem',
            color: error ? 'rgba(255,45,107,0.8)' : isFocused ? 'var(--neon-violet)' : 'var(--muted)',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </label>

        {isTextarea ? (
          <textarea
            id={id}
            rows={rows}
            value={value}
            placeholder={isFocused ? placeholder : ''}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClass}
            style={{ color: 'var(--star-white)' }}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            placeholder={isFocused ? placeholder : ''}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClass}
            style={{ color: 'var(--star-white)' }}
          />
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1 font-mono text-xs"
            style={{ color: 'var(--glitch-pink)' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Contact Card ─────────────────────────────────────────────────────────────

function ContactCard({
  icon, label, value, onClick, index,
}: {
  icon: React.ReactNode
  label: string
  value: string
  onClick?: () => void
  index: number
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    onClick?.()
    if (onClick) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
      onClick={handleClick}
      data-cursor-hover={onClick ? true : undefined}
      className="relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        if (onClick)
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(123,97,255,0.3)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          {label}
        </span>
        <span className="font-inter text-sm truncate" style={{ color: 'var(--star-white)' }}>
          {value}
        </span>
      </div>
      {onClick && (
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="font-mono text-xs flex-shrink-0"
              style={{ color: '#10b981' }}
            >
              Copied ✓
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--muted)' }}
            >
              Click to copy
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

type FormFields = { name: string; email: string; subject: string; message: string }
type FormErrors = Partial<Record<keyof FormFields, string>>
type FocusState = Partial<Record<keyof FormFields, boolean>>

function ContactForm() {
  const [values, setValues] = useState<FormFields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [focused, setFocused] = useState<FocusState>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const setField = (k: keyof FormFields) => (v: string) => {
    setValues(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }))
  }

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!values.name.trim()) e.name = 'Name is required'
    if (!values.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email'
    if (!values.subject.trim()) e.subject = 'Subject is required'
    if (!values.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1500)
  }

  const FIELDS: Array<{ key: keyof FormFields; label: string; type?: string; placeholder: string; rows?: number }> = [
    { key: 'name',    label: 'Your Name',  placeholder: 'Your name' },
    { key: 'email',   label: 'Email',      type: 'email', placeholder: 'your@email.com' },
    { key: 'subject', label: 'Subject',    placeholder: "What's this about?" },
    { key: 'message', label: 'Message',    placeholder: 'Tell me about your project, role, or just say hello...', rows: 5 },
  ]

  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-5"
      style={{
        background: 'rgba(13,13,31,0.9)',
        border: status === 'success'
          ? '1px solid rgba(16,185,129,0.4)'
          : '1px solid rgba(123,97,255,0.18)',
        boxShadow: status === 'success'
          ? '0 0 40px rgba(16,185,129,0.1)'
          : '0 0 40px rgba(123,97,255,0.07)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {FIELDS.map((f, i) => (
          <motion.div
            key={f.key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
          >
            <Field
              id={f.key}
              label={f.label}
              type={f.type}
              value={values[f.key]}
              placeholder={f.placeholder}
              error={errors[f.key]}
              rows={f.rows}
              onChange={setField(f.key)}
              onFocus={() => setFocused(p => ({ ...p, [f.key]: true }))}
              onBlur={() => setFocused(p => ({ ...p, [f.key]: false }))}
              isFocused={!!focused[f.key]}
            />
          </motion.div>
        ))}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          whileHover={status === 'idle' ? { scale: 1.01 } : {}}
          whileTap={status === 'idle' ? { scale: 0.98 } : {}}
          data-cursor-hover
          className="relative w-full py-3.5 rounded-xl font-grotesk font-semibold text-sm tracking-wide overflow-hidden transition-all duration-400"
          style={{
            background: status === 'success'
              ? 'rgba(16,185,129,0.15)'
              : status === 'loading'
              ? 'rgba(123,97,255,0.5)'
              : 'var(--neon-violet)',
            color: status === 'success' ? '#10b981' : '#fff',
            border: status === 'success' ? '1px solid rgba(16,185,129,0.5)' : '1px solid transparent',
            boxShadow: status === 'success'
              ? '0 0 20px rgba(16,185,129,0.3)'
              : status === 'idle'
              ? '0 0 20px rgba(123,97,255,0.35)'
              : 'none',
          }}
        >
          {/* Shine sweep on idle */}
          {status === 'idle' && (
            <motion.span
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
              }}
            />
          )}

          <span className="relative z-10 flex items-center justify-center gap-2">
            {status === 'loading' ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : status === 'success' ? (
              'Message Sent ✓'
            ) : (
              'Send Message →'
            )}
          </span>
        </motion.button>
      </form>

      {/* Form note */}
      <p className="text-center font-mono text-xs" style={{ color: 'rgba(136,136,136,0.5)' }}>
        No spam. No sales. Just real conversations.
      </p>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_LINKS = [
  { label: 'Home',           href: '#hero' },
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education',      href: '#education' },
  { label: 'Contact',        href: '#contact' },
]

function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative w-full mt-20"
    >
      {/* Top border */}
      <div
        className="w-full h-px mb-10"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.3), transparent)' }}
      />

      {/* Three-column footer */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 px-6 max-w-6xl mx-auto pb-10">

        {/* Left */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-grotesk font-bold text-lg" style={{ color: 'var(--star-white)' }}>
            Romeshwar K
          </span>
          <span className="font-inter text-xs" style={{ color: 'var(--muted)' }}>
            AI Systems Engineer
          </span>
        </div>

        {/* Center — nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-cursor-hover
              onClick={e => handleNav(e, href)}
              className="font-inter text-xs transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--star-white)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <span className="font-mono text-xs" style={{ color: 'rgba(136,136,136,0.45)' }}>
            Built with React + Three.js + GSAP
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
            <span className="font-mono text-xs" style={{ color: 'rgba(136,136,136,0.35)' }}>All systems live</span>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="py-4 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'rgba(136,136,136,0.3)' }}>
          © 2025 Romeshwar K · Designed &amp; Built with purpose.
        </p>
      </div>
    </motion.footer>
  )
}

// ─── Resume Download Button (fixed) ──────────────────────────────────────────

function ResumeButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => console.info('Resume: place PDF at public/resume.pdf to enable download')}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 24px rgba(123,97,255,0.5)' }}
          transition={{ duration: 0.35, ease: EASE }}
          data-cursor-hover
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs tracking-widest"
          style={{
            background: 'rgba(5,5,16,0.9)',
            border: '1px solid rgba(123,97,255,0.5)',
            color: 'var(--neon-violet)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 12px rgba(123,97,255,0.2)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--neon-violet)'
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(5,5,16,0.9)'
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--neon-violet)'
          }}
        >
          ↓ Resume
        </motion.a>
      )}
    </AnimatePresence>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const copyEmail = () => {
    navigator.clipboard.writeText('romeshwar.k45@gmail.com').catch(() => {})
  }

  const CONTACT_CARDS = [
    {
      icon: (
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-base flex-shrink-0"
          style={{ background: 'rgba(123,97,255,0.12)', color: 'var(--neon-violet)' }}
        >
          @
        </span>
      ),
      label: 'Email',
      value: 'romeshwar.k45@gmail.com',
      onClick: copyEmail,
    },
    {
      icon: (
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ background: 'rgba(0,217,255,0.1)', color: 'var(--cyber-cyan)' }}
        >
          📍
        </span>
      ),
      label: 'Based in',
      value: 'Trichy, Tamil Nadu, India',
    },
    {
      icon: (
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
          style={{ background: 'rgba(255,45,107,0.1)', color: 'var(--glitch-pink)' }}
        >
          {'</>'}
        </span>
      ),
      label: 'Currently',
      value: 'Building ZenHire · Open to roles',
    },
  ]

  return (
    <>
      <ResumeButton />

      <section
        id="contact"
        ref={sectionRef}
        className="relative py-28 px-6 overflow-hidden"
        style={{ background: 'var(--void)' }}
      >
        {/* Top border */}
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.4), transparent)' }}
        />

        {/* Center violet radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(123,97,255,0.09) 0%, transparent 65%)',
            filter: 'blur(60px)',
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
              {'< CONTACT />'}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="font-grotesk font-bold"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--star-white)' }}
            >
              Let's build{' '}
              <span
                style={{
                  color: 'var(--neon-violet)',
                  textShadow: '0 0 20px rgba(123,97,255,0.6)',
                }}
              >
                something real.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="font-inter max-w-xl"
              style={{ fontSize: '0.93rem', color: 'var(--muted)', lineHeight: 1.8 }}
            >
              Open to research collaborations, engineering roles, and conversations about AI systems.
            </motion.p>
          </div>

          {/* ── Two-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ── LEFT ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
              className="flex flex-col gap-6"
            >
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
                className="self-start flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'rgba(16,185,129,0.06)',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                  style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }}
                />
                <span className="font-mono text-xs tracking-wide" style={{ color: '#10b981' }}>
                  Open to Opportunities
                </span>
              </motion.div>

              {/* Contact cards */}
              <div className="flex flex-col gap-3">
                {CONTACT_CARDS.map((card, i) => (
                  <ContactCard key={card.label} {...card} index={i} />
                ))}
              </div>

              {/* Social buttons */}
              <motion.div
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex items-center gap-3 flex-wrap"
              >
                {SOCIALS.map(({ label, href, color, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    data-cursor-hover
                    aria-label={label}
                    variants={{
                      hidden: { opacity: 0, scale: 0.7 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { type: 'spring', stiffness: 280, damping: 18 },
                      },
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(123,97,255,0.2)'
                        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(123,97,255,0.5)'
                        ;(e.currentTarget as HTMLDivElement).style.color = 'var(--neon-violet)'
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 16px rgba(123,97,255,0.3)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'
                        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
                        ;(e.currentTarget as HTMLDivElement).style.color = color
                        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: 'var(--muted)' }}
                    >
                      {label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT — Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* ── Footer ── */}
          <Footer />
        </div>
      </section>
    </>
  )
}
