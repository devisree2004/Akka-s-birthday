"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

// Candle component with flame
const Candle = ({ 
  isLit, 
  delay,
  color 
}: { 
  isLit: boolean; 
  delay: number;
  color: string;
}) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="absolute -top-6 flex flex-col items-center"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -20 }}
            transition={{ duration: 0.5, delay }}
          >
            {/* Outer flame */}
            <motion.div
              className="w-3 h-5 rounded-full bg-linear-to-t from-orange-500 via-yellow-400 to-yellow-200"
              animate={{
                scaleY: [1, 1.1, 0.95, 1],
                scaleX: [1, 0.9, 1.05, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                filter: "blur(1px)",
                boxShadow: "0 0 20px rgba(255, 200, 50, 0.8), 0 0 40px rgba(255, 150, 50, 0.5)",
              }}
            />
            {/* Inner flame */}
            <motion.div
              className="absolute bottom-0 w-1.5 h-3 rounded-full bg-linear-to-t from-blue-200 to-yellow-100"
              animate={{
                scaleY: [1, 1.15, 0.9, 1],
              }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Wick */}
      <div className="w-0.5 h-3 bg-gray-800 rounded-full" />
      
      {/* Candle body */}
      <div 
        className="w-3 h-12 rounded-sm"
        style={{
          background: `linear-gradient(to bottom, ${color}, ${color}dd)`,
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

// Confetti particle
const ConfettiParticle = ({ 
  index, 
  color 
}: { 
  index: number; 
  color: string;
}) => {
  const randomX = Math.random() * 400 - 200;
  const randomRotation = Math.random() * 720;
  const duration = 2 + Math.random() * 2;
  
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm"
      style={{ 
        backgroundColor: color,
        left: "50%",
        top: "40%",
      }}
      initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
      animate={{
        x: randomX,
        y: [0, -100 - Math.random() * 100, 400],
        rotate: randomRotation,
        opacity: [1, 1, 0],
        scale: [1, 1.2, 0.5],
      }}
      transition={{
        duration,
        delay: index * 0.02,
        ease: "easeOut",
      }}
    />
  );
};

// Sparkle burst
const SparkleParticle = ({ index }: { index: number }) => {
  const angle = (index * 360) / 20;
  const distance = 80 + Math.random() * 60;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;
  
  return (
    <motion.div
      className="absolute text-[#D4AF37] text-lg"
      style={{ left: "50%", top: "40%" }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x,
        y,
        opacity: [1, 1, 0],
        scale: [0.5, 1.5, 0],
      }}
      transition={{
        duration: 1.5,
        delay: 0.3 + index * 0.03,
        ease: "easeOut",
      }}
    >
      ✦
    </motion.div>
  );
};

// Glowing particle
const GlowingParticle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 300 - 150;
  const randomY = Math.random() * 200 - 100;
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-[#D4AF37]"
      style={{ 
        left: "50%", 
        top: "50%",
        boxShadow: "0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.5)",
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: randomX,
        y: randomY,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const blowCandles = useCallback(() => {
    if (!candlesLit) return;
    
    setCandlesLit(false);
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowMessage(true);
    }, 800);
  }, [candlesLit]);

  const confettiColors = ["#D4AF37", "#FFD1DC", "#F8C8DC", "#FFF0F5", "#F5E6B3"];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-pink-gradient-soft">
      {/* Magical glowing particles (after celebration) */}
      {showCelebration && (
        <>
          {Array.from({ length: 15 }).map((_, i) => (
            <GlowingParticle key={i} delay={1 + i * 0.2} />
          ))}
        </>
      )}

      {/* Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient mb-12 text-center px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Make a Wish 
      </motion.h2>

      {/* Cake container */}
      <motion.div
        className="relative cursor-pointer"
        onClick={blowCandles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Confetti */}
        <AnimatePresence>
          {showCelebration && (
            <>
              {Array.from({ length: 50 }).map((_, i) => (
                <ConfettiParticle 
                  key={i} 
                  index={i} 
                  color={confettiColors[i % confettiColors.length]} 
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <SparkleParticle key={`sparkle-${i}`} index={i} />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Candles */}
        <div className="flex justify-center gap-4 mb-2 relative z-10">
          <Candle isLit={candlesLit} delay={0} color="#FFD1DC" />
          <Candle isLit={candlesLit} delay={0.1} color="#D4AF37" />
          <Candle isLit={candlesLit} delay={0.15} color="#FFD1DC" />
          <Candle isLit={candlesLit} delay={0.2} color="#D4AF37" />
          <Candle isLit={candlesLit} delay={0.25} color="#FFD1DC" />
        </div>

        {/* Cake tiers */}
        <div className="flex flex-col items-center">
          {/* Top tier */}
          <div 
            className="w-32 sm:w-40 h-16 sm:h-20 rounded-lg relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #FFD1DC 0%, #F8C8DC 100%)",
              boxShadow: "inset 0 -5px 15px rgba(0,0,0,0.1), 0 5px 20px rgba(212, 175, 55, 0.3)",
            }}
          >
            {/* Glitter effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-shimmer" />
            {/* Decorative line */}
            <div className="absolute bottom-2 left-0 right-0 h-1 bg-[#D4AF37]/50" />
            <div className="absolute top-2 left-0 right-0 h-0.5 bg-[#D4AF37]/30" />
          </div>

          {/* Middle tier */}
          <div 
            className="w-44 sm:w-56 h-20 sm:h-24 rounded-lg relative overflow-hidden -mt-1"
            style={{
              background: "linear-gradient(180deg, #F8C8DC 0%, #FFD1DC 100%)",
              boxShadow: "inset 0 -5px 15px rgba(0,0,0,0.1), 0 5px 20px rgba(212, 175, 55, 0.3)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-shimmer" />
            {/* Rose decorations */}
            <div className="absolute top-3 left-4 text-lg">🌹</div>
            <div className="absolute top-3 right-4 text-lg">🌹</div>
            <div className="absolute bottom-2 left-0 right-0 h-1.5 bg-[#D4AF37]/50" />
          </div>

          {/* Bottom tier */}
          <div 
            className="w-56 sm:w-72 h-24 sm:h-28 rounded-lg relative overflow-hidden -mt-1"
            style={{
              background: "linear-gradient(180deg, #FFD1DC 0%, #F8C8DC 100%)",
              boxShadow: "inset 0 -5px 15px rgba(0,0,0,0.1), 0 8px 30px rgba(212, 175, 55, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-shimmer" />
            {/* Gold band */}
            <div className="absolute top-4 left-0 right-0 h-2 bg-linear-to-r from-[#D4AF37]/30 via-[#D4AF37] to-[#D4AF37]/30" />
            <div className="absolute bottom-4 left-0 right-0 h-2 bg-linear-to-r from-[#D4AF37]/30 via-[#D4AF37] to-[#D4AF37]/30" />
          </div>

          {/* Cake plate */}
          <div 
            className="w-64 sm:w-80 h-4 rounded-full -mt-1"
            style={{
              background: "linear-gradient(180deg, #D4AF37 0%, #B8960C 100%)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Click instruction */}
        {candlesLit && (
          <motion.p
            className="mt-6 text-[#5a4a4a] text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Click to blow out the candles
          </motion.p>
        )}
      </motion.div>

      {/* Celebration message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="mt-12 text-center px-4"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-semibold"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(212, 175, 55, 0.5)",
                  "0 0 40px rgba(212, 175, 55, 0.8)",
                  "0 0 20px rgba(212, 175, 55, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Your wish has been granted by the universe ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
