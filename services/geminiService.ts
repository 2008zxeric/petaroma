
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
    throw new Error("API_KEY is missing. Please check your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * 辅助函数：从模型返回的字符串中提取纯 JSON
 */
const extractJson = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerE) {
        throw new Error("Failed to parse reasoning output as JSON.");
      }
    }
    throw new Error("The reasoning engine returned an invalid format.");
  }
};

export const getPetScentAdvice = async (petType: string, behavior: string, lang: 'zh' | 'en' = 'zh') => {
  const ai = getAIInstance();
  
  const systemInstruction = `
    You are a senior cross-species behavior analyst at 'pet aroma LAB'.
    Your task is to provide a clinical-grade sensory report based on molecular aromatherapy and the limbic system.
    
    Logic Requirements:
    1. 【Biological Reasoning】: Analyze ${petType}'s behavior "${behavior}" from a neurological perspective.
    2. 【Molecular Intervention】: Explain how specific botanical molecules (e.g., Sesquiterpenes) affect the CNS.
    3. 【De-humanized Perspective】: Do not use anthropomorphic terms like "naughty". Use "limbic hyperarousal".
    
    Output must be a strict JSON object.
  `;

  // 尝试使用最强大的 Pro 模型，如果失败则回退到 Flash
  const modelsToTry = ['gemini-3-pro-preview', 'gemini-3-flash-preview'];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting reasoning with model: ${modelName}...`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Provide a deep reasoning report for ${petType} showing "${behavior}".`,
        config: {
          systemInstruction: systemInstruction,
          // 设置推理预算。Pro 支持高达 32k，但为保证响应稳定性，我们设为 12k
          thinkingConfig: { thinkingBudget: 12000 }, 
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

      return extractJson(response.text || '{}');
    } catch (e: any) {
      console.warn(`Model ${modelName} failed:`, e.message);
      lastError = e;
      // 如果是 API Key 错误，直接跳出不再重试
      if (e.message?.includes('API key') || e.status === 403) break;
      continue;
    }
  }

  // 如果所有模型都失败，抛出真实错误
  throw new Error(`Reasoning Failed: ${lastError?.message || "Internal Engine Error"}`);
};

export const editPetImage = async (base64Image: string, mimeType: string, prompt: string) => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: `Enhance this pet photo for 'pet aroma LAB'. Cinematic lighting, warm texture. Prompt: ${prompt}` },
        ],
      },
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (part?.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
    throw new Error("Image generation failed.");
  } catch (e: any) {
    console.error("Image Alchemy Error:", e);
    throw e;
  }
};
