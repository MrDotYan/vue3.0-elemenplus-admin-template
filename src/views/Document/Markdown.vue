<template>
  <div class="padding10px">
    <el-card>
      <el-alert
        description="这是一个简易的markdown编辑器，需要样式优化，他仅仅展示了markdown-it插件的使用"
        type="success"
        effect="dark"
      ></el-alert>
      <div class="flex-wrapper">
        <div
          class="edit-container"
          :ref="setEditRefs"
          contenteditable="true"
        ></div>
        <div class="show-container" v-html="result"></div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from "vue";
import MD from "markdown-it";
import hljs from "highlight.js/lib/core";

export default defineComponent({
  setup() {
    const md = new MD({
      html: true,
      highlight: function (str: string, lang: any = "javascript") {
        // console.log(lang);
        // 配置hljs，貌似我自己也没有搞懂
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              "</code></pre>"
            );
          } catch (__) {
            console.log(__);
          }
        }

        return (
          '<pre class="hljs"><code>' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      },
    });
    const mdContext = ref("### 你好，欢迎使用markdown编辑！");
    const result = ref("<h3>你好，欢迎使用markdown编辑！</h3>");
    let refEditContiner: HTMLElement;

    const handler = function (event: Event) {
      mdContext.value = refEditContiner.innerText;
      result.value = md.render(mdContext.value);
    };

    const setEditRefs = function (el: HTMLElement) {
      refEditContiner = el;
      document.addEventListener("keyup", handler, false);
    };

    return { setEditRefs, result, handler };
  },
  unmounted() {
    document.removeEventListener("keyup", this.handler, false);
  },
});
</script>

<style lang="less" scoped>
.padding10px {
  padding: 0.625rem /* 10px -> .625rem */;
  text-align: left;
  width: 82vw;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.flex-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.625rem /* 10px -> .625rem */;
  overflow: hidden;
  width: 80vw;
  height: 100%;
}
.edit-container {
  width: 48%;
  height: 43.75rem /* 700px -> 43.75rem */;
  border: 1px solid #ccc;
  outline: none;
  padding: 0.625rem /* 10px -> .625rem */;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 0.625rem;
  -webkit-user-select: auto;
}
.show-container {
  width: 48%;
  height: 43.75rem /* 700px -> 43.75rem */;
  border: 1px solid #ccc;
  padding: 0.625rem /* 10px -> .625rem */;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 0.625rem;
}
</style>