import { getStatusUseCase } from './domain/usecases/GetStatusUseCase.ts'
import { requestCardsUseCase } from './domain/usecases/RequestCardsUseCase.ts' 

// TODO DI
import { OpenAiClientImpl } from './data/repositories/OpenAiClientImpl.ts'

import Fastify from 'fastify'


const fastify = Fastify({
  logger: true
});


fastify.get('/status', async function handler (request, reply) {
  return await getStatusUseCase();
});

fastify.post('/requestCards', async function handler(request, reply) {
  // TODO validate request scheme
  return await requestCardsUseCase(new OpenAiClientImpl())(request.body.prompt);
});


try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
