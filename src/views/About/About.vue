<template>
  <div class="about">
    <el-card>
      <el-alert
        description="目前就我一个人在搞，欢迎大佬一起来搞 ！！！！！！"
        type="error"
        effect="dark"
      ></el-alert>
      <div class="timeline">
        <el-timeline>
          <template v-for="(item, index) of plans" :key="index"
            ><el-timeline-item
              :timestamp="item.date"
              placement="top"
              :color="item.color"
            >
              <el-card>
                <h4>{{ item.context }}</h4>
                <p>{{ item.who }} 提交于 {{ item.date }}</p>
              </el-card>
            </el-timeline-item>
          </template>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import data from "./AboutConfig";

export default defineComponent({
  setup() {
    const plans = reactive(data);
    return { plans };
  },
});
</script>

<style lang="less">
.about {
  text-align: left;
  padding: 10px;
  .timeline {
    margin-bottom: 20px;
    margin-top: 20px;
  }
}
</style>
