// Contact.jsx — With EmailJS for sending emails
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-card', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.contact-card',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      setStatus('error');
      setErrorMessage('Email is not configured. Add VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID to .env');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      const msg = err.text || err.message || 'Failed to send.';
      setErrorMessage(
        /recipient|to email|address is empty/i.test(msg)
          ? "Recipient's address is empty. Set 'To Email' in your EmailJS template (Dashboard → Email Templates → your template). See EMAILJS_SETUP.md."
          : msg
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status) setStatus(null);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="pt-8 pb-8 md:py-12 px-4 md:px-10 lg:px-12 mx-4 md:mx-12 rounded-lg relative -mt-[12vh]"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #4a4a4a 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Centered Title */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="contact-title text-5xl md:text-6xl lg:text-9xl font-semibold text-[#d1d1c7] tracking-[-0.10em] leading-[0.85]">
            LET'S MAKE<br />IT HAPPEN
          </h2>
        </div>

        {/* Transparent Form Card */}
        <div 
          className="contact-card max-w-md md:max-w-xl mx-auto backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-10 lg:p-14 border border-[#383835]"
          style={{
            background: 'rgba(45, 45, 45, 0.3)',
          }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-5 md:mb-8 text-white text-center leading-tight tracking-[-0.05em]">
            Say Hello
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-3 md:space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Drop a name"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#373737] backdrop-blur-sm border border-[#464643] rounded-xl md:rounded-2xl focus:outline-none focus:border-white/10 text-white placeholder-gray-500 transition-all font-mono text-sm md:text-lg"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Wanna hear back? Add your email"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#373737] backdrop-blur-sm border border-[#464643] rounded-xl md:rounded-2xl focus:outline-none focus:border-white/10 text-white placeholder-gray-500 transition-all font-mono text-sm md:text-lg"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Say hello or drop a note..."
                rows={4}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#373737] backdrop-blur-sm border border-[#464643] rounded-xl md:rounded-2xl focus:outline-none focus:border-white/10 text-white placeholder-gray-500 resize-none transition-all font-mono text-sm md:text-lg"
                required
                disabled={status === 'sending'}
              />
              {status === 'error' && (
                <p className="text-red-400 text-xs md:text-sm">{errorMessage}</p>
              )}
              {status === 'success' && (
                <p className="text-[#e8e8e3] text-xs md:text-sm">Message sent. I'll get back to you soon.</p>
              )}
              <button
                type="submit"
                className="w-full px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all text-sm md:text-base"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
