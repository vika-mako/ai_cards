import Fastify from 'fastify'

import { apiV1Routes } from './routes.js';

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;


const fastify = Fastify({ logger: true });

fastify.register(apiV1Routes, { prefix: '/api/v1' });


try {
  await fastify.listen({ host: HOST, port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
