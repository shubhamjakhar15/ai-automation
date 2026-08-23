import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';
import AnimatedButton from '../ui/AnimatedButton';

const plans = [
  {
    name: 'Starter',
    monthly: 49,
    yearly: 39,
    description: 'Perfect for small businesses getting started.',
    features: [
      '100 AI calls/month',
      'Basic appointment booking',
      'Email notifications',
      'Standard voice',
      '1 phone number',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    monthly: 99,
    yearly: 79,
    description: 'For growing businesses that need more power.',
    features: [
      '500 AI calls/month',
      'Advanced booking + CRM',
      'SMS + Email notifications',
      'Premium voice',
      '3 phone numbers',
      'WhatsApp integration',
      'Call recording',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: 249,
    yearly: 199,
    description: 'For businesses that demand the best.',
    features: [
      'Unlimited AI calls',
      'Full platform access',
      'All notification channels',
      'Custom AI voice',
      'Unlimited phone numbers',
      'All integrations',
      'API access',
      'Custom workflows',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="relative py-28 px-6 lg:px-10" id="pricing">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Simple, <span className="text-gradient">transparent</span> pricing.
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto mb-10">
            No hidden fees. No surprises. Start free and scale as you grow.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-[rgba(12,74,110,0.04)] border border-border">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                !yearly
                  ? 'bg-accent text-bg-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                yearly
                  ? 'bg-accent text-bg-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Yearly
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">
                -20%
              </span>
            </button>
          </div>
        </SectionReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.1}>
              <motion.div
                className={`relative rounded-2xl p-[1px] h-full ${
                  plan.popular
                    ? 'bg-gradient-to-b from-accent/40 via-accent/10 to-transparent'
                    : 'bg-[rgba(12,74,110,0.06)]'
                }`}
                whileHover={{
                  boxShadow: plan.popular
                    ? '0 0 60px rgba(255,122,0,0.15), 0 20px 60px rgba(0,0,0,0.3)'
                    : '0 20px 60px rgba(0,0,0,0.3)',
                  y: -4,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl bg-bg-secondary p-7 h-full flex flex-col">
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <motion.span
                        className="px-4 py-1 rounded-full text-[11px] font-bold bg-accent text-bg-primary"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Most Popular
                      </motion.span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-text-primary font-[family-name:var(--font-heading)] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-6">
                    <motion.span
                      key={yearly ? 'y' : 'm'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-extrabold text-text-primary font-[family-name:var(--font-heading)]"
                    >
                      ${yearly ? plan.yearly : plan.monthly}
                    </motion.span>
                    <span className="text-text-muted text-sm mb-1">/month</span>
                  </div>

                  {/* CTA */}
                  <AnimatedButton
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full mb-8"
                  >
                    {plan.cta}
                  </AnimatedButton>

                  {/* Features */}
                  <div className="flex-1">
                    <p className="text-[11px] text-text-muted/50 uppercase tracking-wider mb-3 font-medium">
                      What's included
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <FiCheck size={16} className="text-accent shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
