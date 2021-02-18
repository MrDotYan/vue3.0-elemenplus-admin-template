const Model = require('../model/history');


module.exports = class HistoryController {
  model = new Model();

  async insert(ops = {}) {
    if (JSON.stringify(ops) == "{}") {
      return {
        code: 0,
        error: new Error('参数不能为空！！！'),
        data: null,
        message: "参数不能为空！！！"
      }
    }

    ops.date = new Date().toLocaleDateString();
    const result = this.model.insert(ops);
    return {
      code: 1,
      data: result.ops,
      message: "新增成功！"
    }
  }

  async find(ops = {}) {
    return await this.model.find(ops);
  }
}