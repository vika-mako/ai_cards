import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'AiCards API',
        description: 'API documentation',
        version: '0.0.1'
      }
    }
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs'
  })
}