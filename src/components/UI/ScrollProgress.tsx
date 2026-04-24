import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Spring smoothing so it doesn't feel mechanical
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        background: 'linear-gradient(to right, #7B61FF, #00D9FF, #FF2D6B)',
        boxShadow: '0 0 12px rgba(123,97,255,0.6)',
        pointerEvents: 'none',
      }}
    />
  )
}
