import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa o cliente Gemini com a chave de API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo Gemini 1.5 Flash
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função para gerar o alt text
export default async function gerarDescricaoComGemini(imageBuffer) {
    // Prompt para gerar alt text em português do Brasil
    const prompt = "Gere um alt text em português do Brasil para a seguinte imagem";

    try {
        // Prepara a imagem para envio ao modelo
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png"
            }
        };

        // Chama o modelo para gerar o texto
        const res = await model.generateContent([prompt, image]);

        // Retorna o texto gerado ou uma mensagem padrão
        return res.response.text() || "Alt-text não disponível.";
    } catch (error) {
        // Trata erros e retorna uma mensagem de erro personalizada
        console.error("Erro ao obter alt-text:", error.message, error);
        throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}