import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Works = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const numberContainerRef = useRef(null);
  const [currentNumber, setCurrentNumber] = useState('01');
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectRefs = useRef([]);
  const projectsContainerRef = useRef(null);
  const splitInstancesRef = useRef([]);

  const projects = [
    { 
      number: '01', 
      title: 'CompileX', 
      subtitle: 'Real-time Collaborative Code Editor', 
      type: 'Development', 
      year: '2025', 
      image: project1, 
      video: null,
      liveUrl: 'https://compilex-drwp.onrender.com/',
      githubUrl: 'https://github.com/Ratangulati/CompileX',
    },
    { 
      number: '02', 
      title: 'Debt Detox', 
      subtitle: 'Personal Debt Manager', 
      type: 'Development', 
      year: '2025', 
      image: project2, 
      video: null,
      liveUrl: 'https://debt-detox.vercel.app/',
      githubUrl: 'https://github.com/Ratangulati/Debt_Detox',
    },
    { 
      number: '03', 
      title: 'CodeBuddy-AI', 
      subtitle: 'AI-Powered Code Review Assistant', 
      type: 'Development', 
      year: '2025', 
      image: project3, 
      video: null,
      liveUrl: 'https://github.com/Ratangulati/CodeBuddy-AI',
      githubUrl: 'https://github.com/Ratangulati/CodeBuddy-AI',
    },
    { 
      number: '04', 
      title: 'Github_Code_Analyzer', 
      subtitle: 'AI Powered Smart Repository Analyzer', 
      type: 'Development', 
      year: '2025', 
      image: project4, 
      video: null,
      liveUrl: 'https://githubcodeanalyzer.vercel.app/',
      githubUrl: 'https://github.com/Ratangulati/Github_Code_Analyzer',
    },
    { 
      number: '05', 
      title: 'Classroom', 
      subtitle: 'Education Management Platform', 
      type: 'Development', 
      year: '2025', 
      image: project5, 
      video: null,
      liveUrl: 'https://github.com/Ratangulati/Classroom',
      githubUrl: 'https://github.com/Ratangulati/Classroom',
    },
  ];

  // Rolling digit component
  const RollingDigit = ({ digit }) => {
    const digitRef = useRef(null);
    const prevDigit = useRef(digit);

    useEffect(() => {
      if (prevDigit.current !== digit && digitRef.current) {
        gsap.fromTo(
          digitRef.current,
          { y: '100%' },
          { y: '0%', duration: 0.5, ease: 'power2.out' }
        );
        prevDigit.current = digit;
      }
    }, [digit]);

    return (
      <div className="digit-container" style={{ 
        overflow: 'hidden', 
        display: 'inline-block',
        height: '1em',
        lineHeight: '1em',
        position: 'relative'
      }}>
        <div ref={digitRef} style={{ position: 'relative' }}>
          {digit}
        </div>
      </div>
    );
  };

  // Number changes based on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          ScrollTrigger.create({
            trigger: ref,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setCurrentNumber(projects[index].number),
            onEnterBack: () => setCurrentNumber(projects[index].number),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Clean up old SplitText instances
      splitInstancesRef.current.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      splitInstancesRef.current = [];

      // TITLE ANIMATION - Simplified for mobile
      if (titleRef.current) {
        if (isMobile) {
          gsap.set(titleRef.current, { opacity: 0, y: 30 });
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { 
              trigger: titleRef.current, 
              start: 'top 85%', 
              toggleActions: 'play none none none' 
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
              toggleActions: 'play none none none' 
            },
          });
        }
      }

      // PARAGRAPH ANIMATION - Simplified for mobile
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
              toggleActions: 'play none none none' 
            },
          });
        } else {
          const split = new SplitText(paragraphRef.current, { 
            type: 'lines', 
            linesClass: 'line-wrapper' 
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
              toggleActions: 'play none none none' 
            },
          });
        }
      }

      // LABEL ANIMATION
      gsap.from('.works-intro-label', {
        opacity: 0, 
        y: isMobile ? 15 : 30, 
        duration: isMobile ? 0.6 : 1, 
        delay: isMobile ? 0.1 : 0.2, 
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: '.works-intro-label', 
          start: 'top 85%', 
          toggleActions: 'play none none none' 
        },
      });

      // PIN NUMBER (Desktop only)
      if (!isMobile && numberContainerRef.current && projectsContainerRef.current) {
        ScrollTrigger.create({
          trigger: projectsContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: numberContainerRef.current,
          pinSpacing: false,
        });
      }

      // Animate project cards (Desktop only)
      if (!isMobile) {
        projectRefs.current.forEach((ref) => {
          if (ref) {
            gsap.from(ref, {
              opacity: 0, 
              y: 60, 
              duration: 1, 
              ease: 'power2.out',
              scrollTrigger: { 
                trigger: ref, 
                start: 'top 80%', 
                toggleActions: 'play none none none' 
              },
            });
          }
        });
      }
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
    <section id="works" ref={sectionRef} className="min-h-screen pt-16 md:pt-32 pb-16 md:pb-32 bg-black">
      <div className="content-container px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-32">
          <div className="w-full overflow-hidden mb-8 md:mb-12">
            <h2 ref={titleRef} className="works-title text-4xl md:text-5xl lg:text-[6rem] font-semibold text-[#d1d1c7] tracking-[-0.05em] leading-none">
              SELECTED WORKS /
            </h2>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-12">
            <div className="hidden md:block md:col-span-4"></div>
            <div className="md:col-span-2 flex md:justify-end">
              <p className="works-intro-label text-[#6b645c] text-sm md:text-base uppercase tracking-[-0.02em]">(PROJECTS)</p>
            </div>
            <div className="md:col-span-5">
              <div style={{ overflow: 'hidden' }}>
                <p ref={paragraphRef} className="text-[#a39e9b] text-base md:text-lg lg:text-xl leading-relaxed">
                  These are some of my projects built with modern technologies—from real-time collaboration platforms to AI-powered automation tools that enhance developer productivity and streamline workflows.
                </p>
              </div>
            </div>
            <div className="hidden md:block md:col-span-1"></div>
          </div>
        </div>

        {/* MOBILE: Horizontal scrolling carousel with left spacing */}
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
            {projects.map((project, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] snap-start">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black border border-white/10 block"
                >
                  {project.video ? (
                    <video
                      src={project.video}
                      poster={project.image}
                      className="w-full h-full object-contain bg-black"
                      playsInline
                      muted
                      loop
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-contain bg-black" 
                    />
                  )}
                </a>
                <div className="py-3">
                  <p className="text-sm font-mono text-[#6b645c] mb-1">{project.title}</p>
                  <p className="text-xl text-[#d1d1c7] font-semibold tracking-tight mb-3">{project.subtitle}</p>
                  <div className="flex gap-2 flex-wrap">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-w-[100px] px-3 py-1 rounded-full border border-[#a39e9b] text-xs uppercase font-medium text-[#a39e9b] whitespace-nowrap active:bg-[#a39e9b] active:text-black transition-colors"
                    >
                      GitHub ↗
                    </a>
                    <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1 rounded-full bg-[#a39e9b] text-xs font-medium text-[#111827] whitespace-nowrap">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: Original layout with pinned number */}
        <div ref={projectsContainerRef} className="hidden md:grid grid-cols-12 gap-8 md:gap-12">
          {/* LEFT: PINNED NUMBER with rolling animation */}
          <div className="col-span-5">
            <div ref={numberContainerRef} className="pt-2 md:pt-3">
              <div className="text-[12rem] lg:text-[20rem] font-medium text-[#a39e9b] leading-none tracking-[-0.05em]" 
                   style={{ fontFamily: "'Cousine', monospace" }}>
                <RollingDigit digit={currentNumber[0]} />
                <RollingDigit digit={currentNumber[1]} />
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLING PROJECTS */}
          <div className="col-span-7 space-y-32">
            {projects.map((project, index) => (
              <div key={index} ref={(el) => (projectRefs.current[index] = el)} className="project-item min-h-screen">
                <div className="w-full flex flex-col gap-2">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="relative w-full h-screen rounded-lg overflow-hidden bg-white/5 border border-white/10 block group"
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {project.video ? (
                      <video
                        src={project.video}
                        poster={project.image}
                        className="w-full h-full object-contain bg-[#0a0a0a] transition-transform duration-700 group-hover:scale-105"
                        playsInline
                        muted
                        loop
                        autoPlay
                      />
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-contain bg-[#0a0a0a] transition-transform duration-700 group-hover:scale-105" 
                      />
                    )}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`} />
                  </a>
                  <div className="py-2 flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-light font-mono text-[#a39e9b] tracking-[-0.05em]">{project.title}</h3>
                      <p className="text-4xl text-[#d1d1c7] font-semibold leading-tight tracking-[-0.03em]">{project.subtitle}</p>
                    </div>
                    <div className="flex items-end gap-4">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center min-w-[120px] px-4 py-1.5 rounded-full border border-[#a39e9b] text-sm uppercase font-medium text-[#a39e9b] hover:bg-[#a39e9b] hover:text-black transition-colors duration-300 whitespace-nowrap"
                      >
                        GitHub ↗
                      </a>
                      <span className="inline-flex items-center justify-center min-w-[140px] px-4 py-1.5 rounded-full border border-[#a39e9b] text-sm uppercase font-medium text-[#a39e9b] whitespace-nowrap">
                        {project.type}
                      </span>
                      <span className="inline-flex items-center justify-center min-w-[80px] px-4 py-1.5 rounded-full bg-[#a39e9b] text-sm tracking-[-0.02em] font-medium text-[#111827] whitespace-nowrap">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
