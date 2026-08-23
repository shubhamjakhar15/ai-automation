import { motion } from 'framer-motion';
import AnimatedButton from '../ui/AnimatedButton';
import MagneticButton from '../ui/MagneticButton';
import SectionReveal from '../ui/SectionReveal';

export default function CTA() {
  return (
    <section className="relative py-28 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[900px] mx-auto relative">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          {/* Aurora gradient */}
          <motion.div
            className="absolute inset-0 rounded-[40px]"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(255,122,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,167,51,0.08) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
            animate={{
              background: [
                'radial-gradient(ellipse at 30% 50%, rgba(255,122,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,167,51,0.08) 0%, transparent 60%)',
                'radial-gradient(ellipse at 70% 50%, rgba(255,122,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 50%, rgba(255,167,51,0.08) 0%, transparent 60%)',
                'radial-gradient(ellipse at 30% 50%, rgba(255,122,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,167,51,0.08) 0%, transparent 60%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <SectionReveal>
          <div className="relative rounded-3xl bg-[rgba(12,74,110,0.03)] border border-[rgba(12,74,110,0.08)] backdrop-blur-[20px] p-12 md:p-20 text-center overflow-hidden">
            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            {/* Floating accent dots */}
            <motion.div
              className="absolute top-6 left-6 w-2 h-2 rounded-full bg-accent/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-accent-secondary/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/3 right-10 w-1.5 h-1.5 rounded-full bg-highlight/20"
              animate={{ scale: [1, 2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-6"
            >
              Get Started Today
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-6 tracking-tight leading-[1.1]"
            >
              Ready to never miss
              <br />
              <span className="text-gradient">another customer?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-muted text-lg max-w-[450px] mx-auto mb-10"
            >
              Join 2,000+ businesses already using ReceptAI. Start your free trial today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
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
                  Talk to Sales
                </AnimatedButton>
              </MagneticButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-xs text-text-muted/40"
            >
              No credit card required · 14-day free trial · Cancel anytime
            </motion.p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
