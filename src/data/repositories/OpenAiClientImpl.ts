import { GenerationConfig } from "../../domain/model/GenerationConfig.js";
import { LearningCard, TextAnswerCard } from "../../domain/model/LearningCard.js";
import { OpenAiClient } from "../../domain/repositories/OpenAiClient.js";
import { ClientConfig, RequestConfig } from "../ClientConfig.js";

export class OpenAiClientImpl implements OpenAiClient {
    async queryCards(theme: string, config: GenerationConfig): Promise<Array<LearningCard>> {
        const globalConfig = new ClientConfig(theme);

        const configs: Array<RequestConfig<any, any>> = []
        if (config.textAnswerCardConfig.amount > 0)
            configs.push(globalConfig.textAnswerCard(config.textAnswerCardConfig))
        if (config.singleChoiceCardConfig.amount > 0)
            configs.push(globalConfig.singleChoiceCard(config.singleChoiceCardConfig))
        if (config.multipleChoiceConfig.amount > 0)
            configs.push(globalConfig.multipleChoice(config.multipleChoiceConfig))
        if (config.binaryChoiceCardConfig.amount > 0)
            configs.push(globalConfig.binaryChoiceCard(config.binaryChoiceCardConfig))
        if (config.missingWordCardConfig.amount > 0)
            configs.push(globalConfig.missingWordCardConfig(config.missingWordCardConfig))

        return (await Promise.all(configs.map((it) => this.request(it)))).flat();
    }

    private async request(config: RequestConfig<any, any>): Promise<Array<LearningCard>> {
        const apiResponse = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                instructions: config.instructions,
                text: {format: config.schema },
                input: config.input
            })
        });

        if (apiResponse.status != 200) {
            console.log(await apiResponse.json());
            // TODO handle api request error
            throw new Error("Api request error");
        }

        const response = await apiResponse.json();
        const cardsObject = JSON.parse(response.output[0].content[0].text)
        
        return cardsObject.flashcards.map(config.decode);
    }
}
