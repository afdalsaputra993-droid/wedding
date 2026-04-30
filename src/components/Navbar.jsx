import React, { useState, useEffect, useRef } from 'react';
import { weddingConfig } from '../data/weddingConfig';

const Navbar = () => {
  const { brand, links, music } = weddingConfig.navbar;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);

  // Deteksi Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll
  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle Musik
  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(()=>{});
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={music.src} type="audio/mpeg" />
      </audio>

      {/* 
         CARA PAKAI:
         1. Jika Background Hero GELAP/GAMBAR: Tambahkan class "navbar-dark"
         2. Jika Background Hero TERANG/CREAM: Hapus class "navbar-dark"
         3. Class "navbar-scrolled" otomatis aktif lewat state isScrolled
      */}
      <nav 
        className={`fixed-top py-3 transition-all navbar-custom ${
          isScrolled ? 'navbar-scrolled' : '' 
        } `} 
        // ^^^ HAPUS 'navbar-dark' DI SINI JIKA BACKGROUND HERO KAMU TERANG
        style={{ zIndex: 1000 }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          
          {/* LOGO */}
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')}>
            <h2 className="m-0 fw-bold font-serif brand-text" style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>
              {brand}
            </h2>
          </a>

          {/* DESKTOP MENU */}
          <div className="d-none d-md-flex gap-4 align-items-center">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="fw-semibold text-uppercase small nav-link-text"
                style={{ letterSpacing: '1px' }}
              >
                {link.name}
              </a>
            ))}
            
            {/* TOMBOL MUSIK */}
            <button 
              onClick={toggleMusic}
              className="d-none btn icon-btn rounded-pill px-3 py-1 d-flex align-items-center gap-2 border"
              style={{ fontSize: '0.85rem' }}
            >
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
              <span>{isPlaying ? "Playing" : "Music"}</span>
            </button>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="d-md-none d-flex align-items-center gap-3">
             <button 
              onClick={toggleMusic}
              className="d-none btn icon-btn rounded-circle p-2 border d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
            >
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-music-note-beamed'}`}></i>
            </button>

            <button 
              className="btn border-0 p-0 mobile-toggle fs-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="d-md-none bg-white shadow-lg position-absolute w-100 start-0 top-100 py-3 px-4 animate-fade-in-down">
            <div className="d-flex flex-column gap-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-decoration-none text-dark fw-semibold border-bottom pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
