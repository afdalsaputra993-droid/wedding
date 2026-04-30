import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className="bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F6F2EA" fillOpacity="1" d="M0,192L30,181.3C60,171,120,149,180,165.3C240,181,300,235,360,234.7C420,235,480,181,540,138.7C600,96,660,64,720,69.3C780,75,840,117,900,144C960,171,1020,181,1080,160C1140,139,1200,85,1260,80C1320,75,1380,117,1410,138.7L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
    <footer className="py-5 text-center position-relative overflow-hidden" style={{ backgroundColor: '#F6F2EA', color: '#6c757d' }}>
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
    </div>
  );
};

export default Footer;
