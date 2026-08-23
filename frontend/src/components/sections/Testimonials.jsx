import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';

const testimonials = [
  {
    name: 'Jessica Martinez',
    role: 'Owner, StyleCuts Salon',
    text: "We've increased bookings by 40% since switching to ReceptAI. It's like having a perfect receptionist who never takes a break.",
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Director, BrightSmile Dental',
    text: "Our patients love the instant response. Emergency calls are triaged perfectly, and our schedule is always optimized.",
    rating: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'Manager, FreshBites Restaurant',
    text: "No more missed reservations during rush hour. The AI handles everything smoothly while we focus on our guests.",
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Owner, FitZone Gym',
    text: "Class bookings, membership inquiries, personal training — the AI handles it all. Our front desk has never been this efficient.",
    rating: 5,
  },
  {
    name: 'Amanda Roberts',
    role: 'GM, LuxStay Hotels',
    text: "From room reservations to concierge requests, the AI provides a five-star experience that matches our brand perfectly.",
    rating: 5,
  },
  {
    name: 'Robert Kim',
    role: 'Partner, LegalEdge Law',
    text: "Client screening and consultation booking used to eat up hours. Now it's all automated and professional.",
    rating: 5,
  },
  {
    name: 'Lisa Chen',
    role: 'Founder, ZenSpa Wellness',
    text: "Our booking rate went up 60%. The AI recommends packages based on customer history. It's incredibly smart.",
    rating: 5,
  },
  {
    name: 'Tom Williams',
    role: 'Owner, AutoCare+ Service',
    text: "Customers get instant repair quotes and appointment slots. Our technicians can focus on what they do best.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      className="shrink-0 w-[340px] md:w-[380px] rounded-2xl bg-[rgba(12,74,110,0.03)] border border-[rgba(12,74,110,0.06)] p-6 mx-3 backdrop-blur-[15px]"
      whileHover={{
        y: -8,
        borderColor: 'rgba(255, 122, 0, 0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 30px rgba(255,122,0,0.05)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FiStar key={i} size={14} className="text-accent fill-accent" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-text-muted leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
          {testimonial.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
          <p className="text-xs text-text-muted/60">{testimonial.role}</p>
        </div>
      </div>

      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-t-2xl" />
    </motion.div>
  );
}

export default function Testimonials() {
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Loved by <span className="text-gradient">businesses.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto">
            Join thousands of businesses that trust ReceptAI to handle their customer calls.
          </p>
        </SectionReveal>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />
        <motion.div
          className="flex"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
