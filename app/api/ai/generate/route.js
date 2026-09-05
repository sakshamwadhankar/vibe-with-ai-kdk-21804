import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const provider = process.env.AI_PROVIDER || "ollama";
    const ollamaBaseUrl =
      process.env.OLLAMA_BASE_URL ||
      process.env.NEXT_PUBLIC_OLLAMA_BASE_URL ||
      "http://localhost:11434";
    const ollamaModel =
      process.env.OLLAMA_MODEL ||
      process.env.NEXT_PUBLIC_OLLAMA_MODEL ||
      "gemma4:26b";

    if (provider === "ollama") {
      const response = await fetch(`${ollamaBaseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: ollamaModel,
          prompt: prompt,
          stream: false,
          system:
            "You are a professional technical interviewer and AI coach. Return only the requested output without conversational filler.",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Ollama connection failed (${response.status}): ${errorText}`
        );
      }

      const data = await response.json();
      return NextResponse.json({ text: data.response });
    } else {
      // Google Gemini Cloud Provider
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured in .env.local");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response;
      return NextResponse.json({ text: geminiResponse.text() });
    }
  } catch (error) {
    console.error("AI Generation Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
