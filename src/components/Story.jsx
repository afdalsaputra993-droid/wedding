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
    <div className="bg-white">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F6F2EA" fillOpacity="1" d="M0,192L30,181.3C60,171,120,149,180,165.3C240,181,300,235,360,234.7C420,235,480,181,540,138.7C600,96,660,64,720,69.3C780,75,840,117,900,144C960,171,1020,181,1080,160C1140,139,1200,85,1260,80C1320,75,1380,117,1410,138.7L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F6F2EA" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,160C672,139,768,85,864,69.3C960,53,1056,75,1152,106.7C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </div>
  );
};

export default Story;
