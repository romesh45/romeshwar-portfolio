import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'ROMESHWAR K'
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [typed, setTyped] = useState(0)        // chars revealed so far
  const [showSub, setShowSub] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Type out NAME at 75ms per char
    if (typed < NAME.length) {
      const t = setTimeout(() => setTyped(n => n + 1), 75)
      return () => clearTimeout(t)
    }

    // All chars typed — show subtitle after a short pause
    const subTimer = setTimeout(() => setShowSub(true), 220)
    // Begin exit at ~1500ms total
    const exitTimer = setTimeout(() => setExiting(true), 1500)
    return () => { clearTimeout(subTimer); clearTimeout(exitTimer) }
  }, [typed])

  // Once the exit animation is done, signal parent
  const handleExitComplete = () => {
    if (exiting) onComplete()
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-4"
          style={{ background: '#050510' }}
        >
          {/* Ambient ring */}
          <div
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Typing name */}
          <div className="relative flex items-center">
            <h1
              className="font-grotesk font-bold tracking-[0.25em] relative z-10"
              style={{
                fontSize: 'clamp(1.6rem, 6vw, 3rem)',
                color: 'var(--star-white)',
                textShadow: '0 0 40px rgba(123,97,255,0.4)',
              }}
            >
              {NAME.slice(0, typed)}
              {/* Blinking caret */}
              {typed < NAME.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-0.5 h-8 ml-1 align-middle"
                  style={{ background: 'var(--neon-violet)', boxShadow: '0 0 8px rgba(123,97,255,0.9)' }}
                />
              )}
            </h1>
          </div>

          {/* Subtitle */}
          <AnimatePresence>
            {showSub && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-mono text-sm tracking-[0.2em]"
                style={{ color: 'var(--cyber-cyan)' }}
              >
                AI Systems Engineer
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-10 w-32 h-px overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.3, delay: 0.1, ease: EASE }}
              className="w-full h-full"
              style={{ background: 'linear-gradient(to right, var(--neon-violet), var(--cyber-cyan))' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
