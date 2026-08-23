import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';

const faqs = [
  {
    q: 'How does the AI receptionist work?',
    a: 'Our AI receptionist uses advanced natural language processing to understand callers, answer questions, check your real-time calendar availability, book appointments, and send instant notifications — all in a natural-sounding conversation.',
  },
  {
    q: 'Will customers know they\'re talking to an AI?',
    a: 'Our voice AI is designed to sound completely natural and human-like. Most callers won\'t be able to tell the difference. You can also customize the voice, tone, and personality to match your brand.',
  },
  {
    q: 'How quickly can I set up my AI receptionist?',
    a: 'Setup takes less than 15 minutes. Connect your phone number, configure your business hours and services, sync your calendar, and you\'re live. Our onboarding wizard guides you through every step.',
  },
  {
    q: 'What happens if the AI can\'t handle a call?',
    a: 'The AI is designed to handle 99%+ of calls. In rare cases where it can\'t, it gracefully transfers the call to you or takes a detailed message with full context, so you can follow up immediately.',
  },
  {
    q: 'Does it integrate with my existing calendar?',
    a: 'Yes! ReceptAI integrates with Google Calendar, Microsoft Outlook, Apple Calendar, Calendly, and many more. Appointments are synced in real-time to prevent double bookings.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Absolutely. Start with a 14-day free trial with full access to all features. No credit card required. Cancel anytime during the trial with zero charges.',
  },
  {
    q: 'Can I customize what the AI says?',
    a: 'Yes, you have full control over the AI\'s scripts, personality, greeting, and responses. You can set specific FAQs, business policies, and custom workflows for different call types.',
  },
  {
    q: 'How secure is my data?',
    a: 'We take security seriously. All data is encrypted at rest and in transit with AES-256. We\'re SOC 2 Type II compliant, HIPAA-ready, and GDPR compliant. Call recordings are stored securely with role-based access.',
  },
];

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      className="border-b border-border last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="text-base font-medium text-text-primary pr-8 group-hover:text-accent transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="shrink-0 w-8 h-8 rounded-lg bg-[rgba(12,74,110,0.04)] border border-border flex items-center justify-center text-text-muted group-hover:border-accent/20 group-hover:text-accent transition-colors"
        >
          <FiChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-text-muted leading-relaxed max-w-[680px]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-28 px-6 lg:px-10" id="faq">
      <div className="max-w-[800px] mx-auto">
        <SectionReveal className="text-center mb-16">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Got <span className="text-gradient">questions?</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[500px] mx-auto">
            Everything you need to know about ReceptAI.
          </p>
        </SectionReveal>

        <SectionReveal>
          <div className="rounded-2xl bg-[rgba(12,74,110,0.02)] border border-border p-2 md:p-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
