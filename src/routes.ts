import { getStatusUseCase } from './domain/usecases/GetStatusUseCase.js'
import { requestCardsUseCase } from './domain/usecases/RequestCardsUseCase.js' 

import { FastifyInstance } from "fastify"

// TODO DI
import { OpenAiClientImpl } from './data/repositories/OpenAiClientImpl.js'

const generationBodySchema = {
  type: 'object',
  required: ['prompt', 'config'],
  properties: {
    prompt: { type: 'string' },
    config: {
      type: 'object',
      required: [
        'textAnswerCardConfig',
        'singleChoiceCardConfig',
        'multipleChoiceConfig',
        'binaryChoiceCardConfig',
        'missingWordCardConfig'
      ],
      properties: {
        textAnswerCardConfig: {
          type: 'object',
          required: ['amount'],
          properties: {
            amount: { type: 'integer' }
          }
        },
        singleChoiceCardConfig: {
          type: 'object',
          required: ['variantsNumber', 'amount'],
          properties: {
            variantsNumber: { type: 'integer' },
            amount: { type: 'integer' }
          }
        },
        multipleChoiceConfig: {
          type: 'object',
          required: ['variantsNumber', 'amount'],
          properties: {
            variantsNumber: { type: 'integer' },
            amount: { type: 'integer' }
          }
        },
        binaryChoiceCardConfig: {
          type: 'object',
          required: ['amount'],
          properties: {
            amount: { type: 'integer' }
          }
        },
        missingWordCardConfig: {
          type: 'object',
          required: ['amount'],
          properties: {
            amount: { type: 'integer' }
          }
        }
      }
    }
  }
};

export async function apiV1Routes(app: FastifyInstance) {
  app.get('/status', async function handler (request, reply) {
    return await getStatusUseCase();
  });
  
  app.post(
    '/requestCards',
    {
      schema: {
        tags: ['generation'],
        summary: 'Generate cards',
        body: generationBodySchema
      }
    },
    async function handler(request: any, reply) {
      return await requestCardsUseCase(new OpenAiClientImpl())(request.body.prompt, request.body.config);
    }
  );
}