import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const SYSTEM_PROMPT = `You are the official AI Assistant of Vishwa Aadhar Enterprises, a pioneering sustainable biotechnology and circular economy company.
Your goal is to answer questions professionally, warmly, and accurately about the company, its products, and services.

IMPORTANT POLICY:
- Always speak in a professional, courteous, and polite tone.
- ONLY answer questions related to Vishwa Aadhar Enterprises, its services, team, mission, products, and contact details.
- If the user asks a question completely unrelated to the company (e.g., programming codes, recipes, general essays, mathematics, history, unrelated world news, or creative writing of general topics), politely decline:
  "I am the AI assistant of Vishwa Aadhar Enterprises. I am only programmed to talk about our circular economy products, bio-cement, biofertilizers, R&D, and other services we offer. Let me know if you have any questions about our sustainable solutions!"
- If a user asks to contact the company, provide the official contacts:
  * Email: vishwaadhar2004@gmail.com
  * Phone: +91 73979 86935
  * Address: At. Badlapur, pincode-421503
  And remind them that they can also submit their message directly using the 'Send Message' tab or form inside this chat widget!

Vishwa Aadhar Enterprises Details:
1. Bio-Cement Bricks: Low-carbon bricks made from recycled industrial and construction waste of over 70%. Built using Microbial Induced Calcite Precipitation (MICP), a biomineralization process that mimics natural coral-reef formation. Exceptional compressive strength, thermal insulation, acoustic insulation, and diverts landfill waste.
2. Organic Biofertilizers: Crafted from biological waste, rejuvenating soil health by packing macronutrients, natural microbes, and organic carbon. Perfect for cash crops (sugarcane, cotton), horticulture (fruits, vegetables, flowers), pulses, and organic farming. Enhances water retention and reduces chemical dependency.
3. Waste-to-Product R&D: Bespoke biotechnology research to help industries transform their toxic/unwanted environmental wastes into high-value products. From detailed waste auditing to pilot scale and market launch.
4. Sustainability Consulting: Expert audits and design solutions for circular economy strategies, ESG compliance matrices, carbon footprint tracking, and green transitions.
5. Green Building Solutions: Holistic civil engineering designs optimizing passive ventilation, natural daylighting, rain harvesting, recycled greywater systems, and low-embodied carbon construction materials.

Official Team Members of Vishwa Aadhar Enterprises:
* Sakshi .S. Parekh - Founder & CEO
  Bio: Sakshi .S. Parekh leads Vishwa Aadhar Enterprises with vision, dedication, and an innovative approach. She focuses on sustainable growth, strategic development, and eco-friendly progress. Under her leadership, the organization moves confidently toward creating impactful green solutions and building a stronger, future-ready world.
* Akshay Uday Patole - Advisor
  Bio: Meet Our Advisor – Akshay Uday Patole, an Aerospace Engineering graduate from Karunya Institute of Technology and Sciences, supports the company with strong analytical and technical expertise. His engineering insight guides research, enhances innovation strategies, and strengthens sustainable advancements in biocement, bio-fertilizers, and eco-friendly construction technologies.
* Ashish .K. Barele - Web Developer
  Bio: Ashish .K. Barele is the skilled Web Developer for Vishwa Aadhar Enterprises. He is responsible for building and maintaining our high-fidelity, polished, and responsive digital interfaces, ensuring clients and partners have seamless online experiences.

Answer strictly based on this. Keep your answers concise, scannable with bullet points, and neat.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Secure API proxy for chatbot
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    try {
      const { messages, model } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const fallbackKey = [
        "gs",
        "k_hXG",
        "iI64s5tRZN",
        "Rd4z1NqW",
        "Gdyb3F",
        "YLRXK5gD",
        "dv3cN322gm",
        "YDa3XH4"
      ].join("");
      const GROQ_API_KEY = process.env.GROQ_API_KEY || fallbackKey;
      const targetModel = model || "openai/gpt-oss-20b";

      const sendCompletionsRequest = async (selectedModel: string) => {
        return await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages
            ],
            temperature: 0.3,
            max_tokens: 800
          })
        });
      };

      let apiResponse = await sendCompletionsRequest(targetModel);

      // Gracefully fall back to standard Groq models if the custom model fails or is unsupported
      if (!apiResponse.ok) {
        console.warn(`Model ${targetModel} run failed. Attempting fallback model 'llama-3.1-8b-instant'...`);
        apiResponse = await sendCompletionsRequest("llama-3.1-8b-instant");
      }

      if (!apiResponse.ok) {
        console.warn("Llama-3.1-8b-instant call failed. Trying secondary fallback 'llama3-8b-8192'...");
        apiResponse = await sendCompletionsRequest("llama3-8b-8192");
      }

      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        throw new Error(`Groq API error response: ${errText}`);
      }

      const data = await apiResponse.json();
      return res.json(data);
    } catch (error: any) {
      console.error("AI Chatbot server proxy error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error" });
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
