import React, { useState, useEffect } from "react";
import "../../App.css";
import "./LandingPage.css";
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

const SplashPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if dark mode is active and animate on mount
  useEffect(() => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(isDark);
    setIsVisible(true);

    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark-mode');
      setDarkMode(isDark);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    { icon: <CodeIcon />, name: "JavaScript", category: "Languages" },
    { icon: <CodeIcon />, name: "React.js", category: "Frontend" },
    { icon: <CodeIcon />, name: "Next.js", category: "Framework" },
    { icon: <CodeIcon />, name: "Node.js", category: "Backend" },
    { icon: <CloudIcon />, name: "AWS", category: "Cloud" },
    { icon: <CloudIcon />, name: "Azure", category: "Cloud" },
    { icon: <IntegrationInstructionsIcon />, name: "Jira", category: "Tools" },
    { icon: <DesignServicesIcon />, name: "Tailwind", category: "Styling" }
  ];

  return (
    <div className={`landing-page ${darkMode ? 'dark' : 'light'} ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="name-highlight">Liliia Kryvelova</span>
              </h1>
              <p className="hero-subtitle">
                Product Engineer • Software Developer • Jira Integration Specialist
              </p>
              <p className="hero-description">
                I create beautiful, efficient digital solutions with modern technologies 
                and bring ideas to life through clean code and thoughtful design.
              </p>
              
              <div className="hero-actions">
                <button className="cta-primary">
                  <DownloadIcon className="button-icon" />
                  Download Resume
                </button>
                <button className="cta-secondary">
                  <EmailIcon className="button-icon" />
                  Get In Touch
                </button>
              </div>

              <div className="social-links-hero">
                <a href="https://linkedin.com/in/liliia-kryvelova" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="https://github.com/liliiakryvelova" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GitHubIcon />
                </a>
                <a href="mailto:lilia.krivelyova@gmail.com" aria-label="Email">
                  <EmailIcon />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="profile-card">
                <div className="profile-avatar">
                  <div className="avatar-placeholder">LK</div>
                  <div className="status-indicator"></div>
                </div>
                <div className="profile-info">
                  <h3>Available for opportunities</h3>
                  <p>Based in Seattle, WA</p>
                </div>
              </div>

              <div className="floating-elements">
                <div className="tech-bubble react">React</div>
                <div className="tech-bubble node">Node.js</div>
                <div className="tech-bubble aws">AWS</div>
                <div className="tech-bubble jira">Jira</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="section-container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-content">
                  <h4>{skill.name}</h4>
                  <span className="skill-category">{skill.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="section-container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="experience-card">
                  <div className="company-info">
                    <h3>Ford Motor Company</h3>
                    <span className="duration">Jan 2024 – May 2025</span>
                  </div>
                  <h4 className="position">Product Engineer / Software Developer / Jira Integration Specialist</h4>
                  <p className="experience-description">
                    Led product engineering initiatives and developed software solutions while specializing in Jira integrations for enhanced workflow automation.
                  </p>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="experience-card">
                  <div className="company-info">
                    <h3>Envorso, LLC</h3>
                    <span className="duration">Nov 2022 – Dec 2023</span>
                  </div>
                  <h4 className="position">Product Engineer / Software Developer</h4>
                  <p className="experience-description">
                    Developed and maintained product features using modern web technologies and collaborated with cross-functional teams to deliver high-quality solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SplashPage;
