import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';

const storyChapters = [
  {
    id: 'intro',
    kicker: 'CHAPTER 01',
    title: 'Orbiting Ideas',
    text: 'I blend design systems, motion storytelling, and product thinking into immersive web experiences.',
    accent: 'from-cyan-300 to-fuchsia-400',
  },
  {
    id: 'craft',
    kicker: 'CHAPTER 02',
    title: 'Building Gravity',
    text: 'From concept to production, I engineer responsive interfaces with expressive 3D-like interactions.',
    accent: 'from-violet-300 to-cyan-300',
  },
  {
    id: 'impact',
    kicker: 'CHAPTER 03',
    title: 'Launching Products',
    text: 'I help startups and brands ship performant, memorable sites that convert visitors into fans.',
    accent: 'from-emerald-300 to-cyan-300',
  },
];

const projects = [
  { name: 'Nebula Commerce', type: '3D Product Story Site', year: '2025' },
  { name: 'Pulse Studio', type: 'Interactive Brand Platform', year: '2024' },
  { name: 'Atlas Venture', type: 'Investor Narrative Experience', year: '2024' },
];

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#050510]"
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/30 blur-[80px]"
          animate={{ scale: [1, 1.35, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-[0.55em] text-cyan-200/80"
        >
          INITIALIZING PORTFOLIO
        </motion.p>
        <motion.div
          className="h-20 w-20 rounded-full border border-cyan-300/35"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="h-full w-full rounded-full border-4 border-transparent border-t-cyan-300 border-r-fuchsia-400"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        <motion.div
          className="h-1 w-56 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-300 to-fuchsia-400"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StoryCard({ chapter, index, scrollYProgress }) {
  const start = index * 0.2;
  const end = start + 0.45;
  const y = useTransform(scrollYProgress, [start, end], [180, -160]);
  const rotateX = useTransform(scrollYProgress, [start, end], [26, -16]);
  const rotateY = useTransform(scrollYProgress, [start, end], [-14, 8]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.12, end], [0.2, 1, 0.6]);

  return (
    <motion.article
      style={{ y, rotateX, rotateY, opacity }}
      className="story-card pointer-events-auto rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md"
    >
      <p className="text-xs tracking-[0.4em] text-cyan-200/80">{chapter.kicker}</p>
      <h2 className={`mt-4 bg-gradient-to-r ${chapter.accent} bg-clip-text text-4xl font-bold text-transparent md:text-6xl`}>
        {chapter.title}
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200/85 md:text-lg">{chapter.text}</p>
    </motion.article>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2500);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  const starShift = useTransform(scrollYProgress, [0, 1], [0, -360]);

  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 17) % 100}%`,
        size: 2 + (i % 3),
        delay: (i % 5) * 0.4,
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050510] text-white">
      <AnimatePresence mode="wait">{isLoading ? <LoadingScreen key="loader" /> : null}</AnimatePresence>

      <motion.div className="fixed left-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-emerald-300" style={{ scaleX: progress, width: '100%' }} />

      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ y: starShift }}>
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <header className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-24 pt-28 md:px-10">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }} className="text-xs tracking-[0.5em] text-cyan-200/85">
          3D SCROLLY PORTFOLIO
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.75 }}
          className="mt-7 max-w-4xl text-5xl font-black leading-[0.94] md:text-8xl"
        >
          I craft <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">high-energy</span>{' '}
          digital stories in motion.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.7 }}
          className="mt-8 max-w-2xl text-base text-slate-200/80 md:text-xl"
        >
          Scroll to travel through my process: idea, craft, and impact — all told with cinematic transitions and 3D depth.
        </motion.p>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[210vh] max-w-6xl flex-col gap-24 px-6 pb-32 md:px-10" style={{ perspective: 1300 }}>
        {storyChapters.map((chapter, index) => (
          <StoryCard key={chapter.id} chapter={chapter} index={index} scrollYProgress={scrollYProgress} />
        ))}
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-32 md:px-10">
        <h3 className="text-3xl font-bold md:text-5xl">Selected Missions</h3>
        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <motion.article
              key={project.name}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <p className="text-xs tracking-[0.32em] text-cyan-200/70">{project.year}</p>
              <div className="mt-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <h4 className="text-2xl font-semibold">{project.name}</h4>
                <p className="text-slate-300/85">{project.type}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
