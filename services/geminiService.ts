import { Flashcard, MCQ } from "../types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const generateMCQs = async (model: string, text: string, language: string, difficulty: string): Promise<MCQ[]> => {
    console.log("Simulating MCQ generation for", { model, language, difficulty, text: text.substring(0, 50) });
    await delay(1500);
    return [
        {
            question: "Based on the text, what is the 'powerhouse of the cell'?",
            options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
            correctAnswer: "Mitochondria",
            explanation: "Mitochondria are responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
        },
        {
            question: "According to the material, what is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: "Paris",
            explanation: "Paris is the capital and most populous city of France, as stated in the geographical section."
        }
    ];
};

export const generatePersonalizedStudyGuide = async (model: string, text: string, incorrectMCQs: MCQ[], language: string): Promise<string> => {
    console.log("Simulating personalized study guide generation", { model, language, incorrectMCQs, text: text.substring(0, 50) });
    await delay(1500);
    const topics = incorrectMCQs.map(mcq => mcq.question).join('", "');
    return `Based on your incorrect answers to questions like "${topics}", you should focus on the following topics:\n\n- **Review Core Concepts**: Re-read the sections of your notes related to these questions. Pay close attention to the definitions and examples provided.\n\n- **Practice Application**: Try to create your own examples or scenarios where these concepts apply. This will help solidify your understanding.\n\n- **General Tip**: Re-read the summary to get a better overview of how these concepts connect to the broader subject.`;
};

export const transcribeAudio = async (model: string, base64Data: string, mimeType: string): Promise<string> => {
    console.log("Simulating audio transcription", { model, mimeType });
    await delay(2000);
    return "This is a simulated transcription of the provided audio file. It discusses various important topics that can be summarized or turned into flashcards. The main point is that simulation is a powerful tool for development, and transcribing audio allows for deeper analysis of spoken content.";
};

export const generateSummary = async (model: string, text: string, language: string): Promise<string> => {
  console.log("Simulating summary generation", { model, language, text: text.substring(0, 50) });
  await delay(1000);
  return `This is a simulated summary of the provided text, generated in ${language}. The text covers several key areas, and this summary provides a high-level overview of the most critical points, making it easier to digest and review the material.`;
};

export const generateFlashcards = async (model: string, text: string, language: string): Promise<Flashcard[]> => {
    console.log("Simulating flashcard generation", { model, language, text: text.substring(0, 50) });
    await delay(1200);
    return [
        { question: "What is the primary subject of the text?", answer: "The text is about the power of simulation in software development." },
        { question: "What is a key benefit mentioned in the transcription?", answer: "A key benefit is faster development cycles and easier testing of complex systems." }
    ];
};

export const generateAnswer = async (model: string, context: string, question: string, language: string): Promise<string> => {
    console.log("Simulating QA generation", { model, language, context: context.substring(0, 50), question });
    await delay(800);
    return `Based on the provided text, the answer to your question "${question}" is that simulation is indeed a very powerful and effective tool for analysis.`;
};

export const performSemanticSearch = async (model: string, text: string, query: string, topK: number): Promise<string[]> => {
    console.log("Simulating semantic search", { model, query, topK, text: text.substring(0, 50) });
    await delay(700);
    return Array.from({ length: topK }, (_, i) => `This is simulated search result #${i + 1} for your query "${query}". It has been identified as highly relevant to the context of your document based on semantic meaning, not just keywords.`);
};
