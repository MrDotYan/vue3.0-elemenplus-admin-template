<template>
  <el-menu
    :uniqueOpened="true"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    @select="selectChildMenu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :router="true"
    :default-openeds="defaultOpeneds"
    :default-active="defaultActiveIndex"
  >
    <div class="logo">
      <img
        v-show="!isCollapse"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTMuNzEgMzgiPjxkZWZzPjxzdHlsZT4uY2xzLTEsLmNscy0ye2ZpbGw6IzQwOWVmZjt9LmNscy0xe2ZpbGwtcnVsZTpldmVub2RkO308L3N0eWxlPjwvZGVmcz48dGl0bGU+6LWE5rqQIDE8L3RpdGxlPjxnIGlkPSLlm77lsYJfMiIgZGF0YS1uYW1lPSLlm77lsYIgMiI+PGcgaWQ9IuWbvuWxgl8xLTIiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiPjxwYXRoIGlkPSJTaGFwZS1Db3B5IiBjbGFzcz0iY2xzLTEiIGQ9Ik0xNDIsMjYuMTZzLjI4LDAsLjgyLDBhLjcyLjcyLDAsMCwxLC42OS40MXMxLjA4LDIsMS4zNywyLjQ4LDAsLjQyLS4xMi40MWgwcy0uMzEsMC0zLjQ1LDBhNC45Myw0LjkzLDAsMCwxLTQuNTQtNC41NHYtN0gxMzQuM1YxNS4yOGMwLS4zNi40MS0uNDEuNDEtLjQxaDIuMDdWMTIuMjVhLjYuNiwwLDAsMSwuNDEtLjU1bDIuMy0uNjZjLjM0LS4xLjU5LDAsLjU5LjM1VjE1aDMuNThjLjM0LDAsLjQxLjQxLjQxLjQxVjE4aC00djYuMDZjMCwxLjc2LDEuOTMsMi4wNywxLjkzLDIuMDdabS0xMC42LDNoLTIuMmMtLjQzLDAtLjQxLS41NS0uNDEtLjU1VjE4LjQ1YzAtLjYyLS44My0uODMtLjgzLS44M2gtNC41NGMtLjY4LDAtLjY5LjgzLS42OS44M1YyOC43N2EuNDEuNDEsMCwwLDEtLjQxLjQyaC0yLjJjLS40OCwwLS40MS0uNTUtLjQxLS41NVYxNS44M2MwLTEsMS4yNC0xLjI0LDEuMjQtMS4yNGg5LjYzYzEsMCwxLjIzLDEuMjQsMS4yMywxLjI0VjI4LjVjMCwuNzItLjQxLjY5LS40MS42OVpNMTE1LjczLDIzLjRIMTA3LjJ2Mi4wN2MwLC43NCwxLDEsMSwxSDExNWExLjE2LDEuMTYsMCwwLDEsLjgyLjQycy42MSwxLjI1LjgzLDEuNzktLjQxLjU1LS40MS41NUgxMDZjLTEuMjQsMC0xLjUxLTEuNTItMS41MS0xLjUyVjE2YzAtLjY3LDEtMSwxLTFoMTAuMzJjMSwwLDEuMjQsMS4yMywxLjI0LDEuMjN2NS45M2MwLDEtMS4yNCwxLjIzLTEuMjQsMS4yM1ptLTEuNTItNC45NXMtLjA4LS42OS0uNjgtLjY5aC01LjY1cy0uNjguMTgtLjY4LjY5VjIwYS42OS42OSwwLDAsMCwuNjguNjloNS42NWEuOS45LDAsMCwwLC42OC0uODNWMTguNDVaTTEwMS4yOCwyOS4xOWgtMi4yYy0uMjksMC0uNDEtLjQyLS40MS0uNDJWMTguNDVjMC0uNjQtLjgzLS44My0uODMtLjgzSDk1Ljc4Yy0uNTgsMC0uNjkuODMtLjY5LjgzVjI4Ljc3YzAsLjM1LS40MS40Mi0uNDEuNDJoLTIuMmMtLjMxLDAtLjQyLS40Mi0uNDItLjQyVjE4LjQ1YzAtLjY2LS44Mi0uODMtLjgyLS44M0g4OS4xN2MtLjYzLDAtLjY4LjgzLS42OC44M1YyOC43N2EuMzkuMzksMCwwLDEtLjQyLjQyaC0yLjJhLjQxLjQxLDAsMCwxLS40MS0uNDJWMTUuNjljMC0uNzUsMS4xLTEuMSwxLjEtMS4xaDEzLjc2YzEuMSwwLDEuMzcsMS4zOCwxLjM3LDEuMzh2MTIuOGMwLC40OC0uNDEuNDItLjQxLjQyWm0tMjAtNS43OUg3Mi44djIuMDdjMCwuNzQsMSwxLDEsMWg2Ljg4YTEuMTksMS4xOSwwLDAsMSwuODMuNDJzLjYsMS4yNS44MiwxLjc5LS40MS41NS0uNDEuNTVINzEuNTZjLTEuMjQsMC0xLjUxLTEuNTItMS41MS0xLjUyVjE2YzAtLjY3LDEtMSwxLTFIODEuMzNjMSwwLDEuMjQsMS4yMywxLjI0LDEuMjN2NS45M2MwLDEtMS4yNCwxLjIzLTEuMjQsMS4yM1ptLTEuNTEtNC45NXMtLjA5LS42OS0uNjktLjY5SDczLjQ5cy0uNjkuMTgtLjY5LjY5VjIwYS42OS42OSwwLDAsMCwuNjkuNjloNS42NGEuOTEuOTEsMCwwLDAsLjY5LS44M1YxOC40NVpNNjgsMjkuMTlINjIuNzZhNC4zNSw0LjM1LDAsMCwxLTQuMTMtNGMwLTMuOTEsMC0xNi4xLDAtMTYuMWgyLjQ4YS43OS43OSwwLDAsMSwuODIuODJWMjQuMzdBMi41OCwyLjU4LDAsMCwwLDYzLjg2LDI2aDIuMnMuNzItLjIzLDEuMjQuNjlsMS4xLDEuOTNzLjA4LjU1LS40MS41NVptLTI2LjU2LS44M1YxMC4xOWExLDEsMCwwLDEsLjY5LTFINTUuMDVjLjczLDAsLjQyLjgzLjQyLjgzcy0uNDEsMS4xMi0uNjksMS42NWExLDEsMCwwLDEtLjgzLjU1SDQ1LjU2YS43Ny43NywwLDAsMC0uODMuNjl2NC41NGg5LjVjLjU1LDAsLjI3LjY5LjI3LjY5cy0uNzEsMS41Mi0xLDEuOTNhMS4wNSwxLjA1LDAsMCwxLS44My40MWgtOHY0LjgyYS45MS45MSwwLDAsMCwuNjkuODNoOC44MWEuODUuODUsMCwwLDEsLjgyLjQxbDEuMjQsMS45M2MuMzcuNTYtLjE0LjY5LS4xNC42OUg0Mi4yNkM0MS42OCwyOS4xOSw0MS40MywyOC4zNiw0MS40MywyOC4zNlptLTguMTQtMS4xNGMwLDEuNTctLjgzLDEuOTMtLjgzLDEuOTNTMTguMzIsMzcuMzEsMTcuNCwzNy44M2ExLjY4LDEuNjgsMCwwLDEtMS41MiwwUzEuMDksMjkuMjUuNTUsMjguODdhMS4yOSwxLjI5LDAsMCwxLS41NS0xczAtMTcsMC0xNy43OFMxLDguNzYsMSw4Ljc2TDE1Ljc1LjIxYTIsMiwwLDAsMSwxLjc5LDBTMzAuNiw3LjgsMzIsOC42MmEyLjA4LDIuMDgsMCwwLDEsMS4yNSwyLjA2czAsMTUuMDcsMCwxNi41NFptLTUuOS0xN2MtMy0xLjc0LTEwLjE2LTUuODctMTAuMTYtNS44N2ExLjU4LDEuNTgsMCwwLDAtMS40MSwwTDQuMjIsMTFzLS43Ny40Ni0uNzYsMS4wOFMzLjQ2LDI2LDMuNDYsMjZhMSwxLDAsMCwwLC40My43NWMuNDMuMywxMiw3LDEyLDdhMS4zLDEuMywwLDAsMCwxLjE5LDBjLjcyLS40LDExLjgyLTYuNzksMTEuODItNi43OXMuNjUtLjI4LjY1LTEuNTFjMC0uMzYsMC0xLjc0LDAtMy40N0wxNi41MywyOS44OHYtM2EzLDMsMCwwLDEsMS0yLjA3bDExLjU2LTdhMi40OSwyLjQ5LDAsMCwwLC41NS0xLjQ2YzAtMS4yNywwLTIuMzcsMC0zLjA3TDE2LjUzLDIxLjJWMThhMi4xNywyLjE3LDAsMCwxLC44My0xLjc5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE1MC4zMiwxMS4yMWgtMi4yNHYtNWMwLS4xMS4xMi0uMjEuMjktLjI0bDEuNDQtLjI2Yy4yNiwwLC41MS4wNy41MS4yNFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNDguMDgsOWgyLjI0djUuMTFjMCwuMTEtLjExLjIxLS4yOC4yNWwtMS40NS4yNmMtLjI2LjA1LS41MS0uMDctLjUxLS4yNFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNDUuMDksOWg4LjIyYS40LjQsMCwwLDEsLjQuNHYxLjg1YTAsMCwwLDAsMSwwLDBoLTlhMCwwLDAsMCwxLDAsMFY5LjM2QS40LjQsMCwwLDEsMTQ1LjA5LDlaIi8+PC9nPjwvZz48L3N2Zz4="
        alt=""
      />
      <span v-show="isCollapse"><i class="el-icon-eleme"></i></span>
    </div>
    <template v-for="group of groupRouters" :key="group?.group">
      <el-submenu :index="group?.group" v-if="group?.path == null">
        <template #title>
          <i :class="group?.meta?.icon"></i>
          <span>{{ group?.meta?.title }}</span>
        </template>
        <template v-if="group?.children">
          <el-menu-item
            :route="routers"
            :index="routers?.name"
            v-for="routers of group?.children"
            :key="routers?.name"
          >
            <template #title>
              <i :class="routers?.meta?.icon"></i>
              <span>{{ routers?.meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :route="group" :index="group?.group">
        <i :class="group?.meta?.icon"></i>
        <template #title>
          <span>{{ group?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import createSessionRouter from "@/router/handle";
import sessionStore from "store/storages/sessionStorage";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "AsideMenu",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // 从sesstionStorage里面获取登录时取得路由配置信息
    const groupRouters = createSessionRouter();
    // 面包屑导航
    const breadcrumb = ref();
    // store vuex
    const store = useStore();
    const defaultGroupIsPathNull = groupRouters[0]?.path === null;
    const defaultIndexActiove = defaultGroupIsPathNull
      ? groupRouters[0]?.children[0]?.name
      : groupRouters[0]?.group;
    // 默认打开的菜单组
    const defaultOpeneds = reactive(
      JSON.parse(
        sessionStore.read("defaultOpeneds") || `["${groupRouters[0]?.group}"]`
      )
    );
    // 默认激活的菜单项
    const indexActive = JSON.parse(
      sessionStore.read("defaultActiveIndex") || `"${defaultIndexActiove}"`
    );
    // 默认激活的菜单项，做一个判断，因为json转义""空字符串会报错；
    const defaultActiveIndex = ref(indexActive);
    // 处理菜单打开
    const handleOpen = function (key: string, keyPath: Array<string>) {
      // 设置默认菜单
      defaultOpeneds.value = keyPath;
      // 缓存到本地
      sessionStore.write("defaultOpeneds", JSON.stringify(keyPath));
    };
    // 处理当前选中的菜单项
    const selectChildMenu = function (index: string, indexPath: Array<string>) {
      console.log(index, indexPath);
      defaultActiveIndex.value = index;
      // 这里由于示例的菜单数据只有两级，所以这里逻辑分开写
      if (indexPath.length == 1) {
        // 如果当前选中的是单独一个分组的菜单
        // 那就直接去找符合的菜单组
        const currentRouter = groupRouters.find((ele: any) => {
          return ele?.group == indexPath[0];
        });
        // 使用Vuex
        breadcrumb.value = [currentRouter?.meta?.title];
        store.dispatch("CHANGEBREADCRUMB", breadcrumb.value);
      } else {
        // 否则就是菜单组里面包含子菜单的情况
        // 菜单组
        const groupTags = indexPath[0];
        // 菜单项
        const currentRouters = indexPath[1];
        // 把文字名称找出来
        groupRouters.forEach((ele: any) => {
          if (groupTags === ele.group) {
            ele.children.forEach((item: any) => {
              if (currentRouters === item.name) {
                breadcrumb.value = [ele?.meta?.title, item?.meta?.title];
                // 设置菜单 actios
                store.dispatch("CHANGEBREADCRUMB", breadcrumb.value);
              }
            });
          }
        });
      }
      // 写入当前选中的菜单项，以确保当前侧边栏状态不发生改变
      sessionStore.write("defaultActiveIndex", JSON.stringify(index));
    };
    // 处理菜单组关闭
    const handleClose = function (key: string, keyPath: Array<string>) {
      // 和上面打开时一样处理
      defaultOpeneds.value = keyPath;
      sessionStore.write("defaultOpeneds", JSON.stringify(keyPath));
    };
    // 路由监听
    onBeforeRouteUpdate(
      (
        to: RouteLocationNormalizedLoaded,
        from: RouteLocationNormalizedLoaded,
        next: Function
      ) => {
        if (to?.meta?.group) {
          // 如果要去的路由存在group才进入
          // 找到当前要去到的路由
          const filtersRouter = groupRouters.find((ele: any) => {
            return to?.meta?.group === ele.group;
          });
          // 如果group的path不是null
          if (filtersRouter.path === null) {
            breadcrumb.value = [filtersRouter?.meta?.title, to?.meta?.title];
            defaultActiveIndex.value = to?.name;
            sessionStore.write(
              "defaultActiveIndex",
              JSON.stringify(defaultActiveIndex.value)
            );
          } else {
            breadcrumb.value = [filtersRouter?.meta?.title];
            defaultOpeneds.value = [filtersRouter?.group];
            defaultActiveIndex.value = filtersRouter?.group;
            sessionStore.write(
              "defaultOpeneds",
              JSON.stringify(defaultOpeneds.value)
            );
            sessionStore.write(
              "defaultActiveIndex",
              JSON.stringify(defaultActiveIndex.value)
            );
          }
        }

        store.dispatch("CHANGEBREADCRUMB", breadcrumb.value);
        next();
      }
    );

    return {
      defaultOpeneds,
      defaultActiveIndex,
      groupRouters,
      handleOpen,
      handleClose,
      selectChildMenu,
    };
  },
});
</script>

<style  lang="less" scoped>
.el-menu {
  height: 100%;
}
.el-menu-item-group,
.el-menu,
.el-menu--inline {
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  img {
    height: 40px;
  }
}
.el-menu-vertical {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>