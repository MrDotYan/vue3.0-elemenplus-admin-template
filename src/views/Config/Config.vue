<template>
  <div class="system-config">
    <el-card>
      <div class="toolbar">
        <el-alert
          class="alert"
          title="新增成功以后需要重新登录才能显示！"
          type="success"
        >
        </el-alert>
        <el-button type="primary" size="mini" @click="openFrom"
          >新增菜单</el-button
        >
      </div>
      <div class="from-add-menu">
        <el-dialog title="新增菜单" v-model="dialogFormVisible" width="30%">
          <el-form class="from-group" :model="form">
            <el-form-item label="上级菜单" label-width="80px">
              <el-select v-model="form._fid" placeholder="请选择上级菜单">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.meta.title"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单组名称" label-width="80px">
              <el-input
                :disabled="form._fid !== ''"
                v-model="form.group"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="图标" label-width="80px">
              <el-input v-model="form.meta.icon" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由" label-width="80px">
              <el-input v-model="form.path" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由名称" label-width="80px">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" label-width="80px">
              <el-input v-model="form.meta.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="页面地址" label-width="80px">
              <el-input v-model="form.component" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" label-width="80px">
              <el-input v-model="form.sort" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="subFromEvent">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="table">
        <el-table
          :data="options"
          style="width: 100%; margin-bottom: 20px"
          border
          row-key="_id"
          default-expand-all
          size="mini"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="group" label="菜单组"> </el-table-column>
          <el-table-column prop="path" label="路由地址"> </el-table-column>
          <el-table-column prop="sort" width="100px" label="排序">
          </el-table-column>
          <el-table-column label="头信息">
            <template v-slot="{ row }">
              <div class="wrapper">
                <div>
                  <span>需要鉴权：</span>
                  <span>{{ row.meta.auth ? "是" : "否" }} </span>
                </div>
                <div>
                  <span>图标：</span>
                  <i :class="row.meta.icon"></i>
                </div>
                <div>
                  <span>名称：</span>
                  <span>{{ row.meta.title }} </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="组件地址">
            <template v-slot="{ row }">
              <span>{{ row.component }}</span>
            </template></el-table-column
          >
          <el-table-column label="操作" width="100px">
            <template v-slot="{ row }">
              <el-button
                type="danger"
                circle
                icon="el-icon-delete"
                @click="deleteCurrentRow(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Api from "@/request/api";
import sessionStore from "store/storages/sessionStorage";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const dialogFormVisible = ref(false);
    const sessionStoreOptions = sessionStore.read("config");
    const options = reactive(JSON.parse(sessionStoreOptions));
    const form = reactive({
      sort: 0,
      _fid: "",
      group: "",
      path: "",
      name: "",
      meta: {
        auth: true,
        title: "",
        icon: "",
      },
      component: "",
    });

    const openFrom = function () {
      dialogFormVisible.value = true;
    };

    const subFromEvent = function () {
      const deepFormClone = JSON.parse(JSON.stringify(form));
      if (deepFormClone.path === "") {
        deepFormClone.path = null;
      }
      Api.insertMenu({ params: JSON.stringify(deepFormClone) })
        .then((res: any) => {
          if (res.code === 1) {
            ElMessage.success(res.message);
          } else {
            ElMessage.error(res.message);
          }
        })
        .catch((error) => {
          ElMessage.error(error);
        });
    };

    const deleteCurrentRow = function (row: any) {
      console.log(row);
      ElMessage.success("当前暂时不提供删除功能！");
    };
    return {
      dialogFormVisible,
      form,
      options,
      openFrom,
      subFromEvent,
      deleteCurrentRow,
    };
  },
});
</script>

<style lang="less"  scoped>
.system-config {
  padding: 0.625rem /* 10px -> .625rem */;
  .toolbar {
    padding: 0.625rem /* 10px -> .625rem */ 0.625rem /* 10px -> .625rem */;
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .alert {
      margin: 0 0.625rem /* 10px -> .625rem */;
    }
  }
  .from-group {
    width: 100%;
    .el-select {
      width: 100%;
    }
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 6.25rem /* 100px -> 6.25rem */;
    }
  }
}
</style>