import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden
        bg-[rgba(12,74,110,0.03)] backdrop-blur-[25px]
        border border-[rgba(12,74,110,0.06)]
        ${glow ? 'shadow-[0_0_40px_rgba(255,122,0,0.1)]' : ''}
        ${className}
      `}
      whileHover={
        hover
          ? {
              borderColor: 'rgba(255, 122, 0, 0.2)',
              boxShadow: '0 0 50px rgba(255, 122, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.3)',
              y: -4,
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </motion.div>
  );
}
