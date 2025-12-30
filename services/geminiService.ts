
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 它香 (pet aroma LAB) 核心服务逻辑
 */

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  // 直接在方法内部读取，确保捕获当前环境的 API_KEY
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please refresh or check your settings.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are a senior cross-species behavior analyst at 'pet aroma LAB'.
    Provide a clinical-grade sensory report based on molecular aromatherapy and the limbic system.
    
    Logic Requirements:
    1. 【Biological Reasoning】: Analyze ${petType}'s behavior "${behavior}" from a neurological perspective.
    2. 【Molecular Intervention】: Explain how specific botanical molecules affect the CNS.
    3. 【De-humanized Perspective】: Professional, empathetic, scientific.
    
    Output MUST be a strict JSON object.
  `;

  try {
    // 尝试使用最强大的推理模型
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
  } catch (e: any) {
    console.warn("Pro reasoning unavailable, falling back to stable mode...", e);
    
    // 如果 Pro 模型由于 Quota 或权限报错，自动切换到 Flash 以确保用户能拿到结果
    const fallbackResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a clinical-grade scent report for ${petType} showing "${behavior}". Output as JSON.`,
      config: {
        systemInstruction,
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
    
    return JSON.parse(fallbackResponse.text || '{}');
  }
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string) => {
  const apiKey = process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || "" });
  
  try {
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
  } catch (e) {
    console.error("Alchemy Error:", e);
    throw e;
  }
};
