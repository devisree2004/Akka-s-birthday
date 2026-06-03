"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Floating rose petals
const RosePetal = ({
  delay,
  duration,
  startX,
}: {
  delay: number;
  duration: number;
  startX: number;
}) => {
  return (
    <motion.div
      className="absolute text-2xl md:text-3xl pointer-events-none select-none"
      initial={{ y: -50, x: startX, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0vh", "110vh"],
        x: [startX, startX + Math.random() * 100 - 50],
        opacity: [0, 1, 1, 0.3],
        rotate: [0, 360, 720],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      🌸
    </motion.div>
  );
};

// Twinkling stars
const Star = ({
  top,
  left,
  delay,
}: {
  top: string;
  left: string;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute text-[#D4AF37] pointer-events-none"
      style={{ top, left }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ✦
    </motion.div>
  );
};

// Sparkle effect for text
const Sparkle = ({ style }: { style: React.CSSProperties }) => {
  return (
    <motion.span
      className="absolute text-[#D4AF37] text-xs pointer-events-none"
      style={style}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ✨
    </motion.span>
  );
};

// Firecracker burst
const FirecrackerBurst = ({ side }: { side: "left" | "right" }) => {
  const particles = Array.from({ length: 12 });
  const baseX = side === "left" ? "15%" : "85%";

  return (
    <div className="absolute top-1/3" style={{ left: baseX }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background:
              i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#FFD1DC" : "#F8C8DC",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i * 30 * Math.PI) / 180) * 100,
            y: Math.sin((i * 30 * Math.PI) / 180) * 100,
            opacity: [1, 1, 0],
            scale: [1, 1.5, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.05,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Parallax circles
const ParallaxCircle = ({
  size,
  top,
  left,
  delay,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: "linear-gradient(135deg, #FFD1DC 0%, #F8C8DC 100%)",
      }}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// New reusable gold animated heading
const GoldShimmerText = ({
  as: Tag = "h1",
  className = "",
  children,
  delay = 0,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      <Tag
        className={className}
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              #8f5b00 0%,
              #c9921a 18%,
              #fff1a8 32%,
              #d4af37 48%,
              #fff4bf 58%,
              #c9921a 78%,
              #8f5b00 100%
            )
          `,
          backgroundSize: "220% auto",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          textShadow:
            "0 2px 10px rgba(90, 58, 10, 0.22), 0 4px 18px rgba(140, 100, 20, 0.18)",
          filter: "drop-shadow(0 2px 6px rgba(120, 80, 10, 0.18))",
          animation: "goldShimmer 4.5s linear infinite",
        }}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default function HeroSection() {
  const [petals, setPetals] = useState<
    Array<{ id: number; delay: number; duration: number; startX: number }>
  >([]);
  const [stars, setStars] = useState<
    Array<{ id: number; top: string; left: string; delay: number }>
  >([]);
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: i * 0.8,
      duration: 8 + Math.random() * 4,
      startX:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1000),
    }));
    setPetals(newPetals);

    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
    }));
    setStars(newStars);

    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      },
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes goldShimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-pink-gradient">
        {/* Parallax background circles */}
        <ParallaxCircle size={300} top="10%" left="5%" delay={0} />
        <ParallaxCircle size={200} top="60%" left="80%" delay={1} />
        <ParallaxCircle size={150} top="30%" left="70%" delay={2} />
        <ParallaxCircle size={250} top="70%" left="10%" delay={1.5} />

        {/* Floating rose petals */}
        {petals.map((petal) => (
          <RosePetal
            key={petal.id}
            delay={petal.delay}
            duration={petal.duration}
            startX={petal.startX}
          />
        ))}

        {/* Twinkling stars */}
        {stars.map((star) => (
          <Star
            key={star.id}
            top={star.top}
            left={star.left}
            delay={star.delay}
          />
        ))}

        {/* Firecracker bursts */}
        <FirecrackerBurst side="left" />
        <FirecrackerBurst side="right" />

        {/* Main content */}
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Main headline with sparkles */}
          <div className="relative inline-block">
            {sparkles.map((sparkle) => (
              <Sparkle key={sparkle.id} style={sparkle.style} />
            ))}

            <GoldShimmerText
              as="h1"
              delay={0.3}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              Happy Birthday
            </GoldShimmerText>

            <GoldShimmerText
              as="h2"
              delay={0.5}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mt-2 leading-tight"
            >
              Akkaa
            </GoldShimmerText>
          </div>

          {/* Elegant subtitle */}
          <motion.p
            className="mt-8 text-lg sm:text-xl md:text-2xl text-[#5a4a4a] font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            A small birthday present for you from your amazing sister Simmi
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mt-6 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#D4AF37]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.span
            className="text-sm tracking-widest mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            SCROLL DOWN
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}