<template>
  <div class="padding10px">
    <el-card>
      <div>遵循GPL3.0开源协议</div>

      <div class="lin" v-html="lin"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MD from "markdown-it";
import Api from "@/request/api";
export default defineComponent({
  components: {},
  setup() {
    const lin = ref("");
    const md = new MD();
    Api.licenseContext().then((res: any) => {
      lin.value = md.render(res.license);
    });
    return { lin };
  },
});
</script>

<style lang="less" scoped>
.padding10px {
  padding: 0.625rem /* 10px -> .625rem */;
  width: 60rem /* 960px -> 60rem */;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 auto;
  .lin {
    width: 37.5rem /* 600px -> 37.5rem */;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: left;
    margin: 0 auto;
  }
}
</style>