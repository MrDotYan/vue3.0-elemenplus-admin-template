const mongo = require('../db/mongo');

module.exports = class ShapeModel {
  documentName = "admin-shape";
  async find(ops = {}) {
    return await mongo.find(this.documentName, {});
  }
}