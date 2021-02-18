const router = require('koa-router')();

const ConfigController = require('../controller/config');
const jwt = require('../jwt/index');
const controller = new ConfigController();

router.prefix('/config');

router.get('/insert', async function (ctx, next) {
  console.log(ctx.request.headers);
  const data = JSON.parse(ctx.request.query.params);
  const deepCloneData = JSON.parse(JSON.stringify(data))
  const result = await controller.insert({
    ...deepCloneData
  })
  ctx.body = result;
})


router.get('/all', async function (ctx, next) {
  const token = ctx.request.headers.xtoken;
  const tokenInfo = jwt.verifyToken(token);
  // 这里可以验证token
  const result = await controller.find();
  ctx.body = result;
})

module.exports = router
