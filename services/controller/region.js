const ChinaModel = require('../model/region');

module.exports = class ChinaController {
    model = new ChinaModel();

    async find(ops = {}) {
        try {
            /* code */
            const result = await this.model.find(ops);

            return {
                code: 1,
                message: "获取成功！",
                data: result
            }
        } catch (e) {
            return {
                code: 0,
                message: "获取失败！",
                data: null
            }
        }
    }
}