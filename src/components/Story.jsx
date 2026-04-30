import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

const Story = () => {
  const { title, description, items } = weddingConfig.story;

  // Animasi Fade In Up
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="story" className="py-5 position-relative" style={{ backgroundColor: 'var(--bg-body)' }}>
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

        {/* Timeline Container */}
        <div className="position-relative">
          
          {/* Garis Vertikal Tengah (Desktop) & Kiri (Mobile) */}
          <div className="position-absolute top-0 bottom-0 start-50 translate-middle-x d-none d-md-block" 
               style={{ width: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}></div>
          
          {/* Garis Vertikal Kiri (Mobile Only) */}
          <div className="position-absolute top-0 bottom-0 start-0 ms-4 d-md-none" 
               style={{ width: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}></div>

          {/* Looping Items */}
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }} // Trigger animasi sedikit sebelum elemen masuk layar
                variants={fadeInUp}
                className={`row align-items-center justify-content-center mb-5 position-relative ${
                  // Di Desktop: Genap = Gambar Kiri, Teks Kanan. Ganjil = Sebaliknya.
                  // Di Mobile: Selalu Gambar Kiri, Teks Kanan (karena flex order)
                  isEven ? 'flex-row-reverse flex-md-row' : '' 
                }`}
              >
                
                {/* --- BAGIAN GAMBAR --- */}
                <div className="col-md-5 col-lg-4 mb-4 mb-md-0">
                  <div className="card-custom border-0 shadow-sm overflow-hidden rounded-4 h-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-100 h-100 object-fit-cover"
                      style={{ minHeight: '250px' }}
                    />
                  </div>
                </div>

                {/* --- ICON BULLET DI TENGAH GARIS --- */}
                <div className="col-md-2 position-relative d-flex justify-content-center">
                  {/* Bullet Desktop (Tengah) */}
                  <div className="d-none d-md-flex align-items-center justify-content-center bg-white border border-4 rounded-circle shadow-sm z-1" 
                       style={{ width: '20px', height: '20px', borderColor: 'var(--secondary-color)' }}>
                  </div>
                  
                  {/* Bullet Mobile (Kiri) */}
                  <div className="d-md-none position-absolute start-0 translate-middle-x align-items-center justify-content-center bg-white border border-4 rounded-circle shadow-sm z-1" 
                       style={{ width: '16px', height: '16px', borderColor: 'var(--secondary-color)', left: '16px' }}>
                  </div>
                </div>

                {/* --- BAGIAN TEKS --- */}
                <div className="col-md-5 col-lg-4 text-center text-md-start">
                  <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2 rounded-pill mb-2 fw-semibold">
                    {item.date}
                  </span>
                  <h3 className="font-serif fw-bold fs-4 mb-2" style={{ color: 'var(--text-main)' }}>
                    {item.title}
                  </h3>
                  <p className="text-muted lh-lg">
                    {item.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Story;
