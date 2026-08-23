import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mock data replicating the projects shown in the video
const projects = [
    {
        title: "MyWorker AI",
        subTitle: "AI platform simplifying hiring, management, and workforce scaling.",
        image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop",
        mainText: "Boost your workforce with AI digital workers",
    },
    {
        title: "Pulse Studio",
        subTitle: "A motion-led studio website showcasing artists, projects, and culture.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
        mainText: "An Independent Music Studio Shaped by Sound",
    },
    {
        title: "Loftloom",
        subTitle: "Seamless real estate platform for effortless property discovery.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        mainText: "LIVE LIFE IN LUXURY",
    }
];

export default function WorkExplorations() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. The Main Horizontal Scroll Timeline
            // Maps vertical scrolling to horizontal movement
            const scrollTween = gsap.to(trackRef.current, {
                x: () => -(trackRef.current.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${trackRef.current.scrollWidth}`, // Links scroll distance to track width
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    invalidateOnRefresh: true,
                },
            });

            // 2. The Inner Card Reveals
            // Triggers animations based on the card's horizontal position within the track
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const innerContent = card.querySelector('.js-work-card-inner');
                const dividerLine = card.querySelector('.js-card-line');

                // Initial state matches source: cards start pushed down by 550px
                gsap.set(innerContent, { y: 550, opacity: 0 });
                if (dividerLine) {
                    gsap.set(dividerLine, { scaleY: 0, transformOrigin: "top" });
                }

                // Lift and fade in the card as it enters from the right
                gsap.to(innerContent, {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween, // Ties trigger to the horizontal tween
                        start: "left 85%", // Triggers when the left edge of the card hits 85% of viewport
                        toggleActions: "play none none reverse",
                    }
                });

                // Scale down the dividing line
                if (dividerLine) {
                    gsap.to(dividerLine, {
                        scaleY: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: "left 90%",
                            toggleActions: "play none none reverse",
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // Background uses the authentic linear gradient from the source
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-[linear-gradient(0deg,#D2D2D2_0%,#FFFFFF_100%)] text-[#1D1D1D] font-sans"
        >
            <div
                ref={trackRef}
                className="flex h-full w-max will-change-transform"
            >

                {/* ==========================================
            INTRO BLOCK (Stays on screen initially)
            ========================================== */}
                <div className="flex w-screen md:w-[50vw] shrink-0 h-full flex-col justify-center items-center px-10 relative">
                    <div className="flex flex-col items-center text-center gap-10">
                        <h2 className="text-[2.5rem] leading-[1.1] md:text-5xl font-medium tracking-tight">
                            Selected work <br /> & explorations
                        </h2>
                        <button className="uppercase text-xs font-bold tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors">
                            View All Projects
                        </button>
                    </div>
                </div>

                {/* ==========================================
            PROJECT CARDS (Scroll in horizontally)
            ========================================== */}
                {projects.map((project, i) => (
                    <div
                        key={i}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="js-work-card relative flex w-screen md:w-[50vw] shrink-0 h-full items-center pointer-events-auto"
                    >
                        {/* The vertical divider line */}
                        <div className="js-card-line hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-screen w-px bg-black/10" />

                        <div className="js-work-card-inner w-full px-8 md:px-20 will-change-transform">
                            {/* Inner Card Container */}
                            <div className="relative flex flex-col w-full group cursor-pointer">

                                {/* Image Wrapper */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Floating Absolute Text over Image */}
                                    <h3 className="absolute inset-0 flex items-center justify-center p-10 text-center text-white/90 font-bold text-3xl md:text-4xl drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {project.mainText}
                                    </h3>
                                </div>

                                {/* Card Footer Text */}
                                <div className="mt-8 flex flex-col gap-4">
                                    <div className="flex justify-between items-end border-b border-black/10 pb-4">
                                        <div>
                                            <h4 className="text-2xl font-semibold m-0">{project.title}</h4>
                                            <p className="text-sm text-gray-600 max-w-sm mt-2">
                                                {project.subTitle}
                                            </p>
                                        </div>
                                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
                                            Explore Project <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

                {/* ==========================================
            OUTRO BLOCK (Final horizontal card)
            ========================================== */}
                <div
                    ref={(el) => (cardsRef.current[projects.length] = el)}
                    className="js-work-card relative flex w-screen md:w-[50vw] shrink-0 h-full items-center pointer-events-auto"
                >
                    <div className="js-card-line hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-screen w-px bg-black/10" />

                    <div className="js-work-card-inner w-full px-8 md:px-20 will-change-transform">
                        <div className="flex flex-col items-center justify-center text-center gap-10">
                            <h3 className="text-3xl md:text-4xl font-medium tracking-tight max-w-[400px]">
                                Discover our complete collection of digital experiences, brands, and platforms.
                            </h3>
                            <button className="uppercase text-xs font-bold tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors">
                                View All Projects
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}