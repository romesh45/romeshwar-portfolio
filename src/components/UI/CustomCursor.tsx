import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }
    const onLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#7B61FF',
          boxShadow: '0 0 10px rgba(123,97,255,0.9), 0 0 20px rgba(123,97,255,0.5)',
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          marginLeft: isHovering ? -8 : 0,
          marginTop: isHovering ? -8 : 0,
          borderRadius: '50%',
          border: `1.5px solid rgba(123,97,255,${isHovering ? 0.9 : 0.6})`,
          background: isHovering ? 'rgba(123,97,255,0.08)' : 'transparent',
          boxShadow: isHovering
            ? '0 0 16px rgba(123,97,255,0.4)'
            : '0 0 8px rgba(123,97,255,0.2)',
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
