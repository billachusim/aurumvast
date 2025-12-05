import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvestmentChat } from "./InvestmentChat";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <InvestmentChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="floating-buttons"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          >
            {/* Back to Top */}
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full glass border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            )}

            {/* Chat/Consultation Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isChatOpen 
                  ? "bg-secondary/80 hover:bg-secondary" 
                  : "bg-gradient-to-br from-primary via-primary to-gold-light hover:shadow-[0_0_30px_hsla(43,74%,49%,0.4)]"
              }`}
            >
              {isChatOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      {isVisible && (
        <motion.div
          key="mobile-cta"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 glass border-t border-primary/30 md:hidden"
        >
          <Button variant="premium" className="w-full" size="lg">
            Start Earning Now
          </Button>
        </motion.div>
      )}
    </>
  );
};
