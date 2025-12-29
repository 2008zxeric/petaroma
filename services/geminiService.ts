
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 初始化 AI 实例的工厂函数
 * 确保每次调用都获取最新的环境变量
 */
const getAIInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Critical Error: API_KEY is missing in environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = getAIInstance();
  
  const systemInstruction = `
    你是一位「它香 (pet aroma LAB)」资深跨物种行为分析师。
    你的任务是基于分子芳疗学和宠物边缘系统反应，为用户提供专业的临床级咨询报告。
    
    推理流程要求：
    1. 【物种敏感点分析】：分析 ${petType} 特有的感官敏感点。
    2. 【压力源逆向推理】：针对行为 "${behavior}"，推导底层情绪。
    3. 【神经调节逻辑】：阐述特定植物分子（如倍半萜类）如何影响边缘系统（Limbic System）。
    4. 【精准处方】：从雷雨安 (Storm)、暂别安 (Absence)、出行安 (Road)、窝窝安 (Sleep) 中选一。

    输出规范：
    - 使用 ${lang === 'zh' ? '中文' : 'English'}，关键术语附带英文（例如：边缘系统 | Limbic System）。
    - 严禁拟人化，坚持去人类中心化。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze behavior for ${petType}: ${behavior}. Provide detailed report.`,
      config: {
        systemInstruction: systemInstruction,
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
  } catch (e) {
    console.error("AI Diagnosis Error:", e);
    throw new Error("Diagnosis failed. Please check your API Key and Network.");
  }
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = getAIInstance();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: `Enhance this pet photo for 'pet aroma LAB'. Prompt: ${prompt}. 
                   Rules: Full color, warm tones, high-end cinema quality.` },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from AI.");
  } catch (e) {
    console.error("Image Alchemy Error:", e);
    throw e;
  }
};
