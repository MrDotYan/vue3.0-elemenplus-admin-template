import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import sessionStore from 'store/storages/sessionStorage';
import routersHandleFunction from './handle';

const childrenRoutes: Array<RouteRecordRaw> = [];

// 处理路由 但是注意，最开始的时候这段代码及已经执行了
// 这段代码在没有登录之前没有任何作用
// 但是当你登录以后，再次刷新的时候这段断码会重新执行
// 读取sessionstorage里卖弄的数据，重新初始化路由

routersHandleFunction()?.forEach((ele: any) => {
  if (ele.path !== null) {
    childrenRoutes.push(ele)
  } else {
    childrenRoutes.push(...ele?.children);
  }
})


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/systementry',
    meta: {
      auth: true
    },
  },
  {
    path: '/systementry',
    name: 'SystemEntry',
    meta: {
      title: "",
      icon: "",
      auth: true
    },
    component: () => import('@/views/Entry.vue'),
    redirect: childrenRoutes[0]?.path,
    children: childrenRoutes,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 读取token
  const token = sessionStore.read('token') || null;
  // 进度条
  NProgress.start();
  // 如果当前想要导航的路由是login
  if (to.path === "/login") {
    // 先判断是否有tokan，即用户是否登录过
    if (token) {
      // 如果登录过，不允许到login页面
      next({
        path: from.path
      })
    } else {
      // 否则直接next
      next();
    }
  } else {
    // 如果当前要导航的路由不是login
    if (!token) {
      // 如果token不存在
      // 直接到login
      next({
        path: "/login"
      })
    } else {
      // 否则不做任何处理
      next()
    }
  }
});

// 路由守卫
router.afterEach(() => {
  NProgress.done();
});


export default router
