import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';

const stages = [
  'ARRIVAL INTO MACHINE',
  'HERO MODULE',
  'SYSTEM PROFILE',
  'SKILLS MATRIX',
  'PROJECT TUNNEL',
  'CORE STATEMENT',
];

const clamp = (v) => Math.max(0, Math.min(1, v));

const ModuleTag = ({ index, title }) => (
  <section className="machine-section" data-stage={index}>
    <div className="module-tag">
      <p className="text-[10px] tracking-[0.48em] text-red-300/80">MODULE {String(index + 1).padStart(2, '0')}</p>
      <h2 className="mt-2 text-lg font-bold tracking-[0.15em] text-white/90 md:text-2xl">{title}</h2>
    </div>
  </section>
);

const MachineScrollytelling = () => {
  const rootRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1, smoothWheel: true, smoothTouch: false, wheelMultiplier: 0.9 });
    let frame;
    const raf = (t) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const cameraZ = useTransform(scrollYProgress, [0, 1], [40, -710]);
  const worldTransform = useMotionTemplate`translateZ(${cameraZ}px)`;

  const stage1 = useTransform(scrollYProgress, [0, 0.17], [0, 1]);
  const stage2 = useTransform(scrollYProgress, [0.16, 0.34], [0, 1]);
  const stage3 = useTransform(scrollYProgress, [0.33, 0.51], [0, 1]);
  const stage4 = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  const stage5 = useTransform(scrollYProgress, [0.67, 0.85], [0, 1]);
  const stage6 = useTransform(scrollYProgress, [0.84, 1], [0, 1]);

  const ringSpin = useTransform(stage1, (v) => v * 500);
  const beamSweep = useTransform(stage1, (v) => -48 + v * 96);

  const heroScale = useTransform(stage2, (v) => 0.25 + clamp(v) * 0.75);
  const heroRingRotation = useTransform(stage2, (v) => v * -420);
  const nameSnap = useTransform(stage2, (v) => clamp(v * 1.2));

  const aboutRotate = useTransform(stage3, (v) => -18 + v * 32);
  const scanY = useTransform(stage3, (v) => 140 - v * 280);

  const skillsRotate = useTransform(stage4, (v) => v * 480);
  const skillCounterRotate = useTransform(stage4, (v) => v * -620);

  const tunnelTravel = useTransform(stage5, (v) => v * 100);

  const corePulse = useTransform(stage6, (v) => 0.35 + v * 0.95);
  const coreRotation = useTransform(stage6, (v) => v * 220);

  const activeStageLabel = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(stages.length - 1, Math.floor(v * stages.length));
    return stages[idx];
  });

  return (
    <div ref={rootRef} className="machine-root relative overflow-x-hidden">
      <motion.div className="machine-world" style={{ transform: worldTransform }}>
        <div className="fog-layer" />

        <motion.div className="structural-ring ring-a" style={{ rotateZ: ringSpin }} />
        <motion.div className="structural-ring ring-b" style={{ rotateZ: useTransform(ringSpin, (v) => -v * 0.75) }} />
        <motion.div className="structural-ring ring-c" style={{ rotateZ: useTransform(ringSpin, (v) => v * 0.4) }} />

        <div className="pillar-grid">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div key={idx} className={`pillar p-${idx}`} />
          ))}
        </div>

        <motion.div className="scan-beam" style={{ x: beamSweep }} />

        <motion.section className="hero-module module-3d" style={{ scale: heroScale }}>
          <div className="hero-frame" />
          <div className="hero-surface" />
          <motion.div className="hero-ring" style={{ rotateZ: heroRingRotation }} />
          <div className="hero-energy" />
          <div className="hero-name">
            {'ASIFANU'.split('').map((ch, idx) => (
              <motion.span
                key={ch + idx}
                style={{
                  opacity: useTransform(nameSnap, (v) => clamp((v - idx * 0.11) * 3.4)),
                  y: useTransform(nameSnap, (v) => 18 - clamp((v - idx * 0.11) * 3.4) * 18),
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <motion.section className="about-module module-3d" style={{ rotateY: aboutRotate }}>
          <div className="about-frame" />
          <div className="about-grid" />
          <div className="about-text">
            <p>PROFILE_ID :: ASIFANU</p>
            <p>ROLE :: CREATIVE DEVELOPER</p>
            <p>FOCUS :: 3D SYSTEM NARRATIVES</p>
            <p>STATUS :: AUTONOMOUS BUILD READY</p>
          </div>
          <motion.div className="about-scan" style={{ y: scanY }} />
        </motion.section>

        <section className="skills-module module-3d">
          <motion.div className="skills-ring outer" style={{ rotateZ: skillsRotate }} />
          <motion.div className="skills-ring inner" style={{ rotateZ: skillCounterRotate }} />
          <div className="skills-center">CAPABILITY MATRIX</div>
          <div className="skills-nodes">
            {['React', 'Motion', 'UI', '3D', 'WebGL', 'Node', 'GSAP', 'Perf'].map((label, idx) => (
              <motion.div
                key={label}
                className="skill-node"
                style={{
                  opacity: useTransform(stage4, (v) => clamp((v - idx * 0.08) * 2.5)),
                  scale: useTransform(stage4, (v) => 0.6 + clamp((v - idx * 0.08) * 2.5) * 0.5),
                }}
              >
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section className="tunnel-module module-3d" style={{ x: tunnelTravel }}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <motion.div
              key={idx}
              className={`tunnel-panel ${idx % 2 === 0 ? 'left' : 'right'}`}
              style={{
                scale: useTransform(stage5, (v) => 0.85 + clamp(v * 1.2 - idx * 0.08) * 0.3),
                rotateY: useTransform(stage5, (v) => (idx % 2 === 0 ? 18 : -18) - clamp(v * 1.3 - idx * 0.08) * (idx % 2 === 0 ? 16 : -16)),
              }}
            />
          ))}
        </motion.section>

        <section className="core-module module-3d">
          <motion.div className="core-ring c1" style={{ rotateZ: coreRotation }} />
          <motion.div className="core-ring c2" style={{ rotateZ: useTransform(coreRotation, (v) => -v * 1.3) }} />
          <motion.div className="core-ring c3" style={{ rotateZ: useTransform(coreRotation, (v) => v * 0.65) }} />
          <motion.div className="core-sphere" style={{ scale: corePulse }} />
          <div className="core-statement">BUILDING LIVING MACHINE INTERFACES</div>
          <div className="core-arms">
            {Array.from({ length: 4 }).map((_, idx) => (
              <motion.div key={idx} className={`arm a-${idx}`} style={{ scaleY: useTransform(stage6, (v) => 0.8 + v * 0.4) }} />
            ))}
          </div>
        </section>
      </motion.div>

      <div className="machine-hud pointer-events-none fixed left-0 top-0 z-20 flex h-screen w-full flex-col justify-between p-6 md:p-10">
        <div>
          <p className="text-[10px] tracking-[0.5em] text-white/70">AUTONOMOUS INTELLIGENCE CHAMBER</p>
          <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">ASIFANU // ROBOTIC SYSTEM INTERFACE</h1>
        </div>

        <div className="self-end rounded border border-white/20 bg-black/35 px-4 py-3 backdrop-blur-sm">
          <p className="text-[10px] tracking-[0.4em] text-red-300/90">ACTIVE MODULE</p>
          <motion.p className="mt-1 text-sm font-semibold tracking-[0.2em] text-white">{activeStageLabel}</motion.p>
        </div>
      </div>

      <div className="relative z-30">
        {stages.map((stage, idx) => (
          <ModuleTag key={stage} index={idx} title={stage} />
        ))}
      </div>
    </div>
  );
};

export default MachineScrollytelling;
