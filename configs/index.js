module.exports = Object.assign(
  {
    model: '../../unify-admin/src/model/',
    routeDir: 'routes',
    pino: { level: 'info' },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      prefix: 'unify-'
    },
    mongo: {
      host: 'mongodb://localhost/unify'
    }
  },
  require('./' + (process.env.NODE_ENV || 'development') + '.js') || {}
);
