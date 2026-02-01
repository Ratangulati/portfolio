import { createContext, useContext } from 'react';

const fallbackScrollToSection = (selector) => {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const ScrollContext = createContext({ scrollToSection: fallbackScrollToSection });

export function useScroll() {
  const ctx = useContext(ScrollContext);
  return ctx || { scrollToSection: fallbackScrollToSection };
}

export default ScrollContext;
