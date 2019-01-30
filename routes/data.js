const schema = require('../services/schema');
const moment = require('moment');
const func = require('../functions');
module.exports = (fastify, opts, next) => {
  let option = {
    // 预处理
    beforeHandler: async (request, reply) => {
      // 从路由中解析集合名称&主键id
      let params = request.params['*'].split('/').filter(p => p);
      if (params.length < 1) {
        return reply.code(400).send();
      }
      request.model = {
        collection: params[0],
        id: params.length > 1 ? params[1] : null
      };
      // PUT/DELETE必须传id
      if (
        ['PUT', 'DELETE'].includes(request.req.method.toUpperCase()) &&
        !request.model.id
      ) {
        return reply.code(400).send();
      }
    }
  };
  // 查询
  fastify.get('/*', option, async (request, reply) => {
    try {
      let Model = await schema.get(request.model.collection);
      let res;
      if (request.model.id) {
        res = await Model.findById(request.model.id);
      } else {
        let query = request.query;
        let { pageIndex = 1, pageSize = 10 } = query;
        delete query.pageIndex;
        delete query.pageSize;
        let [count, list = []] = await Promise.all([
          Model.count(query),
          Model.find(query, null, {
            skip: (+pageIndex - 1) * +pageSize,
            limit: +pageSize
          })
        ]);
        res = {
          pageInfo: func.util.getPageInfo(+pageIndex, +pageSize, count),
          list
        };
      }
      reply.send(func.util.response(res));
    } catch (ex) {
      reply.send(func.util.response([]));
    }
  });
  // 新增
  fastify.post('/*', option, async (request, reply) => {
    let Model = await schema.get(request.model.collection, request.body);
    let data = request.body;
    delete data._id;
    data.createAt = moment();
    data.updateAt = moment();
    let model = new Model(data);
    try {
      await model.save();
      reply.send(func.util.response(model));
    } catch (ex) {
      reply.send(func.util.response('9999999', ex));
    }
  });
  // 修改
  fastify.put('/*', option, async (request, reply) => {
    let Model = await schema.get(request.model.collection);
    let model = await Model.findById(request.model.id);
    let data = request.body;
    delete data._id;
    data.updateAt = moment();
    Object.assign(model, data);
    try {
      // await Model.update(
      //   {
      //     _id: request.model.id
      //   },
      //   data
      // );
      await model.save();
      reply.send(func.util.response(model));
    } catch (ex) {
      reply.send(func.util.response('9999999', ex));
    }
  });
  // 删除
  fastify.delete('/*', option, async (request, reply) => {
    let Model = await schema.get(request.model.collection);
    try {
      await Model.remove({ _id: request.model.id });
      reply.send(func.util.response());
    } catch (ex) {
      reply.send(func.util.response('9999999', ex));
    }
  });

  next();
};
