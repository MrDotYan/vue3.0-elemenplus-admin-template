const router = require('koa-router')();

const regionController = require('../controller/region');
const controller = new regionController();



router.prefix('/region');


router.get('/china',async (ctx,next) => {
    const params = ctx.request.query;
    const result = await controller.find(params);
    ctx.body = result;
})



module.exports = router