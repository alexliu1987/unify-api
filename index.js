require('./services/mongoose');
require('./services/redis');
const log = require('./services/log');
const fastify = require('fastify')({ logger: log });
const helmet = require('fastify-helmet');
const router = require('./middlewares/router');

// 注册helmet中间件
fastify.register(helmet);

// 注册路由
fastify.register(router);

fastify.listen(8081);
