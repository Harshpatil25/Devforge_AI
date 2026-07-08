import axios from "axios";
import { env } from "../config/env.js";



const MODEL = "openrouter/free";

async function askAI(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are an expert senior software engineer. Produce professional, concise, portfolio-quality content.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${env.openRouterApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
    
  } catch (err) {
    console.error(
      "OpenRouter Error:",
      err.response?.data || err.message
    );
    throw new Error("AI service unavailable.");

  }
}

export async function generateProjectInsight({
  title,
  description,
  action,
}) {
  const prompt = `
Generate a professional ${action}.

Project Title:
${title}

Description:
${description}

The response should be polished, portfolio-ready and not overly long.
`;

  return await askAI(prompt);
}

export async function generateBugInsight({
  title,
  description,
  action,
}) {
  const prompt = `
${action}

Bug Title:
${title}

Bug Description:
${description}

Provide a clear, professional explanation with solution if applicable.
`;

  return await askAI(prompt);
}