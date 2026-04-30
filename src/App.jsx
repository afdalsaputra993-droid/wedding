// src/App.jsx
import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Story from './components/Story';
import Event from './components/Event';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer'; // Import Footer

// Import Audio (Pastikan file ada di folder public)
// Contoh: let audioSrc = "/assets/audio/lagu-pernikahan.mp3";
let audioSrc = "/music/beautiful-in-white.mp3"; // Ganti dengan link lagu kamu nanti

function App() {
  const [isOpen, setIsOpen] = useState(false); // State apakah undangan sudah dibuka
  const [isPlaying, setIsPlaying] = useState(false); // State musik
  const audioRef = useRef(null);

  // Fungsi Buka Undangan & Play Musik
  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("Autoplay prevented:", error));
    }
  };

  // Fungsi Toggle Musik (Pause/Play)
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      
      {/* --- AUDIO ELEMENT HIDDEN --- */}
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* --- COVER DEPAN (OPENING SCREEN) --- */}
      {!isOpen && (
        <div className="fixed-top w-100 h-100 d-flex flex-column align-items-center justify-content-center z-3 text-white text-center"
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&w=1600&q=80")', // Ganti foto cover
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               zIndex: 9999
             }}>
          {/* Overlay Gelap */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
          
          <div className="position-relative z-1 p-4">
            <h5 className="mb-3">The Wedding Of</h5>
            <h1 className="font-serif display-4 fw-bold mb-4">Andi & Rina</h1>
            <p className="mb-4">Kepada Yth.<br/>Bapak/Ibu/Saudara/i</p>
            
            <button 
              onClick={handleOpenInvitation}
              className="btn btn-light rounded-pill px-4 py-2 fw-bold shadow-lg animate-pulse"
            >
              <i className="bi bi-envelope-open me-2"></i> Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* --- KONTEN UTAMA (Muncul setelah dibuka) --- */}
      {isOpen && (
        <>
          <Navbar />
          <Hero />
          <Couple />
          <Story />
          <Event />
          <Gallery />
          <Rsvp />
          <Footer />

          {/* --- TOMBOL MUSIK FLOATING --- */}
          <button 
            onClick={toggleMusic}
            className="btn btn-light rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4 z-3 d-flex align-items-center justify-content-center"
            style={{ width: '50px', height: '50px' }}
          >
            {isPlaying ? (
              <i className="bi bi-pause-fill fs-5 text-primary"></i>
            ) : (
              <i className="bi bi-play-fill fs-5 text-primary"></i>
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
