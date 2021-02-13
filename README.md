# 玩转项目

```bash
git clone  https://github.com/MrDotYan/vue3.0-elemenplus-admin-template.git && 
cd vue3.0-elemenplus-admin-template && yarn install && yarn serve


cd services && yarn install && yarn dev //运行后台程序
```

# 注意菜单配置

```json
{
    "_id" : ObjectId("601e0c8c16c3c5da5451c05a"),
    "group" : "Setting",
    "path" : null,
    "sort" : 9999,
    "meta" : {
        "auth" : true,
        "icon" : "el-icon-setting",
        "title" : "系统设置"
    },
    "children" : [ 
        {
            "_id" : ObjectId("601e0c8c16c3c5da5451c05b"),
            "path" : "/menu",
            "name" : "Menu",
            "sort" : 0,
            "meta" : {
                "title" : "菜单管理",
                "icon" : "el-icon-menu",
                "auth" : true
            },
            "component" : "views/Config/Config.vue"
        }
    ]
}
```

- 目前菜单放到了mongodb数据库中
- 上面的菜单是最重要的一个，把这个菜单信息放入mongodb/admin-config数据集
- 数据库的名称在services文件夹里面

# 预览 

![](./screen/capture_20210206142106517.bmp)


![](./screen/capture_20210206142033375.bmp)

![](./screen/capture_20210206142018522.bmp)
