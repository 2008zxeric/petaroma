
import { GoogleGenAI, Type } from "@google/genai";

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const instruction = lang === 'zh' 
    ? `你是一位资深的宠物行为分析师和宠物安全芳疗专家。用户拥有一只 ${petType}，行为描述：${behavior}。请根据“它香” brand 理念提供建议。要求以中文回复。`
    : `You are a professional pet behaviorist and safety aromatherapy expert. User has a ${petType}, behavior: ${behavior}. Provide advice based on 'It Scent' brand philosophy. Please respond in English.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: instruction,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          scentSuggestion: { type: Type.STRING },
          warning: { type: Type.STRING },
          productRecommendation: { type: Type.STRING, description: lang === 'zh' ? '雷雨安/离别安/出行安/窝窝安' : 'Storm Calm/Separation Ease/Travel Peace/Sleeping Nest' },
        },
        required: ["analysis", "scentSuggestion", "warning", "productRecommendation"]
      }
    }
  });

  let jsonStr = response.text?.trim() || "{}";
  
  // Clean up potential markdown code blocks
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```/, "").replace(/```$/, "").trim();
  }

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", jsonStr);
    return {
      analysis: lang === 'zh' ? "无法解析分析结果" : "Unable to analyze results.",
      scentSuggestion: lang === 'zh' ? "建议咨询在线专家" : "Please consult our experts.",
      warning: lang === 'zh' ? "请注意宠物过敏反应" : "Watch for allergic reactions.",
      productRecommendation: lang === 'zh' ? "雷雨安" : "Storm Calm"
    };
  }
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: mimeType } },
        {
          text: `You are an artistic editor for the high-end pet brand 'PetAroma' (它香). 
          Modify this pet image based on the following instruction: ${prompt}.
          The output should be high-end, serene, and aesthetic. Ensure the pet remains the focal point while applying the requested changes (e.g., adding filters, removing backgrounds, or adjusting lighting).
          Target language for context: ${lang}.`,
        },
      ],
    },
  });

  const candidates = response.candidates;
  if (candidates && candidates.length > 0) {
    for (const part of candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  
  throw new Error("No image was generated.");
};
