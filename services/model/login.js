const MariadbModel = require('../db/mariadb');
const mariadb = new MariadbModel();
module.exports = class LoginModel {
  table = 'admin_user';

  async loginActions(data = {}) {
    const
      loginSqlStr = `SELECT * FROM ${this.table} WHERE userName = ${data.userName} AND passWord = ${data.passWord}`;

    return await mariadb.ModelActions(loginSqlStr);
  }


  async registerActions(data = {}) {
    const { userName, passWord } = data;
    const registerSqlStr = `INSERT INTO ${this.table} ( userName,passWord)
    VALUES
    ( ${userName},${passWord})`;
    const checkResult = await this.loginActions(data);
    if (checkResult.length === 0) {
      return {
        registerStatus: await mariadb.ModelActions(registerSqlStr),
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