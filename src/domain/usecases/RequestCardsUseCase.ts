import { LearningCard } from "../model/LearningCard.ts";
import { OpenAiClient } from "../repositories/OpenAiClient.ts";

export const requestCardsUseCase = (
    openAiClient: OpenAiClient
): (prompt: string) => Promise<LearningCard[]> => 
    async (prompt: string) => {
        return await openAiClient.queryCards(5, prompt)
    };