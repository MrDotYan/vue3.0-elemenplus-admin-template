import sessionStore from 'store/storages/sessionStorage';

export default function createRouterFromSessionStore() {
  // 从sessionStorage里面获取路由配置信息
  const routerStr = sessionStore.read('config') || "[]";

  const group = JSON.parse(routerStr).map((ele: any) => {
    // 同样是两种情况
    if (ele.path !== null) {
      // 第一种是group不成组，而是直接成为单个路由
      return {
        ...ele,
        // 动态引入组件
        meta: {
          ...ele.meta,
          // 压入group字段为了方便点击浏览器前进后退按钮，
          // 路由监听时方便找到相应的菜单
          group: ele.group
        },
        component: () => import('@/' + ele.component)
      }
    } else {
      // 第二种是存在children
      return {
        ...ele,
        children: ele?.children.map((item: any) => {
          return {
            ...item,
            meta: {
              ...item.meta,
              group: ele.group,
            },
            component: () => import('@/' + item.component)
          }
        })
      }
    }
  });
  // 菜单排序，数字越大，越往后
  const tempGroup = group.sort(function (a: any, b: any) {
    return a.sort - b.sort;
  });

  // 返回一个group值
  return tempGroup;
}