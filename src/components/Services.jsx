import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Heights for stacking - REDUCED FOR MOBILE
const TITLE_BAR_HEIGHT_MOBILE = 100;  // Smaller for mobile
const TITLE_BAR_HEIGHT_DESKTOP = 170; // Original for desktop
const CARD_ROW_HEIGHT_DESKTOP = 90;
const CARD_ROW_HEIGHT_MOBILE = 80; 

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
      description: 'I specialize in building full-stack web applications that are fast, reliable, and user-friendly. With a solid foundation in both frontend and backend technologies, I help bring ideas to life whether it\'s for a business, a startup, or a product team.',
      tech: [
        { label: '01', text: 'React, NextJs, TypeScript' },
        { label: '02', text: 'Node.js, Express.js, MongoDB' },
        { label: '03', text: 'Postgres, Prisma, REST APIs' },
      ],
    },
    {
      number: '02',
      title: 'DevOps and Cloud',
      description: "II architect cloud-native infrastructure and automate deployment pipelines to deliver scalable, reliable systems. From containerization to CI/CD orchestration, I build production-grade solutions that streamline development workflows and ensure operational excellence.",
      tech: [
        { label: '01', text: 'AWS, Google Cloud Platform' },
        { label: '02', text: 'Docker, Kubernetes, Jenkins' },
        { label: '03', text: 'Terraform, Ansible, GitHub Actions' },
      ],
    },
    {
      number: '03',
      title: 'MLOps & AI Engineering',
      description: 'I develop intelligent systems that bridge AI capabilities with production infrastructure. From integrating LLM APIs to building automated code analysis tools, I create AI-powered solutions that enhance developer productivity and code quality.',
      tech: [
        { label: '01', text: 'Python, Gemini API, LLM Integration' },
        { label: '02', text: 'Docker, REST APIs, CI/CD' },
        { label: '03', text: 'GitHub Actions, Node.js, TypeScript' },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Determine title bar height based on screen size
      const isMobile = window.innerWidth < 768;
      const titleBarHeight = isMobile ? TITLE_BAR_HEIGHT_MOBILE : TITLE_BAR_HEIGHT_DESKTOP;

      // Pin title at top
      ScrollTrigger.create({
        trigger: titleWrapperRef.current,
        start: 'top top',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      });

      // Pin each card
      const cards = gsap.utils.toArray('.service-card');
      cards.forEach((card, index) => {

        const isMobile = window.innerWidth < 768;
        const CARD_ROW_HEIGHT = isMobile ? CARD_ROW_HEIGHT_MOBILE : CARD_ROW_HEIGHT_DESKTOP;
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
      className="relative z-10 bg-black rounded-t-3xl"
    >
      {/* 1. Pinned Title Bar - NO PADDING ON MOBILE */}
      <div
  ref={titleWrapperRef}
  className="bg-black z-30 flex items-end rounded-t-3xl pt-6 pb-3"
  style={{ minHeight: '80px' }}
>
  <div className="content-container px-5 md:px-10 w-full">
    <div className="w-full overflow-visible">
      <h2
        ref={titleRef}
        className="services-title text-[2.5rem] md:text-5xl lg:text-[7rem] font-semibold text-[#d1d1c7] tracking-[-0.05em] leading-[0.9]"
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
                className="text-[#a39e9b] text-base md:text-lg lg:text-2xl leading-relaxed lg:mr-[8rem]"
              >
                I specialize in building scalable applications and intelligent automation systems that are efficient, reliable, and impactful. With expertise in full-stack development, cloud infrastructure, and AI integration, I help teams ship faster whether it's for a startup, an open-source project, or a development team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Service Cards - FULL WIDTH ON MOBILE */}
      <div ref={cardsContainerRef} className="relative">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card bg-black border-t border-[#3a3633] min-h-[70vh]"
            style={{ zIndex: 10 + index }}
          >
            <div className="content-container px-5 md:px-10 py-5 md:py-6">
              {/* Card Header Row - FULL WIDTH ON MOBILE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-0">
                {/* Number - desktop only */}
                <div className="hidden lg:block lg:col-span-5">
                  <span className="text-xl md:text-5xl lg:text-5xl tracking-tight font-semibold text-[#d1d1c7]">
                    ({service.number})
                  </span>
                </div>
                
                {/* Title - FULL WIDTH ON MOBILE */}
                <div className="col-span-1 lg:col-span-7">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold pb-4 text-[#d1d1c7] leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Content - FULL WIDTH ON MOBILE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="hidden lg:block lg:col-span-5"></div>
                <div className="col-span-1 lg:col-span-7">
                  <p className="text-[#a39e9b] text-base md:text-md lg:text-xl tracking-tight leading-relaxed mb-6 lg:mr-[12rem]">
                    {service.description}
                  </p>
                  <div className="space-y-4 mb-16 divide-y divide-[#3a3633]">
                    {service.tech.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-start gap-4 text-[#6b645c] pt-4"
                      >
                        <span className="text-xl font-mono mt-1">{tech.label}</span>
                        <span className="text-base md:text-2xl lg:text-3xl tracking-tight leading-relaxed font-medium text-[#bfbfb2]">
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
