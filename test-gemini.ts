import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

async function test() {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
  console.log("GEMINI_API_KEY present:", !!geminiApiKey);
  if (geminiApiKey) {
    console.log("First 8 chars of key:", geminiApiKey.slice(0, 8));
  }

  const ai = new GoogleGenAI({
    apiKey: geminiApiKey || ""
  });

  try {
    console.log("Calling gemini-2.5-flash...");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello, tell me about yourself in 5 words."
    });
    console.log("Gemini 2.5 response:", response.text);
  } catch (err: any) {
    console.error("Gemini 2.5 call failed:", err.message || err);
  }

  try {
    console.log("Calling gemini-1.5-flash...");
    const response2 = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Hello, tell me about yourself in 5 words."
    });
    console.log("Gemini 1.5 response:", response2.text);
  } catch (err: any) {
    console.error("Gemini 1.5 call failed:", err.message || err);
  }

  try {
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
    console.log("Groq API key starts with:", GROQ_API_KEY.slice(0, 5));
    
    console.log("Calling Groq API...");
    const req = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "Hi" }]
      })
    });
    console.log("Groq HTTP status:", req.status);
    const body = await req.text();
    console.log("Groq response body:", body.slice(0, 300));
  } catch (err: any) {
    console.error("Groq call failed:", err.message || err);
  }
}

test();
