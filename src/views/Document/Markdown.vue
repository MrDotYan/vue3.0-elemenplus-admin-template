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
  padding: 10px;
  text-align: left;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.flex-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  overflow: hidden;
  width: calc(100vw - 300px);
  height: 100%;
}
.edit-container {
  width: 48%;
  height: 700px;
  border: 1px solid #ccc;
  outline: none;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  -webkit-user-select: auto;
}
.show-container {
  width: 48%;
  height: 700px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
}
</style>