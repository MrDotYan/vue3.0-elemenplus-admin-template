import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import elementPlusInstall from './ElementPlus';
// element - plus按需引入
const app = createApp(App);
// 注册组件
elementPlusInstall(app);
app.config.globalProperties.$ELEMENT = {
  size: "small"
}
app.use(store);
app.use(router);
app.mount('#app');
