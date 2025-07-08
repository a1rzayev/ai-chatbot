import { create } from "zustand";
import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

type AiStore = {
  ai: GoogleGenAI;
  generateContent: (
    prompt: string,
    model: string,
  ) => Promise<GenerateContentResponse>;
  extract: (res: GenerateContentResponse) => string | undefined;
};

export const useAiStore = create<AiStore>()((_, get) => ({
  ai: new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_KEY }),

  async generateContent(prompt: string, model: string) {
    try {
      const { ai } = get();

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      return response;
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  },

  extract(res) {
    return res.candidates?.[0]?.content?.parts?.[0]?.text;
  },
}));
