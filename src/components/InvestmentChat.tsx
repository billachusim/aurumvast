import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface InvestmentChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/investment-chat`;

export const InvestmentChat = ({ isOpen, onClose }: InvestmentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to AurumVest. I'm your AI Investment Advisor. How can I help you explore cryptocurrency investment opportunities today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Add empty assistant message to stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message");
      // Remove empty assistant message on error
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.role === "assistant" && !lastMsg.content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-200px)] glass rounded-2xl border border-primary/30 flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground">AI Advisor</h3>
                <p className="text-xs text-muted-foreground">Investment Assistance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-primary/20"
                      : "bg-gradient-to-br from-primary to-gold-light"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary/50 text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.content || (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about investments..."
                className="flex-1 h-10 px-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                variant="premium"
                size="icon"
                className="h-10 w-10"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
