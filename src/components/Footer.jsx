// Footer.jsx — Direct GSAP ScrollSmoother/ScrollTrigger approach
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(`${time}, IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (href) => {
    const element = document.querySelector(href);
    
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: element,
          offsetY: 100, // Adjust for navbar height
        },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <footer className="bg-[#e8e8e3] mt-20 py-12 relative">
      <div className="content-container px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Menu - 6 columns */}
          <div className="md:col-span-6">
            <h4 className="text-xl pb-1 text-neutral-900 border-b border-neutral-400 font-medium leading-tight tracking-[-0.05em]">
              Menu
            </h4>
            <ul className="space-y-2 mt-4 text-base text-neutral-600">
              <li>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('#services');
                  }}
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  TechStack
                </a>
              </li>
              <li>
                <a 
                  href="#works"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('#works');
                  }}
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#skills-about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('#skills-about');
                  }}
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick('#contact');
                  }}
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Socials - 3 columns */}
          <div className="md:col-span-3">
            <h4 className="text-xl pb-1 text-neutral-900 border-b border-neutral-400 font-medium leading-tight tracking-[-0.05em]">
              Socials
            </h4>
            <ul className="space-y-2 mt-4 text-base text-neutral-600">
              <li>
                <a
                  href="https://www.linkedin.com/in/ratangulati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ratangulati.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Ratangulati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/ratanstwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                >
                  X
                </a>
              </li>
            </ul>

            {/* Local Time Below Socials */}
            <div className="mt-[9rem]">
              <p className="text-md font-medium mb-1 text-neutral-700 uppercase tracking-[-0.05em]">
                LOCAL TIME
              </p>
              <p className="text-base font-mono text-[#6b645c] leading-none tracking-[-0.05em]">
                {currentTime}
              </p>
            </div>
          </div>

          {/* Empty column - 3 columns */}
          <div className="md:col-span-3"></div>
        </div>
      </div>

      {/* Scroll button */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          handleClick('#home');
        }}
        className="absolute bottom-10 right-10 w-20 h-20 bg-[#bdbdae] rounded-full flex items-center justify-center shadow-lg hover:bg-[#a5a599] transition-colors cursor-pointer"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 text-neutral-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
