// About.jsx — With label animation fixed
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '../assets/about-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADING - Whole block slides up
      gsap.from('.about-heading', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // LABEL - Fade up (FIXED)
      gsap.from('.about-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-label',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // PARAGRAPHS - Each paragraph slides up as whole block
      gsap.from('.about-paragraph', {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-paragraphs',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 px-6 md:px-10 lg:px-12 rounded-b-3xl bg-black flex items-center"
    >
      <div className="content-container px-6 md:px-10 lg:px-12 w-full">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {/* Left: Image */}
          <div className="col-span-12 lg:col-span-3">
            <div className="about-image">
              <img
                src={aboutImage}
                alt="About"
                className="w-full h-auto rounded-md shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="about-text space-y-10 ml-10 md:ml-16 lg:ml-24">
              {/* Main heading */}
              <h2 className="about-heading text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.1] text-[#d1d1c7]">
                I'm a software engineer driven by a passion for turning ideas into clean, intuitive digital experiences.
              </h2>

              {/* Label - with animation */}
              <p className="about-label text-xs md:text-sm text-[#a39e9b] uppercase tracking-[0.08em] font-mono">
                (ABOUT ME)
              </p>

              {/* Description paragraphs */}
              <div className="about-paragraphs space-y-6 text-base md:text-lg text-[#a39e9b] leading-relaxed max-w-5xl">
                <p className="about-paragraph">
                  I am a passionate Software Engineer with a knack for building full-stack web applications using modern technologies like Next.js and Tailwind CSS. My journey in tech began with a curiosity for solving real-world problems through innovative solutions, which evolved into a love for crafting user-centric digital experiences.
                </p>
                <p className="about-paragraph">
                  Beyond coding, I thrive in collaborative environments and enjoy tackling challenging problems with creative solutions. I aim to contribute to impactful projects that make a difference in user's lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
