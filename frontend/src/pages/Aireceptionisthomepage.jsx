import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Phone, Calendar, TrendingUp, BarChart3, Mic, Bell, MessageSquare, Mail,
  Clock, CheckCircle2, ArrowRight, Star, ChevronDown, Menu, X, Sparkles,
  Scissors, UtensilsCrossed, Building2, Dumbbell, Stethoscope, Gavel,
  Users,
  Waves,
  Wrench,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import VisionSection from "./VisionSection";
import WorkExplorations from "./WorkExplorations";
import DesignInMotion from "./DesignInMotion";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

/* ============================================================
   DESIGN TOKENS — Light Mode with Soft Blue Accents
   ============================================================ */
const T = {
  bg: "#FFFFFF",
  bg2: "#F0F7FF",
  card: "rgba(255, 255, 255, 0.85)",
  border: "rgba(203, 221, 243, 0.6)",
  accent: "#2563EB",       // Deep blue for primary actions/contrast
  accent2: "#3B82F6",      // Primary blue accent
  highlight: "#0284C7",    // Accent highlight blue
  softBlue: "#E0F2FE",     // Light blue background for cards/badges
  glow: "rgba(59, 130, 246, 0.25)",
  text: "#0F172A",         // Dark navy for high contrast readability
  text2: "#334155",        // Slate text for secondary details
  muted: "#64748B",        // Subtitle muted text
  success: "#10B981",
};

/* ============================================================
   GLOBAL STYLES
   ============================================================ */
function GlobalStyles() {
  return (
    <style>{`
      .ar-root{
        --bg:${T.bg}; --bg2:${T.bg2}; --card:${T.card}; --border:${T.border};
        --accent:${T.accent}; --accent2:${T.accent2}; --highlight:${T.highlight}; --softBlue:${T.softBlue};
        --glow:${T.glow}; --text:${T.text}; --text2:${T.text2}; --muted:${T.muted}; --success:${T.success};
        background:var(--bg); color:var(--text);
        font-family:'Inter',-apple-system,sans-serif;
        position:relative; overflow-x:hidden; min-height:100vh;
        cursor:none;
      }
      @media (max-width:900px){ .ar-root{ cursor:auto; } .ar-cursor-dot,.ar-cursor-ring{ display:none; } }
      .ar-root *{ box-sizing:border-box; }
      .ar-heading{ font-family:'Plus Jakarta Sans',Inter,sans-serif; letter-spacing:-0.02em; }
      .ar-mono{ font-family:'JetBrains Mono',monospace; }

      .ar-cursor-dot{ position:fixed; top:0; left:0; width:6px; height:6px; border-radius:50%;
        background:var(--accent2); pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
        transition:opacity .2s; }
      .ar-cursor-ring{ position:fixed; top:0; left:0; width:32px; height:32px; border-radius:50%;
        border:1px solid rgba(59,130,246,0.5); pointer-events:none; z-index:9998; transform:translate(-50%,-50%);
        transition:width .25s,height .25s,border-color .25s,background .25s; }
      .ar-cursor-ring.hover{ width:56px; height:56px; background:rgba(224,242,254,0.5); border-color:var(--accent2); }

      .ar-glass{ background:var(--card); border:1px solid var(--border); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); box-shadow: 0 10px 30px -10px rgba(186, 216, 255, 0.3); }

      @keyframes ar-drift{ 0%{ transform:translate(0,0) scale(1);} 50%{ transform:translate(3%,-4%) scale(1.08);} 100%{ transform:translate(0,0) scale(1);} }
      @keyframes ar-drift-2{ 0%{ transform:translate(0,0) scale(1);} 50%{ transform:translate(-4%,3%) scale(1.05);} 100%{ transform:translate(0,0) scale(1);} }
      @keyframes ar-grid-move{ 0%{ background-position:0 0;} 100%{ background-position:80px 80px;} }
      @keyframes ar-float{ 0%,100%{ transform:translateY(0) rotate(var(--r,0deg)); } 50%{ transform:translateY(-14px) rotate(var(--r,0deg)); } }
      @keyframes ar-float-slow{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-8px); } }
      @keyframes ar-pulse-ring{ 0%{ box-shadow:0 0 0 0 rgba(59,130,246,0.4);} 70%{ box-shadow:0 0 0 14px rgba(59,130,246,0);} 100%{ box-shadow:0 0 0 0 rgba(59,130,246,0);} }
      @keyframes ar-marquee{ 0%{ transform:translateX(0);} 100%{ transform:translateX(-50%);} }
      @keyframes ar-marquee-rev{ 0%{ transform:translateX(-50%);} 100%{ transform:translateX(0);} }
      @keyframes ar-blink{ 0%,100%{ opacity:1;} 50%{ opacity:.2;} }
      @keyframes ar-fadeUp{ from{ opacity:0; transform:translateY(28px);} to{ opacity:1; transform:translateY(0);} }
      @keyframes ar-bar{ 0%,100%{ transform:scaleY(.3);} 50%{ transform:scaleY(1);} }

      .ar-noise{ position:absolute; inset:0; opacity:0.015; pointer-events:none; mix-blend-mode:multiply;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

      .ar-grid-bg{ position:absolute; inset:-10%; opacity:0.6;
        background-image:linear-gradient(rgba(186, 216, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(186, 216, 255, 0.3) 1px, transparent 1px);
        background-size:80px 80px; animation:ar-grid-move 14s linear infinite;
        -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 20%, #000 40%, transparent 85%);
        mask-image:radial-gradient(ellipse 70% 60% at 50% 20%, #000 40%, transparent 85%); }

      .ar-reveal{ opacity:0; transform:translateY(28px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
      .ar-reveal.in{ opacity:1; transform:translateY(0); }

      .ar-btn-primary{ background:linear-gradient(180deg, var(--accent2), var(--accent)); color:#fff; position:relative; overflow:hidden;
        box-shadow:0 8px 25px -6px var(--glow); transition:transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s; }
      .ar-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 12px 30px -4px var(--glow); }
      .ar-btn-ghost{ background:var(--softBlue); border:1px solid var(--border); color:var(--text); transition:all .3s; }
      .ar-btn-ghost:hover{ background:#D0E7FF; border-color:rgba(59,130,246,0.3); }

      .ar-ripple{ position:absolute; border-radius:50%; background:rgba(255,255,255,0.6); transform:scale(0); animation:ar-ripple-anim .6s ease-out; pointer-events:none; }
      @keyframes ar-ripple-anim{ to{ transform:scale(3); opacity:0; } }

      .ar-card-tilt{ transition:transform .12s ease-out; transform-style:preserve-3d; will-change:transform; }

      .ar-shine::before{ content:''; position:absolute; top:0; left:-150%; width:60%; height:100%;
        background:linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 55%, transparent 100%);
        transform:skewX(-20deg); transition:left .8s cubic-bezier(.16,1,.3,1); pointer-events:none; }
      .ar-shine:hover::before{ left:150%; }

      .ar-marquee-track{ display:flex; width:max-content; animation:ar-marquee 32s linear infinite; }
      .ar-marquee-track.rev{ animation:ar-marquee-rev 40s linear infinite; }
      .ar-marquee-wrap:hover .ar-marquee-track{ animation-play-state:paused; }

      .ar-underline{ position:relative; }
      .ar-underline::after{ content:''; position:absolute; left:0; bottom:-3px; width:0; height:1.5px; background:var(--accent2); transition:width .35s cubic-bezier(.16,1,.3,1); }
      .ar-underline:hover::after{ width:100%; }

      .ar-faq-item{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s cubic-bezier(.16,1,.3,1); }
      .ar-faq-item.open{ grid-template-rows:1fr; }
      .ar-faq-inner{ overflow:hidden; }

      .ar-scrollbar-hide::-webkit-scrollbar{ display:none; }

      .ar-gradient-text{ background:linear-gradient(120deg, #1D4ED8, #0284C7); -webkit-background-clip:text; background-clip:text; color:transparent; }

      .ar-industry-card{ transition:transform .5s cubic-bezier(.16,1,.3,1); }
      .ar-industry-img{ transition:transform 1.1s cubic-bezier(.16,1,.3,1), filter .5s; }
      .ar-industry-card:hover .ar-industry-img{ transform:scale(1.12); }
      .ar-industry-card:hover{ transform:translateY(-6px); }

      .ar-progress-bar{ position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg, var(--accent2), var(--highlight)); z-index:60; transition:width .1s linear; }

      input::placeholder{ color:var(--muted); }
    `}</style>
  );
}

/* ============================================================
   HOOKS
   ============================================================ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(ease(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function useScrollMeta() {
  const [dir, setDir] = useState("up");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const max = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(max > 0 ? (y / max) * 100 : 0);
          setScrolled(y > 40);
          if (Math.abs(y - lastY) > 4) { setDir(y > lastY ? "down" : "up"); lastY = y; }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { dir, progress, scrolled };
}

function useTilt(intensity = 12) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * intensity}deg) rotateX(${-py * intensity}deg) translateZ(0)`;
  }, [intensity]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg)`;
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

function Ripple({ children, className, style, onClick, as: As = "button" }) {
  const handle = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const circle = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    circle.className = "ar-ripple";
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";
    el.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
    if (onClick) onClick(e);
  };
  return (
    <As className={className} style={{ position: "relative", overflow: "hidden", ...style }} onClick={handle}>
      {children}
    </As>
  );
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = mx + "px"; dotRef.current.style.top = my + "px"; }
      const target = e.target;
      const interactive = target.closest && target.closest("a,button,[data-hover]");
      ringRef.current && ringRef.current.classList.toggle("hover", !!interactive);
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={dotRef} className="ar-cursor-dot" /><div ref={ringRef} className="ar-cursor-ring" /></>);
}

/* ============================================================
   LIVING BACKGROUND (WHITE + LIGHT BLUE GLOWS)
   ============================================================ */
function LivingBackground() {
  const particles = Array.from({ length: 22 });
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(186, 216, 255, 0.45), transparent 70%)", filter: "blur(50px)", animation: "ar-drift 18s ease-in-out infinite" }} />
      <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full" style={{ background: "radial-gradient(circle, rgba(224, 242, 254, 0.6), transparent 70%)", filter: "blur(60px)", animation: "ar-drift-2 22s ease-in-out infinite" }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(186, 216, 255, 0.35), transparent 70%)", filter: "blur(50px)", animation: "ar-drift 26s ease-in-out infinite" }} />
      <div className="ar-grid-bg" />
      {particles.map((_, i) => {
        const size = 3 + (i % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const dur = 8 + (i % 10);
        return (
          <div key={i} className="absolute rounded-full" style={{
            left: `${left}%`, top: `${top}%`, width: size, height: size,
            background: i % 2 === 0 ? "var(--accent2)" : "var(--highlight)",
            opacity: 0.25, animation: `ar-float-slow ${dur}s ease-in-out infinite`, animationDelay: `${i * 0.4}s`,
          }} />
        );
      })}
      <div className="ar-noise" />
    </div>
  );
}

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
function ScrollProgressBar({ progress }) {
  return <div className="ar-progress-bar" style={{ width: `${progress}%` }} />;
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const { dir, scrolled } = useScrollMeta();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const links = ["Product", "Industries", "How it works", "Pricing", "FAQ"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${dir === "down" && scrolled ? "-translate-y-full" : "translate-y-0"}`}>
      <div className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-500 ${scrolled ? "mt-3" : "mt-6"}`}>
        <div className={`ar-glass flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500`} style={{ boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,0.08)" : "none" }}>
          <div className="flex items-center gap-2" data-hover>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent2), var(--accent))" }}>
              <Phone size={16} color="#fff" />
            </div>
            <span className="ar-heading font-bold text-[15px]">Receptio<span style={{ color: "var(--accent2)" }}>AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l} href="#" data-hover className="ar-underline text-sm font-medium" style={{ color: "var(--text2)" }}>{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <Link to="/login" data-hover className="text-sm px-4 py-2 rounded-lg ar-btn-ghost font-medium cursor-pointer">
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              {user ? (
                <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <img src={user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                </Link>
              ) : (
                <UserButton />
              )}
            </SignedIn>
            <Link to="/signup">
              <Ripple className="ar-btn-primary text-sm font-medium px-4 py-2 rounded-lg">
                <span data-hover>Start Free Trial</span>
              </Ripple>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} data-hover>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="ar-glass md:hidden mt-2 rounded-2xl p-5 flex flex-col gap-4">
            {links.map((l) => <a key={l} href="#" className="text-sm font-medium" style={{ color: "var(--text2)" }}>{l}</a>)}
            <Ripple className="ar-btn-primary text-sm font-medium px-4 py-2 rounded-lg text-center">Start Free Trial</Ripple>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ============================================================
   HERO — WAVEFORM SIGNATURE
   ============================================================ */
function WaveformRibbon({ playing = true }) {
  const bars = Array.from({ length: 40 });
  return (
    <div className="flex items-center gap-[3px] h-8">
      {bars.map((_, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2, background: i % 5 === 0 ? "var(--highlight)" : "var(--accent2)",
          height: `${20 + Math.sin(i) * 10 + (i % 7) * 4}%`,
          animation: playing ? `ar-bar ${0.6 + (i % 5) * 0.15}s ease-in-out infinite` : "none",
          animationDelay: `${i * 0.03}s`, transformOrigin: "center",
        }} />
      ))}
    </div>
  );
}

function DashCard({ icon, title, sub, tone = "accent", style, tiltIntensity = 8, delay = "0s" }) {
  const tilt = useTilt(tiltIntensity);
  return (
    <div
      ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
      className="ar-glass ar-card-tilt ar-shine rounded-2xl p-4 absolute"
      style={{ ...style, animation: `ar-float 6s ease-in-out infinite`, animationDelay: delay, boxShadow: "0 15px 35px -10px rgba(59,130,246,0.18)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: tone === "success" ? "rgba(16,185,129,0.12)" : "var(--softBlue)" }}>
          {icon}
        </div>
        <div>
          <div className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>{title}</div>
          <div className="text-[11px]" style={{ color: "var(--muted)" }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function HeroDashboard() {
  const wrapTilt = useTilt(5);
  return (
    <div ref={wrapTilt.ref} onMouseMove={wrapTilt.onMouseMove} onMouseLeave={wrapTilt.onMouseLeave}
      className="relative ar-card-tilt w-full max-w-[520px] mx-auto" style={{ height: 460 }}>
      <div className="ar-glass rounded-3xl absolute inset-0 p-6 flex flex-col gap-4" style={{ boxShadow: "0 25px 60px -15px rgba(59, 130, 246, 0.18)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--success)", animation: "ar-pulse-ring 2s infinite" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text2)" }}>Live receptionist</span>
          </div>
          <span className="ar-mono text-[10px]" style={{ color: "var(--muted)" }}>09:41 AM</span>
        </div>
        <div className="rounded-2xl p-4" style={{ background: "var(--softBlue)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Phone size={14} color="var(--accent2)" />
              <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>Incoming — Priya S.</span>
            </div>
            <span className="text-[10px] ar-mono font-medium" style={{ color: "var(--success)" }}>00:24</span>
          </div>
          <WaveformRibbon />
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          <div className="rounded-2xl p-3 flex flex-col justify-between" style={{ background: "#F8FAFC", border: "1px solid var(--border)" }}>
            <TrendingUp size={16} color="var(--success)" />
            <div>
              <div className="text-lg font-bold" style={{ color: "var(--text)" }}>$18,420</div>
              <div className="text-[10px]" style={{ color: "var(--muted)" }}>Booked revenue</div>
            </div>
          </div>
          <div className="rounded-2xl p-3 flex flex-col justify-between" style={{ background: "#F8FAFC", border: "1px solid var(--border)" }}>
            <BarChart3 size={16} color="var(--accent2)" />
            <div>
              <div className="text-lg font-bold" style={{ color: "var(--text)" }}>96%</div>
              <div className="text-[10px]" style={{ color: "var(--muted)" }}>Calls answered</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-3 flex items-center justify-between" style={{ background: "#F8FAFC", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <Calendar size={14} color="var(--accent2)" />
            <span className="text-xs font-medium" style={{ color: "var(--text2)" }}>Thu, 2:30 PM — Color + Cut</span>
          </div>
          <CheckCircle2 size={14} color="var(--success)" />
        </div>
      </div>

      <DashCard icon={<Bell size={16} color="var(--accent2)" />} title="New booking" sub="Just now · Riverside Clinic" style={{ top: -26, right: -24, width: 200 }} delay="0s" />
      <DashCard icon={<Users size={16} color="var(--success)" />} title="142 customers" sub="Managed this month" tone="success" style={{ bottom: -20, left: -32, width: 190 }} delay="1.2s" />
    </div>
  );
}

function Hero() {
  const [heroRef, spot, setSpot] = useSpotlight();
  return (
    <section ref={heroRef} onMouseMove={setSpot} className="relative pt-40 md:pt-48 pb-24 px-6 md:px-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{
        background: `radial-gradient(600px circle at ${spot.x}px ${spot.y}px, rgba(224,242,254,0.8), transparent 60%)`,
      }} />
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center relative">
        <div>
          <div className="ar-reveal in inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "var(--softBlue)", border: "1px solid var(--border)" }}>
            <Sparkles size={13} color="var(--accent2)" />
            <span className="text-xs font-medium" style={{ color: "var(--accent2)" }}>Trusted by 400+ service businesses</span>
          </div>
          <h1 className="ar-heading font-extrabold text-5xl md:text-[64px] leading-[1.05] mb-6" style={{ color: "var(--text)" }}>
            Never Miss<br />Another <span className="ar-gradient-text">Customer</span><br />Call.
          </h1>
          <p className="text-lg md:text-xl mb-9 max-w-md font-normal" style={{ color: "var(--text2)" }}>
            Your AI receptionist answers calls, books appointments, manages calendars, and works 24/7 — so you never lose business to a missed call again.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Ripple className="ar-btn-primary rounded-xl px-6 py-3.5 font-medium text-sm flex items-center gap-2">
              <span data-hover className="flex items-center gap-2">Start Free Trial <ArrowRight size={15} /></span>
            </Ripple>
            <Ripple className="ar-btn-ghost rounded-xl px-6 py-3.5 font-medium text-sm">
              <span data-hover>Book a Demo</span>
            </Ripple>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full ar-glass flex items-center justify-center text-[11px] font-semibold text-blue-900" style={{ background: `hsl(210, 80%, ${90 - i * 5}%)` }}>
                  {["PK", "AS", "RM", "JT"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>4.9/5 from 380+ business owners</div>
            </div>
          </div>
        </div>
        <HeroDashboard />
      </div>
      <ScrollHint />
    </section>
  );
}

function useSpotlight() {
  const ref = useRef(null);
  const [spot, setSpotState] = useState({ x: 400, y: 300 });
  const setSpot = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSpotState({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  return [ref, spot, setSpot];
}

function ScrollHint() {
  return (
    <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2 -bottom-2" style={{ color: "var(--muted)" }}>
      <div className="w-5 h-8 rounded-full border flex justify-center pt-1.5" style={{ borderColor: "var(--border)" }}>
        <div className="w-1 h-1.5 rounded-full" style={{ background: "var(--accent2)", animation: "ar-float-slow 1.6s ease-in-out infinite" }} />
      </div>
      <span className="text-[10px] ar-mono tracking-wide">SCROLL</span>
    </div>
  );
}

/* ============================================================
   LOGO CLOUD (marquee)
   ============================================================ */
function LogoMarquee() {
  const names = ["Bloom Salon", "Casa Bella", "The Grand Hotel", "Riverside Clinic", "Pulse Gym", "Serenity Spa", "Nolan & Co. Law", "AutoFix Garage", "Skyline Realty", "Ivy Tutors"];
  const row = [...names, ...names];
  return (
    <section className="py-14 border-y" style={{ borderColor: "var(--border)", background: "rgba(240, 247, 255, 0.4)" }}>
      <p className="text-center text-xs tracking-wide font-semibold mb-8" style={{ color: "var(--muted)" }}>POWERING FRONT DESKS FOR</p>
      <div className="ar-marquee-wrap ar-scrollbar-hide overflow-hidden">
        <div className="ar-marquee-track">
          {row.map((n, i) => (
            <div key={i} className="mx-8 text-lg font-bold whitespace-nowrap opacity-60 hover:opacity-100 transition-all duration-500 ar-heading" style={{ color: "var(--text2)" }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REVEAL WRAPPER
   ============================================================ */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} className={`ar-reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ============================================================
   FEATURE BENTO
   ============================================================ */
function FeatureCard({ icon, title, desc, big, delay }) {
  const tilt = useTilt(5);
  return (
    <Reveal delay={delay} className={big ? "md:col-span-2" : ""}>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
        className="ar-glass ar-card-tilt ar-shine rounded-2xl p-6 h-full relative group" data-hover>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" style={{ background: "var(--softBlue)" }}>
          {icon}
        </div>
        <h3 className="ar-heading font-semibold text-base mb-1.5" style={{ color: "var(--text)" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text2)" }}>{desc}</p>
      </div>
    </Reveal>
  );
}

function FeatureBento() {
  const items = [
    { icon: <Phone size={18} color="var(--accent2)" />, title: "AI phone calls", desc: "Answers every call in a natural voice, day or night, in seconds — not on hold.", big: true },
    { icon: <Calendar size={18} color="var(--accent2)" />, title: "Appointment booking", desc: "Books directly into your live calendar, no double-bookings." },
    { icon: <BarChart3 size={18} color="var(--accent2)" />, title: "Analytics", desc: "See call volume, booking rate, and revenue at a glance." },
    { icon: <Users size={18} color="var(--accent2)" />, title: "Built-in CRM", desc: "Every caller becomes a saved customer profile automatically." },
    { icon: <Mic size={18} color="var(--accent2)" />, title: "Voice AI engine", desc: "Understands accents, interruptions, and follow-up questions." },
    { icon: <MessageSquare size={18} color="var(--accent2)" />, title: "WhatsApp & SMS", desc: "Confirms and reminds customers on the channels they check." },
    { icon: <Mail size={18} color="var(--accent2)" />, title: "Email digests", desc: "A daily summary of calls, bookings, and revenue in your inbox." },
  ];
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Product" title="One employee, every channel." desc="ReceptioAI runs your front desk end to end — no missed calls, no double bookings, no late-night hold music." />
        <div className="grid md:grid-cols-3 gap-4 mt-14">
          {items.map((it, i) => <FeatureCard key={it.title} {...it} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, desc, center = true }) {
  return (
    <Reveal className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <span className="text-xs tracking-[0.15em] font-bold" style={{ color: "var(--accent2)" }}>{eyebrow?.toUpperCase()}</span>
      <h2 className="ar-heading font-bold text-3xl md:text-[42px] leading-tight mt-3 mb-4" style={{ color: "var(--text)" }}>{title}</h2>
      {desc && <p className="text-base md:text-lg" style={{ color: "var(--text2)" }}>{desc}</p>}
    </Reveal>
  );
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
function HowItWorks() {
  const steps = [
    { icon: <Phone size={16} />, title: "Customer calls", desc: "Any time, day or night — the line always picks up." },
    { icon: <Mic size={16} />, title: "AI answers", desc: "A natural voice greets them and understands their request." },
    { icon: <Clock size={16} />, title: "Checks availability", desc: "Reads your live calendar to find a real open slot." },
    { icon: <Calendar size={16} />, title: "Books the appointment", desc: "Confirms the slot and sends a reminder automatically." },
    { icon: <Bell size={16} />, title: "You get notified", desc: "A summary lands in your dashboard and inbox instantly." },
  ];
  return (
    <section className="py-28 px-6 md:px-10" style={{ background: "var(--bg2)" }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Process" title="From ringtone to revenue in five steps." />
        <div className="mt-16 relative">
          <div className="hidden md:block absolute left-0 right-0 top-8 h-px" style={{ background: "var(--border)" }} />
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                  <div className="w-16 h-16 rounded-2xl ar-glass flex items-center justify-center mb-0 md:mb-5 relative z-10 shrink-0" style={{ color: "var(--accent2)", background: "#FFFFFF" }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="ar-mono text-[11px] font-bold mb-1" style={{ color: "var(--accent2)" }}>0{i + 1}</div>
                    <h4 className="ar-heading font-semibold text-sm mb-1.5" style={{ color: "var(--text)" }}>{s.title}</h4>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--text2)" }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDUSTRIES
   ============================================================ */
function Industries() {
  const list = [
    { name: "Hair Salon", icon: <Scissors size={18} />, hue: 205 },
    { name: "Dental Clinic", icon: <Stethoscope size={18} />, hue: 200 },
    { name: "Restaurant", icon: <UtensilsCrossed size={18} />, hue: 215 },
    { name: "Hotel", icon: <Building2 size={18} />, hue: 210 },
    { name: "Gym", icon: <Dumbbell size={18} />, hue: 198 },
    { name: "Spa", icon: <Waves size={18} />, hue: 208 },
    { name: "Lawyer", icon: <Gavel size={18} />, hue: 220 },
    { name: "Repair Shop", icon: <Wrench size={18} />, hue: 203 },
  ];
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Industries" title="Built for every front desk." desc="From the first ring to the final booking, tuned to how your industry actually talks." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {list.map((it, i) => (
            <Reveal key={it.name} delay={i * 60}>
              <div className="ar-industry-card ar-glass rounded-2xl p-6 h-40 relative overflow-hidden flex flex-col justify-between cursor-none" data-hover>
                <div className="ar-industry-img absolute inset-0" style={{ background: `radial-gradient(circle at 70% 20%, rgba(224,242,254,0.8), transparent 60%)` }} />
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--softBlue)", color: "var(--accent2)" }}>{it.icon}</div>
                <span className="relative ar-heading font-semibold text-sm" style={{ color: "var(--text)" }}>{it.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VOICE AI SECTION
   ============================================================ */
function TypingLine({ text, active, speed = 28 }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!active) return;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return <span>{shown}<span style={{ opacity: shown.length < text.length ? 1 : 0, animation: "ar-blink 1s infinite" }}>▍</span></span>;
}

function VoiceAI() {
  const [ref, inView] = useInView(0.4);
  const bars = Array.from({ length: 56 });
  return (
    <section ref={ref} className="py-28 px-6 md:px-10" style={{ background: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <span className="text-xs tracking-[0.15em] font-bold" style={{ color: "var(--accent2)" }}>VOICE AI</span>
          <h2 className="ar-heading font-bold text-3xl md:text-[42px] leading-tight mt-3 mb-5" style={{ color: "var(--text)" }}>A voice that sounds like your best receptionist.</h2>
          <p className="text-base md:text-lg mb-8" style={{ color: "var(--text2)" }}>
            Natural pacing, real interruption handling, and instant answers to your most common questions — customers rarely realize it's AI.
          </p>
          <div className="ar-glass rounded-2xl p-5 space-y-3 ar-mono text-[13px]" style={{ background: "#FFFFFF" }}>
            <div className="flex gap-2"><span className="font-semibold" style={{ color: "var(--muted)" }}>Caller</span><span style={{ color: "var(--text2)" }}>Do you have anything open Thursday afternoon?</span></div>
            <div className="flex gap-2"><span className="font-semibold" style={{ color: "var(--accent2)" }}>AI</span><span style={{ color: "var(--text)" }}><TypingLine text="Yes — I have 2:30 or 4:00 PM open Thursday. Which works?" active={inView} /></span></div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="ar-glass rounded-3xl p-8 flex flex-col items-center gap-8" style={{ background: "#FFFFFF" }}>
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full" style={{ background: "var(--softBlue)" }}>
              <div className="absolute inset-0 rounded-full" style={{ animation: "ar-pulse-ring 2s infinite" }} />
              <Mic size={30} color="var(--accent2)" />
            </div>
            <div className="flex items-end gap-[3px] h-16">
              {bars.map((_, i) => (
                <div key={i} style={{
                  width: 3, borderRadius: 2, background: i % 6 === 0 ? "var(--highlight)" : "var(--accent2)",
                  height: `${15 + ((i * 37) % 60)}%`,
                  animation: inView ? `ar-bar ${0.5 + (i % 6) * 0.12}s ease-in-out infinite` : "none",
                  animationDelay: `${i * 0.02}s`,
                }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 w-full text-center">
              {[["24/7", "Always on"], ["<1s", "Answer time"], ["11", "Languages"]].map(([v, l]) => (
                <div key={l}><div className="ar-heading font-bold text-xl" style={{ color: "var(--text)" }}>{v}</div><div className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>{l}</div></div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   DASHBOARD SHOWCASE
   ============================================================ */
function DashboardShowcase() {
  const tilt = useTilt(6);
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Dashboard" title="Every call, booking, and dollar — in one view." desc="A live command center for your front desk, updated the instant your AI receptionist hangs up." />
        <Reveal delay={150}>
          <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
            className="ar-card-tilt ar-glass rounded-3xl p-6 md:p-10 mt-14 relative" style={{ boxShadow: "0 25px 60px -15px rgba(59, 130, 246, 0.15)" }}>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Calls today", val: 47, icon: <Phone size={14} /> },
                { label: "Booked", val: 31, icon: <Calendar size={14} /> },
                { label: "Revenue", val: 4820, prefix: "$", icon: <TrendingUp size={14} /> },
                { label: "Satisfaction", val: 98, suffix: "%", icon: <ShieldCheck size={14} /> },
              ].map((s) => <StatTile key={s.label} {...s} />)}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 rounded-2xl p-5" style={{ background: "#F8FAFC", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>Call volume</span>
                  <span className="text-[11px]" style={{ color: "var(--muted)" }}>Last 7 days</span>
                </div>
                <MiniBarChart />
              </div>
              <div className="rounded-2xl p-5 space-y-3" style={{ background: "#F8FAFC", border: "1px solid var(--border)" }}>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>Live activity</span>
                {["Booked · Nail Studio", "Confirmed · Dr. Rao Clinic", "Rescheduled · Casa Bella"].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 text-[12px]" style={{ color: "var(--text2)", opacity: 0, animation: `ar-fadeUp .6s ease-out forwards`, animationDelay: `${0.3 + i * 0.2}s` }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--success)" }} />{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatTile({ label, val, prefix = "", suffix = "", icon }) {
  const [ref, inView] = useInView(0.4);
  const n = useCountUp(val, inView);
  return (
    <div ref={ref} className="rounded-2xl p-4" style={{ background: "#F8FAFC", border: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: "var(--accent2)" }}>{icon}<span className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>{label}</span></div>
      <div className="ar-heading font-bold text-2xl" style={{ color: "var(--text)" }}>{prefix}{n.toLocaleString()}{suffix}</div>
    </div>
  );
}

function MiniBarChart() {
  const [ref, inView] = useInView(0.4);
  const vals = [40, 65, 50, 80, 60, 90, 70];
  return (
    <div ref={ref} className="flex items-end gap-3 h-28">
      {vals.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-md" style={{
          height: inView ? `${v}%` : "0%", background: i === 5 ? "var(--accent2)" : "#CBD5E1",
          transition: `height 0.8s cubic-bezier(.16,1,.3,1)`, transitionDelay: `${i * 0.08}s`,
        }} />
      ))}
    </div>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  const quotes = [
    { name: "Priya Nair", role: "Owner, Bloom Salon", text: "We stopped losing walk-in-worthy calls the first week. Bookings are up and I finally leave the front desk at 6." },
    { name: "Marcus Webb", role: "GM, The Grand Hotel", text: "Guests get answers instantly, even at 2am. It feels like we hired a whole shift of receptionists." },
    { name: "Dr. Ayesha Rao", role: "Riverside Clinic", text: "Reschedules used to eat an hour a day. Now the calendar just fills itself, correctly." },
    { name: "Leo Fontaine", role: "AutoFix Garage", text: "Customers describe their car trouble and it books the right service slot. Genuinely impressive." },
  ];
  const row = [...quotes, ...quotes];
  return (
    <section className="py-28 overflow-hidden">
      <div className="px-6 md:px-10 mx-auto max-w-7xl mb-14">
        <SectionHeading eyebrow="Testimonials" title="Business owners, not scripts." />
      </div>
      <div className="ar-marquee-wrap ar-scrollbar-hide overflow-hidden">
        <div className="ar-marquee-track rev" style={{ animationDuration: "50s" }}>
          {row.map((q, i) => (
            <div key={i} className="ar-glass rounded-2xl p-6 mx-3 w-[340px] shrink-0" style={{ background: "#FFFFFF" }}>
              <div className="flex gap-1 mb-3">{[0, 1, 2, 3, 4].map(j => <Star key={j} size={12} fill="#F59E0B" color="#F59E0B" />)}</div>
              <p className="text-sm mb-5 leading-relaxed font-normal" style={{ color: "var(--text2)" }}>&ldquo;{q.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full" style={{ background: "linear-gradient(135deg, var(--accent2), var(--highlight))" }} />
                <div><div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{q.name}</div><div className="text-[11px]" style={{ color: "var(--muted)" }}>{q.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING
   ============================================================ */
function PricingPreview() {
  const plans = [
    { name: "Starter", price: "$99", desc: "For single-location teams getting started.", features: ["Up to 300 calls / mo", "1 calendar integration", "Email support"] },
    { name: "Growth", price: "$249", desc: "For busy front desks with real call volume.", features: ["Up to 1,500 calls / mo", "Unlimited calendars", "WhatsApp & SMS", "Priority support"], popular: true },
    { name: "Enterprise", price: "Custom", desc: "For multi-location and franchise operations.", features: ["Unlimited calls", "Dedicated onboarding", "Custom voice & routing", "SLA & phone support"] },
  ];
  return (
    <section className="py-28 px-6 md:px-10" style={{ background: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Pricing" title="Simple plans, real ROI." desc="One missed call can cost more than a month of ReceptioAI. Pick the plan that matches your call volume." />
        <div className="grid md:grid-cols-3 gap-6 mt-14 items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="ar-glass ar-shine rounded-3xl p-7 h-full flex flex-col relative transition-transform duration-500 hover:-translate-y-2"
                style={{ background: "#FFFFFF", border: p.popular ? "2px solid var(--accent2)" : undefined, boxShadow: p.popular ? "0 20px 40px -10px var(--glow)" : undefined }} data-hover>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider" style={{ background: "var(--accent2)", color: "#FFFFFF" }}>Most popular</span>}
                <h3 className="ar-heading font-bold text-lg mb-1" style={{ color: "var(--text)" }}>{p.name}</h3>
                <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>{p.desc}</p>
                <div className="mb-6"><span className="ar-heading font-extrabold text-4xl" style={{ color: "var(--text)" }}>{p.price}</span>{p.price !== "Custom" && <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>/mo</span>}</div>
                <div className="flex-1 space-y-3 mb-7">
                  {p.features.map(f => <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text2)" }}><CheckCircle2 size={14} color="var(--success)" />{f}</div>)}
                </div>
                <Ripple className={`rounded-xl px-5 py-3 text-sm font-semibold text-center ${p.popular ? "ar-btn-primary" : "ar-btn-ghost"}`}>Get started</Ripple>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ() {
  const items = [
    { q: "Does it sound robotic?", a: "No — the voice engine handles natural pacing, filler words, and interruptions, so most callers don't realize they're speaking with AI." },
    { q: "Will it work with my existing calendar?", a: "Yes. It connects to Google Calendar, Outlook, and most booking software, and checks live availability before confirming any slot." },
    { q: "What happens with a question it can't answer?", a: "It gracefully takes a message and hands off to your team, with full context, instead of guessing." },
    { q: "Can it handle multiple locations?", a: "Enterprise plans support unlimited locations, each with its own hours, calendar, and voice routing." },
  ];
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12 space-y-3">
          {items.map((it, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={it.q} delay={i * 60}>
                <div className="ar-glass rounded-2xl overflow-hidden" style={{ background: "#FFFFFF" }}>
                  <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenIdx(isOpen ? -1 : i)} data-hover>
                    <span className="font-semibold text-sm md:text-base" style={{ color: "var(--text)" }}>{it.q}</span>
                    <ChevronDown size={16} style={{ color: "var(--accent2)", transition: "transform .4s cubic-bezier(.16,1,.3,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} />
                  </button>
                  <div className={`ar-faq-item ${isOpen ? "open" : ""}`}>
                    <div className="ar-faq-inner">
                      <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--text2)" }}>{it.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCTA() {
  return (
    <section className="px-6 md:px-10 pb-6">
      <Reveal>
        <div className="mx-auto max-w-6xl rounded-[32px] p-14 md:p-20 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #E0F2FE, #F0F7FF)", border: "1px solid var(--border)" }}>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(186, 216, 255, 0.5), transparent 70%)", filter: "blur(30px)", animation: "ar-drift 16s ease-in-out infinite" }} />
          <h2 className="ar-heading font-extrabold text-3xl md:text-[48px] leading-tight mb-6 relative" style={{ color: "var(--text)" }}>Ready to never miss<br />another customer?</h2>
          <p className="mb-10 relative text-base md:text-lg font-normal" style={{ color: "var(--text2)" }}>Set up your AI receptionist in under 15 minutes. No credit card required.</p>
          <div className="flex flex-wrap justify-center gap-4 relative">
            <Ripple className="ar-btn-primary rounded-xl px-7 py-4 font-semibold text-sm flex items-center gap-2">
              <span data-hover className="flex items-center gap-2">Start Free Trial <ArrowRight size={15} /></span>
            </Ripple>
            <Ripple className="ar-btn-ghost rounded-xl px-7 py-4 font-semibold text-sm"><span data-hover>Book a Demo</span></Ripple>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const cols = [
    { title: "Company", links: ["About", "Careers", "Contact"] },
    { title: "Resources", links: ["Documentation", "Pricing", "Blog"] },
    { title: "Connect", links: ["GitHub", "LinkedIn"] },
  ];
  return (
    <footer className="px-6 md:px-10 pt-20 pb-10 border-t mt-10" style={{ borderColor: "var(--border)", background: "var(--bg2)" }}>
      <div className="mx-auto max-w-7xl grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent2), var(--accent))" }}><Phone size={16} color="#fff" /></div>
            <span className="ar-heading font-bold text-base" style={{ color: "var(--text)" }}>Receptio<span style={{ color: "var(--accent2)" }}>AI</span></span>
          </div>
          <p className="text-sm max-w-xs mb-6" style={{ color: "var(--text2)" }}>Your 24/7 AI employee that never misses a customer.</p>
          <div className="flex gap-2 max-w-xs">
            <input placeholder="you@business.com" className="flex-1 rounded-lg px-3 py-2 text-sm ar-glass outline-none" style={{ color: "var(--text)", background: "#FFFFFF" }} />
            <Ripple className="ar-btn-primary rounded-lg px-4 text-sm font-medium">Join</Ripple>
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <h5 className="text-xs tracking-wide font-bold mb-4" style={{ color: "var(--muted)" }}>{c.title.toUpperCase()}</h5>
            <div className="flex flex-col gap-3">
              {c.links.map(l => <a key={l} href="#" data-hover className="ar-underline text-sm w-fit font-medium" style={{ color: "var(--text2)" }}>{l}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl mt-16 pt-6 border-t flex flex-col md:flex-row justify-between gap-3" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} ReceptioAI, Inc. All rights reserved.</span>
        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--muted)" }}><MapPin size={12} /> Available in every timezone, always on.</div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function Airrectionisthomepage() {
  const { progress } = useScrollMeta();
  return (
    <div className="ar-root">
      <GlobalStyles />
      <CustomCursor />
      <LivingBackground />
      <ScrollProgressBar progress={progress} />
      <Navbar />
      <DesignInMotion />
      <Hero />
      <VisionSection />
      <WorkExplorations />

      <LogoMarquee />
      <FeatureBento />
      <HowItWorks />
      <Industries />
      <VoiceAI />
      {/* DashboardShowcase */}
      <DashboardShowcase />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}