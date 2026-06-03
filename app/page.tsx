import HeroSection from "@/components/hero-section";
import BirthdayCake from "@/components/birthday-cake";
import ReasonsWeLoveYou from "@/components/reasons-we-love-you";
import MemoryGallery from "@/components/memory-gallery";
import ClosingMessage from "@/components/closing-message";
import MusicButton from "@/components/music-button";

export default function BirthdayPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Interactive Birthday Cake */}
      <BirthdayCake />

      {/* Reasons We Love You */}
      <ReasonsWeLoveYou />

      {/* Memory Gallery */}
      <MemoryGallery />

      {/* Closing Message */}
      <ClosingMessage />

      {/* Floating Music Button */}
      <MusicButton />
    </main>
  );
}
