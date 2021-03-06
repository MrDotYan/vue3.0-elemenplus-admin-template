
const bodyparser = require('koa-bodyparser')
const Koa = require('koa')
const app = new Koa()

const cors = require('koa2-cors');

// const index = require('./routes/index')
const users = require('./routes/users')
const config = require('./routes/config');
const doc = require('./routes/doc');
const pdf = require('./routes/pdf');
const lin = require('./routes/lin');
const history = require('./routes/history');
const login = require('./routes/login');
const region = require('./routes/region');
const shape = require('./routes/shape');

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(cors());
// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(config.routes(), config.allowedMethods());
app.use(doc.routes(), doc.allowedMethods());
app.use(pdf.routes(), pdf.allowedMethods());
app.use(lin.routes(), lin.allowedMethods());
app.use(history.routes(), history.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(region.routes(), region.allowedMethods());
app.use(shape.routes(), shape.allowedMethods());

module.exports = app