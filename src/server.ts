import { getStatusUseCase } from './domain/usecases/GetStatusUseCase.js'
import { requestCardsUseCase } from './domain/usecases/RequestCardsUseCase.js' 

// TODO DI
import { OpenAiClientImpl } from './data/repositories/OpenAiClientImpl.js'

import Fastify from 'fastify'

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;


const fastify = Fastify({
  logger: true
});


fastify.get('/status', async function handler (request, reply) {
  return await getStatusUseCase();
});

fastify.post('/requestCards', async function handler(request: any, reply) {
  // TODO validate request scheme
  return await requestCardsUseCase(new OpenAiClientImpl())(request.body.prompt);
});


try {
  await fastify.listen({ host: HOST, port: PORT })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
