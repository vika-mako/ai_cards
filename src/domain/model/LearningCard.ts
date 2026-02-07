export interface LearningCard {

}

export class TextAnswerCard implements LearningCard {
    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answer: string
    ) {}
}

export class SingleChoiceCard implements LearningCard {
    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answerVariants: Array<string>,
        public readonly answer: Number
    ) {}
}

export class MultipleChoiceCard implements LearningCard {
    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answerVariants: Array<string>,
        public readonly answer: Array<Number>
    ) {}
}

export class BinaryChoiceCard implements LearningCard {
    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answer: Boolean
    ) {}
}

export class MissingWordCard implements LearningCard {
    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answer: Boolean
    ) {}
}