<template>
  <div class="preview">
    <el-row :gutter="24">
      <el-col :span="12"
        ><el-card>
          <div class="info">
            <div class="avator">
              <i class="el-icon-platform-eleme"></i>
            </div>
            <div class="title">
              <span>Mr.Yan</span>
            </div>
            <div class="subtitle">
              <span
                >You have done 57.6% more sales today. Check your new badge in
                your profile.
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="charts-01 charts" id="charts-01"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card> <div class="charts-02 charts" id="charts-02"></div></el-card
      ></el-col>
    </el-row>

    <div class="bar"></div>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card>
          <div class="drop">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="bar"></div>
          <div class="total">
            <div class="staticer">
              <p class="title">2.7K Star</p>
              <i class="el-icon-bottom"></i>
              <p class="title">下降300%</p>
              <p>直接通过设置类名为 el-icon-iconName 来使用即可。例如：</p>
              <div class="block">
                <el-slider :model-value="silderValue" disabled></el-slider>
              </div>
            </div>
            <div class="charts-03 charts" id="charts-03"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="drop">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="bar"></div>
          <div class="charts-04 charts" id="charts-04"></div>
        </el-card>
      </el-col>
    </el-row>
    <div class="bar"></div>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card>
          <div class="charts charts-05" id="charts-05"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="charts charts-06" id="charts-06"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="charts charts-07" id="charts-07"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts";
import chartsOptions from "./data";
import { onBeforeRouteLeave } from "vue-router";
export default defineComponent({
  setup() {
    const createCharts = function (id: string, options: any) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(
        document.getElementById(id) as HTMLCanvasElement
      );
      // 绘制图表
      return myChart.setOption(options);
    };
    const silderValue = ref(46);

    onMounted(() => {
      createCharts("charts-01", chartsOptions.lineCharts01);
      createCharts("charts-02", chartsOptions.lineCharts02);
      createCharts("charts-03", chartsOptions.barChartsOptions);
      createCharts("charts-04", chartsOptions.twoBarChartsOptions);
      createCharts("charts-05", chartsOptions.circleCahrtsOptions);
      createCharts("charts-06", chartsOptions.LDChartsOptions);
      createCharts("charts-07", chartsOptions.speedChartsOptions);
    });

    const destroyCharts = function (id: string) {
      echarts.dispose(document.getElementById(id) as HTMLCanvasElement);
    };

    // onUnmounted(() => {});

    onBeforeRouteLeave(() => {
      destroyCharts("charts-01");
      destroyCharts("charts-02");
      destroyCharts("charts-03");
      destroyCharts("charts-04");
      destroyCharts("charts-05");
      destroyCharts("charts-06");
      destroyCharts("charts-07");
    });
    return { silderValue };
  },
});
</script>

<style lang="less" scoped>
.preview {
  padding: 0.625rem /* 10px -> .625rem */;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 18.75rem /* 300px -> 18.75rem */;
  border-radius: 0.625rem /* 10px -> .625rem */;
  color: #fff;
  background: linear-gradient(to right, #a69dff, #7e72f2);
  .avator {
    i {
      font-size: 69px;
      color: #fff;
    }
    width: 6.875rem /* 110px -> 6.875rem */;
    height: 6.875rem /* 110px -> 6.875rem */;
    background: #6457e8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    margin: 0.625rem /* 10px -> .625rem */;
    font-size: 1.25rem /* 20px -> 1.25rem */;
  }
  .subtitle {
    font-size: 1rem /* 16px -> 1rem */;
  }
}
.charts {
  height: 18.75rem /* 300px -> 18.75rem */;
}
.charts-03 {
  width: 18.75rem /* 300px -> 18.75rem */;
}
.charts-05,
.charts-06,
.charts-07 {
  height: 25rem /* 400px -> 25rem */;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .staticer {
    width: 16.875rem /* 270px -> 16.875rem */;
    i {
      font-size: 1.5rem /* 24px -> 1.5rem */;
      color: #67c23a;
    }
    font-size: 0.75rem /* 12px -> .75rem */;
    .title {
      font-size: 1.25rem /* 20px -> 1.25rem */;
      color: #67c23a;
    }
  }
}
.bar {
  height: 1.25rem /* 20px -> 1.25rem */;
}
.drop {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 0.75rem /* 12px -> .75rem */;
  }
}
</style>