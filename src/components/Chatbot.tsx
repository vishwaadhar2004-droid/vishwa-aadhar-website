import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Phone, Mail, MapPin, CheckCircle2, Loader2, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const getClientFallbackValue = (userMessage: string): string => {
  const msg = userMessage.toLowerCase().trim();

  // 1. Founder / owner / ceo
  if (msg.includes("sakshi") || msg.includes("parekh") || msg.includes("founder") || msg.includes("ceo") || msg.includes("owner") || msg.includes("chief")) {
    return `👩‍💼 **Sakshi .S. Parekh — Founder & CEO**:
Sakshi leads Vishwa Aadhar Enterprises with a dedicated green-tech vision. She focuses on corporate strategy, sustainable development, financial structuring, and circular economy leadership—guiding our team with passion toward future-proof global biotechnology impacts!`;
  }

  // 2. Advisor / Akshay
  if (msg.includes("akshay") || msg.includes("patole") || msg.includes("advisor") || msg.includes("aerospace")) {
    return `👨‍🚀 **Akshay Uday Patole — Advisor**:
An Aerospace Engineering graduate from Karunya Institute of Technology and Sciences, Akshay supports Vishwa Aadhar with deep analytical and technical insights. His structured scientific expertise helps model our biomineralization research and pilot scaling models!`;
  }

  // 3. Web Developer / Ashish
  if (msg.includes("ashish") || msg.includes("barele") || msg.includes("web") || msg.includes("developer") || msg.includes("programmer") || msg.includes("site") || msg.includes("engineer")) {
    return `💻 **Ashish .K. Barele — Web Developer**:
Ashish is the highly skilled lead developer behind Vishwa Aadhar's clean, high-fidelity website interfaces and chatbots. He designs, optimizes, and coordinates our global digital client experiences and highly responsive web applications!`;
  }

  // 4. Biofertilizer / Agriculture / Crops
  if (msg.includes("fertilizer") || msg.includes("organic") || msg.includes("soil") || msg.includes("compost") || msg.includes("crop") || msg.includes("sugarcane") || msg.includes("kheti") || msg.includes("agriculture") || msg.includes("khad") || msg.includes("growth") || msg.includes("horticulture") || msg.includes("cotton") || msg.includes("rejuvenator") || msg.includes("fertiliser")) {
    return `🌱 **Organic Biofertilizers — Rejuvenating Soil Naturally**:
Our biofertilizer is carefully crafted from organic biological wastes using advanced microbial treatments to restore soil vitality:
• **Packed with Vitality**: Loaded with vital plant macronutrients, natural beneficial microbes, active enzymes, and rich organic carbon.
• **Excellent for Crops**: Recommended for cash crops (sugarcane, cotton), high-yield horticulture (fruits, vegetables, flowers), pulses, and organic farming.
• **Long-term Benefits**: Substantially enhances soil water retention capacity, improves root penetration depth, and significantly reduces reliance on toxic chemical fertilizers.`;
  }

  // 5. Bio-Cement Bricks / MICP / Construction
  if (msg.includes("brick") || msg.includes("cement") || msg.includes("micp") || msg.includes("biomineralization") || msg.includes("construction") || msg.includes("building material") || msg.includes("brickmaker") || msg.includes("it") || msg.includes("int") || msg.includes("stone") || msg.includes("kiln") || msg.includes("civil")) {
    return `🧱 **Bio-Cement Bricks — The Future of Construction**:
Vishwa Aadhar’s standard Bio-Cement Bricks represent a breakthrough in low-embodied carbon structural materials:
• **High Recycled Value**: Composed of over 70% safely recycled industrial and construction aggregates, keeping massive waste volumes out of landfills.
• **The Biological Way (MICP)**: Built via **Microbial Induced Calcite Precipitation (MICP)**, where eco-safe microbes form calcite crystals that bind materials naturally, mimicking natural coral-reef structures.
• **Exceptional Parameters**: Delivers heavy-duty compressive strength, outstanding passive thermal resistance, and acoustical dampening properties for eco-friendly modern architectures.`;
  }

  // 6. R&D / Laboratory Services
  if (msg.includes("research") || msg.includes("r&d") || msg.includes("toxic") || msg.includes("pilot") || msg.includes("lab") || msg.includes("laboratory") || msg.includes("science") || msg.includes("biotech") || msg.includes("waste auditing") || msg.includes("bespoke") || msg.includes("testing")) {
    return `🔬 **Waste-to-Product R&D Services**:
We help modern industries convert challenging environmental emissions or by-products into legal, high-value commercial solutions:
• **Bespoke Biotechnology formulation**: From precise waste stream chemical auditing and bench testing, to complete formulation development and pilot scalability testing.
• **Circular Integration**: We engineer specific bio-reactions, composting cycles, or aggregate-neutralization programs matching your corporate environmental compliance frameworks.`;
  }

  // 7. ESG Consulting / Sustainability / Compliance
  if (msg.includes("consult") || msg.includes("esg") || msg.includes("audit") || msg.includes("co2") || msg.includes("carbon") || msg.includes("sustainability consulting") || msg.includes("tracking") || msg.includes("reporting") || msg.includes("strategy") || msg.includes("compliance")) {
    return `📈 **ESG & Sustainability Advisory Services**:
Transform your traditional linear business operations into compliant, eco-efficient circular models:
• **Carbon Tracking**: Creating precise, data-backed models for measuring and declaring carbon footprint variations.
• **Corporate ESG Compliance**: Comprehensive audits and strategy guidelines designed to meet domestic and global green metrics, boosting brand value.`;
  }

  // 8. Green Building PASSIVE Designs
  if (msg.includes("building") || msg.includes("green build") || msg.includes("passive design") || msg.includes("rain") || msg.includes("harvest") || msg.includes("greywater") || msg.includes("ventilation") || msg.includes("daylighting") || msg.includes("renew")) {
    return `🏡 **Green Building & Passive Design Solutions**:
Sustainable civil layouts engineering comfortable living spaces with highly optimized energy signatures:
• **Passive Comfort**: Passive wind-ventilation, daylighting, and thermal-comfort civil mockups prioritizing natural heat/cool shifts.
• **Water Security**: Custom local rainwater harvesting models, integrated greywater filtration systems, and low-embodied carbon construction materials recommendation.`;
  }

  // 9. Location / Head Office / Address
  if (msg.includes("location") || msg.includes("address") || msg.includes("where") || msg.includes("office") || msg.includes("head") || msg.includes("badlapur") || msg.includes("maharashtra") || msg.includes("pincode") || msg.includes("pata") || msg.includes("timing") || msg.includes("reach") || msg.includes("map")) {
    return `📍 **Vishwa Aadhar Enterprises Head Office**:
Our primary administrative facility and research coordinator is located at:
• **Address Hub**: At. Badlapur, pincode-421503, Maharashtra, India.
• **Hours of Support**: Mon - Sat | 9:30 AM to 6:30 PM (IST)
• **Primary Email**: [vishwaadhar2004@gmail.com](mailto:vishwaadhar2004@gmail.com)
• **Phone Desk**: [+91 73979 86935](tel:+917397986935)
• **Quick Reach**: Feel free to send a direct message natively via the **Send Message** tab right above!`;
  }

  // 10. Pricing / Cost / Order / Buy
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("rate") || msg.includes("quote") || msg.includes("buy") || msg.includes("purchase") || msg.includes("order") || msg.includes("bhav") || msg.includes("estimate") || msg.includes("deal")) {
    return `💰 **Price Quotes & Procurement Guidelines**:
At Vishwa Aadhar Enterprises, we provide tailor-made commercial deals depending on bulk demand and technical requirements:
• **Bio-Cement Bricks**: Custom pricing depends on aggregate mix selection, shipment distance from Maharashtra, and volume.
• **Organic Biofertilizers**: Highly competitive commercial rates per metric ton for agricultural cooperatives, sugar factories, and gardens.
• **R&D & ESG Audits**: Tailored contracts based on chemical analysis cycles and report requirements.

✍️ To obtain a customized formal quote, please submit your requirements under the **Send Message** tab in this panel, or email our support desk at [**vishwaadhar2004@gmail.com**](mailto:vishwaadhar2004@gmail.com)!`;
  }

  // 11. What is Vishwa Aadhar / About / Profile / Introduction / "what is"
  if (msg.includes("what is") || msg.includes("who is") || msg.includes("vishwaaadhar") || msg.includes("vishwa aadhar") || msg.includes("vishwa adhar") || msg.includes("about") || msg.includes("introduce") || msg.includes("introduction") || msg.includes("profile") || msg.includes("who are you")) {
    return `🌿 **About Vishwa Aadhar Enterprises**:
Vishwa Aadhar Enterprises is a leading sustainable biotechnology and green engineering pioneer dedicated to the circular economy. Based in Badlapur, Maharashtra, India, we innovate biological structures and agricultural soil rejuvenations.

**Our Core Strategic Focus**:
• **Biomineralization**: Using eco-safe microbial technologies (like MICP) to naturally bind industrial waste aggregates.
• **Waste Valorization**: Diverting over 70% of solid industrial and construction aggregates away from landfills into high-strength bio-cement blocks.
• **Soil Revitalization**: Fighting soil depletion using pure organic buffers loaded with beneficial micronutrients.
• **Core Team**: Led by Sakshi .S. Parekh (Founder & CEO), scientific advisor Akshay Patole, and full stack developer Ashish .K. Barele.`;
  }

  // 12. What does Vishwa Aadhar offer / give / provide?
  if (msg.includes("give") || msg.includes("offer") || msg.includes("provide") || msg.includes("product") || msg.includes("service") || msg.includes("sell") || msg.includes("catalog") || msg.includes("deliverable") || msg.includes("feature") || msg.includes("benefit") || msg.includes("work")) {
    return `🛍️ **Vishwa Aadhar Enterprises Offerings & Products**:
We innovate, manufacture, and consult across five key sustainable domains:

1. 🧱 **Bio-Cement Bricks**: Zero-kiln, biological (MICP) masonry blocks made from over 70% recycled industrial aggregates.
2. 🌱 **Organic Biofertilizers**: Highly active microbial formulations that load the soil with organic carbon, macros, and beneficial microflora.
3. 🔬 **Waste-to-Product R&D**: Commercial testing and pilot modeling to shift industrial residues into valuable assets.
4. 📈 **Sustainability Consulting**: Full corporate ESG tracking, compliance frameworks, and carbon index reports.
5. 🏡 **Passive Green Architecture**: Low-embodied energy civil mockups, active wind chimneys, and decentralized greywater filters.

✉️ To request custom catalogs or pricing quotes, send a message under the **Send Message** tab in this helper!`;
  }

  // 13. Environment / Pollution / Recycled / Mission / Vision
  if (msg.includes("waste") || msg.includes("environment") || msg.includes("sustainability") || msg.includes("recycle") || msg.includes("eco") || msg.includes("green") || msg.includes("carbon") || msg.includes("co2") || msg.includes("pollution") || msg.includes("industrial") || msg.includes("mission") || msg.includes("vision") || msg.includes("motive") || msg.includes("clean") || msg.includes("circular")) {
    return `🌍 **Our Sustainable Planet Mission**:
Vishwa Aadhar’s core focus is the "Circular Economy" — restoring natural resources and transforming industrial wastes into high-value civil materials and organic carbon soil buffers:
• **Resource Recovery**: Diverting solid waste streams safely, converting aggregate waste into premium Bio-Cement Bricks.
• **Biological Revitalization**: Reclaiming agricultural soils polluted by toxic chemical fertilizers back to biological wellness.
• **Low Carbon Footprint**: Promoting zero-kiln biocement formation (MICP) protecting biodiversity.`;
  }

  // 14. Hello / Greetings / Support / Contact
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste") || msg.includes("greetings") || msg.includes("sup") || msg.includes("how are you") || msg.includes("help") || msg.includes("assistant") || msg.includes("welcome")) {
    return `Namaste! Welcome to **Vishwa Aadhar Enterprises** AI assistant chatbot. 🌿

I am your guide to sustainable biotechnology, the circular economy, and green architectures.
How can I assist you today? You can ask me questions about:
• 🧱 Our **Bio-Cement Bricks** (MICP low-carbon building materials)
• 🌱 Our **Organic Biofertilizers** (enhancing soil vitality)
• 🔬 Our **Waste-to-Product R&D Services** (industrial auditing & lab test designs)
• 📈 Our **ESG Consulting** & **Green Passive Building solutions**
• 👩‍💼 **CEO/Founder Sakshi Parekh**, core advisors, developer Ashish Barele, or head office **Address & Contact details**!`;
  }

  // 15. Default Fallback
  return `🌿 **Vishwa Aadhar Enterprises** is a green-tech biotechnology pioneer dedicated to the circular economy. We provide:

• 🧱 **Bio-Cement Bricks**: Durable low-embodied-carbon construction blocks made using Microbial Induced Calcite Precipitation (MICP) from over 70% recycled industrial/construction aggregate waste.
• 🌱 **Organic Biofertilizers**: Highly active microbial buffers loaded with vital macronutrients, biological decomposers, and active organic carbon to revive depleted soil.
• 🔬 **Waste-to-Product R&D**: Tailored laboratory, validation and scalability studies converting chemical or heavy metal aggregates into eco-compliant products.
• 📈 **ESG & Sustainability Consulting**: Design strategies for domestic compliance, carbon matrices, and passive daylighting design models.

👨‍💼 **Our Leadership Team**: Sakshi .S. Parekh (Founder & CEO), Akshay Uday Patole (Advisor), and Ashish .K. Barele (Lead Developer).

✉️ Would you like to get a pricing estimate or schedule a project review? You can send a direct query under the **Send Message** tab, email us at [**vishwaadhar2004@gmail.com**](mailto:vishwaadhar2004@gmail.com), or phone our desk at [**+91 73979 86935**](tel:+917397986935).`;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Namaste! Welcome to **Vishwa Aadhar Enterprises**. 🌿\n\nI am your AI circular-economy assistant. Ask me anything about our:\n- 🧱 **Bio-Cement Bricks**\n- 🍃 **Organic Biofertilizers**\n- 🔬 **Waste-to-Product R&D**\n- 📈 **Sustainability Consulting**\n\nNeed to leave a query? You can also contact our team directly using the **Send Message** tab in this window!",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Inquiry via AI Chatbot',
    message: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Auto scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  // Handle open
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  // Chat Submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsgText = inputMessage.trim();
    setInputMessage('');

    const newUserMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userMsgText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // Map existing messages to standard Groq payload (excluding custom ids)
      const mappedMessages = [...messages, newUserMessage]
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: mappedMessages,
          model: 'openai/gpt-oss-20b', // Target user's requested model, backend proxies and falls back if needed
        }),
      });

      if (!response.ok) {
        throw new Error('Could not fetch completions');
      }

      const data = await response.json();
      const aiReply = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: aiReply,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error('Chatbot API error:', err);
      // Seamlessly parse client fallback content instantly
      const fallbackReply = getClientFallbackValue(userMsgText);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-fallback-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Form Submission
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('https://formspree.io/f/mwpgnjlk', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setContactForm({
          name: '',
          email: '',
          subject: 'Inquiry via AI Chatbot',
          message: '',
        });
        // Also insert a notification in the chat tab
        setMessages((prev) => [
          ...prev,
          {
            id: `sys-${Date.now()}`,
            role: 'assistant',
            content: "✅ Your contact request was submitted successfully! Our representative will arrive in your email shortly. Thank you!",
            timestamp: new Date(),
          },
        ]);
      } else {
        setFormError('Failed to send message. Please double check fields or try again.');
      }
    } catch (err) {
      setFormError('Network error. Please try again or email us directly.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Quick action suggestions
  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => {
      // Small timeout to allow input change to propagate, then trigger submit
      const sendBtn = document.getElementById('chat-send-btn');
      if (sendBtn) sendBtn.click();
    }, 100);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 font-sans text-gray-200">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col w-[300px] sm:w-[340px] md:w-[365px] h-[410px] md:h-[450px] max-h-[68vh] bg-slate-900 border border-gray-800/80 rounded-2xl shadow-2xl overflow-hidden mb-3 md:mb-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-950 p-3 border-b border-gray-800/80">
              <div className="flex items-center space-x-2.5">
                <img
                  src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png"
                  alt="Vishwa Aadhar AI"
                  className="w-8 h-8 rounded-full object-cover border border-emerald-500/50"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-wide">Vishwa Aadhar AI</span>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-medium">Eco-System Assistant • Online</span>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white hover:bg-gray-800/80 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-gray-950/60 border-b border-gray-800/80 text-[11px] text-center font-semibold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 md:py-2.5 transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'chat'
                    ? 'text-emerald-400 border-emerald-500 bg-emerald-500/5'
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}
              >
                <Bot size={12} />
                Chat with Assistant
              </button>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  setFormSubmitted(false);
                  setFormError('');
                }}
                className={`flex-1 py-2 md:py-2.5 transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'contact'
                    ? 'text-emerald-400 border-emerald-500 bg-emerald-500/5'
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}
              >
                <Mail size={12} />
                Send Direct Message
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-grow flex flex-col bg-[#0b1224] min-h-0 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'chat' ? (
                  <motion.div
                    key="chat-tab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full overflow-hidden"
                  >
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-2.5 max-w-[85%] ${
                            msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                          }`}
                        >
                          {/* Profile Circle */}
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                              msg.role === 'user'
                                ? 'bg-emerald-600 border-emerald-500'
                                : 'bg-gray-800 border-gray-700'
                            }`}
                          >
                            {msg.role === 'user' ? (
                              <User size={13} className="text-white" />
                            ) : (
                              <img
                                src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png"
                                alt="Vishwa Aadhar AI Logo"
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>

                          {/* Chat bubble body */}
                          <div className="flex flex-col gap-1">
                            <div
                              className={`p-3 rounded-2xl text-[12.5px] leading-relaxed shadow-sm whitespace-pre-line ${
                                msg.role === 'user'
                                  ? 'bg-emerald-950/80 border border-emerald-800/60 text-emerald-100 rounded-tr-none'
                                  : 'bg-gray-800/80 border border-gray-700/60 text-gray-200 rounded-tl-none'
                              }`}
                            >
                              {/* Simple Custom formatting support (Bold markdown and bullet lists) */}
                              {msg.content.split('\n').map((line, i) => {
                                // Bold markdown transform
                                let formattedLine = line;
                                if (line.startsWith('- ')) {
                                  formattedLine = line.substring(2);
                                  return (
                                    <div key={i} className="flex items-start gap-1 pb-1">
                                      <span className="text-emerald-400 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                      <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/\*\/(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    </div>
                                  );
                                }
                                return (
                                  <p
                                    key={i}
                                    className={i > 0 ? 'mt-2' : ''}
                                    dangerouslySetInnerHTML={{ __html: formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                                  />
                                );
                              })}
                            </div>
                            <span className="text-[9px] text-gray-500 px-1">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex items-start gap-2.5 max-w-[85%]">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-gray-700 bg-gray-800">
                            <img
                              src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png"
                              alt="Vishwa Aadhar AI Logo"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-gray-800/80 border border-gray-700/60 p-3.5 rounded-2xl rounded-tl-none text-[12px] text-gray-400 shadow-sm flex items-center space-x-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Quick action triggers footer */}
                    <div className="p-2 md:p-2.5 bg-gray-950/40 border-t border-gray-800/50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
                      <button
                        onClick={() => handleQuickQuestion('Describe your Bio-Cement Bricks')}
                        className="text-[9.5px] bg-slate-800 border border-gray-700 hover:border-emerald-500 hover:bg-slate-700 hover:text-emerald-300 font-medium py-1 px-2.5 rounded-full transition-all focus:outline-none flex-shrink-0 cursor-pointer"
                      >
                        🧱 Bio-Cement
                      </button>
                      <button
                        onClick={() => handleQuickQuestion('How does your Biofertilizer help soil?')}
                        className="text-[9.5px] bg-slate-800 border border-gray-700 hover:border-emerald-500 hover:bg-slate-700 hover:text-emerald-300 font-medium py-1 px-2.5 rounded-full transition-all focus:outline-none flex-shrink-0 cursor-pointer"
                      >
                        🌱 Biofertilizers
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('contact');
                          setFormSubmitted(false);
                          setFormError('');
                        }}
                        className="text-[9.5px] bg-slate-800 border border-gray-700 hover:border-emerald-500 hover:bg-slate-700 hover:text-emerald-300 font-medium py-1 px-2.5 rounded-full transition-all focus:outline-none flex-shrink-0 cursor-pointer"
                      >
                        ✍️ Contact Form
                      </button>
                    </div>

                    {/* Input Area */}
                    <form
                      onSubmit={handleSendMessage}
                      className="p-2 md:p-2.5 bg-gray-950 border-t border-gray-800/80 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type message..."
                        disabled={isTyping}
                        className="flex-grow bg-gray-800 text-[12px] border border-gray-700 rounded-xl px-2.5 py-1.5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/80 focus:border-emerald-500 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        id="chat-send-btn"
                        disabled={!inputMessage.trim() || isTyping}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white p-1.5 rounded-xl transition-all shadow-md focus:outline-none flex items-center justify-center cursor-pointer flex-shrink-0"
                      >
                        <Send size={13} />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact-tab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 flex flex-col justify-between h-full min-h-0"
                  >
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-2.5 flex-1 flex flex-col justify-center">
                        <div className="text-center">
                          <h3 className="text-xs font-bold text-white mb-0.5">Contact Vishwa Aadhar</h3>
                          <p className="text-[10px] text-gray-400">Leave your details and we'll reach back within 24 hours.</p>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={contactForm.name}
                            onChange={handleFormChange}
                            placeholder="Your Name"
                            className="w-full bg-gray-800 text-[11.5px] border border-gray-700 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={contactForm.email}
                            onChange={handleFormChange}
                            placeholder="you@email.com"
                            className="w-full bg-gray-800 text-[11.5px] border border-gray-700 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Your Message</label>
                          <textarea
                            name="message"
                            required
                            rows={2}
                            value={contactForm.message}
                            onChange={handleFormChange}
                            placeholder="Ask about pricing, products or solutions..."
                            className="w-full bg-gray-800 text-[11.5px] border border-gray-700 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white resize-none"
                          />
                        </div>

                        {formError && (
                          <div className="flex items-center gap-1.5 text-red-400 text-[10px]">
                            <AlertCircle size={11} />
                            <span>{formError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formSubmitting}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold text-xs py-2 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-white cursor-pointer disabled:opacity-60"
                        >
                          {formSubmitting ? (
                            <>
                              <Loader2 size={12} className="animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Submit Form'
                          )}
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-4 flex-1">
                        <CheckCircle2 className="text-emerald-500 w-10 h-10 mb-2 animate-bounce" />
                        <h3 className="text-sm font-bold text-white mb-1">Message Sent!</h3>
                        <p className="text-[11px] text-gray-400 max-w-[220px] leading-relaxed">
                          Your inquiry was successfully compiled and dispatched to **Vishwa Aadhar**. Check your inbox soon!
                        </p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="mt-4 text-emerald-400 hover:text-emerald-300 font-bold text-[11px] bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-1.5 rounded-full border border-emerald-500/30 transition-all cursor-pointer"
                        >
                          Submit Another Message
                        </button>
                      </div>
                    )}

                    {/* Static Company Address Footer */}
                    <div className="pt-2 border-t border-gray-800/80 text-[9px] text-gray-400 space-y-1 bg-gray-950/20 p-2 rounded-lg mt-1.5">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <div className="flex items-center gap-1">
                          <Mail size={10} className="text-emerald-500 flex-shrink-0" />
                          <span>vishwaadhar2004@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={10} className="text-emerald-500 flex-shrink-0" />
                          <span>+91 73979 86935</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <MapPin size={10} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Badlapur, pincode-421503</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher bubble */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none relative group ring-4 ring-emerald-600/20 select-none cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 95, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ rotate: 95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -95, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative w-full h-full flex items-center justify-center p-0.5"
            >
              <img
                src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png"
                alt="Assistant Logo Logo"
                className="w-13 h-13 rounded-full object-cover border-2 border-emerald-400"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-400 border border-slate-900 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg">
                <span className="w-1.5 h-1.5 bg-emerald-950 rounded-full animate-ping"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating pulse notification badge */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border border-slate-900 group-hover:scale-110 transition-transform">
            1
          </span>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
