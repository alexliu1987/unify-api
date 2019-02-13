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
 * @param {Number} type 模型类型 1-实体模型 2-自定义模型(type表示类型)
 */
function create(model, type = 1) {
  if (!model) {
    throw 'invalid schema';
  }
  let schema = {
    createAt: 'Moment',
    updateAt: 'Moment'
  };
  Object.entries(model).map(([k, v]) => {
    if (!['_id', 'createAt', 'updateAt'].includes(k)) {
      schema[k] = type === 1 ? v.constructor.name : v.type;
    }
  });
  return schema;
}

async function get(collection) {
  if (_cache[collection]) {
    return _cache[collection];
  }
  let schema = await redis.get(`schema-${collection}`);
  if (schema) {
    _cache[collection] = mongoose.model(
      collection,
      new mongoose.Schema(schema)
    );
    return _cache[collection];
  }
  schema = create(
    collection.split('-').reduce((res, item) => res[item], Model)
  );
  return set(collection, schema);
}

function set(collection, schema) {
  redis.set(`schema-${collection}`, schema, () => {});
  return (_cache[collection] = mongoose.model(
    collection,
    new mongoose.Schema(schema)
  ));
}
