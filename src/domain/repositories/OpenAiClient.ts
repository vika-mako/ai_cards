import { GenerationConfig } from "../model/GenerationConfig.js";
import { LearningCard } from "../model/LearningCard.js";

export interface OpenAiClient {
    /**
     * Queries learning cards from OpenAi api
     * @param theme Learning theme
     * @param config Generation configuration
     */
    queryCards(theme: string, config: GenerationConfig): Promise<Array<LearningCard>>;
}
