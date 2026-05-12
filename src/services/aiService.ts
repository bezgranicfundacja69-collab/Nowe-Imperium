import { GoogleGenAI } from "@google/genai";

// Initialization with environment variable as per gemini-api skill
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Handle Gemini Errors specifically
function handleGeminiError(error: any, context: string): string {
  console.error(`Gemini API Error [${context}]:`, error);
  
  const errorMsg = error?.message?.toLowerCase() || "";
  let statusCode = error?.status || error?.response?.status;
  
  // Try to parse status code from message if not available
  if (!statusCode) {
    const codeMatch = errorMsg.match(/(\d{3})/);
    if (codeMatch) statusCode = parseInt(codeMatch[1]);
  }

  // 1. Quota / Rate Limit (429)
  if (statusCode === 429 || errorMsg.includes("quota") || errorMsg.includes("rate limit") || errorMsg.includes("exhausted") || errorMsg.includes("too many requests")) {
    return "🚀 Limit zapytań wyczerpany (Quota Exhausted). Darmowa wersja Gemini ma ograniczoną przepustowość. Spróbuj ponownie za około 60 sekund.";
  }

  // 2. Auth / API Key (401, 403)
  if (statusCode === 401 || statusCode === 403 || errorMsg.includes("api key") || errorMsg.includes("unauthorized") || errorMsg.includes("permission denied") || errorMsg.includes("invalid api key")) {
    return "🔑 Błąd autoryzacji: Problem z kluczem API imperiumAgenta. Klucz może być nieaktywny lub nieprawidłowy. Skonfiguruj go w ustawieniach systemowych.";
  }

  // 3. Safety / Filters (Blocked content)
  if (errorMsg.includes("safety") || errorMsg.includes("blocked") || errorMsg.includes("finish_reason_safety") || errorMsg.includes("candidate") || errorMsg.includes("harmful")) {
    return "🛡️ Treść zablokowana przez filtry bezpieczeństwa AI. Zapytanie lub odpowiedź narusza standardy (np. zakazane tematy, nękanie).";
  }

  // 4. Server / Overloaded (500, 503, 504)
  if (statusCode >= 500 || errorMsg.includes("overloaded") || errorMsg.includes("service unavailable") || errorMsg.includes("internal error") || errorMsg.includes("deadline exceeded")) {
    return "☁️ Serwery AI są obecnie przeciążone lub Google Gemini ma przerwę techniczną. Proszę spróbować ponownie za kilkanaście sekund.";
  }

  // 5. Network / Connectivity
  if (errorMsg.includes("network") || errorMsg.includes("fetch") || errorMsg.includes("offline") || errorMsg.includes("connection failed") || errorMsg.includes("failed to fetch")) {
    return "🌐 Błąd połączenia sieciowego. Nie udało się skontaktować z serwerami Google Gemini. Sprawdź swoje połączenie internetowe.";
  }

  // 6. Model Availability / Configuration (404, 400)
  if (statusCode === 404 || errorMsg.includes("model not found") || errorMsg.includes("not found")) {
    return "⚙️ Błąd konfiguracji: Wybrany model AI (gemini-3-flash-preview) nie jest obecnie dostępny. Prawdopodobnie trwa aktualizacja.";
  }

  if (statusCode === 400 || errorMsg.includes("invalid argument") || errorMsg.includes("request is malformed")) {
    return "❌ Nieprawidłowe zapytanie. AI nie potrafi zinterpretować tych danych lub zapytanie jest zbyt długie. Spróbuj sformułować je inaczej.";
  }

  // Default fallback
  return `🤖 imperiumAgent napotkał nieoczekiwany problem (${context}). Błąd: ${error?.message || 'Brak opisu'}. Kod: ${statusCode || 'UNK'}.`;
}

export async function smartSearch(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jako asystent marketplace noweimperium AI, przeanalizuj zapytanie użytkownika i zwróć obiekt JSON (bez znaczników markdown) zawierający:
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
        systemInstruction: `Jesteś imperiumAgentem - wielozadaniowym robotem wspierającym użytkowników marketplace noweimperium. 
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

export async function analyzeMarket(category: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jako analityk rynkowy noweimperium AI, przeprowadź dogłębną analizę kategorii: "${category}". 
      Zwróć obiekt JSON zawierający:
      - trends: lista 3 aktualnych trendów
      - popular_products: lista 3 produktów o wysokim popycie
      - price_strategy: sugestia strategii cenowej (np. premium, budget-entry)
      - saturation: poziom nasycenia rynku (1-100)
      - recommendation: krótka rekomendacja dla sprzedawcy`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    handleGeminiError(error, "Market Analysis");
    return null;
  }
}

export async function generateMarketingCampaign(productTitle: string, description: string, price: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jako specjalista ds. marketingu noweimperium AI, stwórz kampanię dla:
      Tytuł: ${productTitle}
      Opis: ${description}
      Cena: ${price}
      
      Zwróć obiekt JSON zawierający:
      - ad_copy_short: krótki chwytliwy tekst reklamowy (max 160 znaków)
      - ad_copy_long: dłuższy tekst perswazyjny
      - target_audience: opis grupy docelowej
      - channels: lista sugerowanych kanałów (max 3)
      - hashtags: lista 5 hashtagów`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    handleGeminiError(error, "Marketing Campaign");
    return null;
  }
}

export async function generateAffiliateContent(niche: string, strategy: 'aggressive' | 'passive') {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Jako ekspert marketingu afiliacyjnego noweimperium AI, stwórz perswazyjną treść reklamową dla niszy: "${niche}". 
      Strategia: ${strategy === 'aggressive' ? 'agresywna (FOMO, silne Call to Action, emocjonalne nagłówki)' : 'pasywna (informacyjna, merytoryczna, budująca zaufanie)'}.
      
      Zwróć obiekt JSON zawierający:
      - title: przyciągający uwagę nagłówek
      - body: główna treść posta/reklamy
      - call_to_action: silne wezwanie do działania
      - suggested_link_text: tekst dla linku afiliacyjnego
      - hashtags: lista 5 hashtagów`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    handleGeminiError(error, "Affiliate Content Gen");
    return null;
  }
}
