import { motion } from 'framer-motion';
import {
  FiPhone, FiCalendar, FiBarChart2, FiUsers, FiBell,
  FiMic, FiGrid, FiMessageSquare, FiMail, FiSmartphone,
  FiDisc, FiClock,
} from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';
import TiltCard from '../ui/TiltCard';

const features = [
  {
    icon: FiPhone,
    title: 'AI Phone Calls',
    description: 'Intelligent voice AI answers every call with natural conversation.',
    span: 'md:col-span-2 md:row-span-1',
    gradient: 'from-[#FF7A00]/10 to-transparent',
  },
  {
    icon: FiCalendar,
    title: 'Appointment Booking',
    description: 'Automatically books slots based on real-time availability.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FFA733]/10 to-transparent',
  },
  {
    icon: FiGrid,
    title: 'Live Dashboard',
    description: 'Real-time overview of calls, bookings, and customer activity.',
    span: 'md:col-span-1 md:row-span-2',
    gradient: 'from-[#FFD580]/10 to-transparent',
  },
  {
    icon: FiUsers,
    title: 'Customer CRM',
    description: 'Build customer profiles automatically from every interaction.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FF7A00]/10 to-transparent',
  },
  {
    icon: FiBarChart2,
    title: 'Analytics',
    description: 'Deep insights into call patterns, peak hours, and conversion rates.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FFA733]/10 to-transparent',
  },
  {
    icon: FiBell,
    title: 'Notifications',
    description: 'Instant alerts via push, email, and SMS for every booking.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FFD580]/10 to-transparent',
  },
  {
    icon: FiClock,
    title: 'Calendar Sync',
    description: 'Syncs with Google Calendar, Outlook, and Apple Calendar.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FF7A00]/10 to-transparent',
  },
  {
    icon: FiMic,
    title: 'Voice AI',
    description: 'Human-like voice that understands context and intent.',
    span: 'md:col-span-2 md:row-span-1',
    gradient: 'from-[#FFA733]/10 to-transparent',
  },
  {
    icon: FiDisc,
    title: 'Call Recording',
    description: 'Every call is recorded and transcribed for quality review.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FFD580]/10 to-transparent',
  },
  {
    icon: FiMessageSquare,
    title: 'WhatsApp',
    description: 'Extend your AI receptionist to WhatsApp conversations.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FF7A00]/10 to-transparent',
  },
  {
    icon: FiSmartphone,
    title: 'SMS',
    description: 'Send confirmations, reminders, and follow-ups via SMS.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FFA733]/10 to-transparent',
  },
  {
    icon: FiMail,
    title: 'Email',
    description: 'Automated email confirmations and appointment summaries.',
    span: 'md:col-span-1 md:row-span-1',
    gradient: 'from-[#FFD580]/10 to-transparent',
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-28 px-6 lg:px-10" id="features">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <SectionReveal className="text-center mb-20">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Everything you need.
            <br />
            <span className="text-gradient">Nothing you don't.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto">
            A complete AI receptionist platform with every tool your business needs to never miss a customer.
          </p>
        </SectionReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {features.map((feature, index) => (
            <SectionReveal
              key={feature.title}
              delay={index * 0.05}
              className={feature.span}
            >
              <TiltCard tiltAmount={5} glare className="h-full">
                <motion.div
                  className="relative h-full rounded-2xl bg-[rgba(12,74,110,0.03)] border border-[rgba(12,74,110,0.06)] p-6 flex flex-col justify-between overflow-hidden group cursor-default"
                  whileHover={{
                    borderColor: 'rgba(255, 122, 0, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-[rgba(255,122,0,0.1)] flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <feature.icon size={20} className="text-accent" />
                    </motion.div>
                    <h3 className="text-base font-semibold text-text-primary mb-2 font-[family-name:var(--font-heading)]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="relative z-10 text-sm text-text-muted leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Top highlight line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </motion.div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
