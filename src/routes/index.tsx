import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import administratorSpotlight from "../administrator_spotlight.png";
import Logo from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderLogoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [stickyChecked, setStickyChecked] = useState(false);

  // States for 'How it Works' section
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Ingest Simulation
  const [step1Uploading, setStep1Uploading] = useState(false);
  const [step1Progress, setStep1Progress] = useState(0);
  const [step1Parsed, setStep1Parsed] = useState(false);

  // Step 2: Define Constraints Toggles
  const [softFaculty, setSoftFaculty] = useState(false);
  const [softMaxExams, setSoftMaxExams] = useState(false);

  // Step 3: Coexist Resolver
  const [isResolving, setIsResolving] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [resolvingGridIndex, setResolvingGridIndex] = useState(-1);

  const startIngestSimulation = () => {
    if (step1Uploading || step1Parsed) return;
    setStep1Uploading(true);
    setStep1Progress(0);
    
    const interval = setInterval(() => {
      setStep1Progress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep1Uploading(false);
          setStep1Parsed(true);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const resetIngestSimulation = () => {
    setStep1Parsed(false);
    setStep1Progress(0);
  };

  const runCoexistResolver = () => {
    if (isResolving) return;
    setIsResolving(true);
    setIsResolved(false);
    setResolvingGridIndex(0);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setResolvingGridIndex(count);
      if (count >= 12) {
        clearInterval(interval);
        setIsResolving(false);
        setIsResolved(true);
      }
    }, 100);
  };

  const resetCoexistResolver = () => {
    setIsResolved(false);
    setResolvingGridIndex(-1);
  };

  // Refs for entrance animations
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLAnchorElement>(null);

  // Refs for floating card containers (outer wrappers for float animations)
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // Refs for card parallax layers (middle wrappers for viewport-wide mouse shift)
  const card1ParallaxRef = useRef<HTMLDivElement>(null);
  const card2ParallaxRef = useRef<HTMLDivElement>(null);
  const card3ParallaxRef = useRef<HTMLDivElement>(null);
  const card4ParallaxRef = useRef<HTMLDivElement>(null);

  // Refs for card inner wrappers (for 3D tilt hover animations)
  const card1InnerRef = useRef<HTMLDivElement>(null);
  const card2InnerRef = useRef<HTMLDivElement>(null);
  const card3InnerRef = useRef<HTMLDivElement>(null);
  const card4InnerRef = useRef<HTMLDivElement>(null);

  // Refs for concentric blueprint target background elements
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const bgCircle1Ref = useRef<SVGCircleElement>(null);
  const bgCircle2Ref = useRef<SVGCircleElement>(null);
  const bgCircle3Ref = useRef<SVGCircleElement>(null);
  const bgCircle4Ref = useRef<SVGCircleElement>(null);
  const bgLine1Ref = useRef<SVGLineElement>(null);
  const bgLine2Ref = useRef<SVGLineElement>(null);

  // Refs for specific interactive card components
  const checkmarkRef = useRef<HTMLButtonElement>(null);
  const clockHandRef = useRef<HTMLDivElement>(null);
  const progress1Ref = useRef<HTMLDivElement>(null);
  const progress2Ref = useRef<HTMLDivElement>(null);

  // Refs for One Platform role items
  const role1Ref = useRef<HTMLDivElement>(null);
  const role2Ref = useRef<HTMLDivElement>(null);
  const role3Ref = useRef<HTMLDivElement>(null);

  // Refs for custom scroll, navbar, and Section 2 animations
  const navbarRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const sec2HeaderRef = useRef<HTMLDivElement>(null);
  const sec2ValuesRef = useRef<HTMLDivElement>(null);
  const sec2AccordionRef = useRef<HTMLDivElement>(null);
  const sec2CanvasRef = useRef<HTMLDivElement>(null);
  const [sec2Visible, setSec2Visible] = useState(false);

  // Refs and states for Section 3: Customer Spotlight
  const spotlightRef = useRef<HTMLDivElement>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement>(null);
  const spotlightCardRef = useRef<HTMLDivElement>(null);
  const [spotlightVisible, setSpotlightVisible] = useState(false);

  // Refs and states for Section 4: Personalized Demo (CTA)
  const demoRef = useRef<HTMLDivElement>(null);
  const demoTitleRef = useRef<HTMLDivElement>(null);
  const demoContentRef = useRef<HTMLDivElement>(null);
  const [demoVisible, setDemoVisible] = useState(false);

  // Refs for custom cursor follower
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // -------------------------------------------------------------
    // 1. Custom Cursor Follower Position Updates
    // -------------------------------------------------------------
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (dot && ring) {
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(dot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08,
          ease: "power2.out",
        });
        gsap.to(ring, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.25,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMouseMove);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  useEffect(() => {
    // -------------------------------------------------------------
    // 2. Global Viewport Mouse-Move Parallax Layers
    // -------------------------------------------------------------
    const onGlobalMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;

      // Cards shift dynamically in layered directions and weights
      gsap.to(card1ParallaxRef.current, {
        x: normX * 45,
        y: normY * 45,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(card2ParallaxRef.current, {
        x: normX * -55,
        y: normY * -55,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(card3ParallaxRef.current, {
        x: normX * 35,
        y: normY * 35,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(card4ParallaxRef.current, {
        x: normX * -40,
        y: normY * -40,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", onGlobalMouseMove);
    };
  }, []);

  // Premium Preloader Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial styles
      gsap.set(loaderLogoRef.current, {
        scale: 0.5,
        opacity: 0,
        rotateY: -180,
      });
      gsap.set(contentRef.current, {
        opacity: 0,
        scale: 0.96,
        y: 30,
        filter: "blur(8px)",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
        },
      });

      // Animate preloader logo with highly premium rotation & elastic bounces
      tl.to(loaderLogoRef.current, {
        scale: 1.15,
        opacity: 1,
        rotateY: 0,
        duration: 1.3,
        ease: "back.out(1.8)",
      })
      .to(loaderLogoRef.current, {
        scale: 1.0,
        duration: 0.3,
        ease: "power2.out",
      })
      // Subtle elegant pulse
      .to(loaderLogoRef.current, {
        scale: 1.06,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      })
      // Fade out logo and scale down slightly
      .to(loaderLogoRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.4,
        ease: "power2.in",
        delay: 0.3,
      })
      // Slide up the black preloader panel and focus the main content in!
      .to(loaderRef.current, {
        y: "-100%",
        duration: 1.0,
        ease: "power4.inOut",
      })
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
      }, "-=0.9");
    });

    return () => ctx.revert();
  }, []);

  // Lock body scroll during preloading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial styles
      gsap.set([heroTitleRef.current, heroSubtextRef.current, heroBtnRef.current, navbarRef.current], {
        opacity: 0,
      });
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
        scale: 0,
        opacity: 0,
      });

      // Staggered entrance for hero elements - ultra smooth power4 ease
      tl.fromTo(
        navbarRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" }
      )
        .fromTo(
          heroTitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
          "-=0.7"
        )
        .fromTo(
          heroSubtextRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" },
          "-=0.7"
        )
        .fromTo(
          heroBtnRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" },
          "-=0.7"
        );

      // Cards bounce in stagger with elastic/power4 blends
      gsap.fromTo(
        card1Ref.current,
        { scale: 0, rotation: -25, opacity: 0 },
        { scale: 1, rotation: -6, opacity: 1, duration: 1.6, ease: "elastic.out(1, 0.75)", delay: 0.25 }
      );
      gsap.fromTo(
        card2Ref.current,
        { scale: 0, rotation: 22, opacity: 0 },
        { scale: 1, rotation: 4, opacity: 1, duration: 1.6, ease: "elastic.out(1, 0.75)", delay: 0.4 }
      );
      gsap.fromTo(
        card3Ref.current,
        { scale: 0, rotation: -20, opacity: 0 },
        { scale: 1, rotation: -3, opacity: 1, duration: 1.6, ease: "elastic.out(1, 0.75)", delay: 0.55 }
      );
      gsap.fromTo(
        card4Ref.current,
        { scale: 0, rotation: 20, opacity: 0 },
        { scale: 1, rotation: 3, opacity: 1, duration: 1.6, ease: "elastic.out(1, 0.75)", delay: 0.7 }
      );

      // -------------------------------------------------------------
      // 4. Independent Idle Floating Animations (Outer wrappers)
      // -------------------------------------------------------------
      gsap.to(card1Ref.current, {
        y: "+=10",
        rotation: "+=1.5",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });

      gsap.to(card2Ref.current, {
        y: "-=12",
        rotation: "-=1.2",
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.0,
      });

      gsap.to(card3Ref.current, {
        y: "+=9",
        rotation: "+=1.0",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });

      gsap.to(card4Ref.current, {
        y: "-=10",
        rotation: "-=1.5",
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.4,
      });

      // -------------------------------------------------------------
      // 5. Initial Progress Bar Fill Entrance
      // -------------------------------------------------------------
      gsap.fromTo(
        progress1Ref.current,
        { width: "0%" },
        { width: "66%", duration: 1.6, ease: "power3.out", delay: 1.5 }
      );
      gsap.fromTo(
        progress2Ref.current,
        { width: "0%" },
        { width: "33%", duration: 1.6, ease: "power3.out", delay: 1.7 }
      );
    });

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSec2Visible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (section2Ref.current) {
      observer.observe(section2Ref.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (sec2Visible) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(
        [
          sec2HeaderRef.current,
          sec2ValuesRef.current,
          sec2AccordionRef.current,
          sec2CanvasRef.current,
        ],
        { opacity: 0, y: 40 }
      );
      tl.to(sec2HeaderRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(sec2ValuesRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(sec2AccordionRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(sec2CanvasRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    }
  }, [sec2Visible]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpotlightVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (spotlightRef.current) {
      observer.observe(spotlightRef.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (spotlightVisible) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set([spotlightHeaderRef.current, spotlightCardRef.current], { opacity: 0, y: 40 });
      tl.to(spotlightHeaderRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(spotlightCardRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
    }
  }, [spotlightVisible]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDemoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (demoRef.current) {
      observer.observe(demoRef.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (demoVisible) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set([demoTitleRef.current, demoContentRef.current], { opacity: 0, y: 40 });
      tl.to(demoTitleRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(demoContentRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    }
  }, [demoVisible]);

  // -------------------------------------------------------------
  // Custom Cursor Interaction Handlers
  // -------------------------------------------------------------
  const handleCursorHoverEnter = (hoverType = "hover") => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (ring && dot) {
      gsap.to(ring, {
        width: 56,
        height: 56,
        borderColor: hoverType === "green" ? "#10B981" : "#000000",
        backgroundColor: hoverType === "green" ? "rgba(16, 185, 129, 0.05)" : "rgba(0, 0, 0, 0.03)",
        ease: "power2.out",
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 0,
        ease: "power2.out",
        duration: 0.2,
      });
    }
  };

  const handleCursorHoverLeave = () => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (ring && dot) {
      gsap.to(ring, {
        width: 24,
        height: 24,
        borderColor: "#000000",
        backgroundColor: "transparent",
        ease: "power2.out",
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        ease: "power2.out",
        duration: 0.2,
      });
    }
  };

  // -------------------------------------------------------------
  // 3D Parallax Card Tilt Effects (Hover states)
  // -------------------------------------------------------------
  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    const cardInner = ref.current;
    if (!cardInner) return;
    const rect = cardInner.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative offsets (-0.5 to 0.5)
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;

    gsap.to(cardInner, {
      rotationY: xc * 24,
      rotationX: -yc * 24,
      z: 25,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleTiltMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    handleCursorHoverLeave();
    const cardInner = ref.current;
    if (!cardInner) return;
    gsap.to(cardInner, {
      rotationY: 0,
      rotationX: 0,
      z: 0,
      transformPerspective: 800,
      ease: "power3.out",
      duration: 0.6,
    });
  };

  // -------------------------------------------------------------
  // Interactive Elements within Cards
  // -------------------------------------------------------------

  // Confetti Particle Burst
  const triggerConfettiBurst = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = ["#FBBF24", "#F59E0B", "#10B981", "#3B82F6", "#111111", "#EF4444"];

    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("div");
      particle.className = "fixed w-2.5 h-2.5 rounded-full pointer-events-none z-50";
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 60 + Math.random() * 90;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 35;

      gsap.to(particle, {
        x: destX,
        y: destY,
        rotation: Math.random() * 360,
        scale: 0.2,
        opacity: 0,
        duration: 0.8 + Math.random() * 0.7,
        ease: "power3.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const handleStickyCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStickyChecked((prev) => !prev);
    triggerConfettiBurst(e);

    const btn = checkmarkRef.current;
    if (btn) {
      gsap.fromTo(
        btn,
        { scale: 0.7, rotation: 0 },
        { scale: 1, rotation: 360, duration: 0.6, ease: "back.out(1.8)" }
      );
    }
  };

  // Clock Hand Rotation
  const handleDeadlinesMouseEnter = () => {
    handleCursorHoverEnter();
    const hand = clockHandRef.current;
    if (hand) {
      gsap.to(hand, {
        rotation: "+=360",
        duration: 1.2,
        ease: "power2.out",
      });
    }
  };

  // Progress Bar Retrigger
  const handleExamsMouseEnter = () => {
    handleCursorHoverEnter();
    gsap.fromTo(
      progress1Ref.current,
      { width: "0%" },
      { width: "66%", duration: 1.2, ease: "back.out(1.1)" }
    );
    gsap.fromTo(
      progress2Ref.current,
      { width: "0%" },
      { width: "33%", duration: 1.2, ease: "back.out(1.1)", delay: 0.1 }
    );
  };

  // One Platform individual role bouncy scales
  const handleRoleMouseEnter = (ref: React.RefObject<HTMLDivElement | null>) => {
    gsap.to(ref.current, {
      scale: 1.15,
      y: -6,
      borderColor: "#000000",
      boxShadow: "0 8px 16px -4px rgba(0,0,0,0.1)",
      duration: 0.4,
      ease: "elastic.out(1.2, 0.6)",
    });
  };

  const handleRoleMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      borderColor: "rgba(229, 231, 235, 1)",
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-white text-black overflow-x-hidden select-none md:cursor-none relative flex flex-col scroll-smooth">

      {/* -------------------------------------------------------------
          Custom High-Fidelity Cursor Followers
          ------------------------------------------------------------- */}
      <div
        ref={cursorRingRef}
        className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border border-black pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-normal bg-transparent"
        style={{
          transition: "width 0.25s, height 0.25s, background-color 0.25s, border-color 0.25s",
          willChange: "transform",
        }}
      />
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-black pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          willChange: "transform",
        }}
      />

      {/* Premium Preloader Overlay */}
      {loading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-50 bg-[#0B0B0C] flex flex-col items-center justify-center select-none pointer-events-auto"
          style={{ willChange: "transform" }}
        >
          <div className="flex flex-col items-center gap-6">
            <div ref={loaderLogoRef} className="text-white flex items-center justify-center">
              <Logo size={80} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-extrabold tracking-widest font-sans text-white">COEXIST</span>
              <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase font-bold animate-pulse">
                INITIALIZING RESOLVER...
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        ref={contentRef}
        className="w-full flex flex-col"
        style={{
          transformOrigin: "top center",
          opacity: 0,
          transform: "scale(0.96) translateY(30px)",
          filter: "blur(8px)",
        }}
      >
        <div ref={navbarRef} className="w-full z-30 relative bg-white flex-shrink-0">
          <Navbar />
        </div>

      {/* Hero — centered with floating cards */}
      <section className="w-full h-[calc(100vh-80px)] min-h-[650px] px-6 md:px-10 pb-8 sticky top-0 z-10 overflow-hidden self-start">
        <div
          className="relative w-full h-full rounded-3xl bg-white overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: "radial-gradient(#C4C7CC 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        >

          {/* -------------------------------------------------------------
              Floating card 1 — top left (Sticky Note)
              Inward positioned: top-[15%] left-[16%]
              ------------------------------------------------------------- */}
          <div ref={card1Ref} className="hidden md:block absolute top-[15%] left-[16%] z-20">
            <div ref={card1ParallaxRef}>
              <div
                ref={card1InnerRef}
                className="relative transition-all duration-300 rounded-lg p-1"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleTiltMouseMove(e, card1InnerRef)}
                onMouseLeave={() => handleTiltMouseLeave(card1InnerRef)}
                onMouseEnter={() => handleCursorHoverEnter()}
              >
                <div
                  className={`w-56 h-44 p-4 shadow-md transition-all duration-500 rounded-sm relative ${
                    stickyChecked ? "bg-[#e6f7ed] border border-emerald-200/50" : "bg-yellow-200"
                  }`}
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div
                    className={`absolute top-2 right-3 w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                      stickyChecked ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />
                  <p
                    className={`text-[13px] leading-snug font-medium italic transition-all duration-500 ${
                      stickyChecked ? "text-emerald-800/60 line-through" : "text-black/80"
                    }`}
                  >
                    Hall 3B — 42 seats. Reshuffle before 9am. Don't forget invigilator slips.
                  </p>
                </div>

                <button
                  ref={checkmarkRef}
                  onClick={handleStickyCheckClick}
                  onMouseEnter={() => handleCursorHoverEnter("green")}
                  onMouseLeave={() => handleCursorHoverEnter()}
                  className="absolute -bottom-4 -right-4 bg-white w-12 h-12 shadow-lg flex items-center justify-center cursor-pointer select-none border border-gray-100 hover:border-gray-200 hover:shadow-xl rounded-md transition-all active:scale-90"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div
                    className={`w-6 h-6 text-xs flex items-center justify-center font-bold rounded-sm transition-colors duration-500 ${
                      stickyChecked ? "bg-emerald-500 text-white" : "bg-black text-white"
                    }`}
                  >
                    ✓
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              Floating card 2 — top right (Deadline)
              Inward positioned: top-[15%] right-[16%]
              ------------------------------------------------------------- */}
          <div ref={card2Ref} className="hidden md:block absolute top-[15%] right-[16%] z-20">
            <div ref={card2ParallaxRef}>
              <div
                ref={card2InnerRef}
                className="relative transition-all duration-300 rounded-lg p-1"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleTiltMouseMove(e, card2InnerRef)}
                onMouseLeave={() => handleTiltMouseLeave(card2InnerRef)}
                onMouseEnter={handleDeadlinesMouseEnter}
              >
                <div
                  className="bg-white border border-gray-200 w-60 p-4 shadow-md rounded-sm hover:shadow-lg transition-all"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                     <div className="w-5 h-5 border-2 border-black rounded-full relative flex items-center justify-center">
                      <div
                        ref={clockHandRef}
                        className="absolute w-[1.5px] h-[5px] bg-black origin-bottom -mt-[5px]"
                        style={{ left: "calc(50% - 0.75px)" }}
                      />
                      <div className="absolute w-[3px] h-[1.5px] bg-black origin-left" style={{ left: "50%" }} />
                    </div>
                    <span className="text-sm font-semibold select-none">Deadlines</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs font-semibold select-none transition-colors hover:text-red-500">
                      Mid-Sem Schedule
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 select-none">Publish to portal</p>
                    <p className="text-[11px] text-black font-medium mt-2.5 select-none flex items-center gap-1.5">
                      <span className="animate-pulse">⏱</span> 09:00 — 12:45
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              Center Content (Hero with Typewriter Animation)
              ------------------------------------------------------------- */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 w-full max-w-4xl">
            <h1
              ref={heroTitleRef}
              className="font-bold leading-[1.05] flex flex-col items-center"
              style={{ fontSize: "clamp(1.75rem, 5.5vw, 4.5rem)", letterSpacing: "-0.94px" }}
            >
              <span className="whitespace-nowrap">Assign, attend, and grade</span>
              <span className="text-gray-400 hover:text-black transition-colors duration-700 cursor-pointer whitespace-nowrap">
                every single exam
              </span>
            </h1>
            <p ref={heroSubtextRef} className="mt-6 text-[15px] text-gray-500 max-w-md select-none">
              Coexist handles hall assignment, live attendance, marks entry, and results — all in one place, nothing on
              paper.
            </p>
            <Link
              ref={heroBtnRef}
              to="/select-university"
              onMouseEnter={() => handleCursorHoverEnter()}
              onMouseLeave={() => handleCursorHoverLeave()}
              className="mt-8 bg-black text-white px-8 py-3.5 text-sm font-medium hover:bg-black/90 rounded-sm shadow-md transition-all active:scale-95 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Get started</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* -------------------------------------------------------------
              Floating card 3 — bottom left (Exams)
              Inward positioned: bottom-[15%] left-[16%]
              ------------------------------------------------------------- */}
          <div ref={card3Ref} className="hidden md:block absolute bottom-[15%] left-[16%] z-20">
            <div ref={card3ParallaxRef}>
              <div
                ref={card3InnerRef}
                className="relative transition-all duration-300 rounded-lg p-1"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleTiltMouseMove(e, card3InnerRef)}
                onMouseLeave={() => handleTiltMouseLeave(card3InnerRef)}
                onMouseEnter={handleExamsMouseEnter}
              >
                <div
                  className="bg-white border border-gray-200 w-72 p-4 shadow-md rounded-sm hover:shadow-lg transition-all"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <p className="text-sm font-semibold mb-3 select-none">Active Exams</p>
                  <div className="space-y-4.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold rounded-sm">
                          D
                        </div>
                        <span className="text-xs font-medium select-none">Data Structures</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          ref={progress1Ref}
                          className="h-full bg-black rounded-full transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold rounded-sm">
                          O
                        </div>
                        <span className="text-xs font-medium select-none">Operating Systems</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          ref={progress2Ref}
                          className="h-full bg-red-400 rounded-full transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              Floating card 4 — bottom right (Roles / One Platform)
              Inward positioned: bottom-[15%] right-[16%]
              ------------------------------------------------------------- */}
          <div ref={card4Ref} className="hidden md:block absolute bottom-[15%] right-[16%] z-20">
            <div ref={card4ParallaxRef}>
              <div
                ref={card4InnerRef}
                className="relative transition-all duration-300 rounded-lg p-1"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleTiltMouseMove(e, card4InnerRef)}
                onMouseLeave={() => handleTiltMouseLeave(card4InnerRef)}
                onMouseEnter={() => handleCursorHoverEnter()}
              >
                <div
                  className="bg-white border border-gray-200 w-64 p-4 shadow-md rounded-sm hover:shadow-lg transition-all"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <p className="text-sm font-semibold mb-3 select-none">One Platform</p>
                  <div className="flex gap-2.5">
                    <div
                      ref={role1Ref}
                      onMouseEnter={() => handleRoleMouseEnter(role1Ref)}
                      onMouseLeave={() => handleRoleMouseLeave(role1Ref)}
                      className="flex-1 aspect-square border border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-colors bg-white hover:bg-gray-50 rounded-sm"
                    >
                      Admin
                    </div>
                    <div
                      ref={role2Ref}
                      onMouseEnter={() => handleRoleMouseEnter(role2Ref)}
                      onMouseLeave={() => handleRoleMouseLeave(role2Ref)}
                      className="flex-1 aspect-square border border-black flex items-center justify-center text-[10px] uppercase tracking-wider font-bold cursor-pointer bg-black text-white rounded-sm shadow-md"
                    >
                      Fac
                    </div>
                    <div
                      ref={role3Ref}
                      onMouseEnter={() => handleRoleMouseEnter(role3Ref)}
                      onMouseLeave={() => handleRoleMouseLeave(role3Ref)}
                      className="flex-1 aspect-square border border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-colors bg-white hover:bg-gray-50 rounded-sm"
                    >
                      Stu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          Section 2: How It Works (The Core System Engine)
          Strictly customized following the reference layout & brand values
          ------------------------------------------------------------- */}
      <section ref={section2Ref} className="w-full relative z-20 bg-white border-t border-gray-100 shadow-[0_-30px_80px_rgba(0,0,0,0.06)] rounded-t-[40px] pt-28 pb-24 px-6 md:px-20 flex flex-col justify-center">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: "radial-gradient(#C4C7CC 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-gray-100">
            <div ref={sec2HeaderRef} className="flex flex-col gap-3 max-w-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                The Core System
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-sans text-black" style={{ letterSpacing: "-0.94px" }}>
                Built to handle complexity
              </h2>
            </div>

            {/* Premium target values matching icons in mockup */}
            <div ref={sec2ValuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:max-w-3xl w-full">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black font-sans">100% Clash-Free</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  Absolute zero student overlaps or room over-capacitation. Guaranteed by mathematical engine logic.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black font-sans">Operational Peace</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  Eliminates back-and-forth friction between conflicting departments, proctors, and student bodies.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black font-sans">Time Reclaimed</h4>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  Shrinks weeks of manual exam administrative gridlocks into a single-click 3-second generate action.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16 items-start">
            {/* Left Panel: Accordion Step Selectors */}
            <div ref={sec2AccordionRef} className="lg:col-span-5 flex flex-col divide-y divide-gray-100 select-none">
              
              {/* Step 1 Tab */}
              <div
                onClick={() => {
                  setActiveStep(0);
                  handleCursorHoverEnter();
                }}
                onMouseEnter={() => handleCursorHoverEnter()}
                onMouseLeave={() => handleCursorHoverLeave()}
                className={`py-8 text-left w-full cursor-pointer transition-all duration-300 group ${
                  activeStep === 0 ? "opacity-100" : "opacity-45 hover:opacity-75"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-gray-400">01 / INGEST</span>
                    <h3 className="text-lg font-bold font-sans text-black tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      Ingest Data Sheets
                    </h3>
                  </div>
                  <span className="text-lg font-mono leading-none transition-transform duration-500">
                    {activeStep === 0 ? "_" : "+"}
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    activeStep === 0 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-sm">
                      Drop in raw university spreadsheets (CSV/Excel) or interface with your existing database. Automatically pulls student enrollments, course codes, lecture hall sizes, and seating capacities.
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startIngestSimulation();
                        handleCursorHoverEnter();
                      }}
                      className="px-5 py-2.5 text-[11px] font-semibold bg-black text-white hover:bg-black/90 active:scale-95 transition-all shadow-md rounded-sm"
                    >
                      {step1Parsed ? "Re-Ingest Spreadsheets" : step1Uploading ? `Uploading (${step1Progress}%)` : "Simulate File Ingest"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2 Tab */}
              <div
                onClick={() => {
                  setActiveStep(1);
                  handleCursorHoverEnter();
                }}
                onMouseEnter={() => handleCursorHoverEnter()}
                onMouseLeave={() => handleCursorHoverLeave()}
                className={`py-8 text-left w-full cursor-pointer transition-all duration-300 group ${
                  activeStep === 1 ? "opacity-100" : "opacity-45 hover:opacity-75"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-gray-400">02 / DEFINE</span>
                    <h3 className="text-lg font-bold font-sans text-black tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      Define Constraints
                    </h3>
                  </div>
                  <span className="text-lg font-mono leading-none transition-transform duration-500">
                    {activeStep === 1 ? "_" : "+"}
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    activeStep === 1 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-sm">
                      Toggle operational thresholds and structural boundaries through a clean dashboard. Ingest rigid hard rules alongside soft optimization constraints (e.g. spacing engineering courses or mapping proctor availability).
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(1);
                        handleCursorHoverEnter();
                      }}
                      className="px-5 py-2.5 text-[11px] font-semibold bg-black text-white hover:bg-black/90 active:scale-95 transition-all shadow-md rounded-sm"
                    >
                      Configure Active Rules
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3 Tab */}
              <div
                onClick={() => {
                  setActiveStep(2);
                  handleCursorHoverEnter();
                }}
                onMouseEnter={() => handleCursorHoverEnter()}
                onMouseLeave={() => handleCursorHoverLeave()}
                className={`py-8 text-left w-full cursor-pointer transition-all duration-300 group ${
                  activeStep === 2 ? "opacity-100" : "opacity-45 hover:opacity-75"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-gray-400">03 / COEXIST</span>
                    <h3 className="text-lg font-bold font-sans text-black tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      Instant Generation
                    </h3>
                  </div>
                  <span className="text-lg font-mono leading-none transition-transform duration-500">
                    {activeStep === 2 ? "_" : "+"}
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    activeStep === 2 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 h-0 overflow-hidden"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-sm">
                      Fire up the automated Graph-Coloring solver. In seconds, the engine evaluates millions of placement combinations to output a perfectly organized, non-conflicting master timetable grid exportable to ERPs.
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        runCoexistResolver();
                        handleCursorHoverEnter();
                      }}
                      className="px-5 py-2.5 text-[11px] font-semibold bg-black text-white hover:bg-black/90 active:scale-95 transition-all shadow-md rounded-sm animate-pulse"
                    >
                      {isResolved ? "Re-Run Optimization" : isResolving ? "Resolving Constraints..." : "⚡ Run Engine Solver"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Interactive Dashboard Canvas */}
            <div ref={sec2CanvasRef} className="lg:col-span-7 w-full flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-2xl p-6 overflow-hidden flex flex-col justify-between select-none">
                {/* Concentric Blueprint Grid Backdrop */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
                  <svg className="w-full h-full" style={{ minWidth: "500px" }}>
                    <circle cx="50%" cy="50%" r="180" stroke="#000000" strokeWidth="0.8" fill="none" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="90" stroke="#000000" strokeWidth="0.8" fill="none" />
                  </svg>
                </div>

                {/* Dashboard Card Header Wrapper */}
                <div className="relative z-10 flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-semibold ml-2">
                      {activeStep === 0 ? "coexist://core-ingest" : activeStep === 1 ? "coexist://rules-engine" : "coexist://graph-resolver"}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold font-mono">
                    System State
                  </span>
                </div>

                {/* Main Interactive Screen Content */}
                <div className="relative z-10 flex-1 my-5 flex items-center justify-center overflow-hidden">
                  
                  {/* STEP 1 VISUAL: Data Ingest Node Mapping */}
                  {activeStep === 0 && (
                    <div className="w-full h-full flex flex-col justify-between animate-fade-in">
                      {!step1Uploading && !step1Parsed ? (
                        <div
                          onClick={startIngestSimulation}
                          onMouseEnter={() => handleCursorHoverEnter()}
                          onMouseLeave={() => handleCursorHoverLeave()}
                          className="flex-1 border border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50/80 transition-all rounded-lg flex flex-col items-center justify-center text-center p-6 cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <h4 className="text-xs font-bold text-black mt-4 font-sans">Drop university spreadsheets</h4>
                          <p className="text-[10px] text-gray-400 mt-1.5 max-w-xs font-sans">
                            Select Course Enrollment Records, Class Hall Sizes, or sync with ERP database API endpoints.
                          </p>
                        </div>
                      ) : step1Uploading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white/50 rounded-lg border border-gray-100 relative overflow-hidden">
                          {/* Animated parsing sweep lines */}
                          <div className="absolute inset-x-0 top-0 h-0.5 bg-black opacity-45 animate-bounce" />
                          <div className="w-10 h-10 rounded-full border-2 border-black border-t-transparent animate-spin flex items-center justify-center" />
                          <h4 className="text-xs font-bold text-black mt-5 font-sans">Processing Data Schemas</h4>
                          <p className="text-[10px] text-gray-400 mt-1 max-w-xs font-sans">
                            Analyzing {step1Progress}% of nodes, mapping conflict indices, and parsing capacities...
                          </p>
                          <div className="w-full max-w-xs bg-gray-100 h-1.5 rounded-full overflow-hidden mt-6">
                            <div className="bg-black h-full transition-all duration-150" style={{ width: `${step1Progress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col justify-center p-2 relative">
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-4 text-center">Parsed Ingestion Map</h4>
                          
                          {/* Beautiful Interactive Nodes Map representation */}
                          <div className="flex flex-col md:flex-row items-center justify-around gap-6 relative">
                            {/* SVG Nodes Link Paths */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
                              <line x1="25%" y1="15%" x2="50%" y2="50%" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                              <line x1="25%" y1="85%" x2="50%" y2="50%" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                              <line x1="75%" y1="50%" x2="50%" y2="50%" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                            </svg>

                            <div className="flex flex-col gap-3.5 z-10 w-full max-w-[190px]">
                              <div className="bg-white border border-emerald-100 shadow-sm p-2.5 rounded flex items-center gap-2.5 hover:shadow-md transition-shadow">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[6px] text-white font-bold font-sans">✓</span>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-semibold font-sans text-black">students_records.csv</span>
                                  <span className="text-[8px] text-gray-400 font-mono">12,400 Students parsed</span>
                                </div>
                              </div>
                              <div className="bg-white border border-emerald-100 shadow-sm p-2.5 rounded flex items-center gap-2.5 hover:shadow-md transition-shadow">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[6px] text-white font-bold font-sans">✓</span>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-semibold font-sans text-black">classroom_halls.xlsx</span>
                                  <span className="text-[8px] text-gray-400 font-mono">45 Lecture Halls parsed</span>
                                </div>
                              </div>
                            </div>

                            {/* Core Node Hub */}
                            <div className="w-20 h-20 rounded-full border border-black bg-black text-white flex flex-col items-center justify-center text-center shadow-lg z-10 hover:scale-105 transition-transform duration-300">
                              <span className="text-[13px] font-bold tracking-widest font-mono">CORE</span>
                              <span className="text-[7px] text-emerald-400 font-bold uppercase mt-1 font-mono tracking-widest">OK</span>
                            </div>

                            <div className="bg-white border border-emerald-100 shadow-sm p-2.5 rounded flex items-center gap-2.5 hover:shadow-md transition-shadow z-10 w-full max-w-[190px]">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[6px] text-white font-bold font-sans">✓</span>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-semibold font-sans text-black">course_midsem.csv</span>
                                <span className="text-[8px] text-gray-400 font-mono">180 Courses parsed</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-center mt-6">
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-sans inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              Graph elements successfully linked in memory
                            </span>
                            <button
                              onClick={resetIngestSimulation}
                              onMouseEnter={() => handleCursorHoverEnter()}
                              onMouseLeave={() => handleCursorHoverLeave()}
                              className="text-[10px] text-gray-400 block mx-auto hover:text-black underline mt-2.5 cursor-pointer select-none"
                            >
                              Reset Upload Simulation
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2 VISUAL: Interactive Constraint Config Board */}
                  {activeStep === 1 && (
                    <div className="w-full h-full flex flex-col justify-between animate-fade-in">
                      <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-4 flex-1 flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-gray-200/50 pb-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase font-mono">Active Constraint Matrix</span>
                          <span className="text-[10px] text-black font-semibold font-sans">Click switches to toggle rules</span>
                        </div>

                        {/* Interactive Toggles Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
                          {/* Switch 1: Rigid Hard overlap constraint (Always Active) */}
                          <div className="bg-white border border-gray-200/60 p-2.5 rounded flex items-center justify-between shadow-sm relative overflow-hidden group">
                            <div className="absolute left-0 inset-y-0 w-0.5 bg-black" />
                            <div className="flex flex-col max-w-[80%]">
                              <span className="text-[10px] font-bold text-black font-sans">Zero Overlaps</span>
                              <span className="text-[8px] text-gray-400 leading-normal font-sans">Absolute zero student clashes</span>
                            </div>
                            <div className="w-8 h-4.5 bg-black rounded-full p-0.5 flex items-center justify-end select-none opacity-60">
                              <div className="w-3.5 h-3.5 bg-white rounded-full" />
                            </div>
                          </div>

                          {/* Switch 2: Rigid Hard room constraint (Always Active) */}
                          <div className="bg-white border border-gray-200/60 p-2.5 rounded flex items-center justify-between shadow-sm relative overflow-hidden group">
                            <div className="absolute left-0 inset-y-0 w-0.5 bg-black" />
                            <div className="flex flex-col max-w-[80%]">
                              <span className="text-[10px] font-bold text-black font-sans">Room Capacity Cap</span>
                              <span className="text-[8px] text-gray-400 leading-normal font-sans">Absolute zero hall overflows</span>
                            </div>
                            <div className="w-8 h-4.5 bg-black rounded-full p-0.5 flex items-center justify-end select-none opacity-60">
                              <div className="w-3.5 h-3.5 bg-white rounded-full" />
                            </div>
                          </div>

                          {/* Switch 3: Interactive Soft spacing optimization constraint */}
                          <div
                            onClick={() => {
                              setSoftFaculty(!softFaculty);
                              handleCursorHoverEnter();
                            }}
                            onMouseEnter={() => handleCursorHoverEnter()}
                            onMouseLeave={() => handleCursorHoverLeave()}
                            className={`p-2.5 rounded border flex items-center justify-between shadow-sm transition-all cursor-pointer relative overflow-hidden select-none ${
                              softFaculty ? "bg-white border-emerald-200" : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {softFaculty && <div className="absolute left-0 inset-y-0 w-0.5 bg-emerald-500" />}
                            <div className="flex flex-col max-w-[80%]">
                              <span className="text-[10px] font-bold text-black font-sans">Faculty Spacing</span>
                              <span className="text-[8px] text-gray-400 leading-normal font-sans">Allow 24h grading buffer</span>
                            </div>
                            <div className={`w-8 h-4.5 rounded-full p-0.5 flex items-center transition-colors ${
                              softFaculty ? "bg-emerald-500 justify-end" : "bg-gray-200 justify-start"
                            }`}>
                              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                            </div>
                          </div>

                          {/* Switch 4: Interactive Soft exams pacing constraint */}
                          <div
                            onClick={() => {
                              setSoftMaxExams(!softMaxExams);
                              handleCursorHoverEnter();
                            }}
                            onMouseEnter={() => handleCursorHoverEnter()}
                            onMouseLeave={() => handleCursorHoverLeave()}
                            className={`p-2.5 rounded border flex items-center justify-between shadow-sm transition-all cursor-pointer relative overflow-hidden select-none ${
                              softMaxExams ? "bg-white border-emerald-200" : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {softMaxExams && <div className="absolute left-0 inset-y-0 w-0.5 bg-emerald-500" />}
                            <div className="flex flex-col max-w-[80%]">
                              <span className="text-[10px] font-bold text-black font-sans">Student Exam Spacing</span>
                              <span className="text-[8px] text-gray-400 leading-normal font-sans">Avoid high-stress double papers</span>
                            </div>
                            <div className={`w-8 h-4.5 rounded-full p-0.5 flex items-center transition-colors ${
                              softMaxExams ? "bg-emerald-500 justify-end" : "bg-gray-200 justify-start"
                            }`}>
                              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                            </div>
                          </div>
                        </div>

                        {/* Real-time Constraint Solver calculation bar */}
                        <div className={`border rounded-lg p-3 flex items-center justify-between transition-colors shadow-sm ${
                          (!softFaculty && !softMaxExams)
                            ? "bg-amber-50 border-amber-200 text-amber-900"
                            : (softFaculty && softMaxExams)
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-blue-50 border-blue-200 text-blue-900"
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-base select-none">
                              {(!softFaculty && !softMaxExams) ? "⚠️" : (softFaculty && softMaxExams) ? "✓" : "⚡"}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold font-sans">
                                {(!softFaculty && !softMaxExams)
                                  ? "14 Optimal Placement Spike Clashes"
                                  : (softFaculty && softMaxExams)
                                  ? "Mathematical Harmony Achieved"
                                  : "6 Placement Spacing Clashes"}
                              </span>
                              <span className="text-[8px] opacity-75 font-sans leading-normal">
                                {(!softFaculty && !softMaxExams)
                                  ? "Heavy workload overlap on Engineering departments."
                                  : (softFaculty && softMaxExams)
                                  ? "All courses satisfy soft & hard constraints cleanly."
                                  : "Optimizing solver placement metrics..."}
                              </span>
                            </div>
                          </div>
                          <span className="text-[13px] font-bold font-mono px-2 py-0.5 rounded bg-white/80 shadow-sm">
                            {(!softFaculty && !softMaxExams) ? "14" : (softFaculty && softMaxExams) ? "0" : "6"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 VISUAL: Calendar Grid Color Assembly Resolver */}
                  {activeStep === 2 && (
                    <div className="w-full h-full flex flex-col justify-between animate-fade-in relative">
                      
                      {/* Grid representation */}
                      <div className="flex-1 grid grid-cols-5 gap-2.5 p-1 relative z-0 select-none">
                        
                        {/* Vertical Sweep Resolver line */}
                        {isResolving && (
                          <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] z-10 animate-pulse pointer-events-none"
                               style={{
                                 top: `${Math.min(100, Math.max(0, (resolvingGridIndex / 10) * 100))}%`,
                                 transition: "top 0.1s linear"
                               }}
                          />
                        )}

                        {/* 10 Timetable Slot Cells */}
                        {[
                          { code: "CS-301", hall: "Hall A", bg: "bg-orange-50 border-orange-100 text-orange-900" },
                          { code: "EE-102", hall: "Hall B", bg: "bg-blue-50 border-blue-100 text-blue-900" },
                          { code: "MATH-101", hall: "Hall A", bg: "bg-violet-50 border-violet-100 text-violet-900" },
                          { code: "PHY-203", hall: "Hall C", bg: "bg-teal-50 border-teal-100 text-teal-900" },
                          { code: "CS-402", hall: "Hall B", bg: "bg-amber-50 border-amber-100 text-amber-900" },
                          { code: "BIO-105", hall: "Hall A", bg: "bg-rose-50 border-rose-100 text-rose-900" },
                          { code: "CHEM-110", hall: "Hall C", bg: "bg-emerald-50 border-emerald-100 text-emerald-900" },
                          { code: "ME-204", hall: "Hall B", bg: "bg-sky-50 border-sky-100 text-sky-900" },
                          { code: "LIT-112", hall: "Hall A", bg: "bg-indigo-50 border-indigo-100 text-indigo-900" },
                          { code: "MATH-205", hall: "Hall C", bg: "bg-purple-50 border-purple-100 text-purple-900" },
                        ].map((cell, idx) => {
                          const isFilled = isResolved || (isResolving && resolvingGridIndex > idx);
                          return (
                            <div
                              key={idx}
                              className={`rounded border flex flex-col justify-center items-center text-center p-2.5 transition-all duration-300 ${
                                isFilled ? cell.bg : "border-dashed border-gray-200 bg-gray-50/20 text-gray-300"
                              }`}
                            >
                              <span className={`text-[10px] font-bold font-mono transition-opacity duration-300 ${isFilled ? "opacity-100" : "opacity-30"}`}>
                                {isFilled ? cell.code : "•••"}
                              </span>
                              <span className={`text-[7px] font-bold uppercase tracking-wider font-mono mt-1 transition-opacity duration-300 ${isFilled ? "opacity-60" : "opacity-0"}`}>
                                {isFilled ? cell.hall : ""}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Not Active solver launch trigger button overlays */}
                      {!isResolving && !isResolved && (
                        <div className="absolute inset-0 bg-white/75 backdrop-blur-xs flex items-center justify-center z-10 animate-fade-in select-none">
                          <button
                            onClick={runCoexistResolver}
                            onMouseEnter={() => handleCursorHoverEnter()}
                            onMouseLeave={() => handleCursorHoverLeave()}
                            className="bg-black text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            ⚡ Resolve Constraints & Generate Grid
                          </button>
                        </div>
                      )}

                      {/* Glass success banner on Resolve Finished */}
                      {isResolved && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-5 text-center z-20 animate-fade-in">
                          <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold shadow-xl mb-3 animate-bounce">
                            ✓
                          </div>
                          <h4 className="text-[14px] font-bold text-black font-sans tracking-tight">Grid Harmony Achieved</h4>
                          <p className="text-[10px] text-gray-400 mt-1 max-w-[240px] font-sans leading-normal">
                            Calculated 1.8M node permutations. Resolved in 3.1s. Absolute zero room overflows or individual overlaps.
                          </p>
                          <div className="flex gap-2.5 mt-5">
                            <button
                              onMouseEnter={() => handleCursorHoverEnter()}
                              onMouseLeave={() => handleCursorHoverLeave()}
                              className="px-4 py-2 text-[9px] bg-black text-white font-semibold rounded-sm shadow-md hover:bg-black/90 active:scale-95 transition-all cursor-pointer"
                            >
                              Download Master PDF
                            </button>
                            <button
                              onClick={resetCoexistResolver}
                              onMouseEnter={() => handleCursorHoverEnter()}
                              onMouseLeave={() => handleCursorHoverLeave()}
                              className="px-4 py-2 text-[9px] border border-gray-200 bg-white text-black font-semibold rounded-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                            >
                              Re-Run Solve
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer details Inside mockup */}
                <div className="relative z-10 border-t border-gray-100 pt-3 flex items-center justify-between text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono tracking-wider font-semibold">COEXIST ENGINE v1.4</span>
                  </div>
                  <span className="text-[9px] font-mono font-semibold">100% Clash-Free Grid Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          Section 3: Customer Spotlight
          ------------------------------------------------------------- */}
      <section ref={spotlightRef} className="w-full relative z-20 bg-white py-24 px-6 md:px-20 border-t border-gray-100 flex flex-col justify-center">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: "radial-gradient(#C4C7CC 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          <div ref={spotlightHeaderRef} className="flex flex-col gap-3 max-w-2xl mb-16">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Customer Spotlight
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-sans text-black leading-tight" style={{ letterSpacing: "-0.94px" }}>
              See how universities scaled clash-free scheduling with Coexist
            </h2>
          </div>

          <div ref={spotlightCardRef} className="w-full rounded-[24px] border border-gray-100/80 shadow-xl bg-white flex flex-col lg:flex-row overflow-hidden relative min-h-[500px]">
            {/* Left Image Column */}
            <div className="lg:w-[50%] relative min-h-[350px] lg:min-h-[500px] overflow-hidden bg-gray-100">
              <img
                src={administratorSpotlight}
                alt="Stanford University Administrator Spotlight"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Bottom Red-Orange Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-white z-10 bg-gradient-to-t from-[#8C1515] to-transparent pt-32">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-red-205">Clash Rate</span>
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans mt-1">0.00%</span>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:w-[50%] p-8 md:p-12 flex flex-col justify-between bg-white relative">
              <div>
                {/* Stanford Logo Badge in Cardinal Red */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-sm bg-[#8C1515] flex items-center justify-center text-white font-extrabold text-xs">
                    S
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#8C1515]">Stanford University</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-6" style={{ letterSpacing: "-0.94px" }}>
                  How Stanford University and Coexist built reliable, stress-free timetabling at scale
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed italic mb-8 relative pl-4 border-l border-gray-200">
                  "At Stanford University, we operate at a massive scale across departments, libraries, and campuses. Coexist's graph-coloring scheduling engine delivered immediate and measurable improvements, including absolute zero student timetabling clashes, streamlined classroom utilization, and happier faculty. Timely partnerships like this are critical to achieving administrative precision on a global academic scale."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-gray-100">
                {/* Testimonial Author Block */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8C1515] text-[#F9F6F0] flex items-center justify-center font-extrabold text-sm shadow-inner">
                    EV
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-black">Dr. Evelyn Vance</span>
                    <span className="text-[10px] text-gray-400 font-medium">Controller of Examinations, Stanford</span>
                  </div>
                </div>

                {/* Read study button */}
                <button
                  onMouseEnter={() => handleCursorHoverEnter()}
                  onMouseLeave={() => handleCursorHoverLeave()}
                  className="bg-black text-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider hover:bg-black/90 active:scale-95 transition-all rounded-sm shadow-md cursor-pointer self-start sm:self-auto"
                >
                  Read the study
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          Section 4: Personalized Demo (CTA)
          ------------------------------------------------------------- */}
      <section ref={demoRef} className="w-full relative z-20 bg-white py-24 px-6 md:px-20 border-t border-gray-100 flex flex-col justify-center">
        {/* technical dotted grid backdrop */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: "radial-gradient(#C4C7CC 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          {/* Left Heading */}
          <div ref={demoTitleRef} className="flex flex-col gap-3 max-w-xl lg:w-[50%]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Get a personalized demo
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-sans text-black leading-tight" style={{ letterSpacing: "-0.94px" }}>
              Ready to see the Coexist engine in action?
            </h2>
          </div>

          {/* Right Subtext & CTA */}
          <div ref={demoContentRef} className="lg:w-[45%] flex flex-col items-start gap-6">
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Coexist's graph-coloring engine handles complex academic scheduling workflows at scale, from class seating capacities to faculty invigilation constraints, maintaining 100% clash-free accuracy in production. Let us demo it for your institution.
            </p>
            
            <button
              onMouseEnter={() => handleCursorHoverEnter()}
              onMouseLeave={() => handleCursorHoverLeave()}
              className="bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-black/90 active:scale-95 transition-all rounded-sm shadow-md cursor-pointer"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          Section 5: Re-engineered Premium Footer
          ------------------------------------------------------------- */}
      <footer className="w-full relative z-20 bg-white border-t border-gray-100 pt-20 pb-10 px-6 md:px-20 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Brand & Trust Badges */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2.5 text-base font-extrabold tracking-tight">
                <Logo size={22} className="text-black" />
                <span>COEXIST</span>
              </div>

              {/* Compliant Flag & High-Fidelity Circular SVGs Trust Badges */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest font-semibold text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  COMPLIANT
                </div>
                
                {/* Circular Badges matching the Giga mockups */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white transition-all shadow-xs" title="SOC 2 Type II Certified">
                    <span className="text-[7px] font-black text-black leading-none font-mono">SOC2</span>
                    <span className="text-[5px] text-gray-400 font-bold uppercase mt-0.5 font-mono">TYPE II</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white transition-all shadow-xs" title="ISO 27001 Certified Security">
                    <span className="text-[7px] font-black text-black leading-none font-mono">ISO</span>
                    <span className="text-[5px] text-gray-400 font-bold uppercase mt-0.5 font-mono">27001</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white transition-all shadow-xs" title="FERPA Compliant Academic Privacy">
                    <span className="text-[7px] font-black text-black leading-none font-mono">FERPA</span>
                    <span className="text-[5px] text-gray-400 font-bold uppercase mt-0.5 font-mono">SECURE</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 font-mono ml-1">5+</span>
                </div>
              </div>
            </div>

            {/* Right Column: Three Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Product Column */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">Product</span>
                <ul className="flex flex-col gap-2.5">
                  {["Scheduling Engine", "Conflict Matrix", "Student Portal", "Integrations"].map((l) => (
                    <li key={l}>
                      <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors font-medium">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">Company</span>
                <ul className="flex flex-col gap-2.5">
                  {["Careers", "Contact", "Trust Center"].map((l) => (
                    <li key={l}>
                      <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors font-medium">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">Resources</span>
                <ul className="flex flex-col gap-2.5">
                  {["News", "Privacy Policy", "Terms Of Service"].map((l) => (
                    <li key={l}>
                      <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors font-medium">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom Copyright & Social bar */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-gray-400 font-medium">
              © 2026 Coexist AI, Inc. All rights reserved.
            </span>

            {/* Social handles matching Giga mockup layout ("X | in") */}
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-gray-400 font-bold">
              <a
                href="#"
                onMouseEnter={() => handleCursorHoverEnter()}
                onMouseLeave={() => handleCursorHoverLeave()}
                className="hover:text-black transition-colors"
                aria-label="Twitter X"
              >
                X
              </a>
              <span className="text-gray-200 select-none font-light">|</span>
              <a
                href="#"
                onMouseEnter={() => handleCursorHoverEnter()}
                onMouseLeave={() => handleCursorHoverLeave()}
                className="hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>

        </div>
      </footer>
      </div>

    </div>
  );
}
