import { motion } from 'framer-motion';
import { FiPhone, FiCpu, FiCalendar, FiCheckCircle, FiBell } from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';

const steps = [
  {
    icon: FiPhone,
    title: 'Customer Calls',
    description: 'A customer dials your business number at any hour.',
    color: '#FF7A00',
  },
  {
    icon: FiCpu,
    title: 'AI Answers',
    description: 'Your AI receptionist picks up instantly with a natural voice.',
    color: '#FFA733',
  },
  {
    icon: FiCalendar,
    title: 'Checks Calendar',
    description: 'AI checks your real-time availability across all calendars.',
    color: '#FFD580',
  },
  {
    icon: FiCheckCircle,
    title: 'Books Slot',
    description: 'Confirms the appointment and sends instant confirmation.',
    color: '#FF7A00',
  },
  {
    icon: FiBell,
    title: 'Owner Notified',
    description: 'You receive a notification with full booking details.',
    color: '#FFA733',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28 px-6 lg:px-10 overflow-hidden" id="how-it-works">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <SectionReveal className="text-center mb-20">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Five steps to
            <span className="text-gradient"> zero missed calls.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto">
            From the moment your phone rings to the appointment being booked — fully automated.
          </p>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connector line — desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <SectionReveal key={step.title} delay={index * 0.12} direction="up">
                <motion.div
                  className="relative flex flex-col items-center text-center group"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    <motion.div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center border border-[rgba(12,74,110,0.08)] bg-[rgba(12,74,110,0.03)] group-hover:border-accent/20 transition-colors duration-300"
                      whileHover={{
                        boxShadow: `0 0 40px ${step.color}25`,
                      }}
                    >
                      <step.icon size={28} style={{ color: step.color }} />
                    </motion.div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-bg-primary"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Arrow between steps — mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 text-text-muted/20">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-base font-semibold text-text-primary mb-2 font-[family-name:var(--font-heading)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
