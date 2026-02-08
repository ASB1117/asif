import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Simulate loading time
        setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 2500);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div
            className="bg-bg-dark min-h-screen text-white relative selection:bg-neon-purple selection:text-white cursor-none overflow-x-hidden"
            style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', overflowX: 'hidden' }}
        >
            {/* DEBUG ELEMENT */}
            <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, color: 'red', fontSize: '24px' }}>
                APP IS MOUNTED
            </div>

            <CustomCursor />
            <AnimatePresence mode='wait'>
                {isLoading && <Preloader />}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <Navbar />
                    <main className="relative z-10">
                        <Hero />
                        <About />
                        <Projects />
                        <Skills />
                        <Contact />
                    </main>

                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div
                            className="absolute inset-0 bg-[url('https://grainy-gradients.com/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"
                            style={{
                                backgroundImage: "url('https://grainy-gradients.com/noise.svg')",
                                opacity: 0.2,
                                mixBlendMode: 'overlay',
                                filter: 'contrast(1.5) brightness(1)'
                            }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
