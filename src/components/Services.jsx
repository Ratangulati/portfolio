import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Heights for stacking (desktop only)
const TITLE_BAR_HEIGHT_DESKTOP = 170;
const CARD_ROW_HEIGHT_DESKTOP = 90;

const Services = () => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const splitInstancesRef = useRef([]);

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
      description: "I architect cloud-native infrastructure and automate deployment pipelines to deliver scalable, reliable systems. From containerization to CI/CD orchestration, I build production-grade solutions that streamline development workflows and ensure operational excellence.",
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
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      const setupAnimation = () => {
        // Clean up old SplitText instances
        splitInstancesRef.current.forEach(instance => {
          if (instance && instance.revert) {
            instance.revert();
          }
        });
        splitInstancesRef.current = [];

        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        const isMobile = window.innerWidth < 768;

        // DESKTOP ONLY: Pin and stack cards
        if (!isMobile) {
          const titleBarHeight = TITLE_BAR_HEIGHT_DESKTOP;
          const CARD_ROW_HEIGHT = CARD_ROW_HEIGHT_DESKTOP;

          // Pin title at top
          ScrollTrigger.create({
            trigger: titleWrapperRef.current,
            start: 'top top',
            endTrigger: sectionRef.current,
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });

          // Pin each card
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
              invalidateOnRefresh: true,
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
                invalidateOnRefresh: true,
              },
            });
          });
        }

        // Title animation - simplified for mobile
        if (titleRef.current) {
          if (isMobile) {
            gsap.set(titleRef.current, { opacity: 0, y: 30 });
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          } else {
            const split = new SplitText(titleRef.current, { type: 'chars' });
            splitInstancesRef.current.push(split);
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
        }

        // Paragraph animation - simplified for mobile
        if (paragraphRef.current) {
          if (isMobile) {
            gsap.set(paragraphRef.current, { opacity: 0, y: 20 });
            gsap.to(paragraphRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          } else {
            const split = new SplitText(paragraphRef.current, {
              type: 'lines',
              linesClass: 'line-wrapper',
            });
            splitInstancesRef.current.push(split);
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
        }

        // Label animation
        gsap.from('.services-intro-label', {
          opacity: 0,
          y: isMobile ? 15 : 30,
          duration: isMobile ? 0.6 : 1,
          delay: isMobile ? 0.1 : 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-intro-label',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        ScrollTrigger.refresh();
      };

      setupAnimation();

      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          setupAnimation();
        }, 300);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
      };
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      splitInstancesRef.current.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      splitInstancesRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 bg-black rounded-t-3xl"
    >
      {/* Title Bar */}
      <div
        ref={titleWrapperRef}
        className="bg-black z-30 flex items-end rounded-t-3xl pt-6 pb-3"
        style={{ 
          minHeight: typeof window !== 'undefined' && window.innerWidth >= 768 
            ? `${TITLE_BAR_HEIGHT_DESKTOP}px` 
            : 'auto'
        }}
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

      {/* Intro Section */}
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

      {/* MOBILE: Horizontal scroll carousel with left spacing */}
      <div className="md:hidden pb-12 pl-5">
        <div 
          className="flex gap-4 overflow-x-auto pb-6 pr-5 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[85vw] snap-start bg-black border border-[#3a3633] rounded-2xl p-6"
            >
              <div className="mb-4">
                <span className="text-4xl font-semibold text-[#d1d1c7] block mb-2">
                  ({service.number})
                </span>
                <h3 className="text-2xl font-semibold text-[#d1d1c7] leading-tight">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-[#a39e9b] text-base leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.tech.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-start gap-3 text-[#6b645c] border-t border-[#3a3633] pt-3"
                  >
                    <span className="text-sm font-mono mt-0.5">{tech.label}</span>
                    <span className="text-lg font-medium text-[#bfbfb2]">
                      {tech.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: Stacking cards */}
      <div ref={cardsContainerRef} className="relative hidden md:block">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card bg-black border-t border-[#3a3633] min-h-[70vh]"
            style={{ zIndex: 20 + index }}
          >
            <div className="content-container px-5 md:px-10 py-5 md:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-0">
                <div className="hidden lg:block lg:col-span-5">
                  <span className="text-xl md:text-5xl lg:text-5xl tracking-tight font-semibold text-[#d1d1c7]">
                    ({service.number})
                  </span>
                </div>
                
                <div className="col-span-1 lg:col-span-7">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold pb-4 text-[#d1d1c7] leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

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
