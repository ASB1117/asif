# Antigravity Portfolio

A highly cinematic, animation-heavy portfolio website built with React, Vite, Framer Motion, and TailwindCSS.

## Features

- **Advanced Animations**: Complex orchestration using Framer Motion.
- **Smooth Scrolling**: Implemented with Lenis for a premium feel.
- **Shared Layout Transitions**: Morphing cards in the Projects section.
- **Physics-based Interactions**: Spring animations on cursor and hover states.
- **3D Tilt Effects**: Interactive cards in the About section.
- **Hacker Terminal**: Typing effects in the Skills section.
- **Glassmorphism & Neon**: Modern cyber aesthetic.

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lenis](https://github.com/studio-freight/lenis)
- [Lucide React](https://lucide.dev/)

## Setup & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Customization

- **Colors**: Edit `tailwind.config.js` to change the neon color palette.
- **Content**: Update the arrays in `Projects.jsx` and `Skills.jsx` to reflect your own work.
- **Images**: Replace the placeholder Unsplash URLs with your own assets.

## Structure

- `src/components/`: Individual section components.
- `src/hooks/`: (Optional) Logic for complex animations.
- `src/App.jsx`: Main entry point with Lenis smooth scroll setup.
