<template>
  <router-view></router-view>
</template>

<style lang="less">
@import url("./assets/css/normalize.css");
@import url("./assets/css/atom.css");
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101f1c, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(#101f1c, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(#101f1c, 1);
}

* {
  scrollbar-color: #e5e5e5 #f7f7f9; /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}
</style>
