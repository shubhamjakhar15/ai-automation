import { motion } from 'framer-motion';
import { FiPhone, FiCalendar, FiBarChart2, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import SectionReveal from '../components/ui/SectionReveal';
import AnimatedText from '../components/ui/AnimatedText';
import AnimatedButton from '../components/ui/AnimatedButton';

const services = [
  {
    emoji: '💇', name: 'Salon AI', industry: 'Hair Salons & Barbershops',
    description: 'AI receptionist that books haircuts, colors, treatments, manages stylist preferences, and handles walk-in inquiries.',
    workflow: ['Customer calls', 'AI checks stylist schedule', 'Books preferred slot', 'Sends SMS confirmation'],
    benefits: ['40% more bookings', 'Zero missed calls', 'Stylist preference memory', 'Wait-time estimates'],
  },
  {
    emoji: '🍽️', name: 'Restaurant AI', industry: 'Restaurants & Cafés',
    description: 'Handles reservations, takeout orders, special dietary requests, and wait-list management during peak hours.',
    workflow: ['Customer calls', 'AI checks table availability', 'Makes reservation', 'Confirms party details'],
    benefits: ['Peak hour handling', 'Dietary tracking', 'Wait-list management', 'Special occasion notes'],
  },
  {
    emoji: '🦷', name: 'Clinic AI', industry: 'Dental & Medical Clinics',
    description: 'Schedules checkups, emergency visits, screens urgency, and sends appointment reminders.',
    workflow: ['Patient calls', 'AI screens urgency', 'Finds next available slot', 'Sends confirmation + reminders'],
    benefits: ['Emergency triage', 'Insurance pre-check', 'Automated reminders', 'Follow-up scheduling'],
  },
  {
    emoji: '🏨', name: 'Hotel AI', industry: 'Hotels & Hospitality',
    description: 'Manages room reservations, concierge requests, room service, and local recommendations.',
    workflow: ['Guest calls', 'AI checks room inventory', 'Books room with preferences', 'Sends booking details'],
    benefits: ['24/7 concierge', 'Room upgrades', 'Multi-language', 'Local recommendations'],
  },
  {
    emoji: '💪', name: 'Gym AI', industry: 'Fitness & Gyms',
    description: 'Manages class bookings, membership inquiries, personal training sessions, and guest passes.',
    workflow: ['Member calls', 'AI checks class schedule', 'Books spot', 'Sends workout reminder'],
    benefits: ['Class scheduling', 'Membership info', 'Trainer matching', 'Guest passes'],
  },
  {
    emoji: '🔧', name: 'Repair Shop AI', industry: 'Auto & Repair Services',
    description: 'Schedules repair appointments, provides estimates, and sends status updates on ongoing work.',
    workflow: ['Customer calls', 'AI gathers vehicle info', 'Schedules service', 'Sends status updates'],
    benefits: ['Instant quotes', 'Status tracking', 'Parts availability', 'Service history'],
  },
];

export default function Services() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-6"
          >
            Services
          </motion.p>
          <AnimatedText
            text="AI tailored for your industry."
            tag="h1"
            animation="words"
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-6 tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-text-muted leading-relaxed"
          >
            Every industry has unique needs. Our AI adapts its workflow, language, and capabilities to match yours perfectly.
          </motion.p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-10 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {services.map((service, index) => (
            <SectionReveal key={service.name} delay={index * 0.05}>
              <motion.div
                className="rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border overflow-hidden group"
                whileHover={{ borderColor: 'rgba(255,122,0,0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left */}
                    <div className="lg:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{service.emoji}</span>
                        <div>
                          <h3 className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)]">{service.name}</h3>
                          <p className="text-sm text-accent">{service.industry}</p>
                        </div>
                      </div>
                      <p className="text-text-muted leading-relaxed mb-6">{service.description}</p>

                      {/* Benefits */}
                      <div className="grid grid-cols-2 gap-3">
                        {service.benefits.map((b) => (
                          <div key={b} className="flex items-center gap-2 text-sm text-text-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right — Workflow */}
                    <div className="lg:w-1/2">
                      <p className="text-xs text-text-muted/50 uppercase tracking-wider mb-4 font-medium">Workflow</p>
                      <div className="space-y-3">
                        {service.workflow.map((step, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                          >
                            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-[11px] font-bold text-accent shrink-0">
                              {i + 1}
                            </div>
                            <div className="flex-1 py-2.5 px-4 rounded-xl bg-[rgba(12,74,110,0.03)] border border-border text-sm text-text-muted">
                              {step}
                            </div>
                            {i < service.workflow.length - 1 && (
                              <FiArrowRight size={12} className="text-text-muted/20 shrink-0 hidden md:block" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 lg:px-10">
        <SectionReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-6 tracking-tight">
            Don't see your industry? <span className="text-gradient">We adapt.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[500px] mx-auto mb-8">
            Our AI can be customized for any business type. Let's talk about your needs.
          </p>
          <Link to="/contact">
            <AnimatedButton variant="primary" size="lg">
              Contact Us
              <FiArrowRight size={16} />
            </AnimatedButton>
          </Link>
        </SectionReveal>
      </section>
    </PageTransition>
  );
}
