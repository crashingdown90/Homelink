"use client";

import { useState } from "react";
import { Share2, Heart, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyActionsProps {
  title: string;
  propertyId: string;
}

export function PropertyActions({ title, propertyId }: PropertyActionsProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Add to favorites in localStorage or backend
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        title="Bagikan"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleFavorite}
        title={isFavorited ? "Hapus dari favorit" : "Tambah ke favorit"}
      >
        <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrint}
        title="Cetak"
      >
        <Printer className="h-4 w-4" />
      </Button>
    </div>
  );
}
