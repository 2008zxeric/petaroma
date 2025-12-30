
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 它香 (pet aroma LAB) 核心服务逻辑
 * 遵循标准 SDK 初始化规范，确保推理结果为中文
 */

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  // 规则要求：每次调用前创建实例，确保使用最新的 process.env.API_KEY
  const apiKey = process.env.API_KEY;
  
  // 如果 API Key 缺失，抛出特定错误，以便 UI 引导用户选择 Key
  if (!apiKey) {
    throw new Error("API key is missing. Please select an API key via the selector.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  // 强制要求输出语言为中文
  const systemInstruction = `
    你是一名来自“它香 (pet aroma LAB)”的高级跨物种行为分析师。
    你需要基于分子芳疗学和边缘系统理论，提供一份临床级的感官报告。
    
    逻辑要求：
    1. 【生物学推理】：从神经科学角度分析 ${petType} 的行为 "${behavior}"。
    2. 【分子干预】：解释特定植物分子如何影响中枢神经系统（CNS）。
    3. 【去人类中心化】：视角必须专业、理性且充满同理心。
    
    必须以 JSON 格式输出，且所有文本内容必须使用中文。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `深度分析 ${petType} 的以下行为：${behavior}`,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingBudget: 16000 }, 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "行为逻辑深度分析" },
            scentLogic: { type: Type.STRING, description: "分子干预路径说明" },
            envAdvice: { type: Type.STRING, description: "环境补偿建议" },
            productRecommendation: { type: Type.STRING, description: "推荐产品方案名称" },
            safetyNote: { type: Type.STRING, description: "安全注意事项" }
          },
          required: ["analysis", "scentLogic", "envAdvice", "productRecommendation", "safetyNote"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    // 捕获权限/Key 缺失错误，透传给 UI 处理
    if (
      errorMsg.includes("API key") || 
      errorMsg.includes("Requested entity was not found") || 
      errorMsg.includes("403") || 
      errorMsg.includes("401")
    ) {
      throw error;
    }

    console.warn("Pro reasoning limited, falling back to Flash...", error);
    const fallbackAi = new GoogleGenAI({ apiKey });
    const fallbackResponse = await fallbackAi.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请针对 ${petType} 的行为 "${behavior}" 提供一份临床芳疗简报。必须使用中文，并以 JSON 格式输出。`,
      config: {
        systemInstruction: "你是一个专业的宠物芳疗专家。请用中文回答。",
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
  if (!apiKey) {
    throw new Error("API key is missing.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
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
