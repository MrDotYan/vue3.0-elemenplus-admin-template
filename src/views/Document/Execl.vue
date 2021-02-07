<template>
  <div class="padding10px">
    <el-card>
      <div
        class="column"
        @drop="drop"
        @dragenter="suppress"
        @dragover="suppress"
      >
        <div class="row">
          <div class="row">
            <div class="col-xs-12">
              <form class="form-inline">
                <div class="form-group">
                  <div class="wrapper">
                    <input
                      type="file"
                      class="form-control"
                      id="file"
                      :accept="SheetJSFT"
                      @change="change"
                    />
                    <span>请上传Execl文件</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <el-button
                :disabled="data.length ? false : true"
                class="btn btn-success"
                @click="exportExecl"
              >
                导出execl
              </el-button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th v-for="c in cols" :key="c.key">{{ c.name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, key) in data" :key="key">
                    <td v-for="c in cols" :key="c.key">{{ r[c.key] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import XLSX from "xlsx";

export default defineComponent({
  setup() {
    const makeCols = function (refstr: any) {
      return Array(XLSX.utils.decode_range(refstr).e.c + 1)
        .fill(0)
        .map((x, i) => ({ name: XLSX.utils.encode_col(i), key: i }));
    };

    const _SheetJSFT = [
      "xlsx",
      "xlsb",
      "xlsm",
      "xls",
      "xml",
      "csv",
      "txt",
      "ods",
      "fods",
      "uos",
      "sylk",
      "dif",
      "dbf",
      "prn",
      "qpw",
      "wb*",
      "wq*",
      "html",
      "htm",
    ]
      .map(function (x) {
        return "." + x;
      })
      .join(",");

    const data: any = reactive({
      data: ["SheetJS".split(""), "1234567".split("")],
      cols: [
        { name: "A", key: 0 },
        { name: "B", key: 1 },
        { name: "C", key: 2 },
        { name: "D", key: 3 },
        { name: "E", key: 4 },
        { name: "F", key: 5 },
        { name: "G", key: 6 },
      ],
    });

    const SheetJSFT = reactive([..._SheetJSFT]);

    const suppress = function (evt: Event) {
      evt.stopPropagation();
      evt.preventDefault();
    };

    const file = function (file: File) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e: any) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: "binary",
          cellHTML: true,
          cellText: true,
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const xlsdata = XLSX.utils.sheet_to_json(ws, { header: 1 });

        /* Update state */
        data.data = xlsdata;
        data.cols = makeCols(ws["!ref"]);
      };
    };

    const drop = function (evt: any) {
      evt.stopPropagation();
      evt.preventDefault();
      const files = evt.dataTransfer.files;
      if (files && files[0]) file(files[0]);
    };

    const change = function (evt: any) {
      const files = evt.target.files;
      if (files && files[0]) file(files[0]);
    };
    const exportExecl = function (evt: any) {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(data.data);
      console.log(ws);
      const wb = XLSX.utils.book_new();
      console.log(wb);
      // return ;
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate file and send to client */
      XLSX.writeFile(wb, "sheetjs.xlsx", {
        Props: {
          Author: "MrDotYan",
        },
      });
    };

    const dataX = toRefs(data);

    return {
      drop,
      suppress,
      SheetJSFT,
      change,
      exportExecl,
      ...dataX,
    };
  },
});
</script>
<style lang="less" scoped>
.padding10px {
  padding: 10px;
  text-align: left;
}
.column {
  & > .row {
    margin: 20px;
    width: calc(100% - 40px);
    .wrapper {
      width: 100%;
      height: 200px;
      border: 1px dashed #ccc;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 9;
        position: absolute;
      }
    }
    label {
      width: 200px;
      display: block;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
/* Table Head */
.table {
  width: 100%;
} /* Border styles */
.table thead,
.table tr {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(230, 189, 189);
}
.table {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(230, 189, 189);
}

/* Padding and font style */
.table td,
.table th {
  padding: 5px 10px;
  font-size: 12px;
  font-family: Verdana;
  color: rgb(177, 106, 104);
}

/* Alternating background colors */
.table tr:nth-child(even) {
  background: rgb(238, 211, 210);
}
.table tr:nth-child(odd) {
  background: #fff;
}
</style>