import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xTrans = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={containerRef} id="about" className="min-h-screen py-20 px-8 relative bg-bg-dark text-white overflow-hidden">
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* 3D Tilt Card */}
                <TiltCard>
                    <div className="relative z-10 p-8">
                        <h3 className="text-2xl font-bold mb-4 font-mono text-neon-blue">&lt;AboutMe /&gt;</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            I am a creative developer who bridges the gap between design and technology.
                            Obsessed with <span className="text-white font-semibold">micro-interactions</span>,
                            <span className="text-white font-semibold">motion physics</span>, and
                            <span className="text-white font-semibold">immersive environments</span>.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Based in the digital ether. Available for freelance missions.
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-neon-blue rounded-full blur-2xl opacity-30" />
                </TiltCard>

                {/* Staggered Text */}
                <div className="space-y-8 relative">
                    <motion.div style={{ x: xTrans }}>
                        <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-600">
                            DESIGN
                        </h2>
                    </motion.div>
                    <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], [50, -50]) }}>
                        <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-100 text-right">
                            CODE
                        </h2>
                    </motion.div>
                    <motion.div style={{ x: xTrans }}>
                        <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                            MOTION
                        </h2>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const TiltCard = ({ children }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d"
                }}
            >
                {children}
            </div>
        </motion.div>
    );
};


export default About;
