import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
    "JavaScript (ES6+)",
    "React & Ecosystem",
    "Node.js & Express",
    "Three.js & WebGL",
    "TailwindCSS",
    "Framer Motion",
    "Next.js",
    "TypeScript"
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-24 px-8 bg-black relative">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-neon-blue font-mono">
                    &lt;SKILLS_LOG /&gt;
                </h2>

                <motion.div
                    ref={ref}
                    className="bg-[#0f0f0f] border border-gray-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm md:text-base relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Terminal Header */}
                    <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-gray-500 text-xs">user@portfolio:~</span>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 h-96 overflow-y-auto custom-scrollbar">
                        <AnimatedLine text="> instantiating neural link..." delay={0} />
                        <AnimatedLine text="> accessing core competencies..." delay={1} />
                        <div className="mt-4 space-y-2">
                            {skills.map((skill, index) => (
                                <SkillBar key={skill} skill={skill} index={index} />
                            ))}
                        </div>
                        <AnimatedLine text="> system optimization: 100%" delay={skills.length * 0.2 + 2} className="text-green-400 mt-4" />
                        <motion.div
                            className="animate-pulse text-neon-blue mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: skills.length * 0.2 + 2.5 }}
                        >
                            _
                        </motion.div>
                    </div>

                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%] pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
};

const AnimatedLine = ({ text, delay, className = "text-gray-300" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let i = 0;
            const timer = setTimeout(() => {
                const interval = setInterval(() => {
                    setDisplayedText(text.substring(0, i + 1));
                    i++;
                    if (i === text.length) clearInterval(interval);
                }, 30 + Math.random() * 50);
                return () => clearInterval(interval);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, text, delay]);

    return <div ref={ref} className={className}>{displayedText}</div>
}

const SkillBar = ({ skill, index }) => {
    return (
        <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2 + index * 0.1 }}
        >
            <span className="text-neon-pink w-4">{">"}</span>
            <span className="w-48 text-gray-200">{skill}</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.7)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.random() * 20 + 80}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 2.5 + index * 0.1, ease: "easeOut" }}
                />
            </div>
            <span className="text-green-500 text-xs">[OK]</span>
        </motion.div>
    )
}

export default Skills;
