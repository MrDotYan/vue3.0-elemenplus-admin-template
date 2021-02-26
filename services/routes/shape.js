const router = require('koa-router')();

const shapeController = require('../controller/shape');
const controller = new shapeController();



router.prefix('/shape');


router.get('/all',async (ctx,next) => {
    const result = await controller.find();
    ctx.body = result;
})



module.exports = router