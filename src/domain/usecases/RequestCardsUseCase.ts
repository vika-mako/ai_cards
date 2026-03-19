import { BinaryChoiceCardConfig, GenerationConfig, MissingWordCardConfig, MultipleChoiceConfig, SingleChoiceCardConfig, TextAnswerCardConfig } from "../model/GenerationConfig.js";
import { LearningCard } from "../model/LearningCard.js";
import { OpenAiClient } from "../repositories/OpenAiClient.js";

export const requestCardsUseCase = (
    openAiClient: OpenAiClient
): (prompt: string, config: GenerationConfig) => Promise<LearningCard[]> => 
    async (prompt: string, config: GenerationConfig) => {
        return await openAiClient.queryCards(prompt, config)
    };