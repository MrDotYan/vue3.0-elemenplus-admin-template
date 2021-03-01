<template>
  <div class="wraapper-map">
    <div class="pages">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        background
      >
      </el-pagination>
    </div>

    <div class="map" id="map"></div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, ref } from "vue";

import { Map, View, Overlay } from "ol";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import { Fill, Stroke, Style } from "ol/style";

import { defaults as defaultsControl } from "ol/control";

import API from "../../request/api";
import { onBeforeRouteLeave } from "vue-router";

export default defineComponent({
  setup() {
    const counteries = ref();
    // const lnglats = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(100);

    const totalNum = ref(0);
    let map: any;
    let wordMapLayer: any;
    // 获取底图
    const getCounterise = function (cb: Function) {
      API.shape().then((res: any) => {
        if (res.code == 1) {
          counteries.value = res.data.find((ele: any) => {
            return ele.type === "world";
          });
          if (counteries.value) {
            cb && cb();
          }
        } else {
          ElMessage.error(res.message);
        }
      });
    };
    // 创建地图
    const createMap = function (cb: Function) {
      map = new Map({
        layers: [],
        target: "map",
        view: new View({
          center: [117.765602, 39.400437],
          zoom: 5,
          projection: "EPSG:4326",
          maxZoom: 12,
        }),
        loadTilesWhileAnimating: true, //将这个设置为true，默认为false
        controls: defaultsControl({
          zoom: false,
        }),
      });

      if (map) {
        cb && cb();
      }
    };
    // 添加图层
    const createWorldMapLayer = function (cb: Function) {
      const wordMapStyle = new Style({
        fill: new Fill({
          color: "#f5f5f5",
        }),
        stroke: new Stroke({
          color: "#D2691E",
          width: 1,
        }),
      });

      const features = new GeoJSON().readFeatures(counteries.value.data);
      const vectorSource = new VectorSource({
        features: features,
      });
      wordMapLayer = new VectorLayer({
        source: vectorSource,
        style: wordMapStyle,
        zIndex: 0,
      });
      map.addLayer(wordMapLayer);

      cb && cb();
    };
    // 设置闪烁点
    const setFlashPoint = function (point: Array<number>) {
      //第一种样式
      const element = document.createElement("div");
      element.className = "point_animation";
      const p = document.createElement("p");
      const span = document.createElement("span");
      element.appendChild(p);
      element.appendChild(span);

      const pointOverlayer = new Overlay({
        element: element,
        positioning: "center-center",
      });

      const cssStyleRules = document.styleSheets[0];
      // 再次渲染的时候先删除0号style
      cssStyleRules.deleteRule(0);

      cssStyleRules.insertRule(
        `@keyframes point_animation {
          10% {
            transform: scale(1);
          }
          100% {
            transform: scale(10);
          }
        }`,
        0
      );

      map.addOverlay(pointOverlayer);
      pointOverlayer.setPosition(point);
    };
    // 获取点数据
    const getPoint = function () {
      API.region({
        page: currentPage.value,
        size: pageSize.value,
      }).then((res: any) => {
        if (res.code == 1) {
          res.data.data.forEach((point: any) => {
            setFlashPoint([point.lng, point.lat]);
          });
          totalNum.value = res.data.total;
        }
      });
    };

    const sizeChange = function (size: number) {
      pageSize.value = size;
      map.getOverlays().clear();
      getPoint();
    };

    const currentChange = function (page: number) {
      currentPage.value = page;
      map.getOverlays().clear();
      getPoint();
    };

    onMounted(() => {
      getCounterise(() => {
        createMap(() => {
          const dom = document.getElementsByClassName("ol-viewport");
          const len = dom.length;
          if (len > 1) {
            dom[0].parentElement?.removeChild(dom[0]);
          }

          console.log(document.getElementsByClassName("ol-viewport"));
          createWorldMapLayer(() => {
            //数据源添加图层
            getPoint();
          });
        });
      });
    });

    onBeforeRouteLeave(() => {
      map.getOverlays().clear();
      map.removeLayer();
      map.removeControl();
      map.removeInteraction();
      map.removeOverlay();
    });

    return { currentPage, pageSize, totalNum, currentChange, sizeChange };
  },
});
</script>

<style lang="less" scoped>
.wraapper-map {
  text-align: left;
  width: 100%;
  height: 100%;
  position: relative;
  .pages {
    position: absolute;
    top: 0.625rem /* 10px -> .625rem */;
    right: 0.625rem /* 10px -> .625rem */;
    z-index: 10;
  }

  .map {
    width: 100%;
    height: 100%;
  }
  :deep(.ol-rotate-reset) {
    display: none;
  }
  :deep(.ol-overlay-container) {
    .point_animation {
      background: #ff9900;
      width: 6px;
      height: 6px;
      border: 2px #ff9900 solid;
      border-radius: 50%;
      position: absolute;
    }

    .point_animation p,
    .point_animation span {
      position: absolute;
      width: 4px;
      height: 4px;
      animation: point_animation 1.5s infinite;
      box-shadow: 0px 0px 1px #ff9900;
      margin: 0px;
      border-radius: 50%;
    }
    .point_animation span {
      animation-delay: 0.8s;
    }
  }
}
</style>