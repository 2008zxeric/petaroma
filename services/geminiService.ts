
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 它香 (pet aroma LAB) 核心服务逻辑
 * 针对 Vercel 环境变量进行了注入适配
 */

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  // 确保使用 process.env.API_KEY
  const apiKey = process.env.API_KEY as string;
  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    你是一名来自“它香 (pet aroma LAB)”的专家级跨物种行为分析师。
    你的目标是利用深度推理能力，分析宠物行为背后的生物学机制。

    【核心指令】：
    1. 必须使用“中文”回答所有 JSON 字段。
    2. 分析视角必须专业且带有品牌温度（去人类中心化）。
    3. 如果模型支持推理（Thinking），请展示深层的分子干预逻辑。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `深度推理分析${petType}的以下异常行为：${behavior}`,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingBudget: 16000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "行为背后的生物学推理分析" },
            scentLogic: { type: Type.STRING, description: "植物分子干预边缘系统的逻辑" },
            envAdvice: { type: Type.STRING, description: "家庭环境的补偿与调整建议" },
            productRecommendation: { type: Type.STRING, description: "推荐的“它香”气味系列名称" },
            safetyNote: { type: Type.STRING, description: "使用时的安全红线提醒" }
          },
          required: ["analysis", "scentLogic", "envAdvice", "productRecommendation", "safetyNote"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI RESPONSE EMPTY");
    return JSON.parse(text);
  } catch (error: any) {
    console.error("Pro Model Failed:", error);
    
    // 备选方案：使用 Flash 模型
    const fallbackAi = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const fallbackResponse = await fallbackAi.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请用中文对${petType}的"${behavior}"行为提供芳疗方案。JSON格式输出。`,
      config: {
        systemInstruction: "你是一个专业的宠物芳疗师。请始终以中文回答。",
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
    
    const fallbackText = fallbackResponse.text;
    if (!fallbackText) return {};
    return JSON.parse(fallbackText);
  }
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string) => {
  const apiKey = process.env.API_KEY as string;
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: mimeType } },
        { text: `以“它香”品牌高级视觉风格增强此图片：${prompt}` },
      ],
    },
  });

  // 严谨的空值检查流程，解决 TS2532 错误
  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("IMAGE_LAB_ERROR: No candidates returned");
  }

  const content = candidates[0].content;
  if (!content || !content.parts) {
    throw new Error("IMAGE_LAB_ERROR: No content or parts returned");
  }

  // 寻找包含 inlineData 的 part
  const imagePart = content.parts.find(p => p.inlineData !== undefined);
  
  if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
    const returnMimeType = imagePart.inlineData.mimeType || 'image/png';
    return `data:${returnMimeType};base64,${imagePart.inlineData.data}`;
  }
  
  throw new Error("IMAGE_LAB_ERROR: No image data found in response parts");
};
