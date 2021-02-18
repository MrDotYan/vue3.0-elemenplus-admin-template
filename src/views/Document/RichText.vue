<template>
  <div class="padding10px">
    <el-card>
      <div class="padding30px">
        <div class="edit-rich-text" id="edit-rich-text"></div>
        <div class="btn">
          <el-button type="primary" size="mini" @click="saveHtml"
            >预览HTML内容</el-button
          >
        </div>
      </div>
      <el-drawer title="预览富文本" v-model="drawer" :with-header="false">
        <div class="wrapper-drawer">
          <div class="phone">
            <div class="html" v-html="context"></div>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import E from "wangeditor";
export default defineComponent({
  setup() {
    const context = ref("");
    onMounted(() => {
      // 要在mounted以后才能找到dom结构
      const editor = new E("#edit-rich-text");
      // 设置编辑器配置
      editor.config.height = 500;
      editor.config.zIndex = 1;
      // 获取编辑内容
      editor.config.onchange = (newHtml: string) => {
        context.value = newHtml;
      };

      editor.create();
    });
    // 打开抽屉预览
    const drawer = ref(false);
    const saveHtml = function () {
      drawer.value = true;
    };

    return { saveHtml, drawer, context };
  },
});
</script>

<style lang='less' scoped>
.padding10px {
  padding: 0.625rem /* 10px -> .625rem */;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  width: calc(100vw - 12.5rem /* 200px -> 12.5rem */);
}
.edit-rich-text {
  margin-bottom: 1.875rem /* 30px -> 1.875rem */;
}
.padding30px {
  padding: 1.875rem /* 30px -> 1.875rem */;
}
.wrapper-drawer {
  padding: 1.875rem /* 30px -> 1.875rem */;
  display: flex;
  justify-content: center;
  align-items: center;
  .phone {
    // 手机背景
    background: url("../../assets/image/phone.svg") no-repeat;
    background-size: 27.8125rem /* 445px -> 27.8125rem */ 54.375rem
      /* 870px -> 54.375rem */;
    width: 27.8125rem /* 445px -> 27.8125rem */;
    height: 54.375rem /* 870px -> 54.375rem */;
    position: relative;
    .html {
      position: absolute;
      top: 5rem /* 80px -> 5rem */;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0 auto;
      width: 23.4375rem /* 375px -> 23.4375rem */;
      height: 42.9375rem /* 687px -> 42.9375rem */;
      background: #fff;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0.25rem /* 4px -> .25rem */;
      box-sizing: border-box;
    }
  }
}
</style>