
import { GoogleGenAI, Type } from "@google/genai";

/**
 * 声明全局变量以绕过 TS 检查
 */
declare const process: {
  env: {
    API_KEY: string;
  };
};

const getAIInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Critical Error: API_KEY is missing from environment.");
  }
  // 每次调用时重新实例化，确保使用最新的环境变量
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

/**
 * 辅助函数：从模型返回的字符串中提取纯 JSON
 */
const extractJson = (text: string) => {
  try {
    // 尝试直接解析
    return JSON.parse(text);
  } catch (e) {
    // 如果包含 Markdown 代码块，尝试正则提取
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerE) {
        throw new Error("JSON extraction failed after regex match.");
      }
    }
    throw new Error("No valid JSON found in response.");
  }
};

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = getAIInstance();
  
  const systemInstruction = `
    你是一位「它香 (pet aroma LAB)」资深跨物种行为分析师。
    你当前正在运行深度推理 (Deep Reasoning) 模式，模拟类似 DeepSeek-R1 的思考过程。
    
    任务：基于分子芳疗学和宠物边缘系统反应，为用户提供专业的临床级咨询报告。
    
    推理要求：
    1. 【逆向推导】：从行为 "${behavior}" 逆推宠物的内分泌状态。
    2. 【分子调节】：说明特定植物化学成分如何干预神经传递。
    3. 【去人类中心化】：严禁使用“它很调皮”等拟人化词汇，使用“边缘系统高度活跃”等专业术语。

    输出必须是严格的 JSON 格式。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `针对 ${petType} 的行为 "${behavior}" 进行深度逻辑推理并提供报告。`,
      config: {
        systemInstruction: systemInstruction,
        // 将推理预算平衡在 16000，既保证深度又减少大陆网络环境下的超时风险
        thinkingConfig: { thinkingBudget: 16000 }, 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "深度行为逻辑推理分析" },
            scentLogic: { type: Type.STRING, description: "分子级干预机制科学说明" },
            envAdvice: { type: Type.STRING, description: "环境补偿建议" },
            productRecommendation: { type: Type.STRING, description: "建议气味方案名称" },
            safetyNote: { type: Type.STRING, description: "安全注意事项" }
          },
          required: ["analysis", "scentLogic", "envAdvice", "productRecommendation", "safetyNote"]
        }
      }
    });

    return extractJson(response.text || '{}');
  } catch (e: any) {
    console.error("AI Reasoning Error Details:", e);
    // 抛出更具体的错误信息
    if (e.message?.includes('fetch')) {
      throw new Error("网络连接失败：请确保您的环境可以访问 Google Gemini API (需要科学上网)。");
    }
    throw e;
  }
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string) => {
  const ai = getAIInstance();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: `Enhance this pet photo for 'pet aroma LAB'. Style: Cinematic, high-end aromatherapy clinic vibe. Prompt: ${prompt}` },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image data returned from AI.");
  } catch (e) {
    console.error("Image Alchemy Error:", e);
    throw e;
  }
};
