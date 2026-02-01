// Hero.jsx — Hero section component
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import heroImg from "../assets/hero-photo.jpg";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const arrowRef = useRef(null);
  const imageRef = useRef(null);
  const availableTextRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // NAME ANIMATION - character by character
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, {
          type: "chars",
        });

        gsap.set(split.chars, {
          y: 170,
          display: "inline-block",
        });

        gsap.to(split.chars, {
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // TAGLINE - entire paragraph slides up with fade-in
      if (taglineRef.current) {
        gsap.set(taglineRef.current, {
          y: 80,
          opacity: 0,
        });

        gsap.to(taglineRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          delay: 0,
          ease: "power2.out",
        });
      }

      // CONTACT BUTTON WRAPPER - animate the wrapper instead
      if (buttonWrapperRef.current) {
        gsap.set(buttonWrapperRef.current, {
          y: 80,
          opacity: 0,
        });

        gsap.to(buttonWrapperRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0,
          ease: "power2.out",
        });
      }

      // ARROW - fade in
      if (arrowRef.current) {
        gsap.from(arrowRef.current, {
          opacity: 0,
          duration: 2.7,
          delay: 0.2,
          ease: "power2.out",
        });
      }

      // AVAILABLE FOR WORK TEXT - slides up together
      if (availableTextRef.current) {
        gsap.from(availableTextRef.current, {
          y: 30,
          opacity: 0,
          duration: 1.3,
          delay: 0.2,
          ease: "power2.out",
        });
      }

      // DATE - slides up together
      if (dateRef.current) {
        gsap.from(dateRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.0,
          delay: 0.4,
          ease: "power2.out",
        });
      }

      // IMAGE - reveal from top to bottom
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.8,
          delay: 0,
          ease: "power2.out",
        });
      }

      // SCROLL-TRIGGERED COMPRESS AND FADE OUT EFFECT - SINGLE ANIMATION
      if (contentRef.current && heroRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          },
        });

        // Fade happens quickly (0-40% of scroll)
        tl.to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        // Scale and move continue throughout (40-100% of scroll)
        .to(contentRef.current, {
          scale: 0.92,
          y: 100,
          transformOrigin: "center center",
          ease: "none",
          duration: 0.6,
        }, 0); // Start at same time (position 0)
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    setCurrentMonthYear(`${month}'${year}`);
  }, []);

  return (
  <section
    id="home"
    ref={heroRef}
    className="min-h-screen pt-36 bg-[#e8e8e3] text-neutral-900 overflow-hidden relative"
  >
    <div ref={contentRef} className="max-w-screen mx-auto px-5 md:px-10 relative">
      {/* Name */}
      <div className="w-full overflow-hidden mb-8">
        <h1
          ref={titleRef}
          className="block -ml-2 font-semibold tracking-[-0.10em] text-neutral-900 leading-[0.8] text-[clamp(5rem,10vw,17rem)]"
        >
          <span className="inline ml-1 md:ml-0">RATAN</span>
          <span className="inline ml-1 md:ml-5">GULATI</span>
        </h1>
      </div>

      {/* Image positioned absolutely on the right */}
      <div className="absolute top-0 right-0 lg:right-10 w-[40%] max-w-[21rem] hidden lg:block">
        <div className="rounded-lg overflow-hidden aspect-[4/5]">
          <img
            ref={imageRef}
            src={heroImg}
            alt="Workspace"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3-column layout */}
        <div className="grid grid-cols-12 gap-8 items-start relative">
          {/* LEFT: copy + CTA */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <div className="mb-12 pt-4">
              <svg
                ref={arrowRef}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-9 h-9 text-[#8c8c74]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                />
              </svg>
            </div>

            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <p
                ref={taglineRef}
                className="text-lg md:text-2xl font-normal text-[#6b645c] leading-8 tracking-tight"
              >
                Passionate about building scalable systems and intelligent automation that make development faster and smarter. Always open to opportunities that challenge me to innovate and grow.
              </p>
            </div>

            <div style={{ overflow: "hidden", display: "inline-block" }}>
              <div 
                ref={buttonWrapperRef}
                style={{ display: "inline-block" }}
              >
                <a
                  href="https://docs.google.com/document/d/1-PJCu2UOiGR9ccKJOnba9Uwsi_bgDyr3/edit?usp=sharing&ouid=115658230998193210532&rtpof=true&sd=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center w-auto h-auto p-4 md:p-5 bg-[#3a3633] text-neutral-100 rounded-full text-base md:text-lg font-medium shadow transition-all duration-300 hover:bg-[#4a4541] hover:shadow-lg"
                >
                  MY RESUME ↗
                </a>
              </div>
            </div>

          </div>

          {/* CENTER: Empty space */}
          <div className="col-span-12 lg:col-span-2"></div>

          {/* RIGHT: date display - tall container with date at bottom */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between items-end text-right min-h-[55vh]">
            <div></div> {/* Empty div to push content */}
            
            <div className="flex flex-col items-end">
              <div style={{ overflow: "hidden" }}>
                <div 
                  ref={availableTextRef}
                  className="text-xs tracking-widest text-neutral-600 mb-2"
                >
                  AVAILABLE FOR WORK
                </div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  ref={dateRef}
                  className="font-extrabold text-[#3a3633] uppercase"
                  style={{ fontSize: "clamp(2rem, 6vw, 7rem)", lineHeight: 0.85 }}
                >
                  {currentMonthYear}
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  </section>
);

};

export default Hero;
