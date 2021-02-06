const ConfigModel = require('../model/config');
const ObjectId = require('mongodb').ObjectId;

module.exports = class ConfigController {
  model = new ConfigModel();

  async insert(ops = {}) {
    if (JSON.stringify(ops) == "{}") {
      return {
        code: 0,
        error: new Error('参数不能为空！！！'),
        data: null,
        message: "参数不能为空！！！"
      }
    }


    const _fid = ops._fid;
    if (_fid) {
      ops._id = ObjectId();
      // 如果_fid存在，则说明是往某个group里面添加子级菜单信息
      const findIDRes = await this.model.find({ _id: _fid });
      const findIDResObj = findIDRes[0];
      // 查出当前组
      if (findIDRes.length >= 1) {
        // 深克隆找出来的group,这个方法有点野( •̀ ω •́ )
        const deepFindIDRes = JSON.parse(JSON.stringify(findIDResObj));


        if (deepFindIDRes.children === undefined) {
          deepFindIDRes.children = [];

          deepFindIDRes.children.push(ops);
          delete deepFindIDRes._id;
          const result = await this.model.updateOne(findIDResObj, deepFindIDRes);

          if (result.result.n === 1 && result.result.ok === 1) {
            return {
              message: "新增成功！",
              data: result.ops,
              code: 1
            }
          } else {
            return {
              message: "新增失败！",
              data: result.ops,
              code: 0
            }
          }
        } else {
          const childrenHasSameOptions = deepFindIDRes.children.filter(ele => {
            if (ele.path === ops.path || ele.name === ops.name) {
              return true;
            }
            return false;
          });


          if (childrenHasSameOptions.length == 0) {
            deepFindIDRes.children.push(ops);
            delete deepFindIDRes._id;
            const result = await this.model.updateOne(findIDResObj, deepFindIDRes);
            if (result.result.n === 1 && result.result.ok === 1) {
              return {
                message: "新增成功！",
                data: result.ops,
                code: 1
              }
            } else {
              return {
                message: "新增失败！",
                data: result.ops,
                code: 0
              }
            }
          } else {
            return {
              code: 0,
              error: new Error("存在相同的菜单,请检查"),
              data: null,
              message: "存在相同的菜单！！！"
            }
          }
        }

      } else {
        return {
          code: 0,
          error: new Error("_fid不对,请检查"),
          data: null,
          message: "_fid不存在！！！"
        }
      }
    } else {
      // _fid不存在,说明添加的是group，
      const group = ops.group;
      if (group) {
        const findGroupRes = await this.model.find({ group: group });

        if (findGroupRes.length >= 1) {
          return {
            code: 0,
            error: new Error('当前group已经存在，请修改后再提交!'),
            data: null,
            message: '当前group已经存在，请修改后再提交!'
          }
        } else {
          const path = ops.path;
          if (path) {
            const result = await this.model.insert(ops)
            if (result.result.n === 1 && result.result.ok === 1) {
              return {
                message: "新增成功！",
                data: result.ops,
                code: 1
              }
            } else {
              return {
                message: "新增失败！",
                data: result.ops,
                code: 0
              }
            }
          } else {
            const result = await this.model.insert({
              ...ops,
              children: []
            })
            if (result.result.n === 1 && result.result.ok === 1) {
              return {
                message: "新增成功！",
                data: result.ops,
                code: 1
              }
            } else {
              return {
                message: "新增失败！",
                data: result.ops,
                code: 0
              }
            }
          }
        }
      } else {
        return {
          code: 0,
          error: new Error('参数group不存在！'),
          data: null,
          message: '参数group不存在！'
        }
      }
    }
  }

  async find(ops = {}) {
    return await this.model.find(ops);
  }
}