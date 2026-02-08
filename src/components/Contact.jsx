import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-8 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto max-w-lg relative z-10 glass p-10 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(188,19,254,0.15)]">
                <h2 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    INITIALIZE HANDSHAKE
                </h2>
                <p className="text-gray-400 text-center mb-8 text-sm">
                    Available for new protocols.
                </p>

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-blue uppercase tracking-widest ml-1">Identity</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                                    placeholder="Unknown Entity"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-purple uppercase tracking-widest ml-1">Frequency</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                                    placeholder="entity@void.net"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-pink uppercase tracking-widest ml-1">Transmission</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink transition-all resize-none"
                                    placeholder="Enter your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-neon-blue transition-colors relative overflow-hidden group"
                            >
                                <span className="relative z-10">Transmit Data</span>
                                <div className="absolute inset-0 bg-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="inline-block p-4 rounded-full bg-green-500/20 mb-6">
                                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">TRANSMISSION RECEIVED</h3>
                            <p className="text-gray-400">System will respond shortly.</p>

                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-8 text-sm text-neon-blue hover:text-white underline"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Contact;
