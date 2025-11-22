import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight, Download, Calendar, CheckCircle2, Cpu, Briefcase, GraduationCap, Layers, BarChart3, Moon, Sun, Globe, Terminal, ArrowUpRight, Sparkles, Brain, Trophy, Timer, Zap, AlertCircle, Github, Instagram, Circle, RefreshCcw, Gamepad2 } from 'lucide-react';
import { DesignChat } from './components/DesignChatComponent';

// --- Assets ---
const PROFILE_IMAGE = "https://i.postimg.cc/VNs2NVR2/Whats-App-Image-2025-11-19-at-1-12-16-PM.jpg";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"; // Professional fallback

// --- Utils ---

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { elementRef, isVisible };
};

interface RevealProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  width?: "full" | "auto";
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", width = "full" }) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={elementRef}
      className={`reveal-base ${isVisible ? 'reveal-visible' : ''} ${width === "full" ? "w-full" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Preloader Component ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0); // 0: loading, 1: complete

  useEffect(() => {
    const duration = 2000;
    const steps = 25;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase(1);
          setTimeout(onComplete, 800); // Wait a bit before triggering exit
          return 100;
        }
        // Randomize increment for realistic effect
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-[300px]">
        {/* Logo / Title */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white text-black font-mono font-bold text-xl flex items-center justify-center rounded animate-pulse">
            IA
          </div>
          <span className="font-mono text-2xl font-bold tracking-widest text-neutral-200">
            ISHTEAQUE
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-neutral-800 relative overflow-hidden mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-200 ease-out"
            style={{ width: `${count}%` }}
          ></div>
        </div>

        {/* Stats */}
        <div className="w-full flex justify-between font-mono text-xs text-neutral-500 uppercase tracking-wider">
          <span>System Initialization</span>
          <span className="text-blue-400">{count}%</span>
        </div>

        {/* Decorative Code Lines */}
        <div className="absolute bottom-[-100px] opacity-20 font-mono text-[10px] text-center space-y-1">
          <div>LOADING MODULES... OK</div>
          <div>VERIFYING INTEGRITY... OK</div>
          <div>ESTABLISHING UPLINK... OK</div>
        </div>
      </div>
    </div>
  );
};

// --- Particle Background Component ---

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number, y: number, dx: number, dy: number, size: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor(window.innerWidth / 10); // Increased density slightly
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'; // More visible particles

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${0.15 * (1 - dist / 100)})`
              : `rgba(0, 0, 0, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// --- Components ---

const ThemeToggle = ({ isDark, toggle }: { isDark: boolean; toggle: () => void }) => (
  <button
    onClick={toggle}
    className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 active:scale-90 active:rotate-45 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
    aria-label="Toggle Theme"
  >
    {isDark ? <Sun size={18} /> : <Moon size={18} />}
  </button>
);

const Navigation = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy
      const sections = ['home', 'about', 'expertise', 'ventures', 'projects', 'iq-test', 'arcade', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Ventures', id: 'ventures' },
    { label: 'Methodology', id: 'projects' },
    { label: 'IQ Test', id: 'iq-test' },
    { label: 'Arcade', id: 'arcade' },
  ];

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl`}>
        <div className={`
          bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10
          rounded-2xl shadow-xl dark:shadow-black/20 px-6 py-3 flex justify-between items-center
        `}>
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group active:scale-95 transition-transform duration-200">
            <div className="w-8 h-8 bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold rounded group-hover:scale-105 transition-transform">IA</div>
            <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors hidden sm:block">ISHTEAQUE</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${activeSection === link.id
                    ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-white/10'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/5'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <button
              className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-95 active:shadow-none"
              onClick={() => scrollToSection('contact')}
            >
              Hire Me
            </button>
            <button
              className="lg:hidden text-neutral-900 dark:text-white p-1 active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 bg-white dark:bg-neutral-950 z-40 flex flex-col justify-center items-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        {navLinks.concat([{ label: 'Contact', id: 'contact' }]).map((link, i) => (
          <button
            key={link.label}
            onClick={() => {
              scrollToSection(link.id);
              setIsMobileMenuOpen(false);
            }}
            className="text-4xl font-mono font-bold mb-6 text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 active:scale-95 relative"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
};

const HeroSection = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 lg:pt-0">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 animate-aurora"></div>

      {/* Particle Effect */}
      <ParticleBackground />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <Reveal className="mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-full backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">System Online v2.5</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 dark:text-white leading-[0.95] tracking-tighter mb-8">
                DIGITAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">ARCHITECT</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-col gap-8 border-l-2 border-neutral-200 dark:border-white/10 pl-8">
                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed font-light">
                  <strong className="text-neutral-900 dark:text-white font-medium">Ishteaque Ahmed Ishaqui</strong> builds intelligent systems. Bridging the gap between human intuition and machine intelligence through strategic AI implementation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="group flex items-center gap-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/20"
                  >
                    INITIALIZE PROJECT <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button
                    onClick={() => scrollToSection('ventures')}
                    className="px-8 py-4 rounded-full border border-neutral-200 dark:border-white/20 text-sm font-mono font-bold text-neutral-600 dark:text-white uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-white/5 transition-all duration-200"
                  >
                    Explore Ventures
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image - Architectural Arch Design */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end lg:items-end h-full min-h-[400px] lg:min-h-[600px]">
            <Reveal delay={300} className="relative z-10 w-full max-w-[400px] lg:max-w-[450px] aspect-[3/4]">
              {/* Decorative Glow - "Aura" */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[90%] bg-blue-500/20 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

              {/* Architectural Arch Container */}
              <div className="relative w-full h-full group perspective-1000">
                <div className="relative w-full h-full transition-transform duration-700 ease-out hover:scale-[1.02]">

                  {/* The Arch Frame */}
                  <div className="relative w-full h-full rounded-t-[12rem] md:rounded-t-[16rem] overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl bg-neutral-200 dark:bg-neutral-900">
                    {/* The Image */}
                    <img
                      src={imageError ? FALLBACK_IMAGE : PROFILE_IMAGE}
                      onError={() => setImageError(true)}
                      alt="Ishteaque Ahmed Ishaqui"
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Inner Gradient for Depth & Integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/10 opacity-40"></div>

                    {/* Reflection/Glass Effect */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
                  </div>

                  {/* Decorative Elements around Arch */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-32 bg-neutral-50 dark:bg-neutral-950 relative scroll-mt-12">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">Profile Configuration</h2>
          <div className="h-1 w-24 bg-blue-600"></div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Main Bio Card */}
          <Reveal className="md:col-span-2">
            <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-white/5 h-full shadow-sm">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">The Architect</h3>
              <div className="space-y-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Ishteaque Ahmed Ishaqui is a forward-thinking entrepreneur and AI implementation specialist. With a foundation in commerce and finance complemented by extensive technical expertise, he creates scalable, intelligent systems.
                </p>
                <p>
                  Founder of <strong className="text-neutral-900 dark:text-white">A&I Consultancy</strong> and <strong className="text-neutral-900 dark:text-white">A&I Academy</strong>, pioneering accessible technology solutions that democratize advanced capabilities.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-white/5 rounded-lg text-sm font-mono text-neutral-600 dark:text-neutral-400">
                  <MapPin size={14} /> Kolkata, India
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-white/5 rounded-lg text-sm font-mono text-neutral-600 dark:text-neutral-400">
                  <Globe size={14} /> Remote / Global
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stats Card */}
          <div className="grid grid-rows-2 gap-4">
            <Reveal delay={100} className="h-full">
              <div className="bg-blue-600 text-white p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Cpu size={64} /></div>
                <span className="text-sm font-mono uppercase tracking-widest opacity-80">Projects</span>
                <span className="text-5xl font-bold">50+</span>
              </div>
            </Reveal>
            <Reveal delay={200} className="h-full">
              <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Calendar size={64} /></div>
                <span className="text-sm font-mono uppercase tracking-widest opacity-80">Experience</span>
                <span className="text-5xl font-bold">5+ <span className="text-lg opacity-60">Years</span></span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          <Reveal delay={300}>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-white/5 h-full">
              <h4 className="text-lg font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8 flex items-center gap-2"><GraduationCap size={18} /> Academic Core</h4>
              <div className="space-y-8">
                {[
                  { title: "Bachelor of Commerce (B.Com)", org: "University of Calcutta", sub: "Business Fundamentals" },
                ].map((edu, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-2 h-2 mt-2 bg-neutral-300 dark:bg-neutral-700 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                    <div>
                      <h5 className="text-lg font-bold text-neutral-900 dark:text-white">{edu.title}</h5>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{edu.org}</p>
                      <p className="text-xs text-neutral-500 mt-1">{edu.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={400}>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-white/5 h-full">
              <h4 className="text-lg font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8 flex items-center gap-2"><CheckCircle2 size={18} /> Credentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Google Certified Digital Marketer",
                  "Diploma in Financial Accounting",
                  "Artistic Skills Certification",
                  "Computer Diploma - Lions Centre"
                ].map((cert, i) => (
                  <div key={i} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-white/5 hover:border-blue-500/30 transition-colors cursor-default">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ExpertiseSection = () => {
  const categories = [
    {
      id: "ai",
      title: "AI & Automation",
      icon: <Cpu className="text-blue-500" />,
      skills: ["Large Language Models", "Prompt Engineering", "Workflow Automation", "Custom AI Agents"]
    },
    {
      id: "nocode",
      title: "No-Code Stack",
      icon: <Layers className="text-purple-500" />,
      skills: ["Webflow", "Adalo", "Zapier", "Airtable", "Notion"]
    },
    {
      id: "finance",
      title: "Finance & Analytics",
      icon: <BarChart3 className="text-green-500" />,
      skills: ["Tally ERP 9", "Advanced Excel", "Business Intelligence", "Tax Compliance"]
    }
  ];

  return (
    <section id="expertise" className="py-32 bg-white dark:bg-neutral-950 scroll-mt-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">System Capabilities</h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xl">Modular technical architecture designed for scalability.</p>
            </div>
            <div className="hidden md:block">
              <Terminal className="w-12 h-12 text-neutral-200 dark:text-neutral-800" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 150}>
                <div className="group h-full p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-900 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-neutral-200 dark:text-neutral-800 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight size={32} />
                  </div>

                  <div className="mb-8 p-4 bg-white dark:bg-neutral-800 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {cat.icon}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">{cat.title}</h3>

                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Methodology Strip */}
          <Reveal delay={400} className="mt-8">
            <div className="w-full p-8 rounded-3xl bg-neutral-900 dark:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-aurora"></div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-100 dark:text-neutral-900">
                <h4 className="text-lg font-bold">Core Methodology</h4>
                <div className="flex gap-8 text-sm font-mono uppercase tracking-wider opacity-80">
                  <span>Analysis</span>
                  <span>Strategy</span>
                  <span>Automation</span>
                  <span>Scale</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const VenturesSection = () => (
  <section id="ventures" className="py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden scroll-mt-12">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">Ventures</h2>
          <p className="text-neutral-500 font-mono uppercase tracking-widest">A&I Innovation Ecosystem</p>
        </Reveal>

        <div className="space-y-32">
          {/* Venture 1: A&I Consultancy */}
          <Reveal>
            <a href="https://a-i-consultancy-dvb6.vercel.app/" target="_blank" rel="noopener noreferrer" className="block relative group cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    A&I Consultancy
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-blue-500" />
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    Transforming businesses through AI-powered solutions. We analyze existing systems and design modular architectures that deliver immediate value.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {['AI Strategy', 'No-Code Arch', 'Process Re-eng', 'Finance Auto'].map(s => (
                      <div key={s} className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-video rounded-3xl bg-neutral-200 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden relative shadow-2xl group-hover:-translate-y-2 transition-transform duration-700 group-hover:shadow-blue-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200"
                      alt="A&I Consultancy"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-neutral-950/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">A&I</div>
                        <div className="text-sm font-mono uppercase tracking-[0.3em] text-blue-300">Consultancy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Venture 2: A&I Academy */}
          <Reveal>
            <a href="https://sites.google.com/view/ai-academyonline/home" target="_blank" rel="noopener noreferrer" className="block relative group cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-video rounded-3xl bg-neutral-200 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden relative shadow-2xl group-hover:-translate-y-2 transition-transform duration-700 group-hover:shadow-purple-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                      alt="A&I Academy"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/80 to-neutral-950/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">A&I</div>
                        <div className="text-sm font-mono uppercase tracking-[0.3em] text-purple-300">Academy</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-600 flex items-center justify-center text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 group-hover:scale-105 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14L22 8.5L12 3L2 8.5L12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 11V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    A&I Academy
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-purple-500" />
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    A revolutionary EdTech platform connecting qualified educators with motivated students. Democratizing education through intelligent matching.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-sm font-bold">Students</span>
                    <span className="px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-sm font-bold">Educators</span>
                    <span className="px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-sm font-bold">Referrers</span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Venture 3: EduGenius */}
          <Reveal>
            <a href="https://gitishteaque.github.io/edugenius-mvp/" target="_blank" rel="noopener noreferrer" className="block relative group cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-500 flex items-center justify-center text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                      <Sparkles size={24} />
                    </div>
                    <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    EduGenius MVP
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-emerald-500" />
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    An intelligent personalized learning companion. This MVP demonstrates AI-driven curriculum adaptation and interactive learning modules designed to enhance student engagement.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {['EdTech', 'Adaptive AI', 'React.js', 'Personalization'].map(s => (
                      <div key={s} className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-video rounded-3xl bg-neutral-200 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden relative shadow-2xl group-hover:-translate-y-2 transition-transform duration-700 group-hover:shadow-emerald-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=1200"
                      alt="EduGenius"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-neutral-950/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">Edu</div>
                        <div className="text-sm font-mono uppercase tracking-[0.3em] text-emerald-300">Genius</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="py-32 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-12">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-24">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">Execution Protocol</h2>
          <p className="text-neutral-500 font-mono">Methodology & Approach</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-neutral-200 dark:bg-neutral-800 border-t border-dashed border-neutral-300 dark:border-neutral-700 -z-10"></div>
          {[
            { step: "01", title: "Discovery", desc: "Process mapping & stack assessment." },
            { step: "02", title: "Design", desc: "Modular architecture & UX planning." },
            { step: "03", title: "Implementation", desc: "Phased deployment & refinement." },
            { step: "04", title: "Optimization", desc: "Performance monitoring & scale." },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 200}>
              <div className="bg-white dark:bg-neutral-950 p-6 relative group cursor-default">
                <div className="w-16 h-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-center text-xl font-bold text-neutral-900 dark:text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-500 dark:group-hover:border-blue-500">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-24 p-12 bg-neutral-50 dark:bg-neutral-900 rounded-3xl text-center border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Capabilities Matrix</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Custom AI Dashboards', 'Predictive Analytics', 'Intelligent Workflows', 'CRM Systems', 'Document Processing', 'Anomaly Detection'].map(tag => (
              <span key={tag} className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 shadow-sm border border-transparent hover:border-blue-500 hover:scale-105 active:scale-95 cursor-default transition-all duration-200">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const LogicTestSection = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const questions = [
    {
      question: "Complete the sequence: 3, 6, 12, 24, ?",
      options: ["30", "36", "48", "60"],
      correct: 2 // 48 (Double previous)
    },
    {
      question: "If 'SYSTEM' is coded as 'Tztufn', how is 'CODE' coded?",
      options: ["DPEF", "DQFG", "DNEF", "BPCD"],
      correct: 0 // DPEF (+1 letter)
    },
    {
      question: "Binary Logic: If 1=True and 0=False, what is the result of: (1 AND 0) OR 1?",
      options: ["0", "1", "Null", "undefined"],
      correct: 1 // 1 (True)
    },
    {
      question: "Deduction: All AIs are software. Some software is open-source. Therefore:",
      options: ["All AIs are open-source", "Some AIs are open-source", "No AIs are open-source", "Cannot be determined"],
      correct: 3 // Logic
    },
    {
      question: "Find the odd one out:",
      options: ["Python", "Java", "C++", "HTML"],
      correct: 3 // HTML (Markup language)
    }
  ];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isCorrect = index === questions[currentQIndex].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setFeedback(null);
    setGameState('start');
  };

  const getRank = () => {
    if (score === 5) return { title: "AI ARCHITECT", color: "text-purple-500" };
    if (score === 4) return { title: "LOGIC ENGINEER", color: "text-blue-500" };
    if (score === 3) return { title: "SYSTEM ANALYST", color: "text-emerald-500" };
    return { title: "NOVICE", color: "text-neutral-500" };
  };

  return (
    <section id="iq-test" className="py-32 bg-neutral-50 dark:bg-neutral-950 scroll-mt-12 border-t border-neutral-200 dark:border-neutral-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <Brain className="text-blue-500" /> Cognitive Protocol
            </h2>
            <p className="text-neutral-500 font-mono">Test your logic processing capabilities</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden min-h-[400px] relative">
              {gameState === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-neutral-900 z-20">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Zap size={40} className="text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Neural Calibration</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
                    Engage in a rapid assessment of pattern recognition, logical deduction, and technical reasoning. 5 Questions.
                  </p>
                  <button
                    onClick={() => setGameState('playing')}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                  >
                    Initialize Test
                  </button>
                </div>
              )}

              {gameState === 'playing' && (
                <div className="p-8 md:p-12 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                      Question {currentQIndex + 1} / {questions.length}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                      <Timer size={14} /> LIVE
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-8">
                    {questions[currentQIndex].question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                    {questions[currentQIndex].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(i)}
                        disabled={selectedOption !== null}
                        className={`
                                p-6 rounded-xl border text-left font-medium transition-all duration-300 relative overflow-hidden
                                ${selectedOption === null
                            ? 'border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                            : ''
                          }
                                ${selectedOption === i
                            ? (feedback === 'correct'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400')
                            : 'opacity-50'
                          }
                              `}
                      >
                        <span className="relative z-10">{opt}</span>
                        {selectedOption === i && (
                          <div className={`absolute inset-0 opacity-20 ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {gameState === 'result' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-neutral-900 z-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="mb-6 relative">
                    <Trophy size={64} className={getRank().color} />
                    <div className={`absolute inset-0 blur-2xl opacity-30 ${getRank().color.replace('text', 'bg')}`}></div>
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-2">Classification</div>
                  <h3 className={`text-4xl font-bold mb-2 ${getRank().color}`}>{getRank().title}</h3>
                  <p className="text-neutral-900 dark:text-white text-lg mb-8">
                    Logic Score: {score} / 5
                  </p>
                  <button
                    onClick={resetGame}
                    className="px-8 py-3 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-bold rounded-xl transition-all active:scale-95"
                  >
                    Retake Protocol
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const TicTacToeSection = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // X is User, O is AI
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  // AI Move - Generous Logic (Ensures user wins easily)
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        // 1. Identify empty squares
        const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];

        if (emptyIndices.length === 0) return; // Draw

        // 2. Filter moves to be "Generous"
        // We want to AVOID winning moves for AI, and AVOID blocking User winning moves.

        let safeMoves = [];

        for (let index of emptyIndices) {
          // Check if this move makes AI win -> If so, try to avoid it
          let tempBoardAI = [...board];
          tempBoardAI[index] = 'O';
          const aiWins = calculateWinner(tempBoardAI);

          // Check if this move blocks a user win -> If so, avoid it (let user win)
          // To check if user would win here, see if user has 2 in a row here.
          let tempBoardUser = [...board];
          tempBoardUser[index] = 'X';
          const userWouldWin = calculateWinner(tempBoardUser);

          if (!aiWins && !userWouldWin) {
            safeMoves.push(index);
          }
        }

        // If no safe moves (forced to win or block), just pick random from all empty
        // But preference is safeMoves.
        const movesToPickFrom = safeMoves.length > 0 ? safeMoves : emptyIndices;
        const randomIndex = movesToPickFrom[Math.floor(Math.random() * movesToPickFrom.length)];

        const newBoard = [...board];
        newBoard[randomIndex] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
      }, 600); // Delay for realism
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board]);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (!board.includes(null)) {
      setWinner('Draw');
    }
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <section id="arcade" className="py-32 bg-white dark:bg-neutral-950 scroll-mt-12 border-t border-neutral-200 dark:border-neutral-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal className="mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <Gamepad2 className="text-purple-500" /> Tactical Simulation
            </h2>
            <p className="text-neutral-500 font-mono">Strategy Module // AI Opponent Online</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-neutral-100 dark:bg-neutral-900/50 p-8 rounded-3xl inline-block border border-neutral-200 dark:border-neutral-800 relative">

              {/* Status Bar */}
              <div className="flex justify-between items-center mb-6 px-2">
                <div className={`flex items-center gap-2 text-sm font-bold ${isXNext && !winner ? 'text-blue-500' : 'text-neutral-400'}`}>
                  <span className="relative flex h-2 w-2">
                    {isXNext && !winner && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isXNext && !winner ? 'bg-blue-500' : 'bg-neutral-400'}`}></span>
                  </span>
                  YOU (X)
                </div>
                <div className={`flex items-center gap-2 text-sm font-bold ${!isXNext && !winner ? 'text-red-500' : 'text-neutral-400'}`}>
                  AI (O)
                  <span className="relative flex h-2 w-2">
                    {!isXNext && !winner && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${!isXNext && !winner ? 'bg-red-500' : 'bg-neutral-400'}`}></span>
                  </span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {board.map((cell, i) => (
                  <button
                    key={i}
                    onClick={() => handleClick(i)}
                    disabled={!!cell || !!winner || !isXNext}
                    className={`
                        w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-neutral-800 rounded-xl flex items-center justify-center text-4xl shadow-sm transition-all duration-200
                        ${!cell && !winner && isXNext ? 'hover:bg-blue-50 dark:hover:bg-neutral-700' : ''}
                        ${winningLine?.includes(i) ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                      `}
                  >
                    {cell === 'X' && <X size={40} className="text-blue-600 dark:text-blue-400 animate-in zoom-in duration-200" />}
                    {cell === 'O' && <Circle size={32} className="text-red-500 dark:text-red-400 animate-in zoom-in duration-200" />}
                  </button>
                ))}
              </div>

              {/* Result Overlay / Controls */}
              <div className="min-h-[3rem] flex items-center justify-center">
                {winner ? (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col items-center gap-4">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {winner === 'X' ? <span className="text-green-500">VICTORY ACHIEVED</span> : winner === 'Draw' ? 'STALEMATE' : 'SYSTEM WIN'}
                    </div>
                    {winner === 'X' && <div className="text-xs font-mono text-neutral-500">AI COMPUTATION YIELDED</div>}
                    <button onClick={resetGame} className="flex items-center gap-2 px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                      <RefreshCcw size={14} /> REINITIALIZE
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Waiting for input...
                  </div>
                )}
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-32 bg-neutral-900 text-white relative overflow-hidden scroll-mt-12">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/20 blur-[120px]"></div>

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">Let's Build</h2>
          <p className="text-xl text-neutral-400 mb-12">
            Ready to harness the power of AI and no-code platforms? <br />Initialize a consultation to discuss your parameters.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-left">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Identification</label>
                  <input type="text" placeholder="Name / Company" className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Coordinates</label>
                  <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Mission Parameters</label>
                <textarea placeholder="Tell me about your project requirements..." className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"></textarea>
              </div>
              <button className="w-full bg-white text-black py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white active:scale-[0.98] active:bg-blue-600 transition-all duration-200 shadow-lg">
                Transmit Inquiry
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="mailto:ishteaqueahmed123@gmail.com" className="flex items-center gap-4 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"><Mail size={20} /></div>
                <div>
                  <p className="text-xs font-mono text-neutral-500 mb-1">EMAIL</p>
                  <p className="font-medium">ishteaqueahmed123@gmail.com</p>
                </div>
              </a>
              <a href="tel:+918617273074" className="flex items-center gap-4 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"><Phone size={20} /></div>
                <div>
                  <p className="text-xs font-mono text-neutral-500 mb-1">PHONE</p>
                  <p className="font-medium">+91 - 8617273074</p>
                </div>
              </a>
              <a href="https://github.com/GitIshteaque" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"><Github size={20} /></div>
                <div>
                  <p className="text-xs font-mono text-neutral-500 mb-1">GITHUB</p>
                  <p className="font-medium">GitIshteaque</p>
                </div>
              </a>
              <a href="https://www.instagram.com/i_ishteaque" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"><Instagram size={20} /></div>
                <div>
                  <p className="text-xs font-mono text-neutral-500 mb-1">INSTAGRAM</p>
                  <p className="font-medium">@i_ishteaque</p>
                </div>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-neutral-950 text-neutral-500 py-12 border-t border-neutral-900 text-sm">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-neutral-800 rounded flex items-center justify-center text-white font-bold text-xs">IA</div>
        <span className="font-bold text-neutral-300">ISHTEAQUE A.I.</span>
      </div>
      <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
        <button onClick={() => scrollToSection('home')} className="hover:text-white active:scale-95 inline-block transition-all duration-200">Home</button>
        <button onClick={() => scrollToSection('about')} className="hover:text-white active:scale-95 inline-block transition-all duration-200">About</button>
        <button onClick={() => scrollToSection('ventures')} className="hover:text-white active:scale-95 inline-block transition-all duration-200">Ventures</button>
      </div>
      <p className="text-xs opacity-50">© 2024 ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="bg-noise"></div>

      {/* Preloader Layer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-1000 ease-in-out pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0 -translate-y-full'}`}>
        <Preloader onComplete={() => setIsLoading(false)} />
      </div>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-500">

        <Navigation isDark={isDark} toggleTheme={toggleTheme} />

        <main className="flex flex-col">
          <HeroSection />
          <AboutSection />
          <ExpertiseSection />
          <VenturesSection />
          <ProjectsSection />
          <LogicTestSection />
          <TicTacToeSection />
          <ContactSection />
        </main>

        <Footer />

        <DesignChat />
      </div>
    </div>
  );
}

export default App;