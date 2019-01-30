module.exports = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
    reply.send('this is routes/test/index.js')
  })

  next()
}
