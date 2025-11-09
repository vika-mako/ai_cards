import { getStatusUseCase } from './domain/usecases/getStatusUseCase.ts'


import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})


fastify.get('/status', async function handler (request, reply) {
  return await getStatusUseCase() 
})


try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
