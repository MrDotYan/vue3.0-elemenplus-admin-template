<template>
  <div class="doc-wrapper">
    <el-card>
      <div class="context" :ref="pdfRefs">
        <h1>vue生命周期</h1>
        <div>
          <p>
            全文不超过2000字，观看需要我也不知道几分钟，耐心看下去，或许会对你有帮助
            这几天一直忙着面试，没来得及在掘金上面写写自己的文章，今天早上刚好不用去面试，在家总结了下这几天的面试知识点，这对于vue求职者或许会有一些帮助。
            如果你对我这篇文章有什么建议,可以把你宝贵的建议发送到我的邮箱：MrDotYanLT@yeah.net
            如果你发现这篇文章有什么错误的地方，你可以在下方留言，咱们一起学习，一起进步
          </p>
          <p>
            vue 的生命周期是一大面试点
            自然界的万事万物都会有一个生命周期，比如人，生老病死，比如石头，沉淀风化，最后成为泥土。
            所以vue的组件也是有生命周期的，四个阶段，八个钩子
          </p>
        </div>
        <h2>一阶段，生</h2>
        <p>
          生，开始，从未知到存在。我们可以把beforeCreate()，看作一个组件生命的开始
          这个周期里面vue组件开始初始化，vue开始观察数据，然后开始生成
          等到组件生成，created()出现，这标志，这个组件胚胎已经准备好了开始降临世界
          但是，在降临之前，是不是要找一个合适的地点，el挂载点就显得非常重要了，所以在created()之后，vue会判断这个组建有没有挂载点，有就接着判断有没有摇篮template，如果有，万事大吉，顺利出生开始，如果没有el挂载点，ok，那么得开始创建了，如果没有template，ok，那就把el的outrhtml当作template。
        </p>
        <h2>二阶段，老</h2>
        <p>
          老，开始，从生到死的消亡开始。现在beforeMount()是一个标志着刚刚降生的点，在这个点之后的一瞬间，vue开始创建vm.$el，并把原来创建好的el替换，这标志着我们可以在浏览器里面看到页面了
          ok,开始变老，然后mounted，这个阶段，肯定会发生数据的变化，于是update开始有作用了。
          数据更新，然后是否应该更新，如果是一个错误的数据呢？
          so，beforeUpdate()就显得至关重要了，当它同意数据更新，那就update,但是应不应该显示呢？updateed()来把关。
          ok，经过一系列的update，我们的组件要开始进入消亡期，也就是老年了，
          mounted()告诉您，已经可以开始死亡，多么沉重的话题！
        </p>

        <h2>四阶段，死</h2>
        <div>
          死，并不可怕，我只怕我死后没有人记住我。我不知道是谁说的，但是现在我觉得这句话很对。
          beforeDestroy()标志着组件机体已经开始死亡，该消失的逐渐在消失，这个时候，如果你还有遗愿，呸，是组件还有遗愿，那就告诉面前的你，有些数据是不是应该保存，是不是，特意嘱咐，必须销毁。
          destroyed()死亡成功，这个时候，也许组件会告诉你，是否需要在下一个页面开始的时候，做些什么。就像大仙要投胎，投胎到哪儿，总得找有一个放心的人来保护它，呃呃呃呃，小说看多了。。。
        </div>
        <h2>说明</h2>
        <div style="color: #f00">
          这里说明一下：
          <p>
            当前使用的这个插件是把html转化为Pdf，建议保存的html片段自带行内样式,
            如果不是行内样式，会导致保存的html片段没有样式效果
          </p>
        </div>
      </div>
      <div class="toolbar">
        <el-button type="primary" size="mini" @click="saveHtmlToPdf"
          >保存html为pdf文档</el-button
        >
      </div>
      <div class="docjs">
        <h2>jspdf插件适合koa、express等框架使用</h2>
        <div class="link">
          <el-link type="primary" href="https://github.com/MrRio/jsPDF"
            >网址在这</el-link
          >
        </div>
        <el-button type="primary" size="mini" @click="savePdfromAdmin"
          >从后端获取pdf</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { jsPDF } from "jspdf";
import htmlToCanvas from "html2canvas";
import Api from "@/request/api";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    let pdfContextRef: HTMLElement;
    const pdfRefs = function (el: HTMLElement) {
      pdfContextRef = el;
    };

    const saveHtmlToPdf = function () {
      htmlToCanvas(pdfContextRef).then((canvas: HTMLCanvasElement) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / 592.28) * 841.89;
        //未生成pdf的html页面高度
        let leftHeight = contentHeight;
        //页面偏移
        let position = 10;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        // 这里剪掉20像素的页面边距
        const imgWidth = 595.28 - 20;
        const imgHeight = (592.28 / contentWidth) * contentHeight;

        const pageData = canvas.toDataURL("image/png", 1.0);

        const pdf = new jsPDF("p", "pt", "a4");

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, "png", 10, 10, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, "png", 10, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save(`export${parseInt((Math.random() * 100000).toString())}.pdf`);
      });
    };

    const savePdfromAdmin = function () {
      console.log(99);
      Api.downloadPdf().then((res: any) => {
        console.log(res);
        if (res.code !== 1) {
          ElMessage.error("获取失败！");
          return;
        } else {
          ElMessage.success(res.message);
          const arrayBuffer = Buffer.from(res.buffer.data, "binary");
          const blob = new Blob([arrayBuffer], {
            type: res.mime,
          });

          const fileName = `file${parseInt(
            (Math.random() * 10000).toString()
          )}.pdf`;
          if (window?.navigator?.msSaveOrOpenBlob !== undefined) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            const link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.style.display = "none";
            link.click();

            window.URL.revokeObjectURL(link.href);
          }
        }
      });
    };
    return { pdfRefs, saveHtmlToPdf, savePdfromAdmin };
  },
});
</script>

<style lang="less" scoped>
.context {
  width: 45rem /* 720px -> 45rem */;
  text-align: left;
  margin: 1.875rem /* 30px -> 1.875rem */ auto;
}
.doc-wrapper {
  padding: 0.625rem /* 10px -> .625rem */;
  text-align: left;
  .toolbar {
    width: 45rem /* 720px -> 45rem */;
    margin: 1.875rem /* 30px -> 1.875rem */ auto;
    text-align: right;
  }
  .docjs {
    width: 45rem;
    margin: 1.875rem /* 30px -> 1.875rem */ auto;
  }
  .link {
    color: aquamarine;
    margin: 0.625rem /* 10px -> .625rem */;
  }
}
</style>