import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Fallback lore if API fails or key missing
const FALLBACK_LORE = "The data streams are cloudy here. High interference from local glaze deposits. Mining recommended to clear the signal.";

export const getTerritoryLore = async (territoryName: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key provided for Gemini");
    return FALLBACK_LORE;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a very short, cyberpunk-themed "intel report" (max 2 sentences) about the territory "${territoryName}". 
      Mention "glaze deposits", "neural links", or "crypto-anarchy". Keep it mysterious and cool.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for speed
        maxOutputTokens: 60,
      }
    });

    return response.text.trim() || FALLBACK_LORE;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_LORE;
  }
};
