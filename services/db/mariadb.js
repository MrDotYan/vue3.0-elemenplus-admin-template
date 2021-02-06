const mariadb = require('mariadb');
const config = require('../config/db.config');

const MariaDBConfig = config.mariadb.config;

class MariaDBModel {
  pool = mariadb.createPool({
    connectionLimit: 10,
    host: MariaDBConfig.host,
    user: MariaDBConfig.user,
    password: MariaDBConfig.password,
    database: MariaDBConfig.database,
    port: MariaDBConfig.port
  });

  async ModelActions(sqlStr) {
    const conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(sqlStr, [1, "mariadb"]);
      return result;
    } catch (error) {
      return error;
    }
  }
}


module.exports = MariaDBModel;