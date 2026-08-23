import { motion } from 'framer-motion';
import { FiMic, FiUser, FiCpu } from 'react-icons/fi';
import SectionReveal from '../ui/SectionReveal';

const conversation = [
  { speaker: 'customer', text: "Hi, I'd like to book a haircut for tomorrow afternoon." },
  { speaker: 'ai', text: "Of course! I have openings at 2:00 PM and 3:30 PM. Which works best for you?" },
  { speaker: 'customer', text: "2 PM sounds perfect." },
  { speaker: 'ai', text: "Great! I've booked you for 2:00 PM tomorrow with Sarah. You'll receive a confirmation shortly. Is there anything else I can help with?" },
  { speaker: 'customer', text: "No, that's all. Thanks!" },
  { speaker: 'ai', text: "You're welcome! See you tomorrow at 2 PM. Have a great day!" },
];

function WaveformBar({ delay }) {
  return (
    <motion.div
      className="w-[3px] rounded-full bg-accent"
      animate={{
        height: ['12px', '36px', '20px', '40px', '16px', '32px', '12px'],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

export default function VoiceDemo() {
  return (
    <section className="relative py-28 px-6 lg:px-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            Voice AI
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Hear the <span className="text-gradient">difference.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto">
            Natural conversations that feel human. Your customers won't know it's AI.
          </p>
        </SectionReveal>

        <SectionReveal>
          <div className="relative rounded-3xl bg-[rgba(12,74,110,0.03)] border border-[rgba(12,74,110,0.06)] overflow-hidden backdrop-blur-[20px]">
            {/* Waveform Header */}
            <div className="flex items-center justify-center gap-3 py-8 border-b border-border">
              {/* Mic icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mr-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiMic size={24} className="text-accent" />
              </motion.div>
              {/* Audio bars */}
              <div className="flex items-center gap-[3px] h-[44px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <WaveformBar key={i} delay={i * 0.06} />
                ))}
              </div>
            </div>

            {/* Conversation */}
            <div className="p-6 md:p-8 space-y-4 max-h-[450px] overflow-y-auto">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`flex items-start gap-3 ${
                    msg.speaker === 'ai' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      msg.speaker === 'ai'
                        ? 'bg-accent/10'
                        : 'bg-[rgba(12,74,110,0.06)]'
                    }`}
                  >
                    {msg.speaker === 'ai' ? (
                      <FiCpu size={14} className="text-accent" />
                    ) : (
                      <FiUser size={14} className="text-text-muted" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.speaker === 'ai'
                        ? 'bg-accent/8 border border-accent/10 text-text-primary rounded-tl-sm'
                        : 'bg-[rgba(12,74,110,0.05)] border border-[rgba(12,74,110,0.06)] text-text-muted rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Booking confirmation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: conversation.length * 0.15, duration: 0.5 }}
                className="flex justify-center pt-4"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Appointment Confirmed — Tomorrow 2:00 PM
                </div>
              </motion.div>
            </div>

            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
