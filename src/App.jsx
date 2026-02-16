import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MachineScrollytelling from './components/MachineScrollytelling';

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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050510] text-white">
      <AnimatePresence mode="wait">{isLoading ? <LoadingScreen key="loader" /> : null}</AnimatePresence>
      {!isLoading && <MachineScrollytelling />}
    </div>
  );
}

export default App;
