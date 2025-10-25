// Google Analytics 4 event tracking
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Check if analytics should be loaded
export const isAnalyticsEnabled = (): boolean => {
  return typeof window !== "undefined" && 
         !!GA_TRACKING_ID && 
         process.env.NODE_ENV === "production";
};

// Page view tracking
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag("config", GA_TRACKING_ID!, {
    page_path: url,
  });
};

// Event tracking
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for Homelink
export const trackEvent = {
  // Search events
  search: (params: any) => {
    event({
      action: "search",
      category: "engagement",
      label: JSON.stringify(params),
    });
  },

  // Property view events
  viewProperty: (propertyId: string, propertyTitle: string) => {
    event({
      action: "view_property",
      category: "engagement",
      label: propertyTitle,
      value: 1,
    });
  },

  // Lead events
  submitLead: (propertyId?: string) => {
    event({
      action: "submit_lead",
      category: "conversion",
      label: propertyId || "general",
      value: 1,
    });
  },

  // Contact events
  contactAgent: (method: "whatsapp" | "phone" | "email") => {
    event({
      action: "contact_agent",
      category: "engagement",
      label: method,
      value: 1,
    });
  },

  // Favorite events
  addFavorite: (propertyId: string) => {
    event({
      action: "add_favorite",
      category: "engagement",
      label: propertyId,
      value: 1,
    });
  },

  removeFavorite: (propertyId: string) => {
    event({
      action: "remove_favorite",
      category: "engagement",
      label: propertyId,
      value: 1,
    });
  },

  // Filter events
  applyFilter: (filterType: string, filterValue: string) => {
    event({
      action: "apply_filter",
      category: "engagement",
      label: `${filterType}:${filterValue}`,
    });
  },

  // Map events
  searchInArea: (bounds: any) => {
    event({
      action: "search_in_area",
      category: "engagement",
      label: JSON.stringify(bounds),
    });
  },

  // Share events
  shareProperty: (propertyId: string, method: string) => {
    event({
      action: "share",
      category: "engagement",
      label: `${propertyId}:${method}`,
    });
  },

  // Gallery events
  viewGallery: (propertyId: string, imageCount: number) => {
    event({
      action: "view_gallery",
      category: "engagement",
      label: propertyId,
      value: imageCount,
    });
  },
};

// Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export const fbEvent = {
  pageView: () => {
    if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
      window.fbq("track", "PageView");
    }
  },

  viewContent: (contentId: string, contentType: string, value?: number) => {
    if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
      window.fbq("track", "ViewContent", {
        content_ids: [contentId],
        content_type: contentType,
        value: value,
        currency: "IDR",
      });
    }
  },

  search: (searchString: string) => {
    if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
      window.fbq("track", "Search", {
        search_string: searchString,
      });
    }
  },

  lead: (value?: number) => {
    if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
      window.fbq("track", "Lead", {
        value: value || 1,
        currency: "IDR",
      });
    }
  },

  contact: () => {
    if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
      window.fbq("track", "Contact");
    }
  },

  customEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
      window.fbq("trackCustom", eventName, parameters);
    }
  },
};

// Declare global types
declare global {
  interface Window {
    gtag: any;
    fbq: any;
  }
}

// Analytics consent management
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const consent = localStorage.getItem("analytics_consent");
  return consent === "true";
};

export const setAnalyticsConsent = (consent: boolean) => {
  if (typeof window === "undefined") return;
  
  localStorage.setItem("analytics_consent", consent.toString());
  
  if (consent) {
    // Initialize analytics if consent is given
    pageview(window.location.pathname);
    fbEvent.pageView();
  }
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return;

  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Log to analytics
      if (entry.entryType === "largest-contentful-paint") {
        event({
          action: "LCP",
          category: "Web Vitals",
          value: Math.round(entry.startTime),
        });
      }
    }
  });

  observer.observe({ entryTypes: ["largest-contentful-paint"] });

  // First Input Delay
  if ("PerformanceEventTiming" in window) {
    const fid = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        event({
          action: "FID",
          category: "Web Vitals",
          value: Math.round(fidEntry.processingStart - entry.startTime),
        });
      }
    });
    fid.observe({ entryTypes: ["first-input"] });
  }

  // Cumulative Layout Shift
  let clsValue = 0;
  let clsEntries: any[] = [];
  
  const cls = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const clsEntry = entry as any;
      if (!clsEntry.hadRecentInput) {
        const firstSessionEntry = clsEntries[0];
        const lastSessionEntry = clsEntries[clsEntries.length - 1];
        
        if (entry.startTime - lastSessionEntry.startTime < 1000 && 
            entry.startTime - firstSessionEntry.startTime < 5000) {
          clsEntries.push(entry);
          clsValue += clsEntry.value;
        } else {
          clsEntries = [entry];
          clsValue = clsEntry.value;
        }
      }
    }
  });
  
  cls.observe({ entryTypes: ["layout-shift"] });

  // Log CLS when page is about to unload
  window.addEventListener("beforeunload", () => {
    event({
      action: "CLS",
      category: "Web Vitals",
      value: Math.round(clsValue * 1000),
    });
  });
};

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  if (!isAnalyticsEnabled()) return;

  event({
    action: "exception",
    category: "error",
    label: `${error.message} | ${errorInfo?.componentStack || error.stack}`,
  });
};
