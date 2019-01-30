module.exports = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
    reply.send({ hello: 'unify-api' });
  });

  next();
};
