import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from 'react-icons/fi';
import PageTransition from '../components/layout/PageTransition';
import SectionReveal from '../components/ui/SectionReveal';
import AnimatedText from '../components/ui/AnimatedText';

const contactCards = [
  { icon: FiMail, label: 'Email', value: 'hello@receptai.com', href: 'mailto:hello@receptai.com' },
  { icon: FiPhone, label: 'Phone', value: '+1 (888) 555-0123', href: 'tel:+18885550123' },
  { icon: FiMapPin, label: 'Office', value: 'San Francisco, CA', href: '#' },
  { icon: FiMessageSquare, label: 'Live Chat', value: 'Available 24/7', href: '#' },
];

export default function Contact() {
  const [focused, setFocused] = useState('');

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 lg:px-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-6">Contact</motion.p>
          <AnimatedText text="Let's start a conversation." tag="h1" animation="words" className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-6 tracking-tight" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg text-text-muted">
            Have a question or want to learn more? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 lg:px-10 pb-10">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactCards.map((card, i) => (
            <SectionReveal key={card.label} delay={i * 0.1}>
              <motion.a
                href={card.href}
                className="block rounded-2xl bg-[rgba(12,74,110,0.03)] border border-border p-5 text-center group"
                whileHover={{ borderColor: 'rgba(255,122,0,0.2)', y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <card.icon size={20} className="text-accent" />
                </div>
                <p className="text-xs text-text-muted/50 mb-1">{card.label}</p>
                <p className="text-sm text-text-primary font-medium">{card.value}</p>
              </motion.a>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="px-6 lg:px-10 py-16">
        <div className="max-w-[640px] mx-auto">
          <SectionReveal>
            <div className="rounded-2xl bg-[rgba(12,74,110,0.03)] backdrop-blur-[25px] border border-[rgba(12,74,110,0.06)] p-8 md:p-10">
              <h3 className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-2 font-medium">First Name</label>
                    <input type="text" placeholder="John" onFocus={() => setFocused('first')} onBlur={() => setFocused('')}
                      className={`w-full py-3 px-4 rounded-xl border text-sm text-text-primary placeholder:text-text-muted/30 outline-none bg-transparent transition-all duration-300 ${focused === 'first' ? 'border-accent/40 bg-[rgba(255,122,0,0.03)]' : 'border-border bg-[rgba(12,74,110,0.02)]'}`} />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-2 font-medium">Last Name</label>
                    <input type="text" placeholder="Smith" onFocus={() => setFocused('last')} onBlur={() => setFocused('')}
                      className={`w-full py-3 px-4 rounded-xl border text-sm text-text-primary placeholder:text-text-muted/30 outline-none bg-transparent transition-all duration-300 ${focused === 'last' ? 'border-accent/40 bg-[rgba(255,122,0,0.03)]' : 'border-border bg-[rgba(12,74,110,0.02)]'}`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-2 font-medium">Email</label>
                  <input type="email" placeholder="you@company.com" onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    className={`w-full py-3 px-4 rounded-xl border text-sm text-text-primary placeholder:text-text-muted/30 outline-none bg-transparent transition-all duration-300 ${focused === 'email' ? 'border-accent/40 bg-[rgba(255,122,0,0.03)]' : 'border-border bg-[rgba(12,74,110,0.02)]'}`} />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-2 font-medium">Message</label>
                  <textarea rows={5} placeholder="Tell us about your business..." onFocus={() => setFocused('msg')} onBlur={() => setFocused('')}
                    className={`w-full py-3 px-4 rounded-xl border text-sm text-text-primary placeholder:text-text-muted/30 outline-none bg-transparent resize-none transition-all duration-300 ${focused === 'msg' ? 'border-accent/40 bg-[rgba(255,122,0,0.03)]' : 'border-border bg-[rgba(12,74,110,0.02)]'}`} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(255,122,0,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-accent text-bg-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-accent-secondary transition-colors cursor-pointer"
                >
                  Send Message <FiSend size={16} />
                </motion.button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
