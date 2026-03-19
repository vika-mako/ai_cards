import { BinaryChoiceCardConfig, MissingWordCardConfig, MultipleChoiceConfig, SingleChoiceCardConfig, TextAnswerCardConfig } from "../domain/model/GenerationConfig.js";
import { BinaryChoiceCard, LearningCard, MissingWordCard, MultipleChoiceCard, SingleChoiceCard, TextAnswerCard } from "../domain/model/LearningCard.js";

type TextAnswerCardResponse = {
    task: string,
    title: string,
    answer: string
}

type SingleChoiceCardResponse = {
    task: string,
    title: string,
    answerVariants: [string],
    correctAnswer: number
}

type MultipleChoiceCerdResponse = {
    task: string,
    title: string,
    answerVariants: [string],
    correctAnswers: [number]
}

type BinaryChoiceCardResponse = {
    task: string,
    title: string,
    answer: boolean
}

type MissingWordCardResponse = {
    task: string,
    title: string,
    answer: string
}

export class RequestConfig<T extends LearningCard, A> {
    constructor(
        public readonly instructions: String,
        public readonly schema: Object,
        public readonly input: String,
        public readonly decode: (json: A) => T
    ) {}
}

export class ClientConfig {
    constructor(private readonly theme: String) {}

    textAnswerCard = (config: TextAnswerCardConfig) => new RequestConfig(
        "You are a machine, generating learning flashcards. User comes with a request, " + 
        `which contains a leraning theme, he wants to study. You shold return ${config.amount} ` + 
        "learning flashcards. Each card should contain a title, task and a corrcet " + 
        "answer to check",
        {
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
        },
        `Generate ${config.amount} flashcards for theme ${this.theme}. Return them as valid json`,
        (json: TextAnswerCardResponse): TextAnswerCard => new TextAnswerCard(json.title, json.task, json.answer)
    )

    singleChoiceCard = (config: SingleChoiceCardConfig) => new RequestConfig(
        "You are a machine, generating learning flashcards. User comes with a request, " + 
        `which contains a leraning theme, he wants to study. You shold return ${config.amount} ` + 
        `learning flashcards. Each card should contain a title, task, ${config.variantsNumber} ` +
        "answer variants, from which only one is correct. Also thce card should contain the " +
        "index of the correct answer",
        {
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
                                answerVariants: { type: "array", items: { type: "string" } },
                                correctAnswer: { type: "number" }
                            },
                            additionalProperties: false,
                            required: ["task", "title", "answerVariants", "correctAnswer"]
                        }
                    }
                },
                additionalProperties: false,
                required: ["flashcards"]
            }
        },
        `Generate ${config.amount} flashcards for theme ${this.theme}. Return them as valid json`,
        (json: SingleChoiceCardResponse): SingleChoiceCard => new SingleChoiceCard(json.title, json.task, json.answerVariants, json.correctAnswer)
    )

    multipleChoice = (config: MultipleChoiceConfig) => new RequestConfig(
        "You are a machine, generating learning flashcards. User comes with a request, " + 
        `which contains a leraning theme, he wants to study. You shold return ${config.amount} ` + 
        `learning flashcards. Each card should contain a title, task, ${config.variantsNumber} ` +
        "answer variants, from which multiple should be chosen. Also thce card should contain " + 
        "indexes, that should be chosen",
        {
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
                                answerVariants: { type: "array", items: { type: "string" } },
                                correctAnswers: { type: "array", items: { type: "number" } }
                            },
                            additionalProperties: false,
                            required: ["task", "title", "answerVariants", "correctAnswers"]
                        }
                    }
                },
                additionalProperties: false,
                required: ["flashcards"]
            }
        },
        `Generate ${config.amount} flashcards for theme ${this.theme}. Return them as valid json`,
        (json: MultipleChoiceCerdResponse): MultipleChoiceCard => new MultipleChoiceCard(json.title, json.task, json.answerVariants, json.correctAnswers)
    )

    binaryChoiceCard = (config: BinaryChoiceCardConfig) => new RequestConfig(
        "You are a machine, generating learning flashcards. User comes with a request, " + 
        `which contains a leraning theme, he wants to study. You shold return ${config.amount} ` + 
        "learning flashcards. Each card should contain a title, task on yes or no, and " + 
        "a boolean answer, which is true for yes, false for no",
        {
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
                                answer: { type: "boolean" }
                            },
                            additionalProperties: false,
                            required: ["task", "title", "answer"]
                        }
                    }
                },
                additionalProperties: false,
                required: ["flashcards"]
            }
        },
        `Generate ${config.amount} flashcards for theme ${this.theme}. Return them as valid json`,
        (json: BinaryChoiceCardResponse): BinaryChoiceCard => new BinaryChoiceCard(json.title, json.task, json.answer)
    )

    missingWordCardConfig = (config: MissingWordCardConfig) => new RequestConfig(
        "You are a machine, generating learning flashcards. User comes with a request, " + 
        `which contains a leraning theme, he wants to study. You shold return ${config.amount} ` + 
        "learning flashcards. Each card should contain a title, task, and an answer for this " + 
        "task, which is single concrete word",
        {
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
                                answer: { type: "string" }
                            },
                            additionalProperties: false,
                            required: ["task", "title", "answer"]
                        }
                    }
                },
                additionalProperties: false,
                required: ["flashcards"]
            }
        },
        `Generate ${config.amount} flashcards for theme ${this.theme}. Return them as valid json`,
        (json: MissingWordCardResponse): MissingWordCard => new MissingWordCard(json.title, json.task, json.answer)
    )
}