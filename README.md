# 玩转项目

```bash
git clone  https://github.com/MrDotYan/vue3.0-elemenplus-admin-template.git && 
cd vue3.0-elemenplus-admin-template && yarn install && yarn serve


cd services && yarn install && yarn dev //运行后台程序
```

# 注意菜单配置

```json
{
    "_id" : ObjectId("601e29e17959918d5caa6829"),
    "_fid" : "",
    "group" : "MenuGroup",
    "path" : null,
    "name" : "",
    "sort" : 2,
    "meta" : {
        "auth" : true,
        "title" : "系统声明",
        "icon" : "el-icon-location"
    },
    "children" : [ 
        {
            "_fid" : "601e29e17959918d5caa6829",
            "group" : "",
            "path" : "/about",
            "name" : "About",
            "sort" : 1,
            "meta" : {
                "auth" : true,
                "title" : "关于",
                "icon" : "el-icon-menu"
            },
            "component" : "views/About/About.vue",
            "_id" : ObjectId("601e2a2c7959918d5caa682a")
        }, 
        {
            "_fid" : "601e29e17959918d5caa6829",
            "group" : "",
            "path" : "/lin",
            "name" : "Lin",
            "sort" : 2,
            "meta" : {
                "auth" : true,
                "title" : "协议",
                "icon" : "el-icon-menu"
            },
            "component" : "views/About/Lin.vue",
            "_id" : ObjectId("601e2a407959918d5caa682b")
        }
    ]
}
```

- 目前菜单放到了mongodb数据库中


# 预览 

![](./screen/capture_20210206142106517.bmp)


![](./screen/capture_20210206142033375.bmp)

![](./screen/capture_20210206142018522.bmp)
