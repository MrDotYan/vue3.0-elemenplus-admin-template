<template>
  <div class="dashbord">
    <el-row :gutter="24">
      <el-col :span="6"
        ><el-card> <div id="charts-01" class="charts charts-01"></div></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card> <div id="charts-02" class="charts charts-02"></div></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card> <div id="charts-03" class="charts charts-03"></div></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card> <div id="charts-04" class="charts charts-04"></div></el-card
      ></el-col>
    </el-row>
    <div class="bar"></div>
    <el-row :gutter="24">
      <el-col :span="18">
        <el-card>
          <div class="charts charts-05" id="charts-05"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="charts charts-06" id="charts-06"></div>
        </el-card>
      </el-col>
    </el-row>

    <div class="bar"></div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card>
          <div class="charts charts-07" id="charts-07"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import chartsOptions from "./data";

export default defineComponent({
  setup() {
    const createCharts = function (id: string, options: any) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(
        document.getElementById(id) as HTMLCanvasElement
      );
      // 绘制图表
      myChart.setOption(options);
    };

    onMounted(() => {
      createCharts("charts-01", chartsOptions.barChartsOptions);
      createCharts("charts-02", chartsOptions.pieChartsOption);
      createCharts("charts-03", chartsOptions.lineChartsOptions);
      createCharts("charts-04", chartsOptions.pointChartsOption);
      createCharts("charts-05", chartsOptions.bigBarChartsOptions);
      createCharts("charts-06", chartsOptions.circlePieChartsOptions);
      createCharts("charts-07", chartsOptions.LineKChartsOptions);
    });

    const destroyCharts = function (id: string) {
      echarts.dispose(document.getElementById(id) as HTMLCanvasElement);
    };

    onUnmounted(() => {
      destroyCharts("charts-01");
      destroyCharts("charts-02");
      destroyCharts("charts-03");
      destroyCharts("charts-04");
      destroyCharts("charts-05");
      destroyCharts("charts-06");
      destroyCharts("charts-07");
    });
    return {};
  },
});
</script>

<style lang="less" scoped>
.charts {
  height: 18.75rem /* 300px -> 18.75rem */;
}
.charts-07 {
  height: 25rem /* 400px -> 25rem */;
}
.dashbord {
  padding: 0.625rem /* 10px -> .625rem */;
}
.bar {
  height: 1.25rem /* 20px -> 1.25rem */;
}
</style>