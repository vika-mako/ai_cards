import { getStatusUseCase } from './domain/usecases/GetStatusUseCase.js'
import { requestCardsUseCase } from './domain/usecases/RequestCardsUseCase.js' 

import { FastifyInstance } from "fastify"

// TODO DI
import { OpenAiClientImpl } from './data/repositories/OpenAiClientImpl.js'

export async function apiV1Routes(app: FastifyInstance) {
  app.get('/status', async function handler (request, reply) {
    return await getStatusUseCase();
  });
  
  app.post('/requestCards', async function handler(request: any, reply) {
    // TODO validate request scheme
    return await requestCardsUseCase(new OpenAiClientImpl())(request.body.prompt);
  });
}