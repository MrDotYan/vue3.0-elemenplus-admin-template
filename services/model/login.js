const MariadbModel = require('../db/mariadb');
const mariadb = new MariadbModel();

const crypto = require('crypto');
module.exports = class LoginModel {

  table = 'admin';

  md5(str) {
    const m = crypto.createHash('md5');
    m.update(str, 'utf8');
    return m.digest('hex').toUpperCase();
  }

  async loginActions(data = {}) {
    const
      loginSqlStr = `SELECT * FROM ${this.table} WHERE userName = ? AND passWord = ?`;

    let passWord = this.md5(data.passWord);

    return await mariadb.ModelActions(loginSqlStr, [data.userName, passWord]);
  }


  async registerActions(data = {}) {
    const { userName, passWord } = data;
    const registerSqlStr = `INSERT INTO ${this.table} ( userName,passWord) VALUES ( ?,?)`;
    let password = this.md5(passWord);
    const checkResult = await this.loginActions(data, { userName, password });
    if (checkResult.length === 0) {
      return {
        registerStatus: await mariadb.ModelActions(registerSqlStr, [userName, password]),
        data: await this.loginActions(data)
      };
    } else {
      return {
        data: "用户名已经被占用！",
        registerStatus: {
          errorCode: 0
        }
      }
    }
  }
}