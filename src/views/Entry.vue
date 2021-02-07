<template>
  <el-container>
    <aside-menu :isCollapse="isCollapse"></aside-menu>
    <el-container>
      <el-header class="top-header">
        <div class="collaspe">
          <i class="el-icon-s-fold" v-show="!isCollapse" @click="close"></i>
          <i class="el-icon-s-unfold" v-show="isCollapse" @click="open"></i>
        </div>
        <div class="top-menu">
          <div class="full-screen">
            <el-button
              type="default"
              @click="fullScreen"
              circle
              icon="el-icon-full-screen"
            >
            </el-button>
          </div>
          <el-dropdown @command="commandEvent">
            <el-button type="primary" circle icon="el-icon-setting">
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(breadcrumb, index) of breadcrumbs"
              :key="index"
              >{{ breadcrumb }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="context">
          <router-view> </router-view>
        </div>
      </el-main>
      <el-footer>
        <div>Mr.Yan @ 2021</div>
        <div><i class="el-icon-message"></i>2564217790@qq.com</div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import AsideMenu from "@/components/AsideMenu.vue";
import { useStore } from "vuex";
import sessionStore from "store/storages/sessionStorage";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    AsideMenu,
  },
  setup() {
    // 定义侧边栏菜单是否打开
    const isCollapse = ref(false);
    // 获取store
    const store = useStore();
    // 获取store里面面包屑信息
    // 和vue2.0一样，只不过是在setup函数里面使用
    const breadcrumbs = computed(() => store.state.breadcrumb);
    // 缩小侧边栏菜单
    const close = function () {
      isCollapse.value = true;
    };
    // 定义是否全屏响应式数据
    const isFull = ref(false);
    // 全屏事件
    const fullScreen = function () {
      const element = document.documentElement;
      if (!isFull.value) {
        element.requestFullscreen();
        isFull.value = true;
      } else {
        document.exitFullscreen();
        isFull.value = false;
      }
    };
    const router = useRouter();
    // 右上角小菜单处理函数，目前只有一个登出按钮
    const commandEvent = function (cmd: string) {
      switch (cmd) {
        case "logOut":
          sessionStore.clearAll();
          router.push("/login");
          break;
        default:
          break;
      }
    };
    // 打开侧边栏
    const open = function () {
      isCollapse.value = false;
    };

    return { breadcrumbs, isCollapse, close, open, commandEvent, fullScreen };
  },
});
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.el-footer {
  background-color: #b3c0d1;
  text-align: center;
  height: 60px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .collaspe {
    font-size: 34px;
    i {
      cursor: pointer;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0px;
  .breadcrumb {
    padding: 10px;
    background: #fff;
  }
}
.top-menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
  .full-screen {
    margin: 0 10px;
  }
}
.context {
  width: 100%;
  height: calc(100vh - 154px);
  overflow-x: hidden;
  overflow-y: auto;
}
.fade-enter-active,
.fade-leave-active {
  // 启用硬件加速
  will-change: transform;
  transition: all 200ms;
}
.fade-enter {
  transform: translate(100%, 0);
  transition-timing-function: ease-in;
}
.fade-leave {
  transform: translate(-100%, 0);
  transition-timing-function: ease-in;
}
</style>