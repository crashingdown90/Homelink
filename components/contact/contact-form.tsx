"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Turnstile widget script
declare global {
  interface Window {
    turnstile: any;
  }
}

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().min(10, "Nomor telepon tidak valid").optional().or(z.literal("")),
  message: z.string().max(1000, "Pesan maksimal 1000 karakter").optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan",
  }),
}).refine((data) => data.email || data.phone, {
  message: "Email atau nomor telepon harus diisi",
  path: ["email"],
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  listingSlug?: string;
  listingTitle?: string;
  subject?: string;
  agentName?: string;
  onSuccess?: () => void;
  className?: string;
}

export function ContactForm({
  listingSlug,
  listingTitle,
  subject = "general",
  agentName,
  onSuccess,
  className,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      consent: false,
    },
  });

  // Load Turnstile script
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadTurnstile = () => {
      if (window.turnstile) {
        initTurnstile();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => initTurnstile();
      document.head.appendChild(script);
    };

    const initTurnstile = () => {
      if (!turnstileRef.current || widgetIdRef.current) return;

      try {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          size: "normal",
        });
      } catch (error) {
        console.error("Failed to initialize Turnstile:", error);
      }
    };

    loadTurnstile();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  // Listen for openContactForm event
  useEffect(() => {
    const handleOpenContactForm = (event: CustomEvent) => {
      // Could pre-fill form or focus first input
      const firstInput = document.querySelector<HTMLInputElement>("#contact-name");
      firstInput?.focus();
    };

    window.addEventListener("openContactForm", handleOpenContactForm as any);
    return () => {
      window.removeEventListener("openContactForm", handleOpenContactForm as any);
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      toast({
        title: "Verifikasi diperlukan",
        description: "Silakan selesaikan verifikasi keamanan",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          listingSlug,
          subject,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setSubmitStatus("success");
        toast({
          title: "Pesan terkirim!",
          description: "Terima kasih, kami akan segera menghubungi Anda.",
          variant: "success",
        });
        
        // Reset form
        reset();
        
        // Reset Turnstile
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        setTurnstileToken("");
        
        // Call success callback
        onSuccess?.();
      } else {
        setSubmitStatus("error");
        
        if (result.error === "rate_limited") {
          toast({
            title: "Terlalu banyak permintaan",
            description: "Silakan tunggu beberapa saat sebelum mencoba lagi.",
            variant: "destructive",
          });
        } else if (result.error === "captcha_failed") {
          toast({
            title: "Verifikasi gagal",
            description: "Silakan coba lagi dengan verifikasi yang baru.",
            variant: "destructive",
          });
          // Reset Turnstile
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
          setTurnstileToken("");
        } else if (result.details) {
          // Handle validation errors
          Object.entries(result.details.fieldErrors || {}).forEach(([field, errors]: [string, any]) => {
            setError(field as keyof ContactFormData, {
              message: errors?.[0] || "Invalid field",
            });
          });
        } else {
          toast({
            title: "Terjadi kesalahan",
            description: "Silakan coba lagi nanti.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      toast({
        title: "Terjadi kesalahan",
        description: "Tidak dapat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("bg-card rounded-2xl p-6 shadow-sm", className)}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          {listingTitle ? "Tanyakan Tentang Properti Ini" : "Hubungi Kami"}
        </h3>
        {agentName && (
          <p className="text-sm text-muted-foreground mt-1">
            Agen: {agentName}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
            Nama <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="contact-name"
              type="text"
              {...register("name")}
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent",
                errors.name && "border-red-500"
              )}
              placeholder="Nama lengkap"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="contact-email"
              type="email"
              {...register("email")}
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent",
                errors.email && "border-red-500"
              )}
              placeholder="email@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="contact-phone"
              type="tel"
              {...register("phone")}
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent",
                errors.phone && "border-red-500"
              )}
              placeholder="08123456789"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Email atau nomor telepon harus diisi
          </p>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
            Pesan
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <textarea
              id="contact-message"
              {...register("message")}
              rows={4}
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none",
                errors.message && "border-red-500"
              )}
              placeholder={
                listingTitle
                  ? `Saya tertarik dengan properti ${listingTitle}...`
                  : "Tulis pesan Anda di sini..."
              }
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            type="checkbox"
            {...register("consent")}
            className="mt-1 w-4 h-4 text-brand-gold focus:ring-brand-gold rounded"
          />
          <label htmlFor="contact-consent" className="text-sm text-muted-foreground">
            Saya setuju untuk dihubungi mengenai properti ini dan menyetujui{" "}
            <a href="/legal/privacy" className="text-brand-gold hover:underline">
              kebijakan privasi
            </a>{" "}
            dan{" "}
            <a href="/legal/terms" className="text-brand-gold hover:underline">
              syarat & ketentuan
            </a>
            .
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs text-red-500">{errors.consent.message}</p>
        )}

        {/* Turnstile */}
        <div ref={turnstileRef} className="flex justify-center" />

        {/* Submit button */}
        <Button
          type="submit"
          variant="gradient"
          className="w-full"
          disabled={isSubmitting || !turnstileToken}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim Pesan"
          )}
        </Button>

        {/* Success message */}
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">Pesan berhasil dikirim!</p>
            </div>
            <p className="mt-1 text-sm text-green-600 dark:text-green-500">
              Kami akan menghubungi Anda dalam 24 jam.
            </p>
          </div>
        )}

        {/* Error message */}
        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">Gagal mengirim pesan</p>
            </div>
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              Silakan coba lagi atau hubungi kami langsung.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
