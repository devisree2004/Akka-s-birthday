"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ReasonCard {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

const reasons: ReasonCard[] = [
  {
    id: 1,
    title: "Your Kindness",
    description: "Whether it's family, friends, or complete strangers (except for Jiju and me 😌), you always find a way to care. Your kindness has a way of making people feel seen, valued, and a little better than before.",
    emoji: "💝",
  },
  
  {
    id: 2,
    title: "Your Strength",
    description: "You sometimes surprise me with how strong you can be during life's toughest moments, yet get emotional over the smallest things. But maybe that's your strength too—the ability to care deeply. You have always been one of the quiet pillars of our family.",
    emoji: "💪",
  },
  {
    id: 3,
    title: "Your Determination",
    description: "Whether it was cracking JEE or making the perfect paneer ki sabji, you've never believed in shortcuts. Once you set your mind on something, you give it your full effort—and that's something I've always admired ",
    emoji: "✨",
  },
  {
    id: 4,
    title: "Your Perfectionism",
    description: "If there were awards for perfect handwriting, neatly folded clothes, and organizing things with military precision, you'd probably win them all without breaking a sweat.",
    emoji: "🌟",
  },
  {
    id: 5,
    title: "Your Adaptability",
    description: "Life hasn't always been as straightforward for you as it seemed for your peers, yet I've rarely seen you complain. You've embraced every role that came your way and given it your best, leaving no stone unturned.",
    emoji: "💕",
  },
  {
    id: 6,
    title: "Being You",
    description: "Beyond all your roles and responsibilities,  you are thoughtful, resilient, caring, and slightly bossy person we wouldn't trade for anything. The world is brighter because you're in it.",
    emoji: "👑",
  },
];

// Floating mini cake piece
const FloatingCake = ({ delay, startX, startY }: { delay: number; startX: number; startY: number }) => {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none opacity-30"
      style={{ left: startX, top: startY }}
      animate={{
        y: [0, -30, 0],
        x: [0, 10, -10, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🎂
    </motion.div>
  );
};

// Single reason card
const ReasonCardComponent = ({ reason, index }: { reason: ReasonCard; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="glass rounded-3xl p-6 sm:p-8 h-full"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px rgba(248, 200, 220, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)",
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 12px 40px rgba(212, 175, 55, 0.3), 0 0 0 2px rgba(212, 175, 55, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        animate={isExpanded ? { 
          scale: 1.05,
          boxShadow: "0 16px 50px rgba(212, 175, 55, 0.4), 0 0 0 2px rgba(212, 175, 55, 0.5)",
        } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Emoji */}
        <motion.div 
          className="text-4xl sm:text-5xl mb-4"
          animate={isExpanded ? { scale: 1.2, rotate: [0, 10, -10, 0] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {reason.emoji}
        </motion.div>

        {/* Title */}
        <h3 
          className="text-xl sm:text-2xl font-semibold text-[#5a4a4a] mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {reason.title}
        </h3>

        {/* Description */}
        <p 
          className="text-[#6a5a5a] leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {reason.description}
        </p>

        {/* Decorative corner */}
        <div className="absolute top-3 right-3 text-[#D4AF37] opacity-50">
          ✦
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ReasonsWeLoveYou() {
  const floatingCakes = [
    { delay: 0, x: "5%", y: "10%" },
    { delay: 2, x: "90%", y: "20%" },
    { delay: 4, x: "15%", y: "80%" },
    { delay: 1, x: "85%", y: "70%" },
    { delay: 3, x: "50%", y: "5%" },
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-linear-to-b from-[#FFF0F5] to-[#FFE4EC]">
      {/* Floating cake pieces */}
      {floatingCakes.map((cake, i) => (
        <FloatingCake 
          key={i} 
          delay={cake.delay} 
          startX={parseInt(cake.x)} 
          startY={parseInt(cake.y)} 
        />
      ))}

      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#D4AF37] opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient mb-4">
            A Few Reasons We Put Up With You 😉
          </h2>
          <motion.div
            className="mx-auto w-24 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <ReasonCardComponent key={reason.id} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
