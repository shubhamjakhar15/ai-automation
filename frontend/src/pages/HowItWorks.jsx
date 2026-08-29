import React, { useEffect } from 'react';
import { Bot, Phone, Zap, ArrowRight, CheckCircle2, ShieldCheck, Clock, Briefcase, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-100/50 blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-indigo-100/40 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, #000 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, #000 40%, transparent 100%)" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-20 mx-auto w-full max-w-7xl px-6 py-4 flex items-center justify-between shrink-0">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-500/20">
            <Phone size={14} color="#fff" />
          </div>
          <span className="font-bold text-[14px] tracking-tight">Receptio<span className="text-blue-600">AI</span></span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pb-24">
        
        {/* HERO SECTION */}
        <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-blue-50 border border-blue-100 shadow-sm w-max mx-auto">
              <Zap size={14} className="text-blue-600" />
              <span className="text-[12px] font-bold text-blue-700 uppercase tracking-wider">How it works</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Automate your business. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Scale without limits.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover how ReceptioAI replaces manual tasks with intelligent digital workers that operate 24/7, engaging your customers and managing your workflows flawlessly.
            </p>
          </motion.div>
        </section>

        {/* THE PROBLEM WE SOLVE */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Problem We Solve</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Businesses lose revenue daily due to missed calls, delayed responses, and staff overwhelmed by repetitive administrative tasks.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Phone size={24} />, title: "Missed Opportunities", desc: "62% of calls to small businesses go unanswered, leading to lost leads and revenue." },
              { icon: <Clock size={24} />, title: "Time Consumption", desc: "Your team spends hours on repetitive scheduling and basic inquiries instead of high-value work." },
              { icon: <Briefcase size={24} />, title: "Staffing Headaches", desc: "Hiring, training, and managing 24/7 support staff is expensive and difficult to scale." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-red-50/50 border border-red-100 rounded-3xl p-8 backdrop-blur-sm">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm border border-red-100 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A comprehensive suite of AI solutions designed to modernize how your business operates and interacts with customers.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              {[
                { icon: <Bot size={20} />, title: "Custom AI Chatbots", desc: "Intelligent web assistants trained exclusively on your business data to provide accurate, instant answers 24/7." },
                { icon: <Phone size={20} />, title: "Voice Assistants", desc: "Human-like AI phone receptionists that handle inbound and outbound calls, completely indistinguishable from real staff." },
                { icon: <Zap size={20} />, title: "Workflow Automation", desc: "Seamless integration with your CRM and calendar to automate lead qualification, data entry, and appointment booking." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-sky-500/10" />
              {/* Decorative elements representing AI connectivity */}
              <div className="relative z-10 text-center p-8">
                <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-3xl animate-ping opacity-20" />
                  <Bot size={40} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800">Your AI Digital Worker</h3>
                <p className="text-slate-500 font-medium">Ready to serve your clients</p>
                
                <div className="mt-8 flex justify-center gap-4">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Supports SMS</div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Integrates Anywhere</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS / SOLVES PROBLEM */}
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-blue-50/50 rounded-[100px] blur-3xl -z-10" />
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Transforms Your Business</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A simple, effective process that turns your biggest bottlenecks into automated success stories.</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 -translate-y-1/2 -z-0" />
            
            {[
              { step: "01", title: "We Analyze", desc: "We study your business logic, FAQs, and required workflows." },
              { step: "02", title: "We Build", desc: "Our team crafts a bespoke AI agent trained specifically on your data." },
              { step: "03", title: "We Integrate", desc: "We seamlessly connect the AI to your phone lines, website, and CRM." },
              { step: "04", title: "You Scale", desc: "Your new AI handles the busywork, allowing you to focus on growth." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xl rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto bg-slate-900 rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to step into the future?</h2>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Stop letting missed calls and manual tasks dictate your growth. Experience the power of AI automation today.</p>
              
              <Link to="/custom-ai-trial" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl">
                Start Your Free Trial <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
