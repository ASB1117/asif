import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const projects = [
    {
        id: "p1",
        title: "Neon Nexus",
        subtitle: "Future Tech Dashboard",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "A futuristic dashboard interface designed for data visualization in a cyberpunk setting. Built with React and D3.js, featuring real-time data streams and holographic UI components."
    },
    {
        id: "p2",
        title: "Void Hopper",
        subtitle: "3D Space Adventure",
        img: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "An immersive 3D space exploration game built with Three.js and WebGL. Navigate through asteroid fields and warp through wormholes in this high-performance browser experience."
    },
    {
        id: "p3",
        title: "Synthwave FM",
        subtitle: "Audio Visualizer",
        img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "A retro-styled audio visualizer that reacts to your music library. Uses the Web Audio API to generate real-time frequency data mapped to neon geometric shapes."
    }
];

const Projects = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section id="projects" className="min-h-screen py-24 px-8 relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center tracking-tight">SELECTED <span className="text-neon-purple">WORKS</span></h2>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <motion.div
                        key={project.id}
                        layoutId={project.id}
                        onClick={() => setSelectedId(project.id)}
                        className="cursor-pointer group relative overflow-hidden rounded-2xl aspect-[4/3]"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.img
                            src={project.img}
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <motion.h3 className="text-2xl font-bold text-white mb-1">{project.title}</motion.h3>
                            <motion.p className="text-neon-blue font-mono text-sm">{project.subtitle}</motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 grid place-items-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedId(null)}
                        />

                        <motion.div
                            layoutId={selectedId}
                            className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-neon-pink hover:text-white transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            <motion.div className="relative h-64 md:h-80">
                                <motion.img
                                    src={projects.find(p => p.id === selectedId).img}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                            </motion.div>

                            <motion.div className="p-8">
                                <motion.h3 className="text-3xl font-bold text-white mb-2">{projects.find(p => p.id === selectedId).title}</motion.h3>
                                <motion.p className="text-neon-purple font-mono mb-6">{projects.find(p => p.id === selectedId).subtitle}</motion.p>
                                <motion.p className="text-gray-300 leading-relaxed">
                                    {projects.find(p => p.id === selectedId).description}
                                </motion.p>

                                <motion.button
                                    className="mt-8 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-neon-blue transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Live
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
