import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

const Event = () => {
  const { title, description, akad, resepsi, dresscode } = weddingConfig.event;

  // Animasi Fade In Up
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="event" className="py-5 position-relative" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-5"
        >
          <h2 className="font-serif display-5 fw-bold mb-3" style={{ color: 'var(--primary-color)' }}>
            {title}
          </h2>
          <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: 'var(--secondary-color)' }}></div>
          <p className="mt-4 text-muted mx-auto" style={{ maxWidth: '600px' }}>
            {description}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="row g-4 justify-content-center">
          
          {/* --- KARTU AKAD NIKAH --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="col-md-6 col-lg-5"
          >
            <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden position-relative">
              {/* Decorative Top Bar */}
              <div className="w-100 h-2 bg-secondary"></div>
              
              <div className="card-body p-4 p-md-5 text-center">
                <i className="bi bi-book-half fs-1 mb-3" style={{ color: 'var(--primary-color)' }}></i>
                <h3 className="font-serif fw-bold fs-3 mb-4" style={{ color: 'var(--text-main)' }}>{akad.title}</h3>
                
                <div className="mb-4">
                  <p className="fw-bold fs-5 mb-1" style={{ color: 'var(--secondary-color)' }}>{akad.date}</p>
                  <p className="text-muted">{akad.time}</p>
                </div>

                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">{akad.locationName}</h5>
                  <p className="small text-muted">{akad.address}</p>
                </div>

                <a 
                  href={akad.mapsLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-custom w-100 rounded-pill"
                >
                  <i className="bi bi-geo-alt-fill me-2"></i> Lihat Lokasi Akad
                </a>
              </div>
            </div>
          </motion.div>

          {/* --- KARTU RESEPSI --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }} // Muncul sedikit lebih lambat
            className="col-md-6 col-lg-5"
          >
             <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden position-relative">
              {/* Decorative Top Bar */}
              <div className="w-100 h-2 bg-primary"></div>
              
              <div className="card-body p-4 p-md-5 text-center">
                <i className="bi bi-cup-hot-fill fs-1 mb-3" style={{ color: 'var(--secondary-color)' }}></i>
                <h3 className="font-serif fw-bold fs-3 mb-4" style={{ color: 'var(--text-main)' }}>{resepsi.title}</h3>
                
                <div className="mb-4">
                  <p className="fw-bold fs-5 mb-1" style={{ color: 'var(--primary-color)' }}>{resepsi.date}</p>
                  <p className="text-muted">{resepsi.time}</p>
                </div>

                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">{resepsi.locationName}</h5>
                  <p className="small text-muted">{resepsi.address}</p>
                </div>

                <a 
                  href={resepsi.mapsLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline-custom w-100 rounded-pill"
                >
                  <i className="bi bi-geo-alt-fill me-2"></i> Lihat Lokasi Resepsi
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Dress Code Section (Opsional) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-5 pt-5"
        >
          <h4 className="font-serif fw-bold mb-3" style={{ color: 'var(--text-main)' }}>{dresscode.title}</h4>
          <p className="text-muted mb-3">{dresscode.desc}</p>
          
          <div className="d-flex justify-content-center gap-3">
            {dresscode.colors.map((color, index) => (
              <div 
                key={index}
                className="rounded-circle shadow-sm border border-white"
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: color,
                  cursor: 'pointer'
                }}
                title={`Color Code: ${color}`}
              ></div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Event;
