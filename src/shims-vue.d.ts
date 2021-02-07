/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module 'store/storages/sessionStorage';
declare module 'file-saver';
declare module 'markdown-it';
declare module 'highlight.js/lib/core';