const router = require('koa-router')();
const Controller = require('../controller/login');

router.prefix('/login');

const LoginController = new Controller();

router.get('/login', async function (ctx, next) {
  const params = ctx.request.query.params;
  if (params) {
    const data = JSON.parse(ctx.request.query.params);

    const deepCloneData = JSON.parse(JSON.stringify(data));
    const result = await LoginController.login(deepCloneData);

    ctx.body = result;
  } else {
    ctx.body = {
      code: 0,
      data: null,
      message: "参数不能为空"
    }
  }

});


router.post('/register', async function (ctx, next) {
  const result = await LoginController.register(ctx.request.body)
  ctx.body = result;
})

module.exports = router;