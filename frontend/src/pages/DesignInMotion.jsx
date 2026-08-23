import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// MATHEMATICALLY CENTERED GRID
// Total Grid Width: 1100px | Total Grid Height: 620px | Uniform Gap: 40px
const cardsData = [
    // --- TOP ROW ---
    // Left Column (X: -390)
    { width: 320, height: 260, gridX: -390, gridY: -180, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" },
    // Center Column (X: 0)
    { width: 380, height: 340, gridX: 0, gridY: -140, img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop" },
    // Right Column (X: 390)
    { width: 320, height: 280, gridX: 390, gridY: -170, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop" },

    // --- BOTTOM ROW ---
    // Left Column (X: -390)
    { width: 320, height: 320, gridX: -390, gridY: 150, img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop" },
    // Center Column (X: 0)
    { width: 380, height: 240, gridX: 0, gridY: 190, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Ae5l3OvjI4Prp1dM7NGG13W3UGNGetpFBpf7Zf8YVw&s" },
    // Right Column (X: 390)
    { width: 320, height: 300, gridX: 390, gridY: 160, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAFdLx_PQRlqQ5toKswpUzkoByhOSWLLifwgeM3KEMFA&s=10" }
]
export default function DesignInMotion() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const stripesRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(".top-word", { x: "100vw", ease: "none", duration: 2 }, 0);
            tl.to(".bottom-word", { x: "-100vw", ease: "none", duration: 2 }, 0);
            tl.to(".middle-text", { opacity: 0, duration: 1 }, 0);
            tl.to(".footer-elements", { opacity: 0, duration: 0.5 }, 1.5);

            cardsRef.current.forEach((card, i) => {
                const theta = (i - 2.5) * 25 * (Math.PI / 180);
                const initialRadius = 1400;
                const initialY = 900;

                gsap.set(card, {
                    x: Math.sin(theta) * initialRadius,
                    y: initialY,
                    z: -Math.cos(theta) * initialRadius,
                    rotationY: theta * (180 / Math.PI),
                    rotationX: 30,
                    transformPerspective: 1200,
                });

                const theta2 = theta + (40 * (Math.PI / 180));
                const midRadius = 1000;

                tl.to(card, {
                    x: Math.sin(theta2) * midRadius,
                    y: 50,
                    z: -Math.cos(theta2) * midRadius,
                    rotationY: theta2 * (180 / Math.PI),
                    rotationX: 10,
                    ease: "power2.inOut",
                    duration: 1,
                }, 0);

                tl.to(card, {
                    x: cardsData[i].gridX,
                    y: cardsData[i].gridY,
                    rotationZ: 0,
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    ease: "power3.out",
                    duration: 1,
                }, 1);
            });

            const numStripes = stripesRef.current.length;
            stripesRef.current.forEach((stripe, n) => {
                const delayOffset = 0.3 * ((numStripes - 1 - n) / (numStripes - 1 || 1)) * 1;
                tl.to(stripe, {
                    scaleY: 1,
                    duration: 0.4,
                    ease: "power2.inOut",
                }, 2.5 + delayOffset);
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#111] text-white">
            <div
                ref={containerRef}
                className="relative z-10 h-dvh bg-[#C3C3C3] pt-25 pb-20 lg:py-20 overflow-hidden"
            >
                {/* <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-40 pointer-events-none mix-blend-difference text-white">
                    <div className="font-bold text-2xl tracking-tighter flex items-center gap-1">
                        ▲ TRIONN<span className="text-[10px] align-top">®</span>
                    </div>
                    <div className="flex gap-4 pointer-events-auto">
                        <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105">
                            Let's Talk
                        </button>
                        <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 uppercase tracking-wider transition-transform hover:scale-105">
                            Menu <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        </button>
                    </div>
                </nav> */}

                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1D1D1D] pointer-events-none z-10 overflow-hidden w-full h-full select-none">
                    <h2 className="top-word text-[12vw] font-black uppercase leading-[0.8] tracking-tighter will-change-transform self-start -translate-x-[40vw]">
                        Design AI
                    </h2>

                    <div className="middle-text my-6 flex flex-col items-center max-w-sm text-center text-[10px] font-bold text-[#444] tracking-[0.2em]">
                        <span>EXPLORING IDEAS THROUGH</span>
                        <span>DAILY DESIGN PRACTICE.</span>
                    </div>

                    <h2 className="bottom-word text-[12vw] font-black uppercase leading-[0.8] tracking-tighter will-change-transform self-end translate-x-[40vw]">
                        Solution
                    </h2>
                </div>

                <div
                    className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
                    style={{ transform: "translate(-50%, -50%)", perspective: "1500px" }}
                >
                    {cardsData.map((data, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="absolute overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] bg-white transform-style-3d pointer-events-auto cursor-pointer transition-transform duration-300 hover:brightness-110"
                            style={{
                                width: data.width,
                                height: data.height,
                                marginLeft: -data.width / 2,
                                marginTop: -data.height / 2,
                                transformOrigin: "center center",
                            }}
                        >
                            <img
                                src={data.img}
                                alt={`Creative thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="footer-elements absolute bottom-8 w-full flex justify-between items-end px-10 text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em] pointer-events-none z-20">
                    <p className="max-w-[300px] leading-relaxed">
                        Concepts, explorations, and interface <br /> experiments shared openly as part of <br /> our creative process.
                    </p>
                    <p className="pointer-events-auto cursor-pointer border-b border-gray-500 pb-0.5 hover:text-black hover:border-black transition-colors">
                        View on Artstation ↗
                    </p>
                </div>

                <div className="absolute inset-0 pointer-events-none flex flex-col w-full h-full z-50">
                    {Array.from({ length: 5 }).map((_, r) => (
                        <div
                            key={r}
                            ref={(el) => (stripesRef.current[r] = el)}
                            style={{
                                flex: 1,
                                width: "100%",
                                marginTop: r > 0 ? "-1px" : undefined,
                                backgroundColor: "#040508",
                                transform: "scaleY(0)",
                                transformOrigin: "bottom",
                                willChange: "transform",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="h-screen bg-[#040508] flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold tracking-tighter">Next Section</h1>
            </div>
        </div>
    );
}