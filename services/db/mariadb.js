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

  async ModelActions(sqlStr, data) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      return await conn.query(sqlStr, data);
    } catch (error) {
      return error;
    } finally {
      conn.release();
    }
  }
}


module.exports = MariaDBModel;