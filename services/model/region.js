const mongo = require('../db/mongo');

module.exports = class ChinaModel {
  documentName = "admin-china";
  async find(ops = {}) {
    const { page, size } = ops;
    return await mongo.findSkip(this.documentName, {}, page - 1, size);
  }
}