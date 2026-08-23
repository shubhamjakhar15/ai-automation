import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionReveal from '../ui/SectionReveal';

function MiniChart({ data, color, delay }) {
  return (
    <motion.div
      className="flex items-end gap-[2px] h-[40px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {data.map((h, i) => (
        <motion.div
          key={i}
          className="w-[6px] rounded-sm"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.05, duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
}

export default function DashboardPreview() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={sectionRef} className="relative py-28 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
            Dashboard
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-[family-name:var(--font-heading)] text-text-primary mb-5 tracking-tight">
            Your command <span className="text-gradient">center.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-[550px] mx-auto">
            A beautiful, real-time dashboard to monitor every call, booking, and customer interaction.
          </p>
        </SectionReveal>

        {/* 3D Dashboard Mockup */}
        <motion.div
          style={{
            rotateX,
            scale,
            y,
            transformPerspective: 1200,
            transformOrigin: 'center center',
          }}
          className="relative"
        >
          {/* Glow behind dashboard */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.08)_0%,transparent_70%)] blur-[40px] scale-110" />

          <div className="rounded-2xl border border-[rgba(12,74,110,0.08)] bg-[rgba(12,74,110,0.02)] backdrop-blur-[20px] overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(12,74,110,0.06)] bg-[rgba(12,74,110,0.02)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-[rgba(12,74,110,0.04)] text-[11px] text-text-muted/40 font-mono">
                  dashboard.receptai.com
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex min-h-[420px]">
              {/* Sidebar */}
              <motion.div
                className="hidden md:flex flex-col w-[200px] border-r border-[rgba(12,74,110,0.06)] bg-[rgba(12,74,110,0.01)] p-4 gap-1"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {['Overview', 'Calls', 'Appointments', 'Customers', 'Analytics', 'Settings'].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        i === 0
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-muted/40 hover:text-text-muted/60'
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </motion.div>

              {/* Main area */}
              <div className="flex-1 p-5 md:p-6">
                {/* Stat cards row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Total Calls', value: '1,247', change: '+12%', chart: [30, 50, 45, 70, 60, 80, 90, 75, 85, 95] },
                    { label: 'Bookings', value: '384', change: '+8%', chart: [20, 35, 45, 40, 55, 50, 65, 70, 60, 80] },
                    { label: 'Revenue', value: '$18.2K', change: '+23%', chart: [40, 30, 50, 45, 65, 55, 70, 80, 75, 90] },
                    { label: 'Success Rate', value: '99.2%', change: '+2%', chart: [80, 85, 82, 88, 90, 87, 92, 94, 91, 95] },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="rounded-xl bg-[rgba(12,74,110,0.03)] border border-[rgba(12,74,110,0.06)] p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <p className="text-[10px] text-text-muted/50 mb-1">{stat.label}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-lg font-bold text-text-primary font-[family-name:var(--font-heading)]">
                          {stat.value}
                        </p>
                        <span className="text-[10px] text-green-400 font-medium">{stat.change}</span>
                      </div>
                      <div className="mt-2">
                        <MiniChart data={stat.chart} color="#FF7A00" delay={0.5 + i * 0.1} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Activity chart placeholder */}
                <motion.div
                  className="rounded-xl bg-[rgba(12,74,110,0.02)] border border-[rgba(12,74,110,0.06)] p-5 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-text-muted/60">Call Activity</p>
                    <div className="flex gap-2">
                      {['7D', '30D', '90D'].map((t, i) => (
                        <span
                          key={t}
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            i === 0 ? 'bg-accent/10 text-accent' : 'text-text-muted/30'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Faux chart bars */}
                  <div className="flex items-end gap-[3px] h-[100px]">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30;
                      return (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-accent/30"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.9 + i * 0.02, duration: 0.4 }}
                        />
                      );
                    })}
                  </div>
                </motion.div>

                {/* Recent calls row */}
                <motion.div
                  className="rounded-xl bg-[rgba(12,74,110,0.02)] border border-[rgba(12,74,110,0.06)] p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                >
                  <p className="text-xs font-medium text-text-muted/60 mb-3">Recent Calls</p>
                  {[
                    { name: 'Sarah M.', type: 'Booking', time: '2 min ago', status: 'Completed' },
                    { name: 'James L.', type: 'Inquiry', time: '8 min ago', status: 'Completed' },
                    { name: 'Emily R.', type: 'Booking', time: '15 min ago', status: 'Completed' },
                  ].map((call, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-[rgba(12,74,110,0.03)] last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-[9px] font-bold text-accent">
                          {call.name[0]}
                        </div>
                        <div>
                          <p className="text-[11px] text-text-primary font-medium">{call.name}</p>
                          <p className="text-[9px] text-text-muted/40">{call.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-green-400">{call.status}</p>
                        <p className="text-[9px] text-text-muted/30">{call.time}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
