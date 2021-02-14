const path = require('path');
const fastifyStatic = require('fastify-static');
const helmet = require('fastify-helmet');
const dynamicRender = require('./plugins/fastify-dynamic-render');

const fastify = require('fastify')({
  logger: true,
});

fastify.register(dynamicRender);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'dist'),
  prefix: '/'
});
fastify.register(helmet);

fastify.setNotFoundHandler((_req, res) => {
  try {
    res.sendFile('index.html');
  }
  catch (e) {
    console.log(e);
  }
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public/assets'),
  prefix: '/assets/',
  decorateReply: false // the reply decorator has been added by the first plugin registration
})

fastify.listen(3000, function(err, address){
  if(err){
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});