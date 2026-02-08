import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <section ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden perspective-1000">
            {/* Background Parallax Elements */}
            <motion.div
                className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent opacity-30 blur-3xl"
                style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]) }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.h1
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-screen"
                    style={{ y: yText, opacity: opacityText, scale: scaleText }}
                >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        DIGITAL
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-t from-neon-purple to-neon-blue filter drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">
                        ALCHEMY
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    Crafting <span className="text-neon-blue">zero-gravity</span> experiences for the web.
                </motion.p>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <div className="animate-bounce text-neon-blue text-sm uppercase tracking-[0.2em]">
                        Scroll to Explore
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements (Antigravity) */}
            <FloatingElement delay={0} x={-300} y={-200} size={100} color="bg-neon-blue" />
            <FloatingElement delay={1} x={300} y={100} size={60} color="bg-neon-purple" />
            <FloatingElement delay={2} x={-200} y={200} size={40} color="bg-white" />
        </section>
    );
};

const FloatingElement = ({ delay, x, y, size, color }) => {
    return (
        <motion.div
            className={`absolute rounded-full blur-xl opacity-20 ${color}`}
            style={{
                width: size,
                height: size,
                left: "50%",
                top: "50%",
                x: x,
                y: y
            }}
            animate={{
                y: [y - 20, y + 20, y - 20],
                x: [x - 10, x + 10, x - 10],
                rotate: [0, 360],
                scale: [1, 1.1, 1]
            }}
            transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        />
    )
}

export default Hero;
