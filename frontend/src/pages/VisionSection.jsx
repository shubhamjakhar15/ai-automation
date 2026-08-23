import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const stripesRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Setup the ScrollTrigger Timeline to pin the section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%", // Pins for double the viewport height
                    pin: true,
                    scrub: 0.6, // Smooth scrubbing value matching the source
                    anticipatePin: 1,
                },
            });

            // 2. Animate the 3D Logo on Scroll
            // Rotates the central dark 3D element smoothly as the user scrolls
            tl.to(
                logoRef.current,
                {
                    rotationY: 180,
                    rotationZ: 45,
                    scale: 1.1,
                    ease: "none",
                    duration: 1,
                },
                0
            );

            // 3. The Stripe Cover Transition
            // We calculate the exact mathematical stagger used in the source code
            const numStripes = 5;
            tl.addLabel("stripes_start", 0.6); // Start stripes after scrolling 60% of the pinned section

            stripesRef.current.forEach((stripe, i) => {
                // Authentic timing logic: s = .3 * (4 - e) / 4 * 1
                const s = 0.3 * ((numStripes - 1 - i) / (numStripes - 1));
                const duration = 0.3;

                tl.to(
                    stripe,
                    {
                        scaleY: 1,
                        duration: duration,
                        ease: "none",
                    },
                    `stripes_start+=${s}`
                );
            });
        }, containerRef);

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <div className="bg-[#050505] text-[#FAFAFA] font-sans overflow-hidden selection:bg-white selection:text-black">

            {/* 
        We add this global style here to create the infinite seamless Marquee 
        without needing external CSS files.
      */}
            <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 25s linear infinite;
        }
        .transform-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>

            {/* Main Pinned Section */}
            <section
                ref={containerRef}
                className="relative min-h-dvh h-dvh overflow-hidden flex flex-col justify-between items-center py-16"
            >

                {/* Top Text Block */}
                <div className="w-full max-w-7xl px-8 md:px-12 flex justify-start z-20 mt-16">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 leading-relaxed">
                        Focused vision. <br />
                        Measured execution.
                    </p>
                </div>

                {/* Central 3D Dark Logo Simulation */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transform-3d">
                    <div
                        ref={logoRef}
                        className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center transform-3d"
                    >
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl opacity-90">
                            <defs>
                                <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#2A2A2A" />
                                    <stop offset="50%" stopColor="#111111" />
                                    <stop offset="100%" stopColor="#050505" />
                                </linearGradient>
                                <linearGradient id="edge-highlight" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF5E00" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            {/* Core 3D Shape */}
                            <path d="M100 20 L180 160 L140 160 L100 90 L60 160 L20 160 Z" fill="url(#metal-grad)" stroke="url(#edge-highlight)" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M100 20 L140 160 L100 160 L60 90 Z" fill="#0A0A0A" opacity="0.6" />
                        </svg>
                    </div>
                </div>

                {/* Infinite Scrolling Marquee Text */}
                <div className="relative z-20 flex w-full overflow-hidden py-10 pointer-events-none mix-blend-difference">
                    <div className="animate-infinite-scroll flex items-center gap-8 md:gap-16 text-[12vw] font-black uppercase leading-[0.8] tracking-tighter">
                        <span className="shrink-0 flex items-center gap-8 md:gap-16">
                            <span>Inspire</span>
                            <PlusIcon />
                            <span>Innovate</span>
                            <PlusIcon />
                            <span>Impact</span>
                            <PlusIcon />
                        </span>
                        <span className="shrink-0 flex items-center gap-8 md:gap-16">
                            <span>Inspire</span>
                            <PlusIcon />
                            <span>Innovate</span>
                            <PlusIcon />
                            <span>Impact</span>
                            <PlusIcon />
                        </span>
                        <span className="shrink-0 flex items-center gap-8 md:gap-16">
                            <span>Inspire</span>
                            <PlusIcon />
                            <span>Innovate</span>
                            <PlusIcon />
                            <span>Impact</span>
                            <PlusIcon />
                        </span>
                    </div>
                </div>

                {/* Bottom Text Block */}
                <div className="w-full max-w-7xl px-8 md:px-12 flex justify-center z-20 mb-8">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                        ✦ From idea to outcome.
                    </p>
                </div>

                {/* The 5 Animated Transition Stripes */}
                <div className="absolute inset-0 pointer-events-none flex flex-col w-full h-full z-30">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => (stripesRef.current[i] = el)}
                            className="flex-1 w-full h-full"
                            style={{
                                backgroundColor: "#D2D2D2",
                                transform: "scaleY(0)",
                                transformOrigin: "bottom",
                                willChange: "transform",
                                marginTop: i > 0 ? "-1px" : undefined,
                                paddingBottom: "1px",
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* ==========================================
                UPGRADED KEY FACTS SECTION
                ========================================== */}
            <section className="relative z-20 min-h-screen bg-[linear-gradient(0deg,#FFFFFF_0%,#D2D2D2_100%)] pt-32 pb-40 px-6 max-md:overflow-hidden text-[#1D1D1D]">
                <div className="mx-auto max-w-7xl">

                    {/* Header Block */}
                    <div className="flex flex-col items-center mb-16 lg:mb-24 gap-6 text-center">
                        <h2 className="text-5xl lg:text-[4rem] font-bold tracking-tight text-[#1D1D1D]">Key facts</h2>
                        <p className="text-base lg:text-lg font-medium text-[#1D1D1D]/80 leading-snug">
                            A snapshot of our <br className="md:hidden" /> experience and impact.
                        </p>
                    </div>

                    {/* 3-Card Grid */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch lg:flex-nowrap md:flex-wrap">

                        {/* Card 1: Featured & Awards */}
                        <div className="relative group shrink-0 w-full md:w-[380px] h-[400px] md:h-[480px] rounded-2xl bg-black text-white p-8 lg:p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            {/* Optional: Add a dark video or image background here if desired, like the source */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="relative z-20 h-full flex flex-col justify-between">
                                <span className="text-sm font-bold uppercase tracking-widest text-white/90">Featured & Awards</span>
                                <div>
                                    <div className="flex justify-between items-end gap-6">
                                        <p className="text-sm opacity-80 w-3/4 font-medium leading-relaxed">
                                            Featured on top design platforms worldwide.
                                        </p>
                                        <div className="flex items-start tracking-tighter">
                                            <span className="text-6xl xl:text-7xl font-light">50</span>
                                            <span className="text-4xl xl:text-5xl font-light text-[#FF5E00]">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Projects Completed */}
                        <div className="relative group shrink-0 w-full md:w-[380px] h-[400px] md:h-[480px] rounded-2xl bg-[#F5F5F0] text-[#1D1D1D] p-8 lg:p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl border border-black/5">
                            <span className="text-sm font-bold uppercase tracking-widest text-center block w-full z-20">Projects completed</span>
                            <div className="flex flex-col items-center justify-center flex-1 relative z-20">
                                {/* Inner circle decoration */}
                                <div className="w-56 h-56 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm" />
                                <div className="relative flex items-start tracking-tighter">
                                    <span className="text-6xl xl:text-7xl font-light">1.5K</span>
                                    <span className="text-4xl xl:text-5xl font-light text-[#FF5E00]">+</span>
                                </div>
                            </div>
                            <p className="text-sm text-[#1D1D1D]/80 font-medium leading-relaxed text-center z-20">
                                90% of our clients seek our <br /> services for a second project.
                            </p>
                        </div>

                        {/* Card 3: Our Team Members */}
                        <div className="relative group shrink-0 w-full md:w-[380px] h-[400px] md:h-[480px] rounded-2xl bg-[#2F3135] text-white p-8 lg:p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="relative z-20 h-full flex flex-col justify-between">
                                <span className="text-sm font-bold uppercase tracking-widest text-right block w-full text-white/90">Our team members</span>
                                <div className="flex justify-between items-end gap-6 mt-auto">
                                    <p className="text-sm text-white/60 font-medium leading-relaxed">
                                        Different skills. <br /> One standard.
                                    </p>
                                    <div className="flex items-start tracking-tighter">
                                        <span className="text-6xl xl:text-7xl font-light">20</span>
                                        <span className="text-4xl xl:text-5xl font-light text-[#FF5E00]">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Business Partners Block */}
                    <div className="mt-32 flex flex-col gap-10 items-center">
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1D1D1D] text-center block">Our business partners</span>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                            {/* Generic SVG placeholders for Logos */}
                            <PartnerLogo text="credible" />
                            <PartnerLogo text="Yellowtail" />
                            <PartnerLogo text="technis" />
                            <PartnerLogo text="OOCKTO" />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

// Minimal Plus Icon SVG component used in the Marquee
function PlusIcon() {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 md:w-8 md:h-8 opacity-50"
        >
            <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="40" y1="20" x2="0" y2="20" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

// Minimal Logo Placeholder
function PartnerLogo({ text }) {
    return (
        <div className="flex items-center justify-center font-bold text-xl md:text-2xl tracking-tighter">
            {text}
        </div>
    )
}