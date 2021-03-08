import path from 'path';
import fastifyStatic from 'fastify-static';
import helmet from 'fastify-helmet';
import dynamicRenderer from './plugins/fastify-dynamic-render';
import fastifyMod from 'fastify';

const fastify = fastifyMod({
  logger: true,
});

fastify.register(dynamicRenderer);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../client'),
});
fastify.register(helmet);

/**
 * to handle direct access url since we serve
 * static file that only recognize root path.
 * e.g: http://localhost:3000/about
 * */
fastify.setNotFoundHandler((_req, res) => {
  res.sendFile('index.html');
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../../public/assets'),
  prefix: '/assets/',
  decorateReply: false, // the reply decorator has been added by the first plugin registration
});

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err.message);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
