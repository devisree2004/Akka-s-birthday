"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on mount
    audioRef.current = new Audio();
    // You can set a default music file here or let users provide their own
    // audioRef.current.src = "/birthday-music.mp3";
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // If no source is set, show a message
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        // For demo purposes, we'll just toggle the state
        // In production, add your music file to public folder and set the src
        console.log("Add your music file to /public/birthday-music.mp3");
      }
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Click to enable audio playback");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #D4AF37 0%, #F5E6B3 50%, #D4AF37 100%)",
        boxShadow: "0 4px 20px rgba(212, 175, 55, 0.5)",
      }}
      onClick={togglePlay}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={isPlaying ? {
        boxShadow: [
          "0 4px 20px rgba(212, 175, 55, 0.5)",
          "0 4px 30px rgba(212, 175, 55, 0.8)",
          "0 4px 20px rgba(212, 175, 55, 0.5)",
        ],
      } : {}}
      transition={isPlaying ? { duration: 1.5, repeat: Infinity } : {}}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {/* Pulsing ring when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(212, 175, 55, 0.5)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Icon */}
      <span className="text-2xl text-[#4a3a3a]">
        {isPlaying ? "⏸" : "🎵"}
      </span>
    </motion.button>
  );
}
