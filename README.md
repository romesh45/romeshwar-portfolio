<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Romeshwar%20K%20—%20Portfolio&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Dark%20Futuristic%20%7C%20React%20%2B%20Three.js%20%2B%20GSAP&descAlignY=55&descSize=18" width="100%"/>

</div>

<div align="center">

[![Live](https://img.shields.io/badge/🌐_Live_Portfolio-romeshwar--portfolio.vercel.app-7B61FF?style=for-the-badge)](https://romeshwar-portfolio.vercel.app)
&nbsp;
[![Deploy](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
&nbsp;
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

</div>

---

<div align="center">

### *"I don't just write code — I build systems that think, fail gracefully, and improve."*

**[🚀 View Live →](https://romeshwar-portfolio.vercel.app)**

</div>

---

## ✨ Preview

> Dark & futuristic design — Space/galaxy feel with neon accents, deep blacks, and cyberpunk hints.

| Section | Feature |
|---|---|
| **Hero** | 3D particle field (600 particles) forming a neural network constellation with mouse interaction |
| **About** | Two-column layout with animated terminal card, stats grid, and research interests |
| **Skills** | 3D rotating tech logo cloud — 37 technologies floating in 3D space, color-coded by category |
| **Projects** | ZenHire flagship card + 6 flip cards with category filter system |
| **Certifications** | Animated cards with VERIFIED stamps and depth stagger |
| **Education** | Self-drawing vertical timeline with alternating cards |
| **Contact** | Contact form with floating labels + validation + social links |

---

## 🛠️ Tech Stack

### Core
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

### 3D & Animation
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/@react--three/fiber-000000?style=flat-square)
![React Three Drei](https://img.shields.io/badge/@react--three/drei-000000?style=flat-square)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

### Routing & Deploy
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 🎨 Design System

```css
/* Color Palette */
--void:        #050510   /* Primary background — deep black */
--deep-space:  #0D0D1F   /* Section backgrounds */
--neon-violet: #7B61FF   /* Primary accent — headings, CTAs */
--cyber-cyan:  #00D9FF   /* Secondary accent — subtitles, tags */
--glitch-pink: #FF2D6B   /* Tertiary accent — highlights */
--star-white:  #EAEAEA   /* Body text */
--muted:       #888888   /* Muted text, placeholders */
```

```
Headings  →  Space Grotesk   (geometric, modern)
Body      →  Inter           (ultra readable)
Code/Tags →  JetBrains Mono  (monospace, technical)
```

---

## 📁 Project Structure

```
romeshwar-portfolio/
├── public/
│   └── resume.pdf              # Resume download
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   │   ├── Hero.tsx        # Hero section
│   │   │   └── ParticleField.tsx  # Three.js particle system
│   │   ├── About/
│   │   │   └── About.tsx
│   │   ├── Skills/
│   │   │   └── Skills.tsx      # 3D skill cloud
│   │   ├── Projects/
│   │   │   └── Projects.tsx    # Flip cards + filter
│   │   ├── Certifications/
│   │   │   └── Certifications.tsx
│   │   ├── Education/
│   │   │   └── Education.tsx   # Animated timeline
│   │   ├── Contact/
│   │   │   └── Contact.tsx
│   │   └── UI/
│   │       ├── Navbar.tsx      # Frosted glass + active states
│   │       ├── CustomCursor.tsx # Glowing dot + trailing ring
│   │       └── ScrollProgress.tsx # Gradient progress bar
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/romesh45/romeshwar-portfolio.git

# Navigate into the folder
cd romeshwar-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✨ Key Features

**3D Particle Field**
- 600 particles distributed using Fibonacci sphere algorithm
- Neural network constellation with proximity-based connections
- Real-time mouse interaction — particles react to cursor movement
- Built with React Three Fiber + custom shaders

**3D Skill Cloud**
- 37 technologies floating in 3D space via OrbitControls
- Color-coded by category — AI/ML (violet) · Backend (cyan) · Frontend (white) · Databases (pink) · DevOps (emerald)
- Hover to highlight, drag to spin, auto-rotates

**Custom Cursor**
- 8px filled neon violet dot with instant tracking
- 32px trailing ring with lerp lag
- Morphs on hover over interactive elements

**Scroll Progress Bar**
- Fixed top gradient bar — violet → cyan → pink
- Tracks exact scroll position using Framer Motion useScroll

**Loading Screen**
- "ROMESHWAR K" types out letter by letter on first visit
- Smooth AnimatePresence exit transition

**Project Flip Cards**
- CSS 3D perspective flip (rotateY 180°)
- Front: description + tech pills
- Back: full stack + GitHub link
- Works on mobile with tap

---

## 📦 Dependencies

```json
{
  "@react-three/drei": "latest",
  "@react-three/fiber": "latest",
  "@gsap/react": "latest",
  "framer-motion": "latest",
  "gsap": "latest",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "latest",
  "three": "latest",
  "typescript": "latest",
  "tailwindcss": "^3.0.0",
  "vite": "latest"
}
```

---

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD.

Every push to `main` triggers a new deployment automatically.

```bash
# Manual deploy
npm run build
vercel --prod
```

---

## 📄 License

This project is open source. Feel free to use it as inspiration for your own portfolio — but please don't copy the content directly (bio, projects, certifications). The design system and code structure are free to reference.

---

<div align="center">

**Built by [Romeshwar K](https://github.com/romesh45)**

[![Portfolio](https://img.shields.io/badge/🌐_Visit_Portfolio-7B61FF?style=for-the-badge)](https://romeshwar-portfolio.vercel.app)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/romeshwark4504/)
&nbsp;
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:romeshwar.k45@gmail.com)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" width="100%"/>

</div>
