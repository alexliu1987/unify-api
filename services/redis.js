const cfg = require('../configs')
const redis = require('redis')

class Client {
  constructor (options) {
    this.opts = Object.assign(
      {
        retry_strategy: () => 'nope' // do not retry
      },
      cfg.redis,
      options
    )
  }

  get (...params) {
    if (!this.connected && !this.connecting) {
      this.createClient()
    }
    return new Promise((resolve, reject) => {
      this.client.get(...params, function (err, result) {
        if (err) {
          return reject(err)
        }
        try {
          result = JSON.parse(result)
          return resolve(result)
        } catch (e) {
          return reject(e)
        }
      })
    })
  }

  set (...params) {
    if (!this.connected && !this.connecting) {
      this.createClient()
    }

    if (typeof params[1] === 'object') {
      params[1] = JSON.stringify(params[1])
    }

    return this.client.set(...params)
  }

  mget (...params) {
    if (!this.connected && !this.connecting) {
      this.createClient()
    }

    return this.client.mget(...params)
  }

  createClient () {
    let client = redis.createClient(this.opts)
    this.connecting = true

    client.on('ready', () => {
      this.connected = true
      this.connecting = false
      console.log('redis ready')
    })

    // client.on('connect', () => {   this.connected = true;   console.log('redis
    // connected'); });

    client.on('reconnecting', data => {
      this.connected = false
      console.log(
        `redis reconnecting: delay ${data.delay}ms, attempt ${data.attempt}`
      )
    })

    client.on('error', err => {
      this.connected = false
      console.log(err)
    })

    client.on('end', () => {
      this.connected = false
      console.log('redis end')
    })

    this.client = client
  }
}

module.exports = new Client()
