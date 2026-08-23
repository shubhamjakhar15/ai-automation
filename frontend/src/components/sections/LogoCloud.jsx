import { motion } from 'framer-motion';
import SectionReveal from '../ui/SectionReveal';

const logos = [
  'StyleCuts', 'BrightSmile', 'FreshBites', 'FitZone', 'LuxStay',
  'AutoCare+', 'HomeKey', 'LegalEdge', 'TutorPro', 'ZenSpa',
  'FixIt Hub', 'PetCare', 'CleanPro', 'MediQuick', 'EventFlow',
];

function LogoItem({ name }) {
  return (
    <div className="flex items-center justify-center px-8 md:px-12 shrink-0">
      <span className="text-lg md:text-xl font-bold font-[family-name:var(--font-heading)] text-text-muted/20 hover:text-text-muted/40 transition-colors duration-500 whitespace-nowrap select-none">
        {name}
      </span>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative py-20 overflow-hidden">
      <SectionReveal>
        <p className="text-center text-sm text-text-muted/50 uppercase tracking-[0.2em] font-medium mb-10">
          Trusted by leading businesses worldwide
        </p>
      </SectionReveal>

      {/* Marquee Row 1 */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <motion.div
          className="flex items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...logos, ...logos].map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative mt-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <motion.div
          className="flex items-center"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...logos.slice().reverse(), ...logos.slice().reverse()].map((name, i) => (
            <LogoItem key={`r-${name}-${i}`} name={name} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
