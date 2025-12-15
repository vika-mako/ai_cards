import { LearningCard } from "../model/LearningCard.ts";

export interface OpenAiClient {
    /**
     * Queries learning cards from OpenAi api
     * @param number Number of cards produced
     * @param theme Learning theme
     */
    queryCards(number: Number, theme: string): Promise<Array<LearningCard>>;
}
