const mongoose = require('mongoose');
const redis = require('./redis');
const cfg = require('../configs/index');
const Model = require('../model');
let _cache = {};

module.exports = {
  get,
  set
};

/**
 * 创建schema
 * @param {Object} model 模型对象
 */
function create(model) {
  if (!model) {
    throw 'invalid schema';
  }
  let schema = {
    createAt: 'Moment',
    updateAt: 'Moment'
  };
  Object.entries(model).map(([k, v]) => {
    if (!['_id', 'createAt', 'updateAt'].includes(k)) {
      schema[k] = v.type;
    }
  });
  return schema;
}

async function get(collection) {
  if (_cache[collection]) {
    return _cache[collection];
  }
  let schema = create(
    collection.split('-').reduce((res, item) => res[item], Model)
  );
  return set(collection, schema);
}

function set(collection, schema) {
  return (_cache[collection] = mongoose.model(
    collection,
    new mongoose.Schema(schema)
  ));
}
