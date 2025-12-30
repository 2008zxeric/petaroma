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
    console.error("Critical Error: API_KEY is missing.");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = getAIInstance();
  
  const systemInstruction = `
    你是一位「它香 (pet aroma LAB)」资深跨物种行为分析师，当前配备了业界领先的深度推理 (Deep Reasoning) 引擎。
    你的任务是基于分子芳疗学和宠物边缘系统反应，为用户提供专业的临床级咨询报告。
    
    推理流程要求（请在内部思考过程中严格执行）：
    1. 【物种敏感点分析】：分析 ${petType} 特有的感官敏感点（如嗅球神经密度、信息素受体分布）。
    2. 【压力源逆向推理】：针对行为 "${behavior}"，逆向推导其底层的生物学情绪（应激、焦虑、无聊等）。
    3. 【神经调节逻辑】：阐述特定植物分子（如倍半萜类、单萜醇等）如何穿过血脑屏障并影响边缘系统 (Limbic System)。
    4. 【精准处方】：从雷雨安 (Storm)、暂别安 (Absence)、出行安 (Road)、窝窝安 (Sleep) 中选一。

    输出规范：
    - 使用 ${lang === 'zh' ? '中文' : 'English'}，关键术语附带英文。
    - 严禁拟人化，坚持以“去人类中心化”的视角进行分析。
    - 报告应具有深度逻辑性，而非简单的常识陈述。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // 使用最强大的 Pro 模型进行深度推理
      contents: `针对 ${petType} 的行为 "${behavior}" 进行最高级别的深度逻辑推理并提供报告。`,
      config: {
        systemInstruction: systemInstruction,
        // 开启最高 32k 的推理预算，提供类似 DeepSeek-R1 的超强思维链能力
        thinkingConfig: { thinkingBudget: 32768 }, 
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

    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI Reasoning Error:", e);
    throw new Error("Reasoning Engine is currently busy or API_KEY is invalid.");
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
          { text: `Enhance this pet photo for 'pet aroma LAB'. Prompt: ${prompt}. Rules: Warm textures, cinematic lighting, ultra-high quality.` },
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
