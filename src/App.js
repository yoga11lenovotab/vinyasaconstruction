import React, { useEffect, useState, useCallback } from "react";
import logo from "./assets/store/vc.png";
import "./App.css";

// Contact Icons
const EmailIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Service Icons
const HouseKeyIcon = () => (
  <svg className="service-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* House */}
    <path d="M8 28L32 8L56 28V52C56 54.2091 54.2091 56 52 56H12C9.79086 56 8 54.2091 8 52V28Z" />
    <path d="M20 56V36H28V56" />
    <path d="M28 36H36V56" />
    {/* Key */}
    <circle cx="48" cy="20" r="4" />
    <path d="M48 24V32" />
    <path d="M46 28H50" />
    <path d="M46 32H50" />
  </svg>
);

const MagnifyingPlotIcon = () => (
  <svg className="service-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Plot map grid */}
    <rect x="8" y="12" width="40" height="40" rx="2" />
    <path d="M8 24H48" />
    <path d="M8 36H48" />
    <path d="M24 12V52" />
    <path d="M40 12V52" />
    {/* Magnifying glass handle */}
    <circle cx="44" cy="44" r="12" />
    <path d="M52 52L58 58" />
    {/* Cross in magnifying glass */}
    <path d="M44 38V50" />
    <path d="M38 44H50" />
  </svg>
);

const LayeredPanelsIcon = () => (
  <svg className="service-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Layered panels */}
    <rect x="8" y="8" width="48" height="10" rx="2" />
    <rect x="12" y="22" width="40" height="10" rx="2" />
    <rect x="16" y="36" width="32" height="10" rx="2" />
    <rect x="20" y="50" width="24" height="6" rx="2" />
    {/* Texture lines */}
    <path d="M16 13H24" />
    <path d="M40 13H48" />
    <path d="M20 27H28" />
    <path d="M36 27H44" />
    <path d="M24 41H32" />
    <path d="M28 53H36" />
  </svg>
);

// Theme Toggle Icon Component
const ThemeIcon = ({ isDark }) => {
  if (isDark) {
    // Sun icon for dark mode (click to go light)
    return (
      <svg 
        className="theme-icon" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
        />
      </svg>
    );
  }
  // Moon icon for light mode (click to go dark)
  return (
    <svg 
      className="theme-icon" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
      />
    </svg>
  );
};

function App() {
  // Theme state - default to dark mode
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('vinyasa-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark mode
    return true;
  });

  const [counters, setCounters] = useState({ customers: 0, projects: 0, workers: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [flippedCards, setFlippedCards] = useState({ 0: false, 1: false, 2: false });
  
  const allProjects = [
    { title: "Luxury Villa", description: "Elegant design with modern amenities and sustainable architecture." },
    { title: "Urban Apartments", description: "Smart, sustainable living spaces designed for the modern lifestyle." },
    { title: "Commercial Complex", description: "Functional and aesthetic workspaces that inspire productivity." },
    { title: "Eco Retreat", description: "Sustainable comfort in nature, blending luxury with environmental responsibility." },
    { title: "Riverside Offices", description: "Open-plan spaces with natural light and panoramic water views." },
    { title: "Coastal Retreat", description: "Bright, breezy sea-facing residences with premium finishes." },
    { title: "Heritage Renovation", description: "Restoration blending classic charm and modern comfort seamlessly." }
  ];

  // Apply theme to document
  useEffect(() => {
    const theme = isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vinyasa-theme', theme);
  }, [isDarkTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('vinyasa-theme')) {
        setIsDarkTheme(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme handler
  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
  }, []);

  // Toggle card flip handler
  const toggleCard = useCallback((index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  // Scroll animations effect
  useEffect(() => {
    const heading = document.querySelector(".projects-heading");
    const cards = document.querySelectorAll(".project-card");
    
    // Animate heading immediately
    if (heading) heading.classList.add("in-view");
    
    // Observe each card individually for scroll-triggered animations
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: "0px"
    });
    
    cards.forEach((card) => cardObserver.observe(card));
    
    return () => {
      cardObserver.disconnect();
    };
  }, []);

  const easeOutCubic = useCallback((t) => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  // Counter animation effect
  useEffect(() => {
    if (hasAnimated) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    const targets = { customers: 100, projects: 9, workers: 80 };
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = easeOutCubic(progress);
      
      setCounters({
        customers: Math.floor(targets.customers * easeOut),
        projects: Math.floor(targets.projects * easeOut),
        workers: Math.floor(targets.workers * easeOut)
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
        setHasAnimated(true);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [hasAnimated, easeOutCubic]);

  return (
    <div className="App">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Vinyasa Construction Home">
          <img src={logo} alt="Vinyasa Construction Logo" className="brand-logo" />
        </a>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
              title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
            >
              <ThemeIcon isDark={isDarkTheme} />
            </button>
          </li>
        </ul>
      </nav>

      <section id="home" className="section" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Building Dreams with Precision</h1>
        <p>
          At Vinyasa Construction, we believe a home is more than bricks and mortar—
          it's a dream realized. With compassion, quality, and precision, we craft
          spaces that reflect the aspirations of our clients.
        </p>
        <div className="stats-container" role="region" aria-label="Company Statistics">
          <article className="stat-card">
            <div className="stat-number" aria-label={`${counters.customers} plus happy customers`}>
              {counters.customers}+
            </div>
            <div className="stat-label">Happy Customers</div>
          </article>
          <article className="stat-card">
            <div className="stat-number" aria-label={`${counters.projects} plus completed projects`}>
              {counters.projects}+
            </div>
            <div className="stat-label">Completed Projects</div>
          </article>
          <article className="stat-card">
            <div className="stat-number" aria-label={`${counters.workers} plus expert workers`}>
              {counters.workers}+
            </div>
            <div className="stat-label">Expert Workers</div>
          </article>
        </div>
      </section>

      <section id="services" className="section" aria-labelledby="services-heading">
        <h2 id="services-heading">Our Services</h2>
        <p>
          We provide comprehensive construction solutions tailored to your needs,
          from initial concept to final handover.
        </p>
        <div className="stats-container" role="region" aria-label="Our Services">
          <div 
            className="flip-card" 
            onClick={() => toggleCard(0)}
            role="button"
            tabIndex={0}
            aria-label="Concept to Keys: End-to-End Home Building. Click to flip and see details."
            onKeyDown={(e) => e.key === 'Enter' && toggleCard(0)}
          >
            <div className={`flip-card-inner ${flippedCards[0] ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <HouseKeyIcon />
                <div className="stat-label">Concept to Keys: End-to-End Home Building</div>
                <div className="flip-hint">Click to learn more</div>
              </div>
              <div className="flip-card-back">
                <p>Leave the complexities of construction to us. From architectural planning and structural design to brickwork, MEP (Mechanical, Electrical, Plumbing), and final finishing, we manage the entire lifecycle of your project. Vinyasa Construction ensures a stress-free experience, delivering a move-in-ready dream home built with premium red-brick masonry and uncompromising quality.</p>
              </div>
            </div>
          </div>
          <div 
            className="flip-card" 
            onClick={() => toggleCard(1)}
            role="button"
            tabIndex={0}
            aria-label="Land and Building Technical Evaluation. Click to flip and see details."
            onKeyDown={(e) => e.key === 'Enter' && toggleCard(1)}
          >
            <div className={`flip-card-inner ${flippedCards[1] ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <MagnifyingPlotIcon />
                <div className="stat-label">Land & Building Technical Evaluation</div>
                <div className="flip-hint">Click to learn more</div>
              </div>
              <div className="flip-card-back">
                <p>Make informed investment decisions with our expert assessment services. Before you buy or build, our engineers conduct thorough site inspections, soil analysis, and structural audits. We provide detailed valuation reports and feasibility studies, ensuring your land and existing structures are legally sound, physically stable, and worth every rupee of your investment.</p>
              </div>
            </div>
          </div>
          <div 
            className="flip-card" 
            onClick={() => toggleCard(2)}
            role="button"
            tabIndex={0}
            aria-label="Interior Solutions. Click to flip and see details."
            onKeyDown={(e) => e.key === 'Enter' && toggleCard(2)}
          >
            <div className={`flip-card-inner ${flippedCards[2] ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <LayeredPanelsIcon />
                <div className="stat-label">Interior Solutions</div>
                <div className="flip-hint">Click to learn more</div>
              </div>
              <div className="flip-card-back">
                <p>Elevate your living spaces with our specialized wall paneling services. Whether you are looking for thermal insulation, damp-proofing, or modern architectural aesthetics, we provide high-quality PVC, WPC, and charcoal paneling solutions. Transform your interiors with durable, stylish finishes that reflect your personality and add a touch of luxury to your Dream Home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section" aria-labelledby="projects-heading">
        <h2 className="projects-heading" id="projects-heading">Completed Projects</h2>
        <div className="projects-grid" role="list">
          {allProjects.map((project, idx) => (
            <article 
              key={idx} 
              className="project-card" 
              role="listitem"
              aria-labelledby={`project-title-${idx}`}
            >
              <h3 id={`project-title-${idx}`}>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact Us</h2>
        <div className="contact-container">
          <div className="contact-item">
            <EmailIcon />
            <div className="contact-info">
              <strong>Email</strong>
              <a href="mailto:info@vinyasaconstruction.com">
                info@vinyasaconstruction.com
              </a>
            </div>
          </div>
          <div className="contact-item">
            <PhoneIcon />
            <div className="contact-info">
              <strong>Phone</strong>
              <a href="tel:+919876543210">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
