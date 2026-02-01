import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useScroll } from "../context/ScrollContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollToSection } = useScroll();

  const leftTextRef = useRef(null);
  const menuContainerRef = useRef(null);

  const menuItems = [
    { name: "TechStack", href: "#services" },
    { name: "Projects", href: "#works" },
    { name: "About", href: "#skills-about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftTextRef.current) {
        gsap.from(leftTextRef.current, {
          opacity: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
        });
      }
      if (menuContainerRef.current) {
        gsap.from(menuContainerRef.current, {
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHidden(false);
      document.body.style.overflow = 'hidden';
      document.body.style.cursor = 'default'; // Show cursor
    } else {
      document.body.style.overflow = '';
      document.body.style.cursor = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor = '';
    };
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isOpen) return;
      const currentScrollY = window.scrollY ?? window.pageYOffset ?? 0;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = currentScrollY - lastScrollY.current;
          const threshold = 100;
          const deadzone = 3;

          if (
            currentScrollY > lastScrollY.current &&
            currentScrollY > threshold &&
            Math.abs(delta) > deadzone
          ) {
            setHidden(true);
          } else if (
            currentScrollY < lastScrollY.current &&
            Math.abs(delta) > deadzone
          ) {
            setHidden(false);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", handleScroll, { passive: true });
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      if (scrollToSection) {
        scrollToSection(href);
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 300);
  };

  return (
    <>
      {/* Navbar */}
      <div
        style={{
          position: "fixed",
          top: hidden ? "-120px" : "0",
          left: 0,
          right: 0,
          zIndex: 9998,
          transition: "top 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav style={{ backgroundColor: "#e8e8e3", paddingTop: "2rem", paddingBottom: "1.25rem" }}>
          <div className="content-container px-3 md:px-0">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <a
                ref={leftTextRef}
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                style={{
                  fontSize: "1.25rem",
                  color: "#6b645c",
                  fontWeight: "normal",
                  letterSpacing: "-0.02em",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                MERN & DevOps Engineer
              </a>

              <div
                ref={menuContainerRef}
                className="hidden md:flex items-center space-x-6"
              >
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{
                      fontSize: "1.25rem",
                      color: "#6b645c",
                      letterSpacing: "-0.02em",
                      cursor: "pointer",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#6b645c"}
                    onMouseLeave={(e) => e.target.style.color = "#6b645c"}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Animated Hamburger Button - MOBILE ONLY */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem",
                  zIndex: 9999,
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Toggle menu"
              >
                <div style={{ width: "28px", height: "20px", position: "relative" }}>
                  {/* Top Line */}
                  <span
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#3a3633",
                      left: 0,
                      top: "0",
                      transition: "transform 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)",
                      transformOrigin: "center",
                    }}
                  />
                  {/* Middle Line */}
                  <span
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#3a3633",
                      left: 0,
                      top: "9px",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  />
                  {/* Bottom Line */}
                  <span
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#3a3633",
                      left: 0,
                      top: "18px",
                      transition: "transform 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)",
                      transformOrigin: "center",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && createPortal(
        <div
          data-mobile-menu
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#e8e8e3",
            zIndex: 99998,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            cursor: "default",
          }}
        >
          {/* Close Button (X) - Top Right */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: "2rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 99999,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close menu"
          >
            <div style={{ width: "28px", height: "28px", position: "relative" }}>
              {/* X Icon */}
              <span
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#3a3633",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%) rotate(45deg)",
                  transformOrigin: "center",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#3a3633",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%) rotate(-45deg)",
                  transformOrigin: "center",
                }}
              />
            </div>
          </button>

          <nav style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  fontWeight: "600",
                  color: "#3a3633",
                  textDecoration: "none",
                  cursor: "pointer",
                  letterSpacing: "-0.02em",
                  transition: "opacity 0.2s ease",
                  pointerEvents: "auto",
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.6"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navigation;
