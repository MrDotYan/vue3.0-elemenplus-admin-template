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
      editor.config.onchange = (newHtml: any) => {
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
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  width: calc(100vw - 200px);
}
.edit-rich-text {
  margin-bottom: 30px;
}
.padding30px {
  padding: 30px;
}
.wrapper-drawer {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .phone {
    background: url("../../assets/image/phone.svg") no-repeat;
    background-size: 445px 870px;
    width: 445px;
    height: 870px;
    position: relative;
    .html {
      position: absolute;
      top: 80px;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0 auto;
      width: 375px;
      height: 687px;
      background: #fff;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 4px;
      box-sizing: border-box;
    }
  }
}
</style>