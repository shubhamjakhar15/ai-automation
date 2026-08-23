import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center">
        {/* AI Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            {/* Robot face */}
            <div className="w-32 h-32 mx-auto rounded-3xl bg-[rgba(12,74,110,0.05)] border border-border flex flex-col items-center justify-center relative overflow-hidden">
              {/* Eyes */}
              <div className="flex gap-4 mb-2">
                <motion.div
                  className="w-5 h-5 rounded-full bg-accent"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <motion.div
                  className="w-5 h-5 rounded-full bg-accent"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              {/* Mouth */}
              <motion.div
                className="w-10 h-3 rounded-full border-2 border-accent/50 border-t-0"
                animate={{ scaleX: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Antenna */}
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-6 bg-accent/30 rounded-full"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent animate-pulse" />
              </motion.div>
              {/* Shine */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        {/* 404 text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-8xl md:text-9xl font-extrabold text-gradient font-[family-name:var(--font-heading)] mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-text-primary font-semibold mb-2"
        >
          Oops! Even our AI couldn't find this page.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-text-muted mb-10 max-w-[400px] mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/">
            <AnimatedButton variant="primary" size="lg">
              Back to Home
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
