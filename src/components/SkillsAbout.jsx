// SkillsAbout.jsx — With z-index for layering
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import aboutImage from '../assets/about-image.jpg';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SkillsAbout = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);

  // Custom scramble function
  const scrambleText = (element, finalText) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const firstLetter = finalText[0];
    let iteration = 0;
    
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index === 0) return firstLetter;
          if (index < iteration) return finalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      iteration += 0.5;
      if (iteration >= finalText.length) {
        clearInterval(interval);
        element.textContent = finalText;
      }
    }, 40);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCALE DOWN EFFECT - Slower and less compression
      gsap.to(sectionRef.current, {
        scale: 0.88,
        borderRadius: '36px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // SKILLS TITLE ANIMATION - Character by character
      if (mainTitleRef.current) {
        const split = new SplitText(mainTitleRef.current, { type: 'chars' });
        gsap.set(split.chars, { y: 150, display: 'inline-block' });
        gsap.to(split.chars, {
          y: 0, stagger: 0.03, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: mainTitleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }

      // SKILL ITEMS - Scramble animation
      const skillItems = gsap.utils.toArray('.skill-item');
      skillItems.forEach((item) => {
        const finalText = item.textContent.trim();
        gsap.set(item, { opacity: 0 });
        ScrollTrigger.create({
          trigger: item, start: 'top 85%',
          onEnter: () => { gsap.set(item, { opacity: 1 }); scrambleText(item, finalText); },
        });
      });

      // ABOUT HEADING - Slide up
      gsap.from('.about-heading', {
        opacity: 0, y: 60, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 85%', toggleActions: 'play none none none' },
      });

      // ABOUT LABEL - Fade up
      gsap.from('.about-label', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-label', start: 'top 85%', toggleActions: 'play none none none' },
      });

      // ABOUT PARAGRAPHS - Slide up
      gsap.from('.about-paragraph', {
        opacity: 0, y: 60, duration: 1, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-paragraphs', start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: 'Languages & Tools',
      skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Bash', 'Git', 'Postman', 'Docker', 'Kubernetes'],
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Postgres', 'Prisma', 'Socket.io', 'Tailwind'],
    },
    {
      title: 'DevOps & Cloud',
      skills: ['AWS', 'GCP', 'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Linux/Unix', 'REST APIs'],
    },
  ];


  return (
    <section
      ref={sectionRef}
      id="skills-about"
      className="py-20 md:py-32 bg-black relative z-10"
      style={{ transformOrigin: 'center top' }}
    >
      <div className="content-container px-5 md:px-10 space-y-20 md:space-y-32">
        {/* SKILLS PART */}
        <div className="min-h-full">
          {/* Title - centered on mobile */}
          <div className="mb-10 md:mb-0 md:hidden">
            <div className="overflow-hidden text-center">
              <h2 ref={mainTitleRef} className="text-4xl font-semibold text-[#d1d1c7] leading-none tracking-[-0.08em]">
                DEVELOPER<br />DESIGNER<br />CREATOR /
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-16 lg:gap-24">
            {/* Left: Large Title - hidden on mobile, shown on desktop */}
            <div className="hidden md:flex col-span-12 lg:col-span-6 items-center justify-start">
              <div className="skills-main-title top-32">
                <div className="overflow-hidden">
                  <h2 className="text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#d1d1c7] leading-none tracking-[-0.08em]">
                    DEVELOPER<br />DESIGNER<br />CREATOR /
                  </h2>
                </div>
              </div>
            </div>

            {/* Right: Skills - left aligned on mobile */}
            <div className="col-span-12 lg:col-span-6">
              <div className="skills-content mb-6 md:mb-8">
                <h3 className="text-3xl md:text-5xl lg:text-[6rem] font-semibold text-[#d1d1c7] mb-6 md:mb-10 leading-none tracking-[-0.09em] text-left md:text-center">
                  Skills
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
                {skillCategories.map((category, index) => (
                  <div key={index}>
                    <h4 className="text-sm md:text-lg font-medium text-[#d1d1c7] mb-4 md:mb-6">{category.title}</h4>
                    <ul className="space-y-1">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="skill-item text-sm md:text-lg text-[#a39e9b] hover:text-[#d1d1c7] transition-colors duration-300 font-mono">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT PART */}
        <div className="min-h-full flex items-center sticky top-0 z-20 bg-black py-10 md:py-0">
          <div className="w-full">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8">
              {/* Image - smaller on mobile */}
              <div className="lg:col-span-4">
                <div className="about-image max-w-[280px] md:max-w-sm mx-auto lg:mx-0">
                  <img 
                    src={aboutImage} 
                    alt="About" 
                    className="w-full h-auto max-h-[320px] md:max-h-[450px] object-cover rounded-md shadow-lg" 
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:col-span-7">
                <div className="about-text space-y-6 md:space-y-10 ml-0 md:ml-16 lg:ml-24">
                  {/* Main heading */}
                  <h2 className="about-heading text-xl md:text-3xl lg:text-2xl font-normal leading-[1.2] text-[#d1d1c7]">
                    I'm a full-stack developer and DevOps engineer driven by a passion for building scalable systems and intelligent automation solutions.
                  </h2>

                  {/* Label */}
                  <p className="about-label text-xs md:text-sm text-[#a39e9b] uppercase tracking-[0.08em] font-mono">
                    (ABOUT ME)
                  </p>

                  {/* Description paragraphs */}
                  <div className="about-paragraphs space-y-4 md:space-y-6 text-sm md:text-lg text-[#a39e9b] leading-relaxed max-w-5xl">
                    <p className="about-paragraph">
                      I specialize in full-stack development, cloud infrastructure, and AI integration. My journey began with solving real-world problems through code, leading me to build platforms like CompileX—a real-time collaborative editor, and AI-powered tools like CodeScan AI and an automated code review bot that improved efficiency by 60%.
                    </p>
                    <p className="about-paragraph">
                      'm passionate about open-source contributions as Project Admin at GirlScript Summer of Code, and hold certifications in IBM DevOps Engineering and Google Cloud. I thrive on building systems that are scalable, intelligent, and impactful.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsAbout;
