import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

const Gallery = () => {
  const { title, description, photos } = weddingConfig.gallery;
  
  // State untuk Lightbox (Foto yang sedang dipilih)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Animasi Grid Item
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section id="gallery" className="py-5 position-relative" style={{ backgroundColor: 'var(--bg-body)' }}>
      <div className="container py-5">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Photo Grid */}
        <div className="row g-3">
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              // Membuat layout zig-zag sedikit agar tidak kaku (opsional)
              className={`col-6 col-md-4 col-lg-3 ${index % 3 === 0 ? 'order-md-1' : ''}`} 
            >
              <div 
                className="position-relative overflow-hidden rounded-3 shadow-sm cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
                style={{ aspectRatio: '1/1', cursor: 'pointer' }}
              >
                <img 
                  src={photo.src} 
                  alt={`Gallery ${photo.id}`} 
                  className="w-100 h-100 object-fit-cover transition-all duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Gelap saat Hover */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-0 group-hover:opacity-30 transition-all duration-300 d-flex align-items-center justify-content-center">
                  <i className="bi bi-zoom-in fs-2 text-white"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* --- LIGHTBOX / MODAL FOTO BESAR --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center z-3"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 9999 }}
            onClick={() => setSelectedPhoto(null)} // Klik background untuk tutup
          >
            {/* Tombol Close */}
            <button 
              className="btn btn-light rounded-circle position-absolute top-0 end-0 m-4 p-2 fs-4 lh-1"
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
            >
              &times;
            </button>

            {/* Foto Besar */}
            <motion.img 
              src={selectedPhoto.src} 
              alt="Full Size"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="img-fluid rounded-3 shadow-lg"
              style={{ maxHeight: '90vh', maxWidth: '90vw' }}
              onClick={(e) => e.stopPropagation()} // Klik gambar jangan tutup modal
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
