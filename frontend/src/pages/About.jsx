import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiZap, FiShield, FiUsers } from 'react-icons/fi';
import PageTransition from '../components/layout/PageTransition';
import SectionReveal from '../components/ui/SectionReveal';
import AnimatedText from '../components/ui/AnimatedText';
import Counter from '../components/ui/Counter';

const values = [
  { icon: FiTarget, title: 'Customer First', description: 'Every decision starts with how it impacts businesses and their customers.' },
  { icon: FiZap, title: 'Relentless Innovation', description: 'We push the boundaries of what voice AI can do, every single day.' },
  { icon: FiShield, title: 'Trust & Security', description: 'Your data is sacred. We protect it with enterprise-grade security.' },
  { icon: FiHeart, title: 'Simplicity', description: 'Powerful technology should feel effortless to use.' },
  { icon: FiUsers, title: 'Inclusivity', description: 'AI that works for every business, in every industry, at every scale.' },
  { icon: FiEye, title: 'Transparency', description: 'No hidden fees, no black boxes. You always know exactly what our AI does.' },
];

const milestones = [
  { year: '2022', title: 'Founded', description: 'Started with a vision to eliminate missed business calls.' },
  { year: '2023', title: 'First 100 Customers', description: 'Launched beta and onboarded our first 100 businesses.' },
  { year: '2023', title: 'Series A', description: 'Raised $12M to scale our AI voice technology.' },
  { year: '2024', title: '1,000+ Businesses', description: 'Crossed 1,000 active businesses across 15 industries.' },
  { year: '2025', title: 'Global Expansion', description: 'Launched in 12 countries with multi-language AI support.' },
  { year: '2026', title: '2,000+ Businesses', description: 'Serving 2,000+ businesses with 99.9% uptime.' },
];

const stats = [
  { value: 2000, suffix: '+', label: 'Businesses' },
  { value: 5, suffix: 'M+', label: 'Calls Handled' },
  { value: 99, suffix: '.9%', label: 'Uptime' },
  { value: 12, suffix: '', label: 'Countries' },
];

export default function About() {
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
            About Us
          </motion.p>
          <AnimatedText
            text="Building the future of business communication."
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
            We believe no business should ever miss a customer call. ReceptAI was born from the frustration of watching small businesses lose revenue to missed calls and outdated phone systems.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border">
                <div className="text-3xl md:text-4xl font-extrabold text-text-primary font-[family-name:var(--font-heading)] mb-1">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-8">
          <SectionReveal>
            <div className="rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border p-8 h-full">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <FiTarget size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-4">Our Mission</h3>
              <p className="text-text-muted leading-relaxed">
                To empower every business with AI-powered communication that ensures no customer call goes unanswered, no appointment gets missed, and no revenue is left on the table.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border p-8 h-full">
              <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center mb-5">
                <FiEye size={24} className="text-accent-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-4">Our Vision</h3>
              <p className="text-text-muted leading-relaxed">
                A world where every business, regardless of size, has access to an intelligent AI employee that handles customer communication with the same care and quality as a world-class receptionist.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-heading)] text-text-primary tracking-tight">
              Our <span className="text-gradient">Journey</span>
            </h2>
          </SectionReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {milestones.map((milestone, i) => (
              <SectionReveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${i % 2 === 0 ? 'right' : 'left'}`}>
                  {/* Dot */}
                  <div className="absolute left-[20px] md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-bg-primary -translate-x-1/2 mt-1.5 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <span className="text-xs text-accent font-bold">{milestone.year}</span>
                    <h4 className="text-lg font-semibold text-text-primary mt-1 mb-1">{milestone.title}</h4>
                    <p className="text-sm text-text-muted">{milestone.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-heading)] text-text-primary tracking-tight">
              Our <span className="text-gradient">Values</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, i) => (
              <SectionReveal key={value.title} delay={i * 0.08}>
                <motion.div
                  className="rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border p-6 h-full group"
                  whileHover={{ borderColor: 'rgba(255,122,0,0.15)', y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <value.icon size={20} className="text-accent" />
                  </motion.div>
                  <h3 className="text-base font-semibold text-text-primary mb-2 font-[family-name:var(--font-heading)]">{value.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
