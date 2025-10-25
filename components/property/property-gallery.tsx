"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Grid3x3,
  Share2,
  Heart,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  onFavorite?: () => void;
  isFavorited?: boolean;
  className?: string;
}

export function PropertyGallery({
  images,
  title,
  onFavorite,
  isFavorited = false,
  className,
}: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Ensure we have at least one image
  const displayImages = images.length > 0 ? images : ["/placeholder-property.jpg"];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFullscreen) {
        switch (e.key) {
          case "ArrowLeft":
            goToPrevious();
            break;
          case "ArrowRight":
            goToNext();
            break;
          case "Escape":
            setShowFullscreen(false);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFullscreen, currentIndex]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  // Handle image error
  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  // Get image source with error handling
  const getImageSrc = (index: number) => {
    return imageErrors.has(index) ? "/placeholder-property.jpg" : displayImages[index];
  };

  return (
    <>
      <div className={cn("relative group", className)}>
        {/* Main gallery view */}
        <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-2xl bg-muted">
          {/* Current image */}
          <Image
            src={getImageSrc(currentIndex)}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            onError={() => handleImageError(currentIndex)}
          />

          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Navigation arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full">
            {currentIndex + 1} / {displayImages.length}
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={handleShare}
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            {onFavorite && (
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={onFavorite}
                aria-label="Favorite"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isFavorited && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={() => setShowFullscreen(true)}
              aria-label="Fullscreen"
            >
              <Expand className="h-4 w-4" />
            </Button>
            {displayImages.length > 1 && (
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={() => setShowThumbnails(!showThumbnails)}
                aria-label="Show thumbnails"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Dots indicator */}
          {displayImages.length > 1 && displayImages.length <= 10 && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
              {displayImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "transition-all duration-300",
                    idx === currentIndex
                      ? "w-8 h-2 bg-white rounded-full"
                      : "w-2 h-2 bg-white/60 rounded-full hover:bg-white/80"
                  )}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails grid */}
        {showThumbnails && displayImages.length > 1 && (
          <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {displayImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  idx === currentIndex
                    ? "border-brand-gold ring-2 ring-brand-gold ring-offset-2"
                    : "border-transparent hover:border-gray-300"
                )}
              >
                <Image
                  src={getImageSrc(idx)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                  onError={() => handleImageError(idx)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full z-10">
              {currentIndex + 1} / {displayImages.length}
            </div>

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center px-4">
              <Image
                src={getImageSrc(currentIndex)}
                alt={`${title} - Image ${currentIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain"
                onError={() => handleImageError(currentIndex)}
              />
            </div>

            {/* Navigation arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Thumbnails strip */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {displayImages.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={cn(
                        "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                        idx === currentIndex
                          ? "border-white ring-2 ring-white ring-offset-2 ring-offset-black"
                          : "border-white/30 hover:border-white/60"
                      )}
                    >
                      <Image
                        src={getImageSrc(idx)}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        onError={() => handleImageError(idx)}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
