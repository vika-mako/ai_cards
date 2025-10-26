import test from 'node:test';
import assert from 'assert';

test('server status test', async (t) => {
    const response = await fetch('http://localhost:3000/status', {
        method: 'GET',
    });
    const data = await response.json();
    assert.deepStrictEqual(data, {});
});
