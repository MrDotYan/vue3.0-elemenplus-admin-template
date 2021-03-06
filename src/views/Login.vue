<template>
  <div class="login">
    <div class="wrapper">
      <el-form
        :model="form"
        :ref="setFormRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <div class="login-box" v-if="!isRegister">
          <el-form-item label-width="0px">
            <el-input v-model="form.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-input v-model="form.passWord" placeholder="密码"></el-input>
          </el-form-item>
        </div>
        <div class="register-box" v-else>
          <el-form-item label-width="0px">
            <el-input v-model="form.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-input v-model="form.passWord" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label-width="0px">
            <el-input
              v-model="form.rePassWord"
              placeholder="重复密码"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label-width="0px">
          <el-button
            class="btn"
            type="primary"
            @click="loginSubmit"
            :disabled="!form.userName || !form.passWord"
            >{{ isRegister ? "注册" : "登录" }}</el-button
          >
        </el-form-item>
        <!-- <el-form-item label-width="0px" v-if="!isRegister">
          <span class="register" @click="register">注册</span>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import sessionStore from "store/storages/sessionStorage";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/request/api";
import sRouters from "@/router/handle";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    // 定义响应式数据
    // 表单
    const form = reactive({
      userName: "admin",
      passWord: "admin",
      rePassWord: "",
    });

    const isRegister = ref(false);
    // 获取refs，注意这里和vue2.0写法不一样了
    let formRef: HTMLFormElement;
    const setFormRef = function (el: HTMLFormElement) {
      formRef = el;
    };
    // 定义表单校验规则
    const rules = {};
    // 获取路由，使用路由
    const router = useRouter();
    // store
    const store = useStore();
    // 处理路由数据
    const go = function () {
      // 获取sesstionStorage里面存储的数据
      const sessionRouters = sRouters();
      // 遍历菜单配置
      sessionRouters?.forEach((ele: any) => {
        // 两种情况
        // 如果group的path不是null，
        // 那么表示当前group是独个路由
        // 所以分类处理
        if (ele.path !== null) {
          // 把当前配置里面的菜单全都放到SystemEntry路由下面
          router.addRoute("SystemEntry", ele);
        } else {
          // 否则，group的path是null，
          // 代表当前group下存在详细的菜单分组
          // 再次遍历group的children，然后动态添加到路由
          ele?.children?.forEach((item: any) => {
            router.addRoute("SystemEntry", item);
          });
        }
      });
      // 判断当前路由配置中的第一个路由是否含有path
      const defaultRouterPathIsNull = sessionRouters[0]?.path === null;
      // 如果不存在path，那么这个路由存在children
      const defaultBreadcrumb = defaultRouterPathIsNull
        ? [sessionRouters[0]?.title, sessionRouters[0]?.children[0]?.name]
        : [sessionRouters[0]?.title];
      store.dispatch("CHANGEBREADCRUMB", defaultBreadcrumb);

      // 最后路由信息保存到内存完成以后
      // push到主页即重定向的页面
      router.push({
        path: defaultRouterPathIsNull
          ? sessionRouters[0]?.children[0]?.path
          : sessionRouters[0]?.path,
      });
    };
    const login = function () {
      Api.login({
        params: JSON.stringify({
          userName: form.userName,
          passWord: form.passWord,
        }),
      }).then((res: any) => {
        if (res.code === 1) {
          // 缓存当前获取的token信息
          sessionStore.write("token", res.data.token);
          sessionStore.write("user", JSON.stringify(res.data.user));
          // 如果验证成功，那就提交信息，获取菜单数据
          // 现在的这个请求，是把json放到了public目录下
          // 相当于当前域名同源请求
          Api.getMenu({}).then((configInfo) => {
            // 缓存当前菜单培训hi信息
            sessionStore.write("config", JSON.stringify(configInfo));
            go();
          });
        } else {
          ElMessage.error(res.message);
        }
      });
    };
    const register = function () {
      isRegister.value = true;
    };
    const registerActions = function () {
      if (form.passWord === form.rePassWord) {
        const data = {
          userName: form.userName,
          passWord: form.passWord,
        };
        Api.register({
          ...data,
        }).then((res: any) => {
          if (res.code === 1) {
            // 缓存当前获取的token信息
            sessionStore.write("token", res.data.token);
            sessionStore.write("user", JSON.stringify(res.data.user));
            // 如果验证成功，那就提交信息，获取菜单数据
            // 现在的这个请求，是把json放到了public目录下
            // 相当于当前域名同源请求
            Api.getMenu({}).then((configInfo) => {
              // 缓存当前菜单培训hi信息
              sessionStore.write("config", JSON.stringify(configInfo));
              go();
            });
          } else {
            ElMessage.error(res.message);
          }
        });
      } else {
        ElMessage.error("两次密码不一致!");
      }
    };
    // 登录
    const loginSubmit = function (): void {
      // 验证表单
      formRef.validate((pass: boolean) => {
        // 回调函数返回一个是否验证通过的布尔值
        if (pass) {
          if (isRegister.value) {
            registerActions();
          } else {
            login();
          }
        }
      });
    };

    return { setFormRef, form, rules, isRegister, register, loginSubmit };
  },
});
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url("../assets/background.png");
}
.wrapper {
  width: 31.25rem /* 500px -> 31.25rem */;
  height: 25rem /* 400px -> 25rem */;
  box-sizing: border-box;
  padding: 0.625rem /* 10px -> .625rem */;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  .el-form {
    width: 22.5rem /* 360px -> 22.5rem */;
  }
  .btn {
    width: 100%;
  }
  .register {
    color: #09f;
    cursor: pointer;
  }
}
</style>