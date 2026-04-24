import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

const NAV_ITEMS = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Certs',        href: '#certifications' },
  { label: 'Education',    href: '#education' },
  { label: 'Contact',      href: '#contact' },
]

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'certifications', 'education', 'contact']
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled]       = useState(false)
  const [active, setActive]           = useState('hero')
  const [menuOpen, setMenuOpen]       = useState(false)

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.8, ease: 'power3.out' }
    )
  }, [])

  // ── Scroll → frosted glass + active section tracking ──────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        {
          rootMargin: '-40% 0px -55% 0px', // fires when section crosses the top 45% band
          threshold: 0,
        }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, menuOpen ? 350 : 0)   // wait for overlay to close before scrolling
  }

  const isLinkActive = (href: string) => active === href.slice(1)

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(5,5,16,0.9)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(123,97,255,0.1)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          data-cursor-hover
          onClick={e => handleNav(e, '#hero')}
          className="font-grotesk font-bold text-lg z-10"
          style={{ color: 'var(--neon-violet)', textShadow: '0 0 15px rgba(123,97,255,0.7)' }}
        >
          RK
        </a>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = isLinkActive(href)
            return (
              <li key={label} className="relative">
                <a
                  href={href}
                  data-cursor-hover
                  onClick={e => handleNav(e, href)}
                  className="font-inter text-sm tracking-wide transition-colors duration-200 pb-0.5"
                  style={{ color: isActive ? 'var(--star-white)' : 'var(--muted)' }}
                >
                  {label}
                </a>
                {/* Active dot + underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <div className="w-full h-px" style={{ background: 'var(--neon-violet)', boxShadow: '0 0 6px rgba(123,97,255,0.8)' }} />
                    <div className="w-1 h-1 rounded-full" style={{ background: 'var(--neon-violet)', boxShadow: '0 0 4px rgba(123,97,255,0.9)' }} />
                  </motion.div>
                )}
              </li>
            )
          })}
        </ul>

        {/* ── Desktop CTA ── */}
        <a
          href="mailto:romeshwar.k45@gmail.com"
          data-cursor-hover
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs tracking-widest uppercase border transition-all duration-200"
          style={{
            borderColor: 'rgba(123,97,255,0.4)',
            color: 'var(--neon-violet)',
            background: 'rgba(123,97,255,0.06)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(123,97,255,0.15)'
            ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(123,97,255,0.2)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(123,97,255,0.06)'
            ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
          }}
        >
          Hire Me
        </a>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className="md:hidden z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(o => !o)}
          data-cursor-hover
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8, width: '24px' } : { rotate: 0, y: 0, width: '24px' }}
            transition={{ duration: 0.25, ease: EASE }}
            className="block h-0.5 origin-center"
            style={{ background: menuOpen ? 'var(--neon-violet)' : 'var(--star-white)' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6"
            style={{ background: 'var(--star-white)' }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8, width: '24px' } : { rotate: 0, y: 0, width: '20px' }}
            transition={{ duration: 0.25, ease: EASE }}
            className="block h-0.5 origin-center"
            style={{ background: menuOpen ? 'var(--neon-violet)' : 'var(--star-white)' }}
          />
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{
              background: 'rgba(5,5,16,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Radial glow */}
            <div
              className="absolute w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <nav className="relative z-10 flex flex-col items-center gap-7">
              {/* Home link */}
              <motion.a
                href="#hero"
                data-cursor-hover
                onClick={e => handleNav(e, '#hero')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, ease: EASE }}
                className="font-grotesk font-bold text-3xl tracking-wide"
                style={{ color: active === 'hero' ? 'var(--neon-violet)' : 'var(--star-white)' }}
              >
                Home
              </motion.a>

              {NAV_ITEMS.map(({ label, href }, i) => {
                const isActive = isLinkActive(href)
                return (
                  <motion.a
                    key={label}
                    href={href}
                    data-cursor-hover
                    onClick={e => handleNav(e, href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + (i + 1) * 0.06, ease: EASE }}
                    className="font-grotesk font-bold text-3xl tracking-wide transition-colors duration-200"
                    style={{ color: isActive ? 'var(--neon-violet)' : 'var(--star-white)' }}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full ml-2 align-middle"
                        style={{ background: 'var(--neon-violet)', boxShadow: '0 0 6px rgba(123,97,255,0.9)' }}
                      />
                    )}
                  </motion.a>
                )
              })}

              {/* Hire Me CTA */}
              <motion.a
                href="mailto:romeshwar.k45@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + (NAV_ITEMS.length + 1) * 0.06, ease: EASE }}
                className="mt-4 px-8 py-3 rounded-xl font-mono text-sm tracking-widest uppercase"
                style={{
                  border: '1px solid rgba(123,97,255,0.5)',
                  color: 'var(--neon-violet)',
                  background: 'rgba(123,97,255,0.08)',
                }}
              >
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
