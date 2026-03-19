export class TextAnswerCardConfig {
    constructor(
        public readonly amount: number
    ) {}
}

export class SingleChoiceCardConfig {
    constructor(
        public readonly variantsNumber: number,
        public readonly amount: number
    ) {}
}

export class MultipleChoiceConfig {
    constructor(
        public readonly variantsNumber: number,
        public readonly amount: number
    ) {}
}

export class BinaryChoiceCardConfig {
    constructor(
        public readonly amount: number
    ) {}
}

export class MissingWordCardConfig {
    constructor(
        public readonly amount: number
    ) {}
}

export class GenerationConfig {
    constructor(
        public readonly textAnswerCardConfig: TextAnswerCardConfig,
        public readonly singleChoiceCardConfig: SingleChoiceCardConfig,
        public readonly multipleChoiceConfig: MultipleChoiceConfig,
        public readonly binaryChoiceCardConfig: BinaryChoiceCardConfig,
        public readonly missingWordCardConfig: MissingWordCardConfig,
    ) {}
}