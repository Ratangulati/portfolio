// Footer.jsx — Button GUARANTEED visible
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleClick = (href) => {
    const element = document.querySelector(href);
    
    if (element) {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: {
          y: element,
          offsetY: 100,
        },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <>
      <footer className="bg-[#e8e8e3] py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-0 pb-24 md:pb-0">
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-8">
            {/* Menu Section */}
            <div>
              <h4 className="text-xl pb-2 mb-4 text-neutral-900 border-b border-neutral-400 font-medium leading-tight tracking-[-0.05em]">
                Menu
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick('#services');
                    }}
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
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
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
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
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
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
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials Section */}
            <div>
              <h4 className="text-xl pb-2 mb-4 text-neutral-900 border-b border-neutral-400 font-medium leading-tight tracking-[-0.05em]">
                Socials
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/ratangulati/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ratangulati.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Ratangulati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/ratanstwt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-relaxed tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>

            {/* Local Time Section */}
            <div className="pt-4">
              <p className="text-sm font-medium mb-2 text-neutral-700 uppercase tracking-[-0.05em]">
                LOCAL TIME
              </p>
              <p className="text-base font-mono text-[#6b645c] leading-none tracking-[-0.05em]">
                {currentTime}
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Menu */}
            <div className="md:col-span-6">
              <h4 className="text-xl pb-2 mb-4 text-neutral-900 border-b border-neutral-400 font-medium leading-tight tracking-[-0.05em]">
                Menu
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick('#services');
                    }}
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
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
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
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
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
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
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div className="md:col-span-3">
              <h4 className="text-xl pb-2 mb-4 text-neutral-900 border-b border-neutral-400 font-medium leading-tight tracking-[-0.05em]">
                Socials
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/ratangulati/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ratangulati.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Ratangulati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/ratanstwt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#6b645c] text-lg leading-none tracking-[-0.05em] hover:text-neutral-900 transition-colors"
                  >
                    X
                  </a>
                </li>
              </ul>

              {/* Local Time */}
              <div className="mt-36">
                <p className="text-sm font-medium mb-2 text-neutral-700 uppercase tracking-[-0.05em]">
                  LOCAL TIME
                </p>
                <p className="text-base font-mono text-[#6b645c] leading-none tracking-[-0.05em]">
                  {currentTime}
                </p>
              </div>
            </div>

            {/* Empty column */}
            <div className="md:col-span-3"></div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button - OUTSIDE footer, guaranteed visible */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#474747] rounded-full flex items-center justify-center shadow-2xl hover:bg-neutral-800 active:scale-90 transition-all"
        style={{ zIndex: 999999 }}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
};

export default Footer;
