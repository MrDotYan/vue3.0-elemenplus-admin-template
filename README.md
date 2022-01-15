# 玩转项目

# 线上预览

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


# 牢骚

- 目前把菜单等一些不重要的配置扔到了mongodb里面
- 把下面的数据插入到mongoDB里面

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

{
    "_id" : ObjectId("601e239e7406409f7c51a00f"),
    "_fid" : "",
    "group" : "Dashbord",
    "path" : "/dashbord",
    "name" : "Dashbord",
    "sort" : 0,
    "meta" : {
        "auth" : true,
        "title" : "控制面板",
        "icon" : "el-icon-eleme"
    },
    "component" : "views/Dashbord/Dashbord.vue"
}

{
    "_id" : ObjectId("601e29bd7959918d5caa6828"),
    "_fid" : "",
    "group" : "Preview",
    "path" : "/preview",
    "name" : "Preview",
    "sort" : 1,
    "meta" : {
        "auth" : true,
        "title" : "预览",
        "icon" : "el-icon-location"
    },
    "component" : "views/Preview/Preview.vue"
}


{
    "_id" : ObjectId("601e29e17959918d5caa6829"),
    "_fid" : "",
    "group" : "MenuGroup",
    "path" : null,
    "name" : "",
    "sort" : 998,
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

{
    "_id" : ObjectId("601e3fa3d00cf9a65c139775"),
    "sort" : "3",
    "_fid" : "",
    "group" : "Document",
    "path" : null,
    "name" : "Document",
    "meta" : {
        "auth" : true,
        "title" : "文档处理",
        "icon" : "el-icon-document"
    },
    "children" : [ 
        {
            "sort" : 0,
            "_fid" : "601e3fa3d00cf9a65c139775",
            "group" : "",
            "path" : "/word",
            "name" : "Word",
            "meta" : {
                "auth" : true,
                "title" : "Word文档",
                "icon" : "el-icon-document"
            },
            "component" : "views/Document/Document.vue",
            "_id" : "601e4422d00cf9a65c139776"
        }, 
        {
            "sort" : "1",
            "_fid" : "601e3fa3d00cf9a65c139775",
            "group" : "",
            "path" : "/pdf",
            "name" : "Pdf",
            "meta" : {
                "auth" : true,
                "title" : "Pdf处理",
                "icon" : "el-icon-notebook-2"
            },
            "component" : "views/Document/Pdf.vue",
            "_id" : "601f43ac319272484048b44e"
        }, 
        {
            "sort" : "3",
            "_fid" : "601e3fa3d00cf9a65c139775",
            "group" : "",
            "path" : "/execl",
            "name" : "Execl",
            "meta" : {
                "auth" : true,
                "title" : "Execl处理",
                "icon" : "el-icon-date"
            },
            "component" : "views/Document/Execl.vue",
            "_id" : "601f5be86b1c4b5e8069008c"
        }, 
        {
            "sort" : "4",
            "_fid" : "601e3fa3d00cf9a65c139775",
            "group" : "",
            "path" : "/markdown",
            "name" : "Markdown",
            "meta" : {
                "auth" : true,
                "title" : "Markdown文档",
                "icon" : "el-icon-edit-outline"
            },
            "component" : "views/Document/Markdown.vue",
            "_id" : "601f7e376b1c4b5e8069008d"
        }, 
        {
            "sort" : "5",
            "_fid" : "601e3fa3d00cf9a65c139775",
            "group" : "",
            "path" : "/richText",
            "name" : "RichText",
            "meta" : {
                "auth" : true,
                "title" : "富文本编辑器",
                "icon" : "el-icon-tickets"
            },
            "component" : "views/Document/RichText.vue",
            "_id" : ObjectId("601f923e6b1c4b5e8069008e")
        }
    ]
}
```
