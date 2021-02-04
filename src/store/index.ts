import { createStore } from 'vuex'
import sessionStore from 'store/storages/sessionStorage';

export default createStore({
  state: {
    // 从缓存里面读取数据，避免用户刷新以后状态丢失问题
    breadcrumb: JSON.parse(sessionStore.read('breadcrumb') || "[]")
  },
  mutations: {
    // 设置面包屑导航
    changeBreadcrumb(state, data: Array<string>) {
      state.breadcrumb = data;
      sessionStore.write('breadcrumb', JSON.stringify(data));
    }
  },
  actions: {
    // commit
    "CHANGEBREADCRUMB": function (store, data) {
      if (data) {
        store.commit('changeBreadcrumb', data)
      }
    }
  },
  modules: {
  }
})
