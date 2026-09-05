import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const geminiApiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const provider =
      process.env.AI_PROVIDER || (geminiApiKey ? "gemini" : "ollama");

    if (provider === "gemini" || (geminiApiKey && provider !== "ollama")) {
      if (!geminiApiKey) {
        throw new Error(
          "Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY or GEMINI_API_KEY in your environment variables."
        );
      }

      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response;
      return NextResponse.json({ text: geminiResponse.text() });
    } else {
      // Local / Remote Ollama Provider
      const defaultUrl =
        process.env.OLLAMA_BASE_URL ||
        process.env.NEXT_PUBLIC_OLLAMA_BASE_URL ||
        "http://localhost:11434";
      const primaryModel =
        process.env.OLLAMA_MODEL ||
        process.env.NEXT_PUBLIC_OLLAMA_MODEL ||
        "qwen2.5:3b";

      const urlsToTry = [defaultUrl];
      if (!defaultUrl.includes("localhost") && !defaultUrl.includes("127.0.0.1")) {
        urlsToTry.push("http://localhost:11434");
      }

      // Models to attempt: primary configured model first, followed by fast local model qwen2.5:3b
      const modelsToTry = [primaryModel];
      if (primaryModel !== "qwen2.5:3b") {
        modelsToTry.push("qwen2.5:3b");
      }

      let lastError = null;
      for (const baseUrl of urlsToTry) {
        for (const modelToRun of modelsToTry) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000);

            const response = await fetch(`${baseUrl}/api/generate`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: modelToRun,
                prompt: prompt,
                stream: false,
                system:
                  "You are a professional technical interviewer and AI coach. Return only valid JSON formatted output as requested without conversational filler.",
              }),
              signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              return NextResponse.json({ text: data.response });
            } else {
              const errorText = await response.text();
              lastError = new Error(
                `Ollama (${modelToRun} @ ${baseUrl}) returned ${response.status}: ${errorText.substring(0, 150)}`
              );
            }
          } catch (err) {
            lastError = err;
            console.warn(`Connection attempt to ${modelToRun} @ ${baseUrl} failed:`, err.message);
          }
        }
      }

      throw lastError || new Error("Failed to connect to Ollama service.");
    }
  } catch (error) {
    console.error("AI Generation Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
