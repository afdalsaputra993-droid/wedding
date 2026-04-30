import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-5 text-center position-relative overflow-hidden" style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="font-serif mb-3" style={{ color: 'var(--primary-color)' }}>Terima Kasih</h4>
          
          <p className="small mb-4 mx-auto" style={{ maxWidth: '500px' }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>

          <div className="mb-3">
            {/* Ikon Sosial Media Pasangan (Opsional) */}
            <a href="#" className="text-secondary mx-2 fs-5"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-secondary mx-2 fs-5"><i className="bi bi-facebook"></i></a>
          </div>

          <hr className="w-50 mx-auto mb-3 opacity-25" />

          <p className="small mb-0">
            Made with ❤️ by <span className="fw-bold">Tyrexion</span> | &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
