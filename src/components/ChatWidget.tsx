import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm with ${site.businessName}. 👋 Need flooring, handyman repairs, plumbing, or electrical help in ${site.baseCity}? Call or text ${site.phoneDisplay} and I'll get you scheduled.`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated response for demo
    setTimeout(() => {
      const responses = [
        `We handle ${site.services[0].title.toLowerCase()} and ${site.services[2].title.toLowerCase()} with fast response. Want me to set a time?`,
        `${site.accreditationLabel} serving ${site.serviceAreas.join(", ")}. Tell me what you need and where you are.`,
        `We're ${site.hours.toLowerCase()}—call or text ${site.phoneDisplay} and I'll have Michail follow up.`,
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-gold text-primary-foreground p-4 rounded-full shadow-glow hover:scale-110 transition-transform ${
          isOpen ? "hidden" : "flex"
        } items-center gap-2 animate-bounce-gentle`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold pr-2">Chat with {site.businessName}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-elegant overflow-hidden animate-slide-in-right">
          {/* Header */}
          <div className="bg-gradient-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary-foreground">Fast Help</h3>
                <span className="text-xs text-primary-foreground/70">{site.businessName} Assistant</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-gold text-primary-foreground rounded-full hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Powered by AI • Get a free quote today!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
