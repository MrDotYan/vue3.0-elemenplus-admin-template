<template>
  <div class="about">
    <el-card>
      <div class="wrapper-alert-btn">
        <el-alert
          description="目前就我一个人在搞，欢迎大佬一起来搞 ！！！！！！"
          type="error"
          effect="dark"
        ></el-alert>
        <el-button class="btn" type="primary" @click="openDialog"
          >新增历史</el-button
        >
      </div>
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
      <el-dialog title="模板历史" v-model="visible" width="30%">
        <el-form
          :model="form"
          label-width="120px"
          :rules="rules"
          :ref="refsForm"
        >
          <el-form-item label="内容" prop="context">
            <el-input v-model="form.context"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="who">
            <el-input v-model="form.who"></el-input>
          </el-form-item>
          <el-form-item label="状态色" prop="color">
            <el-color-picker
              v-model="form.color"
              :show-alpha="true"
            ></el-color-picker>
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="okEvent">确认</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

import Api from "../../request/api";

export default defineComponent({
  setup() {
    const visible = ref(false);

    const plans = ref();
    const form = reactive({
      context: "",
      who: "MrDotYan",
      color: "rgba(11, 189, 135, 1)",
    });
    let refForm: HTMLFormElement;
    const refsForm = function (el: HTMLFormElement) {
      refForm = el;
    };

    const rules = reactive({
      context: [
        { required: true, message: "请填写本次更新内容", trigger: "blur" },
      ],
      who: [{ required: true, message: "请填写本次更新者", trigger: "blur" }],
      color: [{ required: true, message: "请选择状态色", trigger: "blur" }],
    });

    const getHistory = function () {
      Api.getHistory().then((res) => {
        plans.value = res;
      });
    };
    const okEvent = function () {
      refForm.validate((pass: boolean) => {
        console.log(8888);
        if (pass) {
          const deepFormClone = JSON.parse(JSON.stringify(form));

          Api.insertHistory({ params: JSON.stringify(deepFormClone) })
            .then((res: any) => {
              if (res.code === 1) {
                ElMessage.success(res.message);
                getHistory();
              } else {
                ElMessage.error(res.message);
              }
            })
            .catch((error) => {
              ElMessage.error(error);
            });
          visible.value = false;
        }
      });
    };
    const openDialog = function () {
      visible.value = true;
    };

    onMounted(() => {
      getHistory();
    });

    return { refsForm, plans, visible, form, rules, okEvent, openDialog };
  },
});
</script>

<style lang="less">
.about {
  text-align: left;
  padding: 0.625rem /* 10px -> .625rem */;
  .timeline {
    margin-bottom: 1.25rem /* 20px -> 1.25rem */;
    margin-top: 1.25rem /* 20px -> 1.25rem */;
  }
  .wrapper-alert-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      margin-left: 1.875rem /* 30px -> 1.875rem */;
    }
  }
}
</style>
