
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 它香 (pet aroma LAB) 核心服务逻辑
 * 遵循标准 SDK 初始化规范，直接使用 process.env.API_KEY
 */

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  // 直接初始化，由 SDK 处理 API Key 的读取
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a senior cross-species behavior analyst at 'pet aroma LAB'.
    Provide a clinical-grade sensory report based on molecular aromatherapy and the limbic system.
    
    Logic Requirements:
    1. 【Biological Reasoning】: Analyze ${petType}'s behavior "${behavior}" from a neurological perspective.
    2. 【Molecular Intervention】: Explain how specific botanical molecules affect the CNS.
    3. 【De-humanized Perspective】: Professional, empathetic, scientific.
    
    Output MUST be a strict JSON object.
  `;

  // 恢复到之前成功的调用模式
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Deeply reason about ${petType} showing: ${behavior}`,
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 16000 }, 
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          scentLogic: { type: Type.STRING },
          envAdvice: { type: Type.STRING },
          productRecommendation: { type: Type.STRING },
          safetyNote: { type: Type.STRING }
        },
        required: ["analysis", "scentLogic", "envAdvice", "productRecommendation", "safetyNote"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: mimeType } },
        { text: `Enhance for 'pet aroma LAB'. Cinematic, therapeutic aesthetic. Prompt: ${prompt}` },
      ],
    },
  });

  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (part?.inlineData) {
    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
  throw new Error("Image alchemy failed.");
};
