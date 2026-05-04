import { GoogleGenAI } from "@google/genai";

// Initialization with environment variable as per gemini-api skill
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Handle Gemini Errors specifically
function handleGeminiError(error: any, context: string): string {
  console.error(`Gemini API Error [${context}]:`, error);
  
  const errorMsg = error?.message?.toLowerCase() || "";
  const statusCode = error?.status || error?.response?.status || 0;

  // 429 - Quota / Rate Limit
  if (statusCode === 429 || errorMsg.includes("quota") || errorMsg.includes("429") || errorMsg.includes("rate limit") || errorMsg.includes("exhausted")) {
    return "🚀 System AI osiągnął swój chwilowy limit darmowych zapytań (Quota Exhausted). Spróbuj ponownie za około 60 sekund. To ograniczenie darmowej wersji API Google Gemini.";
  }

  // 403 / 401 - Auth / Permissions
  if (statusCode === 403 || statusCode === 401 || errorMsg.includes("api key") || errorMsg.includes("unauthorized") || errorMsg.includes("permission denied") || errorMsg.includes("invalid api key")) {
    return "🔑 Błąd autoryzacji: Klucz API OmniAgenta jest nieaktywny lub wygasł. Skontaktuj się z administratorem platformy w celu aktualizacji poświadczeń.";
  }

  // Safety issues
  if (errorMsg.includes("safety") || errorMsg.includes("blocked") || errorMsg.includes("candidate") || errorMsg.includes("finish_reason_safety")) {
    return "🛡️ Twoja wiadomość lub wygenerowana odpowiedź została zablokowana przez filtry bezpieczeństwa AI. Staraj się unikać treści kontrowersyjnych lub zapytaj w sposób bardziej neutralny.";
  }

  // Network issues
  if (errorMsg.includes("network") || errorMsg.includes("fetch") || errorMsg.includes("offline") || errorMsg.includes("connection") || errorMsg.includes("failed to fetch")) {
    return "🌐 Ups! Wygląda na to, że masz problem z połączeniem internetowym lub serwery AI są tymczasowo niedostępne. Sprawdź swoje łącze i spróbuj odświeżyć stronę.";
  }

  // Model issues
  if (errorMsg.includes("model") || errorMsg.includes("not found")) {
    return "⚙️ Błąd konfiguracji: Model AI o nazwie 'gemini-3-flash-preview' nie został odnaleziony lub jest w trakcie przebudowy.";
  }

  // Default
  return `🤖 OmniAgent napotkał nieznany problem techniczny (${context}). Kod błędu: ${statusCode || 'unk'}. Spróbuj ponownie za chwilę.`;
}

export async function smartSearch(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jako asystent marketplace OmniMarket AI, przeanalizuj zapytanie użytkownika i zwróć obiekt JSON (bez znaczników markdown) zawierający:
      - category: najbardziej pasująca kategoria z (Electronics, Clothing, Home, Automotive, Services, Hobbies, Agriculture, Military)
      - tags: lista 3-5 tagów
      - intent: (search, sell, help)
      - normalized_query: poprawiona gramatycznie i merytorycznie nazwa przedmiotu
      Zapytanie: "${query}"`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    handleGeminiError(error, "Smart Search");
    return null;
  }
}

export async function generateProductImage(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Professional product photography of ${prompt}, high-end commercial quality, clean white background, 8k resolution` }],
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    handleGeminiError(error, "Image Gen");
    return null;
  }
}

export async function getAIAssistantResponse(message: string, context?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `Jesteś OmniAgentem - wielozadaniowym robotem wspierającym użytkowników marketplace OmniMarket. 
        Twoje zadania:
        - Pomoc w szukaniu okazji.
        - Doradzanie w wystawianiu ofert.
        - Tłumaczenie jak działają boty automatyczne.
        - Bycie uprzejmym i profesjonalnym.
        ${context ? `Kontekst: ${context}` : ''}`
      }
    });

    return response.text;
  } catch (error: any) {
    return handleGeminiError(error, "Assistant");
  }
}
