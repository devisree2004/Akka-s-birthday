"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "/1.jpeg", alt: "Memory 1", aspectRatio: "portrait" },
  { id: 2, src: "/2.jpeg", alt: "Memory 2", aspectRatio: "portrait" },
  { id: 3, src: "/3.jpeg", alt: "Memory 3", aspectRatio: "portrait" },
  { id: 4, src: "/4.jpeg", alt: "Memory 4", aspectRatio: "portrait" },
  { id: 5, src: "/5.jpeg", alt: "Memory 5", aspectRatio: "portrait" },
  { id: 6, src: "/6.jpeg", alt: "Memory 6", aspectRatio: "portrait" },
  { id: 7, src: "/7.jpeg", alt: "Memory 7", aspectRatio: "portrait" },
  { id: 8, src: "/8.jpeg", alt: "Memory 8", aspectRatio: "portrait" },
];

const FloatingSparkle = ({
  delay,
  x,
  y,
}: {
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute text-[#D4AF37] opacity-40 pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      opacity: [0.2, 0.6, 0.2],
      scale: [0.8, 1.3, 0.8],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    ✨
  </motion.div>
);

const GalleryImageComponent = ({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) => {
  const getAspectClass = () => {
    switch (image.aspectRatio) {
      case "portrait":
        return "row-span-2";
      case "landscape":
        return "col-span-2";
      default:
        return "";
    }
  };

  return (
    <motion.button
      type="button"
      className={`relative cursor-pointer overflow-hidden rounded-2xl ${getAspectClass()}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Open ${image.alt}`}
    >
      <div
        className="relative w-full h-full min-h-50 sm:min-h-62.5 bg-white/40"
        style={{
          boxShadow: "0 4px 20px rgba(248, 200, 220, 0.3)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            border: "3px solid transparent",
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(245, 230, 179, 0.35)) border-box",
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(212, 175, 55, 0.18) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.button>
  );
};

const Lightbox = ({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl hover:text-[#D4AF37] transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
        type="button"
      >
        ×
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#D4AF37] transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        type="button"
      >
        ‹
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#D4AF37] transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        type="button"
      >
        ›
      </button>

      <motion.div
        className="relative max-w-5xl w-full h-[80vh]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -inset-3 rounded-[22px]"
          style={{
            background:
              "linear-gradient(135deg, #D4AF37 0%, #F5E6B3 50%, #D4AF37 100%)",
            padding: "4px",
          }}
        >
          <div className="w-full h-full bg-black rounded-[18px]" />
        </div>

        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized
            className="object-contain rounded-[18px]"
            sizes="100vw"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function MemoryGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const sparkles = [
    { delay: 0, x: "10%", y: "20%" },
    { delay: 1, x: "85%", y: "15%" },
    { delay: 2, x: "20%", y: "70%" },
    { delay: 1.5, x: "75%", y: "80%" },
    { delay: 0.5, x: "50%", y: "10%" },
    { delay: 2.5, x: "90%", y: "50%" },
  ];

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-linear-to-b from-[#FFE4EC] to-[#FFF0F5]">
      {sparkles.map((sparkle, i) => (
        <FloatingSparkle key={i} {...sparkle} />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient mb-4">
            Cherished Memories
          </h2>

          <p
            className="text-[#5a4a4a] text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            A collection of beautiful moments we have shared together
          </p>

          <motion.div
            className="mx-auto w-24 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <GalleryImageComponent
              key={image.id}
              image={image}
              index={index}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            image={galleryImages[selectedImage]}
            onClose={() => setSelectedImage(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}