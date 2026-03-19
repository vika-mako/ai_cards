export interface LearningCard {

}

export class TextAnswerCard implements LearningCard {
    public readonly type: string = "TextAnswerCard";

    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answer: string
    ) {}
}

export class SingleChoiceCard implements LearningCard {
    public readonly type: string = "SingleChoiceCard";

    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answerVariants: Array<string>,
        public readonly answer: Number
    ) {}
}

export class MultipleChoiceCard implements LearningCard {
    public readonly type: string = "MultipleChoiceCard";

    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answerVariants: Array<string>,
        public readonly answer: Array<Number>
    ) {}
}

export class BinaryChoiceCard implements LearningCard {
    public readonly type: string = "BinaryChoiceCard";

    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answer: Boolean
    ) {}
}

export class MissingWordCard implements LearningCard {
    public readonly type: string = "MissingWordCard";

    constructor(
        public readonly title: string,
        public readonly task: string,
        public readonly answer: string
    ) {}
}