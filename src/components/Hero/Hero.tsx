import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import ErrorBoundary from '../UI/ErrorBoundary'

// Fallback when WebGL is unavailable
function StaticGradientBg() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(123,97,255,0.15) 0%, rgba(0,217,255,0.05) 50%, transparent 80%)',
      }}
    />
  )
}

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    gsap.set([nameRef.current, subtitleRef.current, taglineRef.current, ctaRef.current, scrollRef.current], {
      opacity: 0,
      y: 40,
    })

    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
  }, [])

  const scrollToWork = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--void)' }}
    >
      {/* Star field canvas — wrapped in error boundary for no-WebGL environments */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary fallback={<StaticGradientBg />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: 'transparent' }}
            dpr={[1, 1.5]}
          >
            <ParticleField />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Radial glow from center */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,97,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase"
          style={{
            borderColor: 'rgba(123,97,255,0.35)',
            background: 'rgba(123,97,255,0.08)',
            color: 'var(--neon-violet)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--cyber-cyan)' }}
          />
          Available for work
        </motion.div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-grotesk font-bold text-glow-violet leading-none tracking-tight mb-4"
          style={{
            fontSize: 'clamp(2.8rem, 9vw, 7rem)',
            color: 'var(--star-white)',
          }}
        >
          Romeshwar{' '}
          <span
            style={{
              color: 'var(--neon-violet)',
              textShadow:
                '0 0 20px rgba(123,97,255,0.9), 0 0 50px rgba(123,97,255,0.6), 0 0 100px rgba(123,97,255,0.3)',
            }}
          >
            K
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-grotesk font-medium mb-4 tracking-wide"
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            color: 'var(--cyber-cyan)',
            textShadow: '0 0 20px rgba(0,217,255,0.5)',
          }}
        >
          AI Systems Engineer &amp; Full-Stack Developer
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-inter max-w-2xl mb-10 leading-relaxed"
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: 'var(--muted)',
          }}
        >
          I don't just write code — I build systems that{' '}
          <span style={{ color: 'var(--neon-violet)' }}>think</span>,{' '}
          <span style={{ color: 'var(--glitch-pink)' }}>fail gracefully</span>, and{' '}
          <span style={{ color: 'var(--cyber-cyan)' }}>improve</span>.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={scrollToWork}
            data-cursor-hover
            className="group relative px-8 py-3.5 rounded-lg font-grotesk font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300"
            style={{
              background: 'var(--neon-violet)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(123,97,255,0.4)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(123,97,255,0.7), 0 0 80px rgba(123,97,255,0.3)'
              ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(123,97,255,0.4)'
              ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
            }}
          >
            <span className="relative z-10">View My Work</span>
            {/* shine sweep */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
              }}
            />
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => console.info('Resume: place PDF at public/resume.pdf to enable download')}
            data-cursor-hover
            className="group relative px-8 py-3.5 rounded-lg font-grotesk font-semibold text-sm tracking-wide border transition-all duration-300"
            style={{
              borderColor: 'var(--neon-violet)',
              color: 'var(--neon-violet)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(123,97,255,0.1)'
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(123,97,255,0.3)'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
            }}
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute left-8 bottom-1/2 translate-y-1/2 hidden lg:flex flex-col items-center gap-5 z-10"
      >
        {[
          {
            label: 'GitHub',
            href: 'https://github.com/romesh45',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            ),
          },
          {
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/romeshwark4504/',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ),
          },
          {
            label: 'LeetCode',
            href: 'https://leetcode.com/u/user9694nN/',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z" />
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            aria-label={label}
            className="transition-all duration-300"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--neon-violet)'
              ;(e.currentTarget as HTMLAnchorElement).style.filter = 'drop-shadow(0 0 8px rgba(123,97,255,0.8))'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
              ;(e.currentTarget as HTMLAnchorElement).style.filter = 'none'
              ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
            }}
          >
            {icon}
          </a>
        ))}
        <div
          className="w-px h-20 mt-2"
          style={{ background: 'linear-gradient(to bottom, rgba(123,97,255,0.5), transparent)' }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        onClick={scrollToWork}
        data-cursor-hover
        style={{ cursor: 'none' }}
      >
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: 'var(--muted)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: 'rgba(123,97,255,0.2)' }}
        >
          <div
            className="absolute top-0 left-0 w-full animate-scroll-bounce"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, var(--neon-violet), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
