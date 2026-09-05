/**
 * Unified AI Client
 * Automatically connects to your local Ollama instance (gemma4:26b / qwen / etc.)
 * or Google Gemini API via the /api/ai/generate endpoint.
 */

export const chatSession = {
  sendMessage: async (prompt) => {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.error || `AI request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return {
      response: {
        text: () => data.text,
      },
    };
  },
};
