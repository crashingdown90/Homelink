"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickContactButtons() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/6281234567890", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+622112345678";
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="gradient"
        className="flex-1"
        onClick={handleWhatsApp}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={handlePhone}
      >
        <Phone className="h-4 w-4 mr-2" />
        Telepon
      </Button>
    </div>
  );
}
