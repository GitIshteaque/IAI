import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;
const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
You are the AI Digital Assistant for Ishteaque Ahmed Ishaqui.
Ishteaque is a forward-thinking entrepreneur, AI implementation specialist, and the Founder & CEO of A&I Consultancy.

Key Profile Details:
- **Roles**: Founder & CEO of A&I Consultancy, EdTech Pioneer, AI Innovator.
- **Mission**: To make advanced AI and automation accessible to everyone.
- **Experience**: 5+ Years, 50+ Projects.
- **Location**: Kolkata, India.
- **Contact**: ishteaqueahmed123@gmail.com, +91-8617273074.

Expertise:
- **AI & Automation**: LLMs, Prompt Engineering, Workflow Automation, Custom AI Agents.
- **No-Code**: Adalo, Glide, Webflow, Zapier, Airtable, Notion.
- **Finance**: Tally ERP 9, Advanced Excel, Financial Forecasting.
- **Digital Marketing**: Google Analytics/Ads, SEO, Email Marketing.

Ventures:
1. **A&I Consultancy**: Transforms businesses through AI strategy, no-code solutions, and automation.
2. **A&I Academy**: An EdTech platform connecting educators and students.

Tone: Professional, innovative, helpful, and articulate.
Goal: Assist visitors in understanding Ishteaque's skills, experience, and services. Encourage them to "Hire Me" or "Schedule Consultation".
`;

export const getChatSession = (): Chat => {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment."
    );
  }

  if (!chatSession) {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  const chat = getChatSession();
  return await chat.sendMessageStream({ message });
};
