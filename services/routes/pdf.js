const router = require('koa-router')();
const { jsPDF } = require('jspdf');

const pdf = new jsPDF("p", "pt", "a4", true);

router.prefix('/pdf');

router.get('/pdf', async function (ctx, next) {
  const stringStr = `Some functions of jsPDF require optional dependencies. E.g. the html method, which depends on html2canvas and, when supplied with a string HTML document, dompurify. JsPDF loads them dynamically when required (using the respective module format, e.g. dynamic imports). Build tools like Webpack will automatically create separate chunks for each of the optional dependencies. If your application does not use any of the optional dependencies, you can prevent Webpack from generating the chunks by defining them as external dependencies:`;

  const text = pdf.splitTextToSize(stringStr, (595.28 - 40))
  pdf.text(text, 20, 20);
  const arrayBuffer = pdf.output('arraybuffer');

  ctx.body = { code: 1, message: "获取成功！", mime: "application/pdf	", buffer: Buffer.from(arrayBuffer) }
})

module.exports = router;