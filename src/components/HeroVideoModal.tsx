import React, { useEffect } from "react";
import { X } from "lucide-react";

interface HeroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeroVideoModal: React.FC<HeroVideoModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      // Small delay to allow the element to be inserted into DOM
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          if (videoRef.current) {
            // Attempt to autoplay manually if autoPlay attribute was blocked
            videoRef.current
              .play()
              .catch((e) => console.log("Autoplay prevented:", e));
          }
        });
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "auto";
      if (videoRef.current) {
        videoRef.current.pause();
      }
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Matches transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ease-out ${isAnimating ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`relative max-w-4xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl bg-black transform transition-all duration-300 ease-out ${isAnimating ? "scale-100" : "scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>

        <div className="relative w-full bg-black flex justify-center items-center rounded-2xl">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="w-full max-h-[85vh] object-contain rounded-2xl"
          >
            <source src="/demo_vid.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroVideoModal;
