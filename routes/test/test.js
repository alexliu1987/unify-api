module.exports = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
    reply.send({ url: 'routes/test/test.js', params: '/' })
  })
  fastify.get('/test', async (request, reply) => {
    reply.send({ url: 'routes/test/test.js', params: '/test' })
  })
  fastify.get('*', async (request, reply) => {
    reply.send({ url: 'routes/test/test.js', params: request.params['*'] })
  })

  next()
}
