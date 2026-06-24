# Mints Global Studio Site — Architecture & Design Blueprint

Welcome to the technical blueprint and design documentation of the **Mints Global** studio website. This document outlines the design systems, frontend architecture, 3D graphics pipeline, audio synthesizer layers, and custom interactive features that make this portfolio unique.

---

## 👔 Executive Design System & Aesthetics

The Mints Global website is engineered to deliver a premium, high-fidelity experience that blends **Sleek macOS Glassmorphism** with **Neo-Cyberpunk HUD Command Center** visuals.

### 🎨 Color & Theming Philosophy
The site avoids standard flat palettes, instead employing a curated hierarchy of translucent fills, neon highlights, and brushed metal borders:
*   **Primary Background**: Deep Obsidian (`#050D08` / `#08140C` / `rgba(8, 20, 12, 0.75)`)
*   **Core Highlight (Mints Gold)**: `#C9A84C` (An elegant, brushed amber-gold)
*   **Secondary Neon Green**: `#00FF9D` (Used for system status ticks and network indicators)
*   **Cyberpunk Red Alert**: `#E0558A` / `#FF7070` (Used for critical lockdown sequences and warnings)
*   **Glassmorphic Fill**: `rgba(255, 255, 255, 0.03)` with dynamic saturations and `backdrop-filter: blur(60px)`

### 💫 Micro-Animations & Interactivity
*   **Interactive Spotlight Cursor**: A performance-optimized spotlight overlay follows the cursor across the site. Using Framer Motion's `useMotionTemplate` and hardware-accelerated CSS variables, it tracks coordinates directly in the DOM without triggering React re-renders.
*   **Liquid Glass Panels**: Border elements feature gradient lines matching individual component themes, with subtle color glows projecting outward upon user hover.
*   **Liquid Wipe Page Transition**: On route changes or initial load, a custom SVG liquid shape slides across the screen to wipe out old content, creating an immersive, fluid transition.
*   **Custom Liquid Cursor**: An interactive bubble-cursor (`LiquidCursor`) morphs shape, expands, and changes colors based on element states (links, modals, sandboxes).

---

## 🛠️ Technology Stack

The application is built on a modern, lightweight, high-performance web framework:
1.  **Framework**: React (v19) utilizing ESM import patterns.
2.  **Build Tool**: Vite (v5) providing instant hot-reloads and Rollup bundle minification.
3.  **Animation Engine**: Framer Motion (for physics-based layout transitions) & GSAP (for scroll-tied timelines).
4.  **3D WebGL Pipeline**: Three.js integrated via React Three Fiber (R3F) and `@react-three/drei`.
5.  **Scroll Kinetics**: Lenis Scroll (providing smooth, momentum-based scrolling).
6.  **Synthesizer Engine**: Web Audio API (generating procedural sound effects without heavy static audio assets).
7.  **Form Validation**: React Hook Form paired with Zod schemas.

---

## 📂 Core Repository Architecture

The codebase is modular, clean, and separated into layout sections, interactive components, 3D pipelines, and central state stores:

```
src/
├── components/          # Reusable UI widgets, cursors, and visual effects
├── hooks/               # Custom React hooks (prefers-reduced-motion, scroll, etc.)
├── lib/                 # Utility files, Web Audio synthesizers, helpers
├── sections/            # Core layout sections (Hero, Services, Work, ProductDemo, Contact)
├── store/               # Zustand global state management
├── three/               # Three.js 3D models, shaders, canvas configurations, animations
├── App.jsx              # Application entry, HUD overlay dashboard controls
└── index.css            # Core Tailwind & design tokens setup
```

---

## 🧩 Detailed Section Breakdowns

### 1. Header Navigation & HUD Overlays (`App.jsx`, `Navbar.jsx`)
*   **Navbar**: A floating, transparent navbar using glassmorphic blurs, responsive drop-downs, and a custom logo asset (`logo_mints.png`).
*   **HUD Dashboard Stat Overlays**: Fixed corners on the screen display real-time client-side stats:
    *   *Top-Left Corner*: System statistics (latency simulator, active processes, local timestamps).
    *   *Top-Right Corner*: Device-side viewport statistics (resolution scaling indicators).
    *   *Positioning*: Neatly aligned below the Navbar header links via `mt-20` wraps to prevent element overlap.

### 2. Immersive Hero Landing (`Hero.jsx`, `Hero3D.jsx`)
*   **Three.js Canvas**: Houses a floating holographic mesh that responds dynamically to user scroll inputs and cursor position coordinates.
*   **WebGL Post-Processing**: Implements custom scanlines, ambient grain, and bloom filters to mimic advanced security hardware monitors.
*   **Text Scrambling**: Uses the `ScrambleText` component to decipher characters sequentially when headings enter the viewport.

### 3. Dynamic Case Studies Showcase (`Work.jsx`, `ScrollJourney.jsx`)
*   **Tilt Cards Grid**: 33 premium portfolio projects mapped dynamically.
    *   *Cards 1–21 (Web Dev & Branding)*: Point to optimized, pre-rendered WebP screenshots (`/images/projects/...`) to minimize heavy client payloads.
    *   *Cards 22–33 (Product Shoots, Digital Marketing, SMM)*: Mapped to full-scale digital assets, loaded securely using double-quoted URL formats (`url("${project.image}")`) inside CSS to prevent whitespace syntax errors.
*   **SMM Statistics Panel**: Projects categorized under *Social Media Marketing* (Trizone, Pedal, Garden Ville, Haya Restaurant) render interactive stats cards in the project detail modal. These pull followers, posts, handles, and live Instagram redirections.

### 4. Enterprise Product Demo Sandbox (`ProductDemo.jsx`)
Features interactive command-line environments for 9 custom products. Each product is labeled with a dynamic badge (e.g. `Flagship`, `Most Selling`, `Under Production`) and links to a running simulated terminal:

*   **VMP (Vulnerability Management Platform)**: Uses a noise-reduction simulator to parse 12,000+ mock threats down to actionable critical CVEs, which users can click to remediate.
*   **SENTINEL-IoT**: Emulates connected DVR/CCTV devices, captures credentials brute-forces, logs malware download payloads, and supports starting/stopping the honeypot listener.
*   **Codex SME Cyber**: Integrates domain input fields for automated mock DNS scans and checklists that dynamically update the business security grade.
*   **SecureVault**: Compares hardware Enclave parameters (Apple vs Samsung Knox) and lets users deploy cryptographic mitigation scripts.
*   **JOBGUARD-UK**: Scrapes portals, displays BERT-attribution percentages, maps infrastructure networks, and dispatches ISP takedown packets.
*   **Mints ERP**: Features active project Kanban boards and a dynamic invoice generator.
*   **MintCare**: Logs care resident records and polls active heart rate / temperature sensors.
*   **Minora**: Integrates live audio/video feed sector selectors and an admin Q&A monitor.

### 5. Interactive Form & Command Line (`Contact.jsx`)
*   **Input Forms**: Validated with Zod schemas to guarantee data structure validity for name, email, and description parameters.
*   **Interactive Terminal Output**: Successfully submitting the form opens a retro terminal dialogue. It outputs diagnostic lines (connecting to servers, serializing payload, transmitting headers) to mimic a secure hacker-command dispatch.

---

## 🔊 Synthesizer Audio Engine (`synth.js`)

To keep compilation bundles light, Mints Global implements a customized procedural sound generator using the browser's **Web Audio API**:

*   **No Static Files**: Generates sound dynamically using oscillator nodes (`sine`, `triangle`, `sawtooth`) and gain nodes.
*   **Interactive Tones**:
    *   `playSuccessSound()`: Triggers a high-frequency, upward-sweeping arpeggio (2 rapid tones) denoting successful clicks and calculations.
    *   `playLockdownSound()`: Triggers a low-frequency, modulating alarm siren denoting security lockdown events.
*   **Safety Handling**: Wraps the AudioContext instantiation inside a user-gesture resolver, complying with standard browser auto-play policies.

---

## 📈 SEO & Asset Management

*   **Search Engine Optimization**: Implements semantic HTML5 tagging, descriptive meta keys, unique DOM identifier tags, and explicit layout landmarks.
*   **Icon Sets**:
    *   Apple touch icons (`/apple-touch-icon.png`) for mobile styling.
    *   High-res modern PNG icons (`/favicon-32x32.png`, `/favicon-16x16.png`).
    *   Unified configuration manifest file (`/site.webmanifest`).
    *   Legacy icon fallback (`/favicon.ico`).
