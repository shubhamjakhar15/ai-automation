import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '../ui/SectionReveal';

const industries = [
  {
    name: 'Hair Salon',
    emoji: '💇',
    color: '#FF7A00',
    description: 'Book cuts, colors, and styling appointments automatically. AI handles walk-in inquiries and wait-time estimates.',
    features: ['Appointment booking', 'Service catalog', 'Stylist preferences', 'Wait-time updates'],
  },
  {
    name: 'Dental Clinic',
    emoji: '🦷',
    color: '#FFA733',
    description: 'Schedule checkups, cleanings, and emergency visits. AI screens urgency levels and routes appropriately.',
    features: ['Emergency triage', 'Insurance verification', 'Treatment reminders', 'Follow-up scheduling'],
  },
  {
    name: 'Restaurant',
    emoji: '🍽️',
    color: '#FFD580',
    description: 'Handle reservations, takeout orders, and special dietary requests with ease.',
    features: ['Table reservations', 'Takeout ordering', 'Wait-list management', 'Special requests'],
  },
  {
    name: 'Fitness Gym',
    emoji: '💪',
    color: '#FF7A00',
    description: 'Manage class bookings, membership inquiries, and personal training sessions.',
    features: ['Class scheduling', 'Membership info', 'Trainer bookings', 'Guest passes'],
  },
  {
    name: 'Hotel',
    emoji: '🏨',
    color: '#FFA733',
    description: 'Manage reservations, room service requests, concierge inquiries, and check-in details.',
    features: ['Room reservations', 'Concierge service', 'Room upgrades', 'Local recommendations'],
  },
  {
    name: 'Law Firm',
    emoji: '⚖️',
    color: '#FFD580',
    description: 'Schedule consultations, screen potential clients, and handle basic legal inquiries.',
    features: ['Client screening', 'Consultation booking', 'Case type routing', 'Document requests'],
  },
  {
    name: 'Spa & Wellness',
    emoji: '🧖',
    color: '#FF7A00',
    description: 'Book massages, facials, and wellness packages. Handle multi-service appointments.',
    features: ['Service booking', 'Package bundles', 'Therapist selection', 'Gift vouchers'],
  },
  {
    name: 'Tutoring',
    emoji: '📚',
    color: '#FFA733',
    description: 'Schedule tutoring sessions, match students with tutors, and manage availability.',
    features: ['Session scheduling', 'Subject matching', 'Progress tracking', 'Parent updates'],
  },
  {
    name: 'Repair Shop',
    emoji: '🔧',
    color: '#FFD580',
    description: 'Schedule repair appointments, provide quotes, and send status updates on ongoing work.',
    features: ['Appointment booking', 'Quote requests', 'Status updates', 'Parts availability'],
  },
];

export default function IndustryCards() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative py-28 px-6 lg:px-10" id="industries">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <SectionReveal className="text-center mb-20">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            Industries
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Built for <span className="text-gradient">every business.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto">
            From salons to law firms, our AI adapts to your industry's unique workflow.
          </p>
        </SectionReveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry, index) => (
            <SectionReveal key={industry.name} delay={index * 0.06}>
              <motion.div
                className="relative rounded-2xl bg-[rgba(12,74,110,0.03)] border border-[rgba(12,74,110,0.06)] overflow-hidden cursor-pointer group"
                onClick={() => setActive(active === index ? null : index)}
                whileHover={{
                  borderColor: `${industry.color}30`,
                  boxShadow: `0 0 40px ${industry.color}10`,
                }}
                layout
                transition={{ layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
              >
                {/* Main content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.span
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {industry.emoji}
                    </motion.span>
                    <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-heading)]">
                      {industry.name}
                    </h3>
                    <motion.div
                      className="ml-auto w-6 h-6 rounded-full border border-border flex items-center justify-center text-text-muted"
                      animate={{ rotate: active === index ? 45 : 0 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                {/* Expandable features */}
                <AnimatePresence>
                  {active === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-border">
                        <p className="text-xs text-text-muted/60 uppercase tracking-wider mb-3">
                          Key Features
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {industry.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm text-text-muted"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: industry.color }}
                              />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
