# 🌐 Manas Puthanpura — Portfolio Website

> A modern, 3D interactive personal portfolio for a **Data Scientist & AI Expert**, built with React 18, TypeScript, Three.js, and GSAP.

🔗 **[View Live Site](https://iammsp-star.github.io/portfolio-website/)** · 📁 **[GitHub Repository](https://github.com/iammsp-star/portfolio-website)**

---

## ✨ Features

- 🎨 **Smooth Scroll Experience:** Powered by GSAP ScrollSmoother and SplitText for fluid section transitions.
- 🤖 **Interactive 3D Character Model:** Rendered in real-time with Three.js and React Three Fiber with physics and lighting effects.
- 🎯 **Interactive Custom Cursor:** Context-aware reactive cursor tracking user hover interactions.
- 💼 **Projects Showcase:** Interactive project gallery with live previews and technical stack breakdowns.
- 📜 **Certifications & Credentials:** Dedicated credentials section highlighting AI, RAG pipelines, and Data Science achievements.
- 🛠️ **Tech Stack Visualizer:** Dynamic 3D interactive icon physics display for tools and frameworks.
- 📅 **Career & Education Timeline:** Structured interactive chronology of professional milestones and achievements.
- 📱 **Adaptive Responsive Design:** Mobile-first layout optimized across mobile (375px), tablet (768px), and high-resolution displays.
- ✉️ **Contact & Social Connect:** Direct links and reach-out channels for collaborations and opportunities.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | React 18 + TypeScript | Strict typing, modular functional components |
| **Build Tool** | Vite | Ultra-fast HMR and optimized production bundles |
| **3D Graphics** | Three.js + React Three Fiber | 3D character staging, GLTF/Draco decoders, Drei helpers |
| **Animations** | GSAP (GreenSock) | ScrollTrigger, ScrollSmoother, SplitText animations |
| **Physics** | Rapier / Cannon | 3D interactive object collisions |
| **Hosting & CI** | GitHub Pages | Automated continuous deployment workflow |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or pnpm / yarn

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/iammsp-star/portfolio-website.git

# 2. Navigate to project directory
cd portfolio-website

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```

---

## 📁 Project Structure

```
portfolio-website/
├── public/                 # Static assets, 3D models, Draco decoders, textures
├── src/
│   ├── assets/             # Images, icons, and illustrations
│   ├── components/
│   │   ├── Character/      # 3D interactive character canvas and mesh logic
│   │   ├── About.tsx       # Bio and summary section
│   │   ├── Career.tsx      # Professional & education timeline
│   │   ├── Certificates.tsx # Professional certificates & verified credentials
│   │   ├── Contact.tsx     # Contact channels and footer links
│   │   ├── Cursor.tsx      # Custom animated interactive cursor
│   │   ├── HoverLinks.tsx  # Interactive link hover animations
│   │   ├── Landing.tsx     # Hero banner with dynamic callouts
│   │   ├── Loading.tsx     # Initial preloader & progress state
│   │   ├── MainContainer.tsx # Core layout wrapper with GSAP smooth scroll
│   │   ├── Navbar.tsx      # Sticky header navigation & quick links
│   │   ├── SocialIcons.tsx # Floating social media channels
│   │   ├── TechStack.tsx   # Interactive 3D tech stack showcase
│   │   ├── WhatIDo.tsx     # Specializations & core competencies
│   │   └── Work.tsx        # Highlighted projects and case studies
│   ├── context/            # Global application state (LoadingProvider)
│   ├── App.tsx             # Root component layout
│   └── main.tsx            # Application entry point
├── ARCHITECTURE.md         # System architecture & request lifecycle specification
├── DESIGN.md               # Design tokens, typography, and UX guidelines
├── RULES.md                # Engineering standards & TypeScript guidelines
├── TASKS.md                # Phased implementation roadmap
├── DECISIONS.md            # Architectural Decision Records (ADRs)
├── MEMORY.md               # Session state & progress tracker
├── TEST_PLAN.md            # Quality assurance & verification standards
├── SECURITY.md             # Security policies & RLS principles
├── package.json
└── vite.config.ts
```

---

## 📚 Governance & Architecture Documentation

For complete technical specifications, architectural standards, and security policies, refer to the blueprint documents:

- 🏛️ **[Architecture Blueprint](ARCHITECTURE.md)** — Request flow diagrams, directory layout, and server rules.
- 🎨 **[Design System](DESIGN.md)** — Typography, color tokens, button variants, and responsive criteria.
- 📏 **[Engineering Rules](RULES.md)** — Strict typing standards, modularity, and security best practices.
- 📋 **[Execution Roadmap](TASKS.md)** — Phased delivery checklist and milestone tracking.
- 🧠 **[Architectural Decisions (ADRs)](DECISIONS.md)** — Permanent architectural records with rationales.
- 💾 **[Project Memory](MEMORY.md)** — Active execution state and next steps.
- 🧪 **[Test Plan](TEST_PLAN.md)** — Verification definitions, RLS assertions, and viewport tests.
- 🛡️ **[Security Policy](SECURITY.md)** — Zero-trust access rules, RLS policies, and secret isolation.

---

## 📄 License

MIT © [Manas Puthanpura](https://github.com/iammsp-star)
