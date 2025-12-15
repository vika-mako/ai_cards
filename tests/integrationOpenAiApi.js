import test from 'node:test';
import assert from 'assert';
import { OpenAiClientImpl } from '../src/data/repositories/OpenAiClientImpl';

test('OpenAiClient text answer card generation test', async () => {
    const client = new OpenAiClientImpl();

    const cards = await client.queryCards(5, "физика");

    console.log(cards);
    assert.equal(cards.length, 5);
});