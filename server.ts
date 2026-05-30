import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

function getGeminiClient() {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    console.warn("[Chat API] Warning: GEMINI_API_KEY is not defined in process.env.");
  }

  return new GoogleGenAI({
    apiKey: geminiApiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });
}

const handleLocalFallback = (userMessage: string): string => {
  const msg = userMessage.toLowerCase().trim();

  // Strict Policy for totally unrelated queries
  // List of keywords that might be related to the business
  const isRelated = 
    msg.includes("vishwa") || msg.includes("aadhar") || msg.includes("adhar") ||
    msg.includes("sakshi") || msg.includes("parekh") || msg.includes("founder") || msg.includes("ceo") ||
    msg.includes("akshay") || msg.includes("patole") || msg.includes("advisor") ||
    msg.includes("ashish") || msg.includes("barele") || msg.includes("web") || msg.includes("developer") || msg.includes("programmer") || msg.includes("coder") ||
    msg.includes("brick") || msg.includes("cement") || msg.includes("micp") || msg.includes("biomineralization") || msg.includes("block") ||
    msg.includes("fertilizer") || msg.includes("organic") || msg.includes("soil") || msg.includes("compost") || msg.includes("khad") || msg.includes("agriculture") || msg.includes("farming") ||
    msg.includes("research") || msg.includes("r&d") || msg.includes("laboratory") || msg.includes("lab") || msg.includes("biotech") || msg.includes("tech") ||
    msg.includes("esg") || msg.includes("sustainability") || msg.includes("consult") || msg.includes("carbon") || msg.includes("co2") || msg.includes("green") ||
    msg.includes("passive") || msg.includes("ventilation") || msg.includes("harvest") || msg.includes("greywater") ||
    msg.includes("location") || msg.includes("address") || msg.includes("office") || msg.includes("badlapur") || msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("number") ||
    msg.includes("price") || msg.includes("cost") || msg.includes("rate") || msg.includes("quote") || msg.includes("buy") || msg.includes("purchase") || msg.includes("order") || msg.includes("deal") ||
    msg.includes("what is") || msg.includes("service") || msg.includes("product") || msg.includes("offer") || msg.includes("provide") ||
    msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste") || msg.includes("sup") || msg.includes("help") || msg.includes("greetings");

  if (!isRelated) {
    return "I am the official AI assistant of Vishwa Aadhar Enterprises. I can only assist you with queries related to our sustainable products, services, and operations. Let me know how I can help you with Vishwa Aadhar!";
  }

  // 1. Founder / owner / ceo
  if (msg.includes("sakshi") || msg.includes("parekh") || msg.includes("founder") || msg.includes("ceo") || msg.includes("owner")) {
    return `👩‍💼 **Sakshi .S. Parekh — Founder & CEO**:
Sakshi leads Vishwa Aadhar Enterprises. She handles corporate strategic vision, business development, financial plans, and circular economy initiatives.`;
  }

  // 2. Advisor / Akshay
  if (msg.includes("akshay") || msg.includes("patole") || msg.includes("advisor") || msg.includes("aerospace")) {
    return `👨‍🚀 **Akshay Uday Patole — Advisor**:
An Aerospace Engineering graduate from Karunya Institute of Technology and Sciences, Akshay supports Vishwa Aadhar with robust scientific, mathematical, and analytical insights across biomineralization research and scale-up planning.`;
  }

  // 3. Web Developer / Ashish
  if (msg.includes("ashish") || msg.includes("barele") || msg.includes("web") || msg.includes("developer") || msg.includes("programmer") || msg.includes("site") || msg.includes("engineer")) {
    return `💻 **Ashish .K. Barele — Web Developer**:
Ashish is the skilled lead developer responsible for building and maintaining Vishwa Aadhar's digital systems, responsive website, and smooth AI chatbot integration.`;
  }

  // 4. Biofertilizer / Agriculture / Soil
  if (msg.includes("fertilizer") || msg.includes("organic") || msg.includes("soil") || msg.includes("compost") || msg.includes("crop") || msg.includes("khad") || msg.includes("agriculture") || msg.includes("fertiliser")) {
    return `🌱 **Our Organic Biofertilizers**:
Formulated directly from processed waste, our organic fertilizers enrich soil health. They contain natural beneficial microflora, essential nutrients, and high organic carbon. They increase water retention and decrease relying on chemical fertilizers. Perfect for cash crops (sugarcane, cotton), fruit gardens, and organic farming.`;
  }

  // 5. Bio-Cement Bricks / MICP / Construction
  if (msg.includes("brick") || msg.includes("cement") || msg.includes("micp") || msg.includes("biomineralization") || msg.includes("construction") || msg.includes("building")) {
    return `🧱 **Our Bio-Cement Bricks**:
Heavy-duty building blocks made using Microbial Induced Calcite Precipitation (MICP)—a zero-kiln, biochemical process styling calcite crystals that bind aggregate wastes. Composed of >70% recycled industrial/demolition wastes, they offer high compressive strength and low carbon footprint.`;
  }

  // 6. R&D / Laboratory Services
  if (msg.includes("research") || msg.includes("r&d") || msg.includes("toxic") || msg.includes("pilot") || msg.includes("lab") || msg.includes("laboratory") || msg.includes("science") || msg.includes("biotech") || msg.includes("testing")) {
    return `🔬 **Waste-to-Product R&D Services**:
We formulate solutions to help industrial units transform unwanted environmental by-products into useful commercial materials. Features lab bench-testing, auditing, and pilot scale scaling.`;
  }

  // 7. ESG Consulting / Sustainability / Compliance
  if (msg.includes("consult") || msg.includes("esg") || msg.includes("audit") || msg.includes("co2") || msg.includes("carbon") || msg.includes("compliance") || msg.includes("strategy")) {
    return `📈 **ESG & Sustainability Consulting**:
We guide businesses to transform operations into circular models using carbon footprint tracking, ESG metrics compliance, and sustainability reporting.`;
  }

  // 8. Green Building PASSIVE Designs
  if (msg.includes("building") || msg.includes("green build") || msg.includes("passive design") || msg.includes("rain") || msg.includes("harvest") || msg.includes("greywater") || msg.includes("ventilation")) {
    return `🏡 **Green Building & Passive Design**:
Optimizing civil layouts for passive wind-ventilation, maximum daylighting, greywater filtration systems, and bespoke local rainwater harvesting setups.`;
  }

  // 9. Location / Head Office / Address
  if (msg.includes("location") || msg.includes("address") || msg.includes("where") || msg.includes("office") || msg.includes("head") || msg.includes("badlapur") || msg.includes("maharashtra") || msg.includes("pincode")) {
    return `📍 **Office Address & Support Hours**:
- **Location Office**: At. Badlapur, Pincode-421503, Maharashtra, India.
- **Hours of Support**: Mon - Sat | 9:30 AM to 6:30 PM (IST).
- **Email**: vishwaadhar2004@gmail.com
- **Phone**: +91 73979 86935`;
  }

  // 10. Pricing / Cost / Order / Buy
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("rate") || msg.includes("quote") || msg.includes("buy") || msg.includes("purchase") || msg.includes("order") || msg.includes("deal")) {
    return `💰 **Price Quotes & Procurement**:
We quote competitive wholesale rates depending on volume and shipping distance. To get a custom pricing catalog, message us at **vishwaadhar2004@gmail.com** or use the 'Send Message' form!`;
  }

  // 11. What is Vishwa Aadhar / About / Profile / Introduction / "what is"
  if (msg.includes("what is") || msg.includes("who is") || msg.includes("vishwaaadhar") || msg.includes("vishwa aadhar") || msg.includes("vishwa adhar") || msg.includes("about") || msg.includes("introduce") || msg.includes("introduction") || msg.includes("profile") || msg.includes("who are you")) {
    return `🌿 **About Vishwa Aadhar**:
We are circular-economy pioneers reimagining sustainable infrastructure through innovate biocement blocks, organic biofertilizers, waste-to-resource solutions, and next-generation green technology. Led by Sakshi Parekh (CEO), Akshay Patole (Advisor), and Ashish Barele (Web Developer).`;
  }

  // 12. What does Vishwa Aadhar offer / give / provide?
  if (msg.includes("give") || msg.includes("offer") || msg.includes("provide") || msg.includes("product") || msg.includes("service") || msg.includes("sell") || msg.includes("catalog")) {
    return `🛍️ **Our Core Solutions**:
1. 🧱 **Bio-Cement Bricks** (Low-carbon zero-kiln bricks)
2. 🌱 **Organic Biofertilizers** (Nutrient and microflora soil vitalizer)
3. 🔬 **Waste-to-Product R&D** (Industrial byproduct transformations)
4. 📈 **Sustainability Consulting** (ESG metrics and carbon tracking)
5. 🏡 **Passive Green Design** (Greywater recycle and passive cooling layouts)

Email us at **vishwaadhar2004@gmail.com** for precise catalogs!`;
  }

  // 13. Environment / Pollution / Recycled / Mission / Vision
  if (msg.includes("waste") || msg.includes("environment") || msg.includes("sustainability") || msg.includes("recycle") || msg.includes("eco") || msg.includes("green") || msg.includes("carbon") || msg.includes("mission") || msg.includes("vision")) {
    return `🌍 **Our Core Sustainable Mission**:
Driven by innovation and sustainability, our mission is not just to create eco-friendly materials, but to build a cleaner, greener, and healthier world — a better place for future generations to live, grow, and thrive.`;
  }

  // 14. Hello / Greetings / Support / Contact
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste") || msg.includes("sup") || msg.includes("greetings")) {
    return `Namaste! Welcome to **Vishwa Aadhar Enterprises** chatbot. 🌿

I am your guide. Feel free to ask specific questions about our:
- 🧱 **Bio-Cement Bricks**
- 🌱 **Organic Biofertilizers**
- 🔬 **Waste-to-Product R&D**
- 📈 **ESG Consulting** or Office contacts!`;
  }

  // 15. Default Fallback
  return `I am the official AI assistant of Vishwa Aadhar Enterprises. I can only assist you with queries related to our sustainable products, services, and operations. Let me know how I can help you with Vishwa Aadhar!`;
};

const SYSTEM_PROMPT = `You are the official AI Assistant of Vishwa Aadhar Enterprises.
Your absolute directive is to provide highly precise, clear, and direct answers to the user's questions about Vishwa Aadhar.

CRITICAL DIRECTIVES:
1. Give info ONLY about Vishwa Aadhar Enterprises, its services, team, mission, products, and verified contact details.
2. ANSWER SPECIFICALLY: Directly answer the exact query asked. If a user asks about a specific person, product, metric, or contact detail, provide ONLY that information. Do NOT dump general company overviews or unrelated product lists.
3. Decline unrelated topics politely but firmly. If they ask anything outside of Vishwa Aadhar (e.g. general questions, coding advice, math, other companies, recipes, generic topics), respond exactly with:
   "I am the official AI assistant of Vishwa Aadhar Enterprises. I can only assist you with queries related to our sustainable products, services, and operations. Let me know how I can help you with Vishwa Aadhar!"
4. Company Details to use for highly precise responses:
   - Name: Vishwa Aadhar Enterprises (comprising "Vishwaaadhar Biocement and Fertilizer Enterprises")
   - Focus: Reimagining sustainable infrastructure through innovative Biocement, Biofertilizers, Waste-to-Resource solutions, and next-generation green technologies.
   - Core Mission: Rebuilding the future by combining Microbial Science, Biomineralization, Advanced Research, and Circular Economy principles to transform Liquid Sanitation and Industrial Waste into high-performance, low-carbon solutions for construction and agriculture. "Driven by innovation and sustainability, our mission is not just to create eco-friendly materials, but to build a cleaner, greener, and healthier world — a better place for future generations to live, grow, and thrive." This is our primary purpose.
   - Core Services & Products:
     * Bio-Cement Bricks (MICP Low-Carbon Blocks): Heavy-duty, zero-kiln bricks created using Microbial Induced Calcite Precipitation (MICP) that mimics natural marine reefs, utilizing >70% recycled industrial/demolition aggregate wastes. Reduces carbon intensity carbon footprint.
     * Organic Biofertilizers: Advanced organic formulations with high microbial activity, macronutrients, organic carbon percentage validation, and free of pathogens. Increases water retention capacity and decreases chemical reliance. Perfect for cash crops (sugarcane, cotton), horticulture, and general organic agriculture.
     * Waste-to-Product R&D Services: Bespoke industrial auditing, biotechnology formulation development, bench testing, and pilot scale-up.
     * Corporate ESG & Sustainability Consulting: ESG tracking, carbon reduction reporting, and circular economy compliance strategies.
     * Green Civil Design Solutions: Optimizing passive solar/wind comfort layouts, rainwater harvest structures, and greywater filtration systems.
   - Registrations: 
     * Officially registered as an MSME (Micro, Small & Medium Enterprises) under the Government of India (Udyam Registration). High corporate compliance & security.
   - Official Contacts:
     * Phone: +91 73979 86935
     * Email: vishwaadhar2004@gmail.com
     * Office: At. Badlapur, Pincode-421503, Maharashtra, India.
   - Organization Team:
     * Sakshi .S. Parekh - Founder & CEO: Strategist, business lead, dedicated visualizer of biological tech and circular growth growth.
     * Akshay Uday Patole - Advisor: Aerospace Engineering graduate from Karunya Institute of Technology and Sciences, providing robust mathematical and analytical metrics across biomineralization research.
     * Ashish .K. Barele - Web Developer: The tech designer of our highly responsive digital interfaces, website, and AI systems.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Secure API proxy for chatbot
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    let lastUserQueryText = "";
    try {
      console.log("[Chat API] Received request body:", JSON.stringify(req.body));
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        console.warn("[Chat API] Warning: messages array is missing or invalid");
        return res.status(400).json({ error: "Messages array is required" });
      }

      if (messages.length > 0) {
        lastUserQueryText = messages[messages.length - 1]?.content || "";
      }
      console.log("[Chat API] Last user query text is:", lastUserQueryText);

      // 1. Try Google Gemini API (highly reliable with dynamic key fallback loading)
      try {
        console.log("[Chat API] Attempting Gemini API call...");
        const dynamicAi = getGeminiClient();
        const contents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content || "" }]
        }));

        const response = await dynamicAi.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.3,
          }
        });

        const replyText = response.text || "";
        console.log("[Chat API] Gemini reply success length:", replyText.length);
        if (replyText) {
          return res.json({
            choices: [
              {
                message: {
                  role: "assistant",
                  content: replyText
                }
              }
            ]
          });
        } else {
          console.warn("[Chat API] Gemini reply text is empty");
        }
      } catch (geminiError: any) {
        console.error("[Chat API] Gemini API call failed, falling back to local engine:", geminiError?.message || geminiError);
        if (geminiError?.stack) {
          console.error(geminiError.stack);
        }
      }

      // 2. Clear out any Groq usage and fallback to a local keyword engine
      console.log("[Chat API] Defaulting to smart local matching engine...");
      const localReplyText = handleLocalFallback(lastUserQueryText);
      return res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: localReplyText
            }
          }
        ]
      });

    } catch (error: any) {
      console.error("[Chat API] Outer handler general crash! Triggering safe local fallback response:", error?.message || error);
      if (error?.stack) {
        console.error(error.stack);
      }
      const safeReply = handleLocalFallback(lastUserQueryText);
      return res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: safeReply
            }
          }
        ]
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
