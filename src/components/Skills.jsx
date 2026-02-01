// Skills.jsx — Fixed scramble animation
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Skills = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);

  // Custom scramble function - FIXED
  const scrambleText = (element, finalText) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const firstLetter = finalText[0];
    let iteration = 0;
    
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index === 0) return firstLetter; // First letter stays
          if (index < iteration) {
            return finalText[index]; // Show actual character
          }
          return chars[Math.floor(Math.random() * chars.length)]; // Random char
        })
        .join('');
      
      iteration += 0.5; // Increment iteration
      
      // Fixed: ensure we reach the end and show final text
      if (iteration >= finalText.length) {
        clearInterval(interval);
        element.textContent = finalText; // Force final text at the end
      }
    }, 40); // Speed: 40ms per frame
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MAIN TITLE ANIMATION - Character by character
      if (mainTitleRef.current) {
        const split = new SplitText(mainTitleRef.current, {
          type: 'chars',
        });

        gsap.set(split.chars, {
          y: 150,
          display: 'inline-block',
        });

        gsap.to(split.chars, {
          y: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainTitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // SKILL ITEMS - Custom scramble animation
      const skillItems = gsap.utils.toArray('.skill-item');
      
      skillItems.forEach((item) => {
        const finalText = item.textContent.trim(); // Store original text
        
        // Don't show scrambled text initially - just hide it
        gsap.set(item, { opacity: 0 });
        
        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.set(item, { opacity: 1 }); // Show item
            scrambleText(item, finalText); // Start scramble
          },
        });
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
      className="min-h-screen py-20 md:py-32 px-6 md:px-10 lg:px-12 bg-black"
    >
      <div className="content-container px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-12 gap-12 md:gap-16 lg:gap-24">
          {/* Left: Large Title */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-start">
            <div className="skills-main-title top-32">
              <div className="overflow-hidden">
                <h2 
                  ref={mainTitleRef}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#d1d1c7] leading-none tracking-[-0.08em]"
                >
                  DEVELOPER<br />
                  DESIGNER<br />
                  CREATOR /
                </h2>
              </div>
            </div>
          </div>

          {/* Right: Skills in 3 columns */}
          <div className="col-span-12 lg:col-span-6">
            <div className="skills-content mb-8">
              <h3 className="text-4xl md:text-5xl lg:text-[6rem] font-semibold text-[#d1d1c7] mb-10 leading-none tracking-[-0.09em] text-center">
                Skills
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 p-6">
              {skillCategories.map((category, index) => (
                <div key={index}>
                  <h4 className="text-base md:text-lg font-normal text-[#d1d1c7] mb-6">
                    {category.title}
                  </h4>
                  <ul className="space-y-1">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="skill-item text-sm md:text-lg text-[#a39e9b] hover:text-[#d1d1c7] transition-colors duration-300 font-mono"
                      >
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
    </section>
  );
};

export default Skills;
