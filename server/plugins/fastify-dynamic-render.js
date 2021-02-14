const fp = require('fastify-plugin');
const checkCrawler = require('../hooks/checkCrawler');

module.exports = fp(function (fastify, _options, next) {
  fastify.addHook('onRequest', checkCrawler);

  next();
}, {
  fastify: '3.x',
  name: 'fastify-dynamic-render'
});