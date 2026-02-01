import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const parseSyllabus = async (base64Image: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      Analyze this image of a university syllabus/schedule.
      Extract the class schedule events into a strict JSON array.
      Return ONLY the JSON. Do not include markdown code blocks.
      
      Format:
      [
        {
          "subject": "Course Name",
          "day": "Monday" (Full day name),
          "start_time": "HH:MM" (24-hour format),
          "end_time": "HH:MM" (24-hour format),
          "location": "Room Number" (or null)
        }
      ]
    `;

    const image = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown if Gemini adds it
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    throw error;
  }
};
