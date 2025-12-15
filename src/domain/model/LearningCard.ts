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
        public readonly responseVariants: Array<string>,
        public readonly correctResponse: Number
    ) {}
}
