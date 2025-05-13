
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define translations for common phrases
const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    cases: "Cases",
    schedule: "Schedule",
    analytics: "Analytics",
    virtualCourtroom: "Virtual Courtroom",
    personal: "Personal",
    activeCases: "Total Active Cases",
    resolvedCases: "Cases Resolved",
    upcomingHearings: "Upcoming Hearings",
    avgDuration: "Avg. Case Duration",
    recentCases: "Recent Cases",
    quickActions: "Quick Actions",
    scheduledHearings: "Scheduled Hearings",
    newCase: "New Case",
    scheduleMeeting: "Schedule Meeting",
    uploadDocuments: "Upload Documents",
    searchPlaceholder: "Search...",
    welcome: "Welcome back",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    cases: "केस",
    schedule: "अनुसूची",
    analytics: "विश्लेषण",
    virtualCourtroom: "आभासी न्यायालय",
    personal: "व्यक्तिगत",
    activeCases: "कुल सक्रिय मामले",
    resolvedCases: "हल किए गए मामले",
    upcomingHearings: "आगामी सुनवाई",
    avgDuration: "औसत केस अवधि",
    recentCases: "हालिया मामले",
    quickActions: "त्वरित कार्रवाई",
    scheduledHearings: "अनुसूचित सुनवाई",
    newCase: "नया केस",
    scheduleMeeting: "बैठक का समय निर्धारित करें",
    uploadDocuments: "दस्तावेज़ अपलोड करें",
    searchPlaceholder: "खोजें...",
    welcome: "वापसी पर स्वागत है",
  },
  // Additional languages would be added here
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    return savedLang || "en";
  });

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    // If the key doesn't exist, return the key itself
    return key;
  };

  const contextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
