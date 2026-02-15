import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { siteData } from '@/data/siteData';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const generateResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  const { chatbotInfo, name, location, email, phone, roles, technologies, skills } = siteData;

  // Greeting patterns
  if (lowerInput.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return `Hello! 👋 I'm ${name}'s AI assistant. I can tell you all about ${name} - his skills, experience, projects, and more. What would you like to know?`;
  }

  // Who is he / what kind of person
  if (lowerInput.match(/who is|what kind of person|tell me about|describe|personality|character/)) {
    return `${name} is an ${chatbotInfo.personality}. ${chatbotInfo.summary} He is known for being ${chatbotInfo.traits.slice(0, 3).join(', ')}.`;
  }

  // Name
  if (lowerInput.match(/name|who are you|your name/)) {
    return `His name is ${name}. He's a ${roles[0]} based in ${location}.`;
  }

  // Location
  if (lowerInput.match(/where|location|based|country|city|live/)) {
    return `${name} is based in ${location}. He works with clients globally and is available for remote collaboration.`;
  }

  // Contact information
  if (lowerInput.match(/contact|email|phone|reach|hire|available/)) {
    return `You can reach ${name} at:\n📧 Email: ${email}\n📱 Phone: ${phone}\n\nHe's currently available for freelance projects and collaborations!`;
  }

  // Skills / Technologies / What can he do
  if (lowerInput.match(/skill|technology|tech|stack|programming|code|develop|expertise|what can|languages/)) {
    const topTech = technologies.slice(0, 6).map(t => t.name).join(', ');
    const topSkills = skills.slice(0, 4).map(s => `${s.name} (${s.level}%)`).join(', ');
    return `${name} is highly skilled in:\n\n🛠️ Technologies: ${topTech}\n\n💪 Key Skills: ${topSkills}\n\nHe specializes in Full-Stack Development, Database Design, and AI Integration.`;
  }

  // Roles / What does he do
  if (lowerInput.match(/role|job|profession|occupation|what does he do|position|title/)) {
    return `${name} wears many hats! He is a:\n\n${roles.map(r => `• ${r}`).join('\n')}\n\nHis versatile background allows him to tackle diverse technical challenges.`;
  }

  // Experience
  if (lowerInput.match(/experience|years|how long|background|history/)) {
    return `${name} has ${siteData.stats.yearsExperience}+ years of professional experience. He has completed ${siteData.stats.completedProjects}+ projects and worked with ${siteData.stats.happyClients}+ happy clients worldwide.`;
  }

  // Projects
  if (lowerInput.match(/project|portfolio|work|built|created|developed/)) {
    return `${name} has completed ${siteData.stats.completedProjects}+ projects across various domains including:\n\n• Frontend Development\n• Full-Stack Applications\n• Database Systems\n• AI/ML Projects\n\nCheck out the Projects section to see his work!`;
  }

  // Developer / Programmer specific
  if (lowerInput.match(/developer|programmer|coder|engineer/)) {
    return `Yes! ${name} is a passionate ${roles[0]}. He loves building innovative solutions using modern technologies like React, Next.js, Node.js, and various database systems. He's constantly learning and staying updated with the latest tech trends.`;
  }

  // Innovation / Creative
  if (lowerInput.match(/innovat|creative|unique|special/)) {
    return `${name} is known for his innovative approach to problem-solving. He combines technical excellence with creative thinking to deliver unique solutions that exceed client expectations. Innovation is at the core of everything he does!`;
  }

  // Education / Teaching
  if (lowerInput.match(/teach|education|mentor|learn|course|tutor/)) {
    return `${name} is also an Educator! He's passionate about sharing knowledge and mentoring aspiring developers. He believes in giving back to the community through teaching and knowledge sharing.`;
  }

  // Freelance / Hire
  if (lowerInput.match(/freelance|hire|work together|collaborate|project|job/)) {
    return `${name} is available for freelance projects! 🚀\n\nHe offers:\n• Full-Stack Web Development\n• Database Design & Development\n• AI Integration\n• Technical Consultation\n\nContact him at ${email} to discuss your project!`;
  }

  // Thanks / Appreciation
  if (lowerInput.match(/thank|thanks|appreciate|helpful/)) {
    return `You're welcome! 😊 If you have any more questions about ${name}, feel free to ask. You can also contact him directly at ${email}.`;
  }

  // Default response
  return `I can help you learn more about ${name}! Try asking about:\n\n• His skills and technologies\n• Professional experience\n• Projects he's worked on\n• How to contact him\n• What kind of person he is\n\nWhat would you like to know?`;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! 👋 I'm ${siteData.name}'s AI assistant. Ask me anything about Munir - his skills, experience, projects, or how to get in touch!`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[500px] glass-card rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-primary/10 p-4 flex items-center justify-between border-b border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Ask about Munir</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot ? 'bg-primary/20' : 'bg-secondary'
                    }`}
                  >
                    {message.isBot ? (
                      <Bot size={16} className="text-primary" />
                    ) : (
                      <User size={16} className="text-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-secondary/50 rounded-tl-sm'
                        : 'bg-primary text-primary-foreground rounded-tr-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Munir..."
                  className="flex-1 bg-secondary/50 border border-primary/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
