import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiPhone, FiCalendar, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import AnimatedButton from '../ui/AnimatedButton';
import AnimatedText from '../ui/AnimatedText';
import MagneticButton from '../ui/MagneticButton';

const floatingCards = [
  {
    icon: FiPhone,
    title: 'Incoming Call',
    subtitle: 'Sarah Mitchell',
    detail: 'Hair Appointment',
    color: '#FF7A00',
    position: 'top-[8%] left-[3%] lg:left-[5%]',
    delay: 0.8,
  },
  {
    icon: FiCalendar,
    title: 'Appointment Booked',
    subtitle: 'Tomorrow, 2:00 PM',
    detail: 'Dental Cleaning',
    color: '#FFA733',
    position: 'top-[15%] right-[3%] lg:right-[5%]',
    delay: 1.0,
  },
  {
    icon: FiTrendingUp,
    title: 'Calls Today',
    subtitle: '147 answered',
    detail: '99.2% success rate',
    color: '#FFD580',
    position: 'bottom-[20%] left-[3%] lg:left-[8%]',
    delay: 1.2,
  },
  {
    icon: FiDollarSign,
    title: 'Revenue Saved',
    subtitle: '$12,450',
    detail: 'This month',
    color: '#FF7A00',
    position: 'bottom-[15%] right-[3%] lg:right-[8%]',
    delay: 1.4,
  },
];

function FloatingCard({ card, mouseX, mouseY }) {
  const x = useTransform(mouseX, [0, 1], [-15, 15]);
  const y = useTransform(mouseY, [0, 1], [-15, 15]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`absolute ${card.position} z-10 hidden md:block`}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: card.delay,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="bg-[rgba(12,74,110,0.04)] backdrop-blur-[30px] border border-[rgba(12,74,110,0.08)] rounded-2xl p-4 w-[200px] cursor-default"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + card.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.05,
          borderColor: 'rgba(255,122,0,0.3)',
          boxShadow: '0 0 30px rgba(255,122,0,0.1)',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${card.color}20` }}
          >
            <card.icon size={16} style={{ color: card.color }} />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary leading-tight">{card.title}</p>
            <p className="text-[10px] text-text-muted">{card.subtitle}</p>
          </div>
        </div>
        <p className="text-[11px] text-text-muted/70">{card.detail}</p>
        {/* Subtle animated pulse dot */}
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]"
      id="hero"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Center radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,122,0,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(12,74,110,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(12,74,110,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Top light ray */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[300px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,122,0,0.4), transparent)',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      </div>

      {/* Floating Cards */}
      {floatingCards.map((card) => (
        <FloatingCard key={card.title} card={card} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Content */}
      <div className="relative z-20 text-center max-w-[900px] mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,122,0,0.08)] border border-[rgba(255,122,0,0.15)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-accent-secondary tracking-wide">
            Your 24/7 AI Employee
          </span>
        </motion.div>

        {/* Headline */}
        <AnimatedText
          text="Never Miss Another Customer Call."
          tag="h1"
          animation="words"
          stagger={0.06}
          delay={0.4}
          className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] mb-7"
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="text-lg md:text-xl text-text-muted max-w-[600px] mx-auto mb-10 leading-relaxed"
        >
          AI answers calls, books appointments, updates calendars, and works 24/7 — 
          so you never lose another customer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <AnimatedButton variant="primary" size="lg">
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </AnimatedButton>
          </MagneticButton>
          <MagneticButton>
            <AnimatedButton variant="secondary" size="lg">
              Book a Demo
            </AnimatedButton>
          </MagneticButton>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6 text-xs text-text-muted/50"
        >
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1l1.5 3.5L12 5l-2.5 2.5L10 11 7 9l-3 2 .5-3.5L2 5l3.5-.5L7 1z" fill="#FF7A00" />
            </svg>
            4.9/5 Rating
          </span>
          <span className="w-px h-3 bg-border" />
          <span>2,000+ Businesses</span>
          <span className="w-px h-3 bg-border" />
          <span>99.9% Uptime</span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-20" />
    </section>
  );
}
