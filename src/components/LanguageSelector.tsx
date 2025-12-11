import { useEffect } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages?: string; autoDisplay?: boolean },
          element: string
        ) => void;
      };
    };
  }
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const LanguageSelector = () => {
  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((l) => l.code).join(","),
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load script if not already loaded
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const selectLanguage = (langCode: string) => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary gap-2"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-popover border-border z-[100]"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className="cursor-pointer gap-2"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
