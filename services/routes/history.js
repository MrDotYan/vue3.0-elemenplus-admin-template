const router = require('koa-router')();
const Controller = require('../controller/history');

router.prefix('/history');

const HistoryController = new Controller();

router.get('/insert', async function (ctx, next) {
  const data = JSON.parse(ctx.request.query.params);
  const deepCloneData = JSON.parse(JSON.stringify(data));
  const result = await HistoryController.insert(deepCloneData);
  ctx.body = result;
});


router.get('/all', async function (ctx, next) {
  const result = await HistoryController.find();
  ctx.body = result;
});

module.exports = router;