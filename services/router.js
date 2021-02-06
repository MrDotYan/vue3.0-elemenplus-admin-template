const Koa = require('koa')
const app = new Koa()

const cors = require('koa2-cors');

const index = require('./routes/index')
const users = require('./routes/users')
const config = require('./routes/config');


app.use(cors());
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(config.routes(), config.allowedMethods());

module.exports = app