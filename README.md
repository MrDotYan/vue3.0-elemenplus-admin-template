# 玩转项目

```bash
git clone  https://github.com/MrDotYan/vue3.0-elemenplus-admin-template.git && 
cd vue3.0-elemenplus-admin-template && yarn install && yarn serve
```

# 注意菜单配置

```json
{
    "group": "Preview",
    "icon": "el-icon-location",
    "path": "/preview",
    "title": "预览",
    "meta": {
      "auth": true
    },
    "component": "views/Preview/Preview.vue"
  },
  {
    "group": "Menu",
    "icon": "el-icon-location",
    "path": null,
    "title": "菜单组",
    "children": [
      {
        "path": "/about",
        "name": "About",
        "meta": {
          "title": "关于",
          "icon": "el-icon-menu",
          "auth": true
        },
        "component": "views/About/About.vue"
      },
      {
        "path": "/lin",
        "name": "Lin",
        "meta": {
          "title": "协议",
          "icon": "el-icon-menu",
          "auth": true
        },
        "component": "views/About/Lin.vue"
      }
    ]
  }
```

 - 上面展示了两种类型的菜单，一种是单独的菜单，另外一种是组合的菜单。
 - 菜单放在public/services/menu目录下是一个json，当然也可以后台按照格式返回json
 - 请求star

# 预览 
