const JWT = require('../jwt/index');

module.exports = class BaseController {
  createToken(data = {}) {
    return JWT.createToken(data);
  }

  verifyToken(token) {
    return JWT.verifyToken(token);
  }
}