import test from 'node:test';
import assert from 'assert';
import { OpenAiClientImpl } from '../src/data/repositories/OpenAiClientImpl';
import { BinaryChoiceCardConfig, GenerationConfig, MissingWordCardConfig, MultipleChoiceConfig, SingleChoiceCardConfig, TextAnswerCardConfig } from '../src/domain/model/GenerationConfig';
import { SingleChoiceCard, TextAnswerCard } from '../src/domain/model/LearningCard';

test('OpenAiClient text answer card generation test', async () => {
    const client = new OpenAiClientImpl();

    const cards = await client.queryCards("физика", new GenerationConfig(
        new TextAnswerCardConfig(4),
        new SingleChoiceCardConfig(4, 2),
        new MultipleChoiceConfig(4, 2),
        new BinaryChoiceCardConfig(4),
        new MissingWordCardConfig(4)
    ));

    assert.equal(cards.filter((it) => it instanceof TextAnswerCard).length, 4);
    assert.equal(cards.filter((it) => it instanceof SingleChoiceCard).length, 2);
    assert.equal(cards.length, 16);
});