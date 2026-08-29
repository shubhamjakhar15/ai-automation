import React, { useEffect, useState } from 'react';
import { Building2, Check, ArrowRight, Sparkles, ShieldCheck, Zap, Bot, BarChart3, Phone, Calendar, ArrowLeft, User, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function CustomAiTrial() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Build and train one custom AI Agent.",
    "Define specific tasks and conversation flows.",
    "Real-time voice and text interaction testing.",
    "Simulated task execution (e.g., booking).",
    "Usage and conversation analytics.",
    "Access to industry-specific AI templates.",
    "Priority support & post-trial review."
  ];

  const features = [
    { icon: <Bot size={18} />, title: "Custom Agent Creation", desc: "A tailored AI that knows your business." },
    { icon: <Phone size={18} />, title: "Live Call Handling", desc: "Test real voice interactions safely." },
    { icon: <Calendar size={18} />, title: "Workflow Automation", desc: "Connect your calendar or CRM." },
    { icon: <BarChart3 size={18} />, title: "Performance Insights", desc: "Track conversions and sentiment." }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- FORM VIEW (When Signed In) ---
  if (isSignedIn) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-slate-50 text-slate-900 font-sans flex flex-col justify-center pt-24 pb-12">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)" }} />
        </div>

        <nav className="absolute top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-20">
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

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 flex flex-col md:flex-row gap-10 md:gap-12 items-center">
          <div className="flex-1 w-full text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-blue-100/50 border border-blue-200/60 shadow-sm">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-[12px] font-bold text-blue-700 uppercase tracking-wider">Final Step</span>
            </div>
            <h1 className="text-4xl md:text-[2.75rem] font-extrabold mb-6 tracking-tight leading-[1.1] text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Let's customize your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">AI Agent</span>
            </h1>
            <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Tell us a bit about yourself so we can tailor the AI receptionist to your specific business needs and location.
            </p>

            <div className="hidden md:flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl border border-white backdrop-blur-sm shadow-sm max-w-md">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-slate-900 text-sm">Industry Specific</h4>
                  <p className="text-sm text-slate-500">Trained on data from your field</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl border border-white backdrop-blur-sm shadow-sm max-w-md">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-slate-900 text-sm">Quick Setup</h4>
                  <p className="text-sm text-slate-500">Live within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[24px] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>You're all set!</h2>
                  <p className="text-slate-600 mb-8 text-sm leading-relaxed">We've received your details. Our team will contact you shortly with your custom AI agent access.</p>
                  <button onClick={() => navigate('/')} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors w-full">
                    Return to Home
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>Trial Details</h2>
                    <p className="text-slate-500 text-[13px] mt-1 font-medium">Please fill in your contact information.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User size={16} />
                        </div>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 text-[14px] font-medium placeholder:text-slate-400"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail size={16} />
                        </div>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          readOnly={!!user?.primaryEmailAddress}
                          className={`w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-[14px] font-medium ${!!user?.primaryEmailAddress ? 'bg-slate-100/70 text-slate-500 cursor-not-allowed' : 'bg-slate-50 text-slate-900 placeholder:text-slate-400'}`}
                          placeholder="john@company.com"
                        />
                      </div>
                      {!!user?.primaryEmailAddress && (
                        <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
                          <CheckCircle2 size={12} className="text-green-500"/>
                          Auto-filled from your account
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone size={16} />
                        </div>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 text-[14px] font-medium placeholder:text-slate-400"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">City</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <MapPin size={16} />
                        </div>
                        <input 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 text-[14px] font-medium placeholder:text-slate-400"
                          placeholder="New York, NY"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full mt-2 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-[0_8px_25px_-6px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Complete Setup
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LANDING PAGE VIEW (When Not Signed In) ---
  return (
    <div className="min-h-screen relative overflow-hidden bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-100/50 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, #000 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, #000 40%, transparent 100%)" }} />
      </div>

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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 flex-1 flex items-center justify-center min-h-0 py-12 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 bg-blue-50 border border-blue-100/60 shadow-sm w-max">
              <Sparkles size={12} className="text-blue-600" />
              <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">14-Day Free Access</span>
            </div>
            
            <h1 className="text-3xl lg:text-[44px] font-extrabold leading-[1.1] mb-4 text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", letterSpacing: "-0.02em" }}>
              Experience your own <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-sky-500">Custom AI Agent.</span>
            </h1>
            
            <p className="text-[15px] text-slate-600 mb-6 max-w-xl leading-relaxed">
              Don't just imagine how AI can transform your business. Let us build a tailored AI receptionist for you, free for 14 days. See it handle real calls and book appointments.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3 group items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-0.5 text-[14px]">{f.title}</h4>
                    <p className="text-[12px] text-slate-500 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600 bg-white/70 backdrop-blur-md rounded-xl p-3.5 border border-slate-200/60 shadow-sm max-w-md">
              <ShieldCheck size={24} className="text-emerald-500 shrink-0" />
              <p className="leading-snug">No credit card required. Cancel anytime. Full support included during your trial.</p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_8px_30px_2px_rgba(59,130,246,0.12)] relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 w-full max-w-[440px]">
              
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Building2 size={24} className="text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="bg-emerald-50 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-full text-emerald-700 uppercase tracking-wide shadow-sm">
                  Risk-Free Trial
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-1.5 text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                Custom AI Automation Plan
              </h2>
              <p className="text-[13px] text-slate-500 mb-5 font-medium">
                Everything you need to deploy a fully functional AI agent for your business.
              </p>

              <div className="rounded-xl p-3.5 mb-5 bg-slate-50/80 border border-slate-100">
                <h3 className="font-semibold text-[13px] mb-1 text-slate-900">Trial Platform Access</h3>
                <div className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug">
                  <Zap size={14} className="text-amber-500 shrink-0 mt-0.5 fill-amber-100" />
                  <p>14 days of unrestricted access to your custom AI build and testing environment.</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-[13px] text-slate-900 mb-3">What's included in your trial:</p>
                <ul className="space-y-2.5">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12px] text-slate-600 font-medium">
                      <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100/50">
                        <Check size={10} className="text-blue-600 font-bold" strokeWidth={3} />
                      </div>
                      <span className="leading-snug opacity-90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/signup" className="block w-full">
                <button className="w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl text-[14px] transition-all duration-300 shadow-[0_8px_25px_-6px_rgba(59,130,246,0.5)] hover:shadow-[0_12px_30px_-4px_rgba(59,130,246,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 group">
                  Start Your Free Trial
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <p className="text-center text-[11px] font-medium text-slate-400 mt-3">Takes 2 minutes to set up. No coding required.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
