const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
router.prefix('/license')

router.get('/license', function (ctx, next) {
  const license = fs.readFileSync(path.join(__dirname, '/lin.txt'), 'utf-8');
  ctx.body = {
    license
  }
})

module.exports = router
