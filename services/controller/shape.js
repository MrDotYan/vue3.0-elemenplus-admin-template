const ShapeModel = require('../model/shape');

module.exports = class ShapeController {
    model = new ShapeModel();

    async find() {
        try {
            /* code */
            const result = await this.model.find();
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