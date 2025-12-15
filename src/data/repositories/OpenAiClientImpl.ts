import { LearningCard, TextAnswerCard } from "../../domain/model/LearningCard.ts";
import { OpenAiClient } from "../../domain/repositories/OpenAiClient.ts";

const INSTRUCTIONS = "You are a machine, generating learning flashcards. User comes with a request, " + 
"which contains number of cards and leraning theme, he wants to study. You shold return the " + 
"requested number of learning flashcards. Each card should contain a title, task and a corrcet answer to check"

export class OpenAiClientImpl implements OpenAiClient {
    async queryCards(number: Number, theme: string): Promise<Array<LearningCard>> {
        const apiResponse = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                instructions: INSTRUCTIONS,
                //text: {format: { type: "json_object" }},
                text: { format: {
                    type: "json_schema",
                    strict: true,
                    name: "flashcards",
                    schema: {
                        type: "object",
                        properties: {
                            flashcards: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        task: { type: "string" },
                                        title: { type: "string" },
                                        answer: { type: "string" },
                                    },
                                    additionalProperties: false,
                                    required: ["task", "title", "answer"]
                                }
                            }
                        },
                        additionalProperties: false,
                        required: ["flashcards"]
                    }
                } },
                input: `Generate ${number} flashcards for theme ${theme}. Return them as valid json`
            })
        });
        if (apiResponse.status != 200) {
            // TODO handle api request error
            throw new Error("Api request error");
        }
        const response = await apiResponse.json();
        const cardsObject = JSON.parse(response.output[0].content[0].text)
        return cardsObject.flashcards.map((it: Object) => new TextAnswerCard(it.title, it.task, it.answer));
    }
}
