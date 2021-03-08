import {FastifyInstance, FastifyPluginOptions, FastifyError} from 'fastify';
import fp from 'fastify-plugin';
import checkCrawler from '../hooks/checkCrawler';

export default fp(
  function (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    next: (error?: FastifyError) => void,
  ): void {
    fastify.addHook('onRequest', checkCrawler);

    next();
  },
  {
    fastify: '3.x',
    name: 'fastify-dynamic-render',
  },
);
