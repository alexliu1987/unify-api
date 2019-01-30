const requireDirectory = require('require-directory')
const cfg = require('../configs')
const routes = requireDirectory(module, `../${cfg.routeDir}`)

module.exports = (fastify, opts, next) => {
  register(fastify)
  next()
}

/**
 * 自动注册路由
 * 注册routes下的所有路由文件
 * index.js会注册为/路由
 * 其它路由文件以文件名作为路由(例:test.js注册为/test)
 * @param {object} fastify fastify对象
 * @param {array} prefix 当前路由前缀
 */
function register (fastify, prefix = []) {
  let currRoute = prefix.reduce((r, p) => r[p], routes)
  Object
    .entries(currRoute)
    .map(([k, v]) => {
      switch (typeof v) {
        case 'object':
          register(fastify, prefix.concat(k))
          break
        case 'function':
          let p = ''
          if (prefix.length) {
            p = prefix.reduce((pre, curr) => `${pre}/${curr}`, '')
          }
          if (k !== 'index') {
            p += `/${k}`
          }
          fastify.register(v, { prefix: p })
          console.log('register route:', p)
          break
        default:
          console.error('invalid route')
          break
      }
    })
}
