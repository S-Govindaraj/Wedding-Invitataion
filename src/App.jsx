import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingBackground from './components/FloatingBackground';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'welcome', label: 'Welcome', icon: '🙏' },
    { id: 'couple', label: 'Couple', icon: '💑' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'venue', label: 'Location', icon: '📍' },
    { id: 'directions', label: 'Bus Route', icon: '🚌' },
    { id: 'contact', label: 'Contact', icon: '📞' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'welcome', 'couple', 'events', 'venue', 'directions', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Wedding details
  const weddingDetails = {
    groomName: "Govindaraj",
    brideName: "Sathya",
    groomFull: "S. Govindaraj, B.E",
    groomJob: "Full Stack Developer at Galent AI, Chennai",
    brideFull: "S. Sathya",
    brideJob: "Teacher, Chennai",
    date: "February 22, 2026",
    day: "Sunday",
    venue: "Lakshmi Narayana Marriage Hall",
    address: "Indira Nagar, Srivilliputtur, Tamil Nadu",
    mapLink: "https://maps.google.com/?q=Lakshmi+Narayana+Marriage+Hall+Indira+Nagar+Srivilliputtur",
    contact: "8220172513",
    contactName: "Govindaraj",
    directions: "From Srivilliputtur Bus Stand, take buses going to Watrap, Kansapuram, Maharajapuram, Kunnur, Krishnan Koil, or Koomapatti. Ask for Indira Nagar bus stop. The hall is just 100 meters walking distance from the stop.",
    events: [
      {
        name: "Engagement Ceremony",
        time: "6:30 PM - 8:00 PM",
        date: "Saturday, 21st February 2026",
        icon: "💍"
      },
      {
        name: "Wedding Ceremony",
        time: "7:30 AM - 9:00 AM",
        date: "Sunday, 22nd February 2026",
        icon: "🪔"
      },
      {
        name: "Bride's Welcome Ceremony",
        time: "After 2:00 PM",
        date: "Monday, 23rd February 2026",
        icon: "🏠"
      }
    ]
  };

  return (
    <div className="app">
      <FloatingBackground />
      
      {/* Navigation Bar */}
      <motion.nav 
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="nav-links">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                title={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      
      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="hero-content">
          <motion.p className="pre-title" variants={fadeInUp}>
            Together with their families
          </motion.p>
          
          <motion.div className="names-container" variants={fadeInUp}>
            <span className="name">{weddingDetails.groomName}</span>
            <span className="ampersand">&</span>
            <span className="name">{weddingDetails.brideName}</span>
          </motion.div>
          
          <motion.p className="subtitle" variants={fadeInUp}>
            Cordially invite you to celebrate their wedding
          </motion.p>
          
          <motion.div className="date-badge" variants={scaleIn}>
            <span className="date-day">{weddingDetails.day}</span>
            <span className="date-full">{weddingDetails.date}</span>
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            variants={fadeInUp}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span>Scroll for details</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Welcome Message */}
      <motion.section 
        id="welcome"
        className="welcome"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="section-ornament" variants={scaleIn}>
          ✦
        </motion.div>
        <motion.h2 variants={fadeInUp}>அன்பான வரவேற்பு</motion.h2>
        <motion.p className="welcome-message" variants={fadeInUp}>
          எங்கள் வாழ்வின் மிக முக்கியமான நாளில் பங்கேற்க உங்களை அன்புடன் அழைக்கிறோம். 
          உங்கள் வருகை எங்கள் திருமணத்தை மேலும் சிறப்பாக்கும். 
          நாங்கள் ஒன்றாக புதிய பயணத்தை தொடங்கும் இந்த அழகான தருணத்தை 
          உங்களுடன் பகிர்ந்து கொள்ள ஆவலுடன் காத்திருக்கிறோம்.
        </motion.p>
        <motion.p className="welcome-message-english" variants={fadeInUp}>
          With hearts full of joy and love, we invite you to be part of the most 
          special day of our lives. Your presence will make our celebration complete.
        </motion.p>
        <motion.div className="decorative-line" variants={scaleIn}></motion.div>
      </motion.section>

      {/* Couple Section */}
      <motion.section 
        id="couple"
        className="couple"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp}>The Couple</motion.h2>
        <motion.div className="couple-grid" variants={staggerContainer}>
          <motion.div className="couple-card groom" variants={fadeInUp}>
            <div className="couple-icon">🤵</div>
            <h3>{weddingDetails.groomFull}</h3>
            <p className="couple-job">{weddingDetails.groomJob}</p>
          </motion.div>
          <motion.div className="couple-ampersand" variants={scaleIn}>
            💑
          </motion.div>
          <motion.div className="couple-card bride" variants={fadeInUp}>
            <div className="couple-icon">👰</div>
            <h3>{weddingDetails.brideFull}</h3>
            <p className="couple-job">{weddingDetails.brideJob}</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Events Timeline */}
      <motion.section 
        id="events"
        className="events"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp}>Celebration Events</motion.h2>
        <motion.p className="section-subtitle" variants={fadeInUp}>
          Join us for the festivities
        </motion.p>
        
        <motion.div className="events-grid" variants={staggerContainer}>
          {weddingDetails.events.map((event, index) => (
            <motion.div 
              key={index}
              className="event-card"
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(201, 168, 108, 0.15)" 
              }}
            >
              <span className="event-icon">{event.icon}</span>
              <h3>{event.name}</h3>
              <p className="event-date">{event.date}</p>
              <p className="event-time">{event.time}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Venue Section */}
      <motion.section 
        id="venue"
        className="venue"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="venue-content">
          <motion.div className="venue-icon" variants={scaleIn}>
            📍
          </motion.div>
          <motion.h2 variants={fadeInUp}>Venue</motion.h2>
          <motion.h3 className="venue-name" variants={fadeInUp}>
            {weddingDetails.venue}
          </motion.h3>
          <motion.p className="venue-address" variants={fadeInUp}>
            {weddingDetails.address}
          </motion.p>
          <motion.a 
            href={weddingDetails.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="map-button"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
            </svg>
            View on Google Maps
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Directions Section */}
      <motion.section 
        id="directions"
        className="directions"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="directions-content">
          <motion.div className="directions-icon" variants={scaleIn}>
            🚌
          </motion.div>
          <motion.h2 variants={fadeInUp}>How to Reach</motion.h2>
          <motion.p className="directions-text" variants={fadeInUp}>
            {weddingDetails.directions}
          </motion.p>
          <motion.div className="bus-routes" variants={fadeInUp}>
            <span className="route-label">Bus Routes:</span>
            <div className="route-tags">
              <span className="route-tag">Watrap</span>
              <span className="route-tag">Kansapuram</span>
              <span className="route-tag">Maharajapuram</span>
              <span className="route-tag">Kunnur</span>
              <span className="route-tag">Krishnan Koil</span>
              <span className="route-tag">Koomapatti</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="contact-content">
          <motion.div className="contact-icon" variants={scaleIn}>
            📞
          </motion.div>
          <motion.h2 variants={fadeInUp}>Contact Us</motion.h2>
          <motion.p className="contact-name" variants={fadeInUp}>
            {weddingDetails.contactName}
          </motion.p>
          <motion.a 
            href={`tel:${weddingDetails.contact}`}
            className="contact-phone"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="currentColor"/>
            </svg>
            {weddingDetails.contact}
          </motion.a>
          <motion.a 
            href={`https://wa.me/91${weddingDetails.contact}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="footer-names">
            {weddingDetails.groomName} ❤️ {weddingDetails.brideName}
          </div>
          <div className="footer-date">22nd February 2026</div>
          <div className="footer-ornament">🙏</div>
          <p className="footer-message">
            உங்கள் ஆசிர்வாதத்துடன் எங்கள் புதிய வாழ்க்கை பயணம் தொடங்குகிறது
          </p>
          <p className="footer-message-en">
            Your blessings make our new journey complete
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;

