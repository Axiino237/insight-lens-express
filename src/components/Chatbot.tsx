import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Trash2, Phone, Mail } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I am your First Step Assistant. Ask me anything about our services (e.g., Stall Fabrication, Brand Activation, Corporate Events, Weddings), or click one of the quick options below!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot thinking and reply
    setTimeout(() => {
      const replyText = matchKeyword(text);
      setMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
    }, 450);
  };

  const handleClear = () => {
    setMessages([
      {
        sender: "bot",
        text: "Chat cleared! How can I help you with our services today?",
      },
    ]);
  };

  const matchKeyword = (input: string): string => {
    const text = input.toLowerCase().trim();

    if (text === "hi" || text === "hello" || text === "hey" || text === "who are you" || text.includes("help") || text === "greetings") {
      return "Hello! I am your First Step Assistant. I can help you with details about our services. Ask me about Stall Fabrication, Brand Activation, Corporate Events, or any other service!";
    }
    if (text.includes("how many service") || text.includes("what service") || text.includes("list") || text.includes("what do you do") || text.includes("all service") || text.includes("your service")) {
      return "We provide 7 key brand experience & event services:\n\n1. 🛠️ **Stall Fabrication** (Exhibition booths)\n2. ⚡ **Brand Activation** (Pop-ups & takeovers)\n3. 🏢 **Corporate Events** (Conferences & summits)\n4. ✈️ **MICE** (Incentive travel & global exhibitions)\n5. 💍 **Weddings & Celebrations** (Bespoke weddings)\n6. 🎬 **Creative & Production** (Stage design & AV)\n7. 🌐 **Digital Solutions** (Virtual & hybrid events)\n\nWhich one would you like to know more about?";
    }
    if (text.includes("stall") || text.includes("fabricat") || text.includes("booth") || text.includes("exhibit")) {
      return "We design and construct premium exhibition stalls, promotional booths, and 3D display layouts that capture attention and drive customer engagement.";
    }
    if (text.includes("brand") || text.includes("activation") || text.includes("pop-up") || text.includes("takeover") || text.includes("marketing") || text.includes("influencer") || text.includes("promot")) {
      return "We create high-impact brand activations, experiential pop-ups, mall takeovers, and influencer ignitions that connect your brand with your audience.";
    }
    if (text.includes("corporate") || text.includes("event") || text.includes("conference") || text.includes("summit") || text.includes("town-hall") || text.includes("townhall") || text.includes("annual") || text.includes("r&r") || text.includes("reward") || text.includes("meet")) {
      return "We manage conferences, summits, town halls, annual days, reward & recognition programs, and partner meets with cinematic precision and flawless execution.";
    }
    if (text.includes("mice") || text.includes("incentive") || text.includes("travel") || text.includes("tour") || text.includes("global") || text.includes("world") || text.includes("inter")) {
      return "We provide comprehensive MICE planning, incentive travel programs, and international corporate gatherings with full logistics and operations.";
    }
    if (text.includes("wedding") || text.includes("marry") || text.includes("marriage") || text.includes("celebrat") || text.includes("destination") || text.includes("party") || text.includes("reception")) {
      return "We craft once-in-a-lifetime weddings, anniversary celebrations, and private parties with bespoke design, destination planning, and flawless coordination.";
    }
    if (text.includes("creative") || text.includes("producti") || text.includes("stage") || text.includes("av") || text.includes("audio") || text.includes("video") || text.includes("film") || text.includes("script") || text.includes("design") || text.includes("light") || text.includes("sound")) {
      return "Our in-house production and creative team covers stage design, AV setups, scripting, corporate videos, and full-scale technical design.";
    }
    if (text.includes("digital") || text.includes("hybrid") || text.includes("virtual") || text.includes("stream") || text.includes("online") || text.includes("web") || text.includes("immers")) {
      return "We offer professional web streaming, virtual venue development, hybrid conference tools, and custom digital interactive setups.";
    }

    if (text.includes("price") || text.includes("cost") || text.includes("charge") || text.includes("budget") || text.includes("quote") || text.includes("rate") || text.includes("fee")) {
      return "Our service pricing is customized based on your project scale, location, design complexity, and fabrication materials. Please reach out to customer support at +91 44 3153 6968 or email us at hello@thefirststepsolutions.co for a customized quote!";
    }
    if (text.includes("location") || text.includes("address") || text.includes("office") || text.includes("where are you") || text.includes("chennai") || text.includes("mumbai") || text.includes("dubai") || text.includes("bengaluru")) {
      return "We are headquartered in Chennai (Ramapuram), with offices in Mumbai, Bengaluru, and Dubai. We plan, execute, and deliver events globally! You can find our main address under 'Visit' on our contact page.";
    }
    if (text.includes("contact") || text.includes("phone") || text.includes("number") || text.includes("call") || text.includes("email") || text.includes("support") || text.includes("reach")) {
      return "You can contact our support team at +91 44 3153 6968 or email hello@thefirststepsolutions.co. We are active Mon-Sat, 9:30 AM to 6:30 PM IST, and respond within 24 hours!";
    }

    return "I couldn't find a direct match for your request about our services. Please call customer support at +91 44 3153 6968 or email us at hello@thefirststepsolutions.co for details!";
  };

  const quickPrompts = [
    "Stall Fabrication",
    "Brand Activation",
    "Corporate Events",
    "Weddings",
    "Digital Solutions",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="mb-4 w-[340px] md:w-[380px] h-[500px] rounded-3xl glass border border-border/50 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* HEADER */}
          <div className="p-4 bg-background/40 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
                  FS
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">First Step Assistant</h4>
                <p className="text-[10px] text-muted-foreground">Online · Answers instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Clear Chat"
                className="p-2 text-muted-foreground hover:text-brand-magenta rounded-lg hover:bg-white/5 transition"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize"
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* MESSAGES CONTAINER */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === "user"
                      ? "bg-brand-magenta text-white rounded-tr-none shadow-glow-sm"
                      : "bg-input border border-border text-foreground rounded-tl-none"
                  } whitespace-pre-line`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPTS */}
          <div className="px-4 py-2 bg-background/10 border-t border-border/20 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-border hover:border-brand-cyan hover:text-brand-cyan bg-background/40 hover:bg-brand-cyan/5 transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 bg-background/40 border-t border-border/40 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about our services..."
              className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-magenta placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white hover:opacity-90 disabled:opacity-50 transition"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-brand flex items-center justify-center text-white shadow-glow hover:scale-105 transition-all duration-300 focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
