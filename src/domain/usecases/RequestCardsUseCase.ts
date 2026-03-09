import { BinaryChoiceCardConfig, GenerationConfig, MissingWordCardConfig, MultipleChoiceConfig, SingleChoiceCardConfig, TextAnswerCardConfig } from "../model/GenerationConfig.js";
import { LearningCard } from "../model/LearningCard.js";
import { OpenAiClient } from "../repositories/OpenAiClient.js";

export const requestCardsUseCase = (
    openAiClient: OpenAiClient
): (prompt: string) => Promise<LearningCard[]> => 
    async (prompt: string) => {
        return await openAiClient.queryCards(prompt, new GenerationConfig(
        new TextAnswerCardConfig(4),
        new SingleChoiceCardConfig(4, 2),
        new MultipleChoiceConfig(4, 2),
        new BinaryChoiceCardConfig(4),
        new MissingWordCardConfig(4)
    ))
    };