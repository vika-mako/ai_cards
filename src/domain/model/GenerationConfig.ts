export class TextAnswerCardConfig {
    constructor(
        public readonly amount: Number
    ) {}
}

export class SingleChoiceCardConfig {
    constructor(
        public readonly variantsNumber: Number,
        public readonly amount: Number
    ) {}
}

export class MultipleChoiceConfig {
    constructor(
        public readonly variantsNumber: Number,
        public readonly amount: Number
    ) {}
}

export class BinaryChoiceCardConfig {
    constructor(
        public readonly amount: Number
    ) {}
}

export class MissingWordCardConfig {
    constructor(
        public readonly amount: Number
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