import { GenerationConfig } from "../model/GenerationConfig.ts";
import { LearningCard } from "../model/LearningCard.ts";

export interface OpenAiClient {
    /**
     * Queries learning cards from OpenAi api
     * @param theme Learning theme
     * @param config Generation configuration
     */
    queryCards(theme: string, config: GenerationConfig): Promise<Array<LearningCard>>;
}
