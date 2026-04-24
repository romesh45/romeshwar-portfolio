import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS_DATA = {
  AI_ML: {
    label: 'AI / ML',
    color: '#7B61FF',
    dimColor: '#4a3baa',
    items: ['Python 3.12', 'OpenAI API', 'LangChain', 'LangGraph',
            'LiteLLM', 'HuggingFace', 'Prompt Engineering',
            'NLP Pipeline Design', 'Qdrant Vector DB'],
  },
  BACKEND: {
    label: 'Backend',
    color: '#00D9FF',
    dimColor: '#0088a8',
    items: ['FastAPI', 'Node.js', 'Express.js', 'REST API Design',
            'JWT / Auth', 'Celery', 'SQLAlchemy 2.0', 'Pydantic v2'],
  },
  FRONTEND: {
    label: 'Frontend',
    color: '#EAEAEA',
    dimColor: '#888888',
    items: ['React', 'Next.js 14', 'TypeScript', 'Angular 18',
            'Tailwind CSS', 'Gradio', 'Framer Motion'],
  },
  DATABASES: {
    label: 'Databases',
    color: '#FF2D6B',
    dimColor: '#aa1e48',
    items: ['PostgreSQL 16', 'MongoDB', 'MySQL', 'Redis 7.2', 'Qdrant'],
  },
  DEVOPS: {
    label: 'DevOps',
    color: '#10b981',
    dimColor: '#0a6e4f',
    items: ['Docker', 'Kubernetes', 'Azure AZ-900', 'GitHub Actions',
            'ArgoCD', 'OpenTelemetry', 'Prometheus', 'Grafana'],
  },
} as const

type CategoryKey = keyof typeof SKILLS_DATA

// Flatten all skills into one array with category metadata
type SkillEntry = { text: string; color: string; dimColor: string; category: CategoryKey }

function buildAllSkills(): SkillEntry[] {
  const out: SkillEntry[] = []
  for (const key of Object.keys(SKILLS_DATA) as CategoryKey[]) {
    const cat = SKILLS_DATA[key]
    for (const item of cat.items) {
      out.push({ text: item, color: cat.color, dimColor: cat.dimColor, category: key })
    }
  }
  return out
}

// Fibonacci sphere — even distribution of N points on a sphere surface
function fibonacciSphere(i: number, total: number, radius: number): [number, number, number] {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
  // Small per-point jitter so it looks organic, not mechanical
  const jitter = 0.25
  const rng = Math.sin(i * 127.1 + 311.7) * 43758.5453
  const jx = (rng - Math.floor(rng) - 0.5) * jitter
  const rng2 = Math.sin(i * 269.5 + 183.3) * 43758.5453
  const jy = (rng2 - Math.floor(rng2) - 0.5) * jitter
  return [
    radius * Math.sin(phi) * Math.cos(theta) + jx,
    radius * Math.cos(phi) + jy,
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

// ─── Canvas-sprite text (no CDN font dependency, renders immediately) ─────────

function makeTextSprite(
  text: string,
  color: string,
): { material: THREE.SpriteMaterial; aspect: number } {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)
  const fontSize = 26
  const font = `600 ${fontSize}px "JetBrains Mono", monospace`

  // Measure using a temp canvas
  const tmp = document.createElement('canvas')
  const tmpCtx = tmp.getContext('2d')!
  tmpCtx.font = font
  const textW = tmpCtx.measureText(text).width

  const padX = 14
  const padY = 10
  const w = Math.ceil(textW) + padX * 2
  const h = fontSize + padY * 2

  // Real canvas (HiDPI)
  const canvas = document.createElement('canvas')
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, w, h)
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, w / 2, h / 2)

  const tex = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  })

  return { material, aspect: w / h }
}

// ─── SkillWord ────────────────────────────────────────────────────────────────

interface SkillWordProps {
  position: [number, number, number]
  text: string
  color: string
}

function SkillWord({ position, text, color }: SkillWordProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const targetVec = useMemo(() => new THREE.Vector3(1, 1, 1), [])

  // Build two sprite materials (normal + hover) — recreated only when text/color changes
  const { normalMat, hovMat, scale } = useMemo(() => {
    const { material: nm, aspect } = makeTextSprite(text, color)
    const { material: hm }         = makeTextSprite(text, '#ffffff')
    const spriteH = 0.55
    return {
      normalMat: nm,
      hovMat: hm,
      scale: new THREE.Vector3(aspect * spriteH, spriteH, 1),
    }
  }, [text, color])

  // Dispose GPU resources when component unmounts or materials change
  useEffect(() => {
    return () => {
      normalMat.map?.dispose(); normalMat.dispose()
      hovMat.map?.dispose();    hovMat.dispose()
    }
  }, [normalMat, hovMat])

  useFrame(() => {
    if (!groupRef.current) return
    const s = hovered ? 1.25 : 1.0
    targetVec.setScalar(s)
    groupRef.current.scale.lerp(targetVec, 0.1)
  })

  const handleOver = (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true) }
  const handleOut  = () => setHovered(false)

  return (
    <group ref={groupRef} position={position}>
      <sprite
        material={hovered ? hovMat : normalMat}
        scale={scale}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      />
    </group>
  )
}

// ─── SkillCloud (R3F Scene) ───────────────────────────────────────────────────

function SkillCloud() {
  const allSkills = useMemo(() => buildAllSkills(), [])
  const total = allSkills.length

  const positions = useMemo(
    () => allSkills.map((_, i) => fibonacciSphere(i, total, 3.6)),
    [allSkills, total]
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7B61FF" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#00D9FF" />
      <pointLight position={[0, -5, 3]} intensity={0.5} color="#FF2D6B" />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.45}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
        makeDefault
      />

      {allSkills.map((skill, i) => (
        <SkillWord
          key={`${skill.category}-${skill.text}`}
          position={positions[i]}
          text={skill.text}
          color={skill.color}
        />
      ))}
    </>
  )
}

// ─── Category Card ────────────────────────────────────────────────────────────

interface CategoryCardProps {
  catKey: CategoryKey
  index: number
}

function CategoryCard({ catKey, index }: CategoryCardProps) {
  const cat = SKILLS_DATA[catKey]
  const [hovered, setHovered] = useState(false)
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay: index * 0.09, ease: EASE },
        },
      }}
      animate={hovered ? { y: -6 } : { y: 0 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 w-52 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300"
      data-cursor-hover
      style={{
        background: hovered
          ? `rgba(${hexToRgb(cat.color)}, 0.07)`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? cat.color + '55' : cat.color + '22'}`,
        boxShadow: hovered
          ? `0 8px 40px rgba(${hexToRgb(cat.color)}, 0.15), 0 0 0 1px ${cat.color}33`
          : 'none',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{
              background: cat.color,
              boxShadow: hovered ? `0 0 8px ${cat.color}` : 'none',
            }}
          />
          <span
            className="font-grotesk font-semibold text-sm"
            style={{ color: cat.color }}
          >
            {cat.label}
          </span>
        </div>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-full"
          style={{
            background: `rgba(${hexToRgb(cat.color)}, 0.12)`,
            color: cat.color,
            border: `1px solid ${cat.color}30`,
          }}
        >
          {cat.items.length}
        </span>
      </div>

      {/* Top 3 skills */}
      <ul className="flex flex-col gap-1.5">
        {cat.items.slice(0, 3).map(skill => (
          <li
            key={skill}
            className="font-inter text-xs leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            <span style={{ color: cat.color, marginRight: 6, opacity: 0.7 }}>›</span>
            {skill}
          </li>
        ))}
        {cat.items.length > 3 && (
          <li
            className="font-mono text-xs"
            style={{ color: `${cat.color}80` }}
          >
            +{cat.items.length - 3} more
          </li>
        )}
      </ul>
    </motion.div>
  )
}

// small utility – converts #rrggbb → "r, g, b" for rgba()
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'var(--void)',
        backgroundImage: `
          linear-gradient(rgba(123,97,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,97,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,217,255,0.3), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-6 gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--neon-violet)' }}
          >
            {'< SKILLS />'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-grotesk font-bold"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: 'var(--star-white)' }}
          >
            The stack behind{' '}
            <span
              style={{
                color: 'var(--neon-violet)',
                textShadow: '0 0 20px rgba(123,97,255,0.6)',
              }}
            >
              the systems.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="font-inter max-w-lg"
            style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7 }}
          >
            Every tool chosen for a reason. Every system built to scale.
          </motion.p>
        </div>

        {/* ── 3D Canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            height: 'clamp(350px, 50vw, 500px)',
            border: '1px solid rgba(123,97,255,0.1)',
            background: '#050510',            /* solid void — never shows through as white */
            boxShadow: '0 0 80px rgba(123,97,255,0.05)',
          }}
        >
          {/* Hint label */}
          <div
            className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none"
            style={{
              background: 'rgba(5,5,16,0.85)',
              border: '1px solid rgba(123,97,255,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--neon-violet)' }}>
              <path d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z" />
            </svg>
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Drag to spin</span>
          </div>

          {/* Suspense fallback — dark background while Three.js initialises */}
          <Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#050510',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7B61FF',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '14px',
                  letterSpacing: '0.05em',
                }}
              >
                Loading skill cloud...
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 7], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color('#050510'), 1)
              }}
            >
              <SkillCloud />
            </Canvas>
          </Suspense>
        </motion.div>

        {/* ── Category Cards ── */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 flex gap-4 overflow-x-auto pb-2 justify-center flex-wrap lg:flex-nowrap"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {(Object.keys(SKILLS_DATA) as CategoryKey[]).map((key, i) => (
            <CategoryCard key={key} catKey={key} index={i} />
          ))}
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
