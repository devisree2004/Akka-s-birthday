"use client";

import React from "react";
import { motion } from "framer-motion";

// Floating star component
const FloatingStar = ({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: string;
}) => (
  <motion.div
    className="absolute text-[#D4AF37] pointer-events-none select-none"
    style={{ left: x, top: y, fontSize: size }}
    animate={{
      opacity: [0.3, 1, 0.3],
      scale: [0.85, 1.15, 0.85],
      y: [0, -14, 0],
    }}
    transition={{
      duration: 3.4 + Math.random() * 1.6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    ✦
  </motion.div>
);

// Floating emoji component
const FloatingEmoji = ({
  emoji,
  delay,
  x,
}: {
  emoji: string;
  delay: number;
  x: string;
}) => (
  <motion.div
    className="absolute text-2xl sm:text-3xl pointer-events-none select-none opacity-80"
    style={{ left: x, bottom: "10%" }}
    animate={{
      y: [0, -90, -180],
      opacity: [0, 1, 0],
      rotate: [0, 8, -8, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  >
    {emoji}
  </motion.div>
);

// Sparkle particle
const SparkleParticle = ({
  delay,
  x,
  y,
}: {
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute w-1 h-1 bg-[#D4AF37] rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      boxShadow: "0 0 6px rgba(212, 175, 55, 0.75)",
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.4, 0],
    }}
    transition={{
      duration: 2.2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Hover-to-gold text block
const GoldenHoverText = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.p
      className={`group relative text-lg sm:text-xl md:text-2xl leading-relaxed text-[#4a3a3a] transition-colors duration-400 ${className}`}
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <span
        className="transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[linear-gradient(90deg,#7a4d00_0%,#b67c12_24%,#e0b84f_48%,#b67c12_74%,#7a4d00_100%)]"
        style={{
          textShadow: "0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        {children}
      </span>
    </motion.p>
  );
};

export default function ClosingMessage() {
  const stars = [
    { delay: 0, x: "10%", y: "15%", size: "1.5rem" },
    { delay: 0.5, x: "85%", y: "20%", size: "1rem" },
    { delay: 1, x: "25%", y: "70%", size: "1.25rem" },
    { delay: 1.5, x: "70%", y: "75%", size: "1rem" },
    { delay: 2, x: "50%", y: "10%", size: "1.5rem" },
    { delay: 0.8, x: "15%", y: "45%", size: "0.875rem" },
    { delay: 1.2, x: "90%", y: "55%", size: "1.25rem" },
    { delay: 1.8, x: "5%", y: "85%", size: "1rem" },
    { delay: 0.3, x: "95%", y: "85%", size: "1.5rem" },
  ];

  const emojis = [
    { emoji: "🎂", delay: 0, x: "15%" },
    { emoji: "🎁", delay: 1.5, x: "35%" },
    { emoji: "🎈", delay: 3, x: "55%" },
    { emoji: "💝", delay: 4.5, x: "75%" },
    { emoji: "🌹", delay: 2, x: "85%" },
  ];

  const sparkles = Array.from({ length: 20 }, () => ({
    delay: Math.random() * 3,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  }));

  return (
    <>
      <style jsx>{`
        .gold-readable {
          background-image: linear-gradient(
            90deg,
            #7a4d00 0%,
            #b67c12 22%,
            #e0b84f 42%,
            #d4af37 58%,
            #b67c12 78%,
            #7a4d00 100%
          );
          background-size: 180% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .soft-card {
          background: rgba(255, 255, 255, 0.32);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.34);
          box-shadow:
            0 12px 38px rgba(212, 175, 55, 0.16),
            inset 0 1px 30px rgba(255, 255, 255, 0.18);
        }

        .bottom-gold-fix {
          text-shadow:
            0 2px 10px rgba(100, 68, 10, 0.18),
            0 4px 20px rgba(140, 100, 20, 0.1);
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-[linear-gradient(to_bottom,#FFF0F5,#FFDDE8,#F8C8DC)]">
        {/* Floating stars */}
        {stars.map((star, i) => (
          <FloatingStar key={i} {...star} />
        ))}

        {/* Floating birthday emojis */}
        {emojis.map((item, i) => (
          <FloatingEmoji key={i} {...item} />
        ))}

        {/* Sparkle particles */}
        {sparkles.map((sparkle, i) => (
          <SparkleParticle key={i} {...sparkle} />
        ))}

        {/* Main content */}
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Decorative top */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <span className="text-3xl">✨</span>
            <motion.span
              className="text-4xl"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💝
            </motion.span>
            <span className="text-3xl">✨</span>
          </motion.div>

          {/* Main message card */}
          <motion.div
            className="soft-card rounded-4xl p-6 sm:p-8 md:p-12 lg:p-14 mb-10"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="max-w-3xl mx-auto text-left">
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl text-[#4a3a3a] mb-6"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                Dear Akka,
              </motion.p>

              <GoldenHoverText delay={0.35} className="mb-6">
                You&apos;ve been my guide for as long as I can remember.
                Sometimes through your advice, sometimes through your actions,
                and sometimes even as the voice in my head reminding me what
                the right thing to do is.
              </GoldenHoverText>

              <GoldenHoverText delay={0.45} className="mb-6">
                Over the years, I&apos;ve learned so much just by watching you.
                Not because you sat me down and taught me lessons, but because
                of the way you&apos;ve lived your life.
              </GoldenHoverText>

              <GoldenHoverText delay={0.55} className="mb-6">
                And this year feels exceptionally special. Watching you become
                Jaanu&apos;s mom has been beautiful. Sometimes I still can&apos;t
                believe that the person I was raised with is now raising another
                little person of her own.
              </GoldenHoverText>

              <GoldenHoverText delay={0.65} className="mb-6">
                And I hope that years from now, when Jaanu looks at her mother,
                she sees exactly what I see when I look at my sister: strength,
                kindness, resilience, and a heart that never gives up.
              </GoldenHoverText>

              <GoldenHoverText delay={0.75} className="mb-6">
                Thank you for being someone I&apos;ve always looked up to.
              </GoldenHoverText>

              <GoldenHoverText delay={0.82} className="mb-6">
                Thank you for being my guiding light.
              </GoldenHoverText>

              <GoldenHoverText delay={0.89} className="mb-6">
                And thank God I get to call you my sister.
              </GoldenHoverText>

              <GoldenHoverText delay={0.96} className="mb-6">
                Happy Birthday, Akka ❤️
              </GoldenHoverText>

              <motion.p
                className="text-lg sm:text-xl text-[#5a4545] leading-relaxed italic"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.05 }}
              >
                With all our love, always and forever 💕
              </motion.p>
            </div>
          </motion.div>

          {/* Final message */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gold-readable bottom-gold-fix leading-tight"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              I hope the things you&apos;re working so hard for find their way to
              you.
            </motion.h2>

            <motion.p
              className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold gold-readable bottom-gold-fix"
              initial={{ scale: 0.94, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.95 }}
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
            >
              Happy Birthday Akka ❤️
            </motion.p>
          </motion.div>

          {/* Decorative bottom */}
          <motion.div
            className="mt-12 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
          >
            {["🌸", "✨", "💝", "✨", "🌸"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}