const Koa = require('koa')
const app = new Koa()

const cors = require('koa2-cors');

// const index = require('./routes/index')
const users = require('./routes/users')
const config = require('./routes/config');
const doc = require('./routes/doc');
const pdf = require('./routes/pdf');
const lin = require('./routes/lin');

app.use(cors());
// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(config.routes(), config.allowedMethods());
app.use(doc.routes(), doc.allowedMethods());
app.use(pdf.routes(), pdf.allowedMethods());
app.use(lin.routes(), lin.allowedMethods());

module.exports = app