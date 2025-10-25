"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Building,
  Star,
  Shield,
  Award,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getWhatsAppUrl, getInitials } from "@/lib/utils";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  listingSlug?: string;
  listingTitle?: string;
  className?: string;
  variant?: "default" | "compact";
}

export function AgentCard({
  agent,
  listingSlug,
  listingTitle,
  className,
  variant = "default",
}: AgentCardProps) {
  const [showPhone, setShowPhone] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = listingTitle
      ? `Halo ${agent.name}, saya tertarik dengan properti: ${listingTitle}. Link: ${window.location.origin}/listing/${listingSlug}`
      : `Halo ${agent.name}, saya tertarik untuk berkonsultasi mengenai properti.`;
    
    const whatsappNumber = agent.whatsapp || agent.phone || "";
    const whatsappUrl = getWhatsAppUrl(whatsappNumber, message);
    window.open(whatsappUrl, "_blank");
  };

  // Handle phone click
  const handlePhoneClick = () => {
    if (!showPhone) {
      setShowPhone(true);
      return;
    }
    
    if (agent.phone) {
      window.location.href = `tel:${agent.phone}`;
    }
  };

  // Handle email click
  const handleEmailClick = () => {
    if (agent.email) {
      const subject = listingTitle
        ? `Inquiry: ${listingTitle}`
        : "Property Inquiry";
      window.location.href = `mailto:${agent.email}?subject=${encodeURIComponent(subject)}`;
    }
  };

  // Format phone number for display
  const formatPhoneDisplay = (phone: string) => {
    if (showPhone) return phone;
    // Show partial phone number
    return phone.substring(0, 8) + "****";
  };

  if (variant === "compact") {
    return (
      <div className={cn("bg-card rounded-xl p-4 shadow-sm", className)}>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {agent.avatar && !imageError ? (
              <Image
                src={agent.avatar}
                alt={agent.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-brand-gold">
                  {getInitials(agent.name)}
                </span>
              </div>
            )}
            {agent.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{agent.name}</h4>
            {agent.office && (
              <p className="text-xs text-muted-foreground truncate">{agent.office}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {agent.whatsapp && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={handleWhatsAppClick}
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            )}
            {agent.phone && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={handlePhoneClick}
                aria-label="Phone"
              >
                <Phone className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("bg-card rounded-2xl shadow-sm overflow-hidden", className)}>
      {/* Header with gradient */}
      <div className="relative h-20 bg-gradient-to-r from-brand-navy to-brand-electric-blue-1">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-12 mb-4">
          {agent.avatar && !imageError ? (
            <Image
              src={agent.avatar}
              alt={agent.name}
              width={96}
              height={96}
              className="rounded-full border-4 border-white shadow-lg object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-24 h-24 bg-brand-gold rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {getInitials(agent.name)}
              </span>
            </div>
          )}
          
          {/* Verified badge */}
          {agent.verified && (
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <Shield className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Agent info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">{agent.name}</h3>
          
          {agent.office && (
            <div className="flex items-center justify-center gap-1 mt-1 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{agent.office}</span>
            </div>
          )}

          {/* Rating */}
          {agent.rating && agent.totalReviews !== undefined && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{agent.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({agent.totalReviews} ulasan)
              </span>
            </div>
          )}

          {/* Experience */}
          {agent.yearsOfExperience && (
            <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{agent.yearsOfExperience} tahun pengalaman</span>
            </div>
          )}

          {/* Specializations */}
          {agent.specializations && agent.specializations.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {agent.specializations.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-accent text-xs rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Contact buttons */}
        <div className="space-y-2">
          {/* WhatsApp */}
          {agent.whatsapp && (
            <Button
              variant="gradient"
              className="w-full"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}

          {/* Phone */}
          {agent.phone && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePhoneClick}
            >
              <Phone className="h-4 w-4 mr-2" />
              {formatPhoneDisplay(agent.phone)}
            </Button>
          )}

          {/* Email */}
          {agent.email && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleEmailClick}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          )}

          {/* Request callback */}
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              // This would open the contact form
              const event = new CustomEvent("openContactForm", {
                detail: { agentName: agent.name },
              });
              window.dispatchEvent(event);
            }}
          >
            Minta Dihubungi
          </Button>
        </div>

        {/* License */}
        {agent.licenseNumber && (
          <div className="mt-4 pt-4 border-t text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Award className="h-3 w-3" />
              <span>REI: {agent.licenseNumber}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
