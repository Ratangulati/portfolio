// App.jsx - With scroll position preservation
import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollContext from './context/ScrollContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';
import SkillsAbout from './components/SkillsAbout';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

function App() {
  const smoother = useRef(null);

  const scrollToSection = useCallback((selector) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) return;
    if (smoother.current) {
      const content = document.getElementById('smooth-content');
      if (content) {
        const currentScroll = smoother.current.scrollTop();
        const elementRect = element.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const offset = 100;
        const targetScroll = Math.max(0, currentScroll + (elementRect.top - contentRect.top) - offset);
        smoother.current.scrollTo(targetScroll, true);
      }
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      sessionStorage.setItem('scrollPosition', scrollY.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const restoreScroll = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        const scrollY = parseInt(savedPosition, 10);
        setTimeout(() => {
          if (smoother.current) {
            smoother.current.scrollTo(scrollY, false);
          } else {
            window.scrollTo(0, scrollY);
          }
          sessionStorage.removeItem('scrollPosition');
        }, 100);
      }
    };
    restoreScroll();
  }, []);

  useGSAP(() => {
    try {
      smoother.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 2.0,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });
    } catch (error) {
      console.warn('ScrollSmoother initialization failed:', error);
      smoother.current = null;
    }
  });

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      <CustomCursor />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navigation />  {/* Back inside smooth-content */}
          <Hero />
          <Services />    
          <Works />
          <SkillsAbout />
          <Contact />
          <Footer />
        </div>
      </div>
    </ScrollContext.Provider>
  );
}


export default App;
