const router = require('koa-router')();

const ConfigController = require('../controller/config');

const controller = new ConfigController();

router.prefix('/config');

router.get('/insert', async function (ctx, next) {
  const data = JSON.parse(ctx.request.query.params);
  const deepCloneData = JSON.parse(JSON.stringify(data))
  const result = await controller.insert({
    ...deepCloneData
  })
  ctx.body = result;
})


router.get('/all', async function (ctx, next) {
  const result = await controller.find();
  ctx.body = result;
})

module.exports = router
