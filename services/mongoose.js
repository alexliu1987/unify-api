const cfg = require('../configs')
const mongoose = require('mongoose')
require('mongoose-moment')(mongoose)
mongoose.Promise = Promise
mongoose.connect(cfg.mongo.host)
let db = mongoose.connection
db.once('open', console.log.bind(console, 'mongo connection success.'))
db.on('error', err => {
  console.error.bind(console, `mongo connection error: ${err}`)
  process.exit(-1)
})

module.exports = db
