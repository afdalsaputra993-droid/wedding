import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

const Couple = () => {
  const { title, description, groom, bride } = weddingConfig.couple;

  // Animasi muncul dari bawah
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="couple" className="py-5 position-relative overflow-hidden" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5">
        
        {/* Judul Section */}
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

        {/* Container Mempelai */}
        <div className="row align-items-center justify-content-center g-5">
          
          {/* --- MEMPELAI PRIA (GROOM) --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="col-md-5 col-lg-4 text-center order-2 order-md-1"
          >
            {/* Foto Bulat/Oval dengan Border Emas */}
            <div className="position-relative d-inline-block mb-4">
              <div className="rounded-circle overflow-hidden border border-4 border-secondary shadow-lg" 
                   style={{ width: '200px', height: '200px', borderColor: 'var(--secondary-color) !important' }}>
                <img 
                  src={groom.photo} 
                  alt={groom.name} 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              {/* Hiasan Kecil di Bawah Foto (Opsional) */}
              <div className="position-absolute bottom-0 start-50 translate-middle-x bg-white rounded-pill px-3 py-1 shadow-sm" 
                   style={{ border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                The Groom
              </div>
            </div>

            <h3 className="font-serif fw-bold fs-3 mb-1" style={{ color: 'var(--text-main)' }}>{groom.fullName}</h3>
            <p className="fw-semibold mb-2" style={{ color: 'var(--primary-color)' }}>({groom.name})</p>
            
            <p className="small text-muted mb-3">
              Putra dari <br/>
              <span className="fw-bold">{groom.father}</span> & <span className="fw-bold">{groom.mother}</span>
            </p>

            <a 
              href={`https://instagram.com/${groom.instagram}`} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline-custom btn-sm rounded-pill px-4"
            >
              <i className="bi bi-instagram me-2"></i> @{groom.instagram}
            </a>
          </motion.div>

          {/* --- ICON HATI DI TENGAH (Hanya di Desktop) --- */}
          <div className="col-md-2 text-center d-none d-md-block order-1 order-md-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              <i className="bi bi-heart-fill fs-1" style={{ color: 'var(--secondary-color)' }}></i>
            </motion.div>
          </div>

          {/* --- MEMPELAI WANITA (BRIDE) --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="col-md-5 col-lg-4 text-center order-3 order-md-3"
          >
             {/* Foto Bulat/Oval dengan Border Emas */}
             <div className="position-relative d-inline-block mb-4">
              <div className="rounded-circle overflow-hidden border border-4 border-secondary shadow-lg" 
                   style={{ width: '200px', height: '200px', borderColor: 'var(--secondary-color) !important' }}>
                <img 
                  src={bride.photo} 
                  alt={bride.name} 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
               <div className="position-absolute bottom-0 start-50 translate-middle-x bg-white rounded-pill px-3 py-1 shadow-sm" 
                   style={{ border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                The Bride
              </div>
            </div>

            <h3 className="font-serif fw-bold fs-3 mb-1" style={{ color: 'var(--text-main)' }}>{bride.fullName}</h3>
            <p className="fw-semibold mb-2" style={{ color: 'var(--primary-color)' }}>({bride.name})</p>
            
            <p className="small text-muted mb-3">
              Putri dari <br/>
              <span className="fw-bold">{bride.father}</span> & <span className="fw-bold">{bride.mother}</span>
            </p>

            <a 
              href={`https://instagram.com/${bride.instagram}`} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline-custom btn-sm rounded-pill px-4"
            >
              <i className="bi bi-instagram me-2"></i> @{bride.instagram}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Couple;
