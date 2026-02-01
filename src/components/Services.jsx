import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Heights for stacking
const TITLE_BAR_HEIGHT_MOBILE = 100;
const TITLE_BAR_HEIGHT_DESKTOP = 170;
const CARD_ROW_HEIGHT = 80;

const Services = () => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const services = [
    {
      number: '01',
      title: 'Full-Stack Development',
      description: 'From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.',
      tech: [
        { label: '01', text: 'React, Node.js, Express.js' },
        { label: '02', text: 'REST APIs, Firebase, Docker' },
        { label: '03', text: 'Git, GitHub, Postman' },
      ],
    },
    {
      number: '02',
      title: 'UI/UX & Frontend',
      description: "Design is more than looks — it's about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.",
      tech: [
        { label: '01', text: 'NextJs, TailwindCSS, GSAP' },
        { label: '02', text: 'Figma to Code' },
        { label: '03', text: 'HTML, CSS, JavaScript' },
      ],
    },
    {
      number: '03',
      title: 'Optimization',
      description: "Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.",
      tech: [
        { label: '01', text: 'Data Structures & Algorithms' },
        { label: '02', text: 'DBMS, OOP, OS Fundamentals' },
        { label: '03', text: 'Data Pipelines, ETL, and Scalability' },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Determine title bar height based on screen size
      const isMobile = window.innerWidth < 768;
      const titleBarHeight = isMobile ? TITLE_BAR_HEIGHT_MOBILE : TITLE_BAR_HEIGHT_DESKTOP;

      // Pin title at top (Desktop only)
      if (!isMobile && titleWrapperRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: titleWrapperRef.current,
          start: 'top top',
          endTrigger: sectionRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });
      }

      // Pin each card (Desktop only)
      if (!isMobile) {
        const cards = gsap.utils.toArray('.service-card');
        cards.forEach((card, index) => {
          const pinY = titleBarHeight + index * CARD_ROW_HEIGHT;

          ScrollTrigger.create({
            trigger: card,
            start: `top ${pinY}px`,
            endTrigger: sectionRef.current,
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
          });

          // Fade in animation
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });
      }

      // Title character animation
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'chars' });
        gsap.set(split.chars, { y: 170, display: 'inline-block' });
        gsap.to(split.chars, {
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Paragraph line animation
      if (paragraphRef.current) {
        const split = new SplitText(paragraphRef.current, {
          type: 'lines',
          linesClass: 'line-wrapper',
        });
        gsap.set(split.lines, { y: 40, opacity: 0 });
        gsap.to(split.lines, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.7,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Intro label animation
      gsap.from('.services-intro-label', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-intro-label',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 bg-black rounded-t-3xl overflow-visible"
    >
      {/* 1. Pinned Title Bar - MOBILE FIXED */}
      <div
        ref={titleWrapperRef}
        className="bg-black z-30 flex items-end rounded-t-3xl pt-6 md:pt-12 pb-3 md:pb-6"
      >
        <div className="content-container px-5 md:px-10 w-full">
          <div className="w-full overflow-visible">
            <h2
              ref={titleRef}
              className="services-title text-[2.25rem] sm:text-[2.75rem] md:text-5xl lg:text-[7rem] font-semibold text-[#d1d1c7] tracking-[-0.05em] leading-[0.95]"
            >
              WHAT I DO /
            </h2>
          </div>
        </div>
      </div>

      {/* 2. Intro Section */}
      <div className="content-container px-5 md:px-10 py-8 md:py-20">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-12">
          <div className="hidden md:block md:col-span-5"></div>
          <div className="md:col-span-2 flex items-start md:justify-end">
            <p className="services-intro-label text-[#6b645c] text-sm md:text-base uppercase tracking-[-0.04em]">
              (MY STACK)
            </p>
          </div>
          <div className="md:col-span-5">
            <div style={{ overflow: 'hidden' }}>
              <p
                ref={paragraphRef}
                className="text-[#a39e9b] text-base md:text-lg lg:text-2xl leading-relaxed"
              >
                I specialize in building full-stack web applications that are fast, reliable, and user-friendly. With a solid foundation in both frontend and backend technologies, I help bring ideas to life whether it's for a business, a startup, or a product team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Service Cards */}
      <div ref={cardsContainerRef} className="relative">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card bg-black border-t border-[#3a3633] min-h-[70vh]"
            style={{ zIndex: 10 + index }}
          >
            <div className="content-container px-5 md:px-10 py-6 md:py-8">
              {/* Card Header Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
                {/* Number - desktop only */}
                <div className="hidden lg:block lg:col-span-5">
                  <span className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold text-[#d1d1c7]">
                    ({service.number})
                  </span>
                </div>
                
                {/* Title */}
                <div className="col-span-1 lg:col-span-7">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold text-[#d1d1c7] leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                <div className="hidden lg:block lg:col-span-5"></div>
                <div className="col-span-1 lg:col-span-7">
                  <p className="text-[#a39e9b] text-base md:text-lg lg:text-xl tracking-tight leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="space-y-0 mb-8 divide-y divide-[#3a3633]">
                    {service.tech.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-start gap-4 md:gap-6 text-[#6b645c] py-4 first:pt-0"
                      >
                        <span className="text-sm mssd:text-base font-mono mt-1 flex-shrink-0">{tech.label}</span>
                        <span className="text-base md:text-xl lg:text-2xl tracking-tight leading-relaxed font-medium text-[#bfbfb2]">
                          {tech.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
