const Model = require('../model/login');
const LoginModel = new Model();
const Base = require('./base');
module.exports = class LoginController extends Base {
  async login(data = {}) {
    const result = await LoginModel.loginActions(data)
    if (result.length === 0) {
      return {
        code: 0,
        message: "登录失败！",
        data: {
          user: null,
          token: null
        }
      }
    } else {
      const data = result[0];
      delete data.passWord
      return {
        code: 1,
        message: "登录成功！",
        data: {
          user: data,
          token: this.createToken(data)
        }
      }
    }
  }

  async register(data) {
    const result = await LoginModel.registerActions(data);

    if (result.registerStatus.warningStatus !== undefined && result.registerStatus.warningStatus == 0) {
      return {
        code: 1,
        message: "注册成功！",
        data: {
          user: result.data,
          token: this.createToken({ userName: data.userName })
        }
      }
    } else {
      return {
        code: 0,
        message: "注册失败！",
        data: {
          user: result.data,
          token: null
        }
      }
    }
  }
}