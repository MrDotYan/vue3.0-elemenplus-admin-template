const mongo = require('../db/mongo');

module.exports = class HistoryModel {
  documentName = "admin-history";

  async insert(ops = {}) {
    return await mongo.insert(this.documentName, ops);
  }

  async find(ops = {}) {
    return await mongo.find(this.documentName, ops);
  }

  async updateOne(oldOps = {}, newOps = {}) {
    return await mongo.update(this.documentName, oldOps, newOps);
  }

  async deleteOne(ops = {}) {
    return await mongo.deleteOne(this.documentName, ops);
  }
}