import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Magnetic from './Magnetic';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const links = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-40 flex justify-center py-6 px-4"
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            <div className="glass px-8 py-3 rounded-full flex gap-8 items-center border border-white/5 backdrop-blur-md">
                <Magnetic>
                    <div className="p-2">
                        <a href="#" className="text-xl font-bold font-mono text-white tracking-widest hover:text-neon-blue transition-colors block">
                            AG<span className="text-neon-purple">.</span>
                        </a>
                    </div>
                </Magnetic>

                <ul className="hidden md:flex gap-8">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Magnetic>
                                <div className="p-2 relative group">
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors block"
                                    >
                                        {link.name}
                                        <span className="absolute bottom-1 left-2 w-0 h-[1px] bg-neon-blue transition-all group-hover:w-[calc(100%-16px)] duration-300"></span>
                                    </a>
                                </div>
                            </Magnetic>
                        </li>
                    ))}
                </ul>

                <button className="md:hidden text-white">
                    Menu
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
