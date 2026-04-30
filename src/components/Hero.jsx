import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';

const Hero = () => {
  const { title, coupleNames, weddingDate, countdownLabels, backgroundImage } = weddingConfig.hero;

  // =========================
  // STATE COUNTDOWN
  // =========================
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // =========================
  // LOGIKA WAKTU
  // =========================
  useEffect(() => {
    const targetDate = new Date(weddingDate).getTime();

    if (isNaN(targetDate)) {
      console.error("❌ Format tanggal salah di weddingConfig!");
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  // =========================
  // ANIMATION
  // =========================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section
      id="home"
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      {/* =========================
          🌿 FLORAL FRAME (RESPONSIVE)
      ========================= */}
      <div
        className="floral-frame position-absolute top-0 start-0 w-100 h-100"
      ></div>

      {/* =========================
          OVERLAY
      ========================= */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(2px)'
        }}
      ></div>

      {/* =========================
          CONTENT
      ========================= */}
      <motion.div
        className="container position-relative text-center z-1 px-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* TITLE */}
        <motion.p
          variants={itemVariants}
          className="text-uppercase fw-semibold mb-3"
          style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}
        >
          {title}
        </motion.p>

        {/* NAMA */}
        <motion.h1
          variants={itemVariants}
          className="font-serif display-3 fw-bold mb-4"
          style={{ color: 'var(--secondary-color)' }}
        >
          {coupleNames}
        </motion.h1>

        {/* TANGGAL */}
        <motion.div
          variants={itemVariants}
          className="d-flex align-items-center justify-content-center gap-2 mb-5"
        >
          <div className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px' }}></div>

          <p className="m-0 fw-medium" style={{ color: 'var(--text-main)' }}>
            {new Date(weddingDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>

          <div className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px' }}></div>
        </motion.div>

        {/* COUNTDOWN */}
        <motion.div
          variants={itemVariants}
          className="d-flex flex-wrap justify-content-center gap-3 mb-5"
        >
          {[
            { label: countdownLabels.days, value: timeLeft.days },
            { label: countdownLabels.hours, value: timeLeft.hours },
            { label: countdownLabels.minutes, value: timeLeft.minutes },
            { label: countdownLabels.seconds, value: timeLeft.seconds }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-3 p-3 shadow-sm text-center"
              style={{ minWidth: '80px' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={item.value}
                  className="d-block font-serif fw-bold fs-3"
                  style={{ color: 'var(--primary-color)' }}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatNumber(item.value)}
                </motion.span>
              </AnimatePresence>

              <small className="text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>
                {item.label}
              </small>
            </div>
          ))}
        </motion.div>

        {/* SCROLL */}
        <motion.a
          href="#couple"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <i className="bi bi-chevron-down fs-4"></i>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;