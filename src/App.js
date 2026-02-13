import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/store/logo.png";
import "./App.css";

function App() {
  const allProjects = [
    { title: "Luxury Villa", description: "Elegant design with modern amenities." },
    { title: "Urban Apartments", description: "Smart, sustainable living spaces." },
    { title: "Commercial Complex", description: "Functional and aesthetic workspaces." },
    { title: "Eco Retreat", description: "Sustainable comfort in nature." },
    { title: "Riverside Offices", description: "Open-plan spaces with natural light." },
    { title: "Coastal Retreat", description: "Bright, breezy sea-facing residences." },
    { title: "Heritage Renovation", description: "Restoration blending classic charm and modern comfort." },
    { title: "Smart Factory", description: "Automated, efficient manufacturing facility." }
  ];
  const [visibleCount, setVisibleCount] = useState(2);
  const sentinelRef = useRef(null);

  // Reveal on scroll for cards
  useEffect(() => {
    const options = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, options);
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleCount]);

  // Load more on scroll (when sentinel comes into view)
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisibleCount((v) => Math.min(allProjects.length, v + 1));
        }
      });
    }, { rootMargin: "0px", threshold: 0.5 });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="brand">
          <img src={logo} alt="Store Logo" className="brand-logo" />
        </div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>

      <section id="home" className="section">
        <h1>Building Dreams with Precision</h1>
        <p>
          At Vinyasa Construction, we believe a home is more than bricks and mortar—
          it’s a dream realized. With compassion, quality, and precision, we craft
          spaces that reflect the aspirations of our clients.
        </p>
      </section>

      <section id="projects" className="section">
        <h1>Completed Projects</h1>
        <div className="projects-grid">
          {allProjects.slice(0, visibleCount).map((p, idx) => (
            <div key={idx} className={`project-card ${idx < visibleCount ? "in-view" : ""}`}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
        {visibleCount < allProjects.length && (
          <div className="load-hint" aria-live="polite">Scroll to load more</div>
        )}
        <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
      </section>

      <section id="contact" className="section">
        <h1>Contact Us</h1>
        <p>Email: info@vinyasaconstruction.com</p>
        <p>Phone: +91 98765 43210</p>
      </section>
    </div>
  );
}

export default App;
