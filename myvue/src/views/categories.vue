<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-card class="mt16">
      <el-button type="primary" @click="addCateDia">添加分类</el-button>
      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top:20px;"
        row-key="cat_id"
      >
        <el-table-column type="index" label="#">
          <template slot-scope="scope">
            <div>
              {{ scope.row.index }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="address" label="是否有效">
          <template slot-scope="scope">
            <div>
              <i
                v-if="!scope.row.cat_deleted"
                class="el-icon-success"
                style="color: #1ad31a"
              ></i>
              <i v-else class="el-icon-error" style="color: #f00"> </i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <div>
              <el-tag type="primary" v-show="scope.row.cat_level == 0"
                >一级</el-tag
              >
              <el-tag type="success" v-show="scope.row.cat_level == 1"
                >二级</el-tag
              >
              <el-tag type="warning" v-show="scope.row.cat_level == 2"
                >三级</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mt16"
      >
      </el-pagination>
    </el-card>
    <!-- 修改 -->
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加分类" :visible.sync="FormVisible">
      <el-form :model="addForm">
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="addForm.cat_name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" label-width="80px">
          <el-cascader
            ref="twoCateRef"
            v-model="checkCateArr"
            :options="twoCateData"
            :props="defaultProps"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { categoriesApi, editGoodsCateApi, addGoodLitApi } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      form: {
        type: 3,
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      editForm: {
        cat_name: "",
        cat_id: 0,
      },
      dialogFormVisible: false,
      FormVisible: false,
      addForm: {
        cat_name: "",
        cat_pid: "",
        cat_level: "",
      },
      checkCateArr: [],
      twoCateData: [],
      defaultProps: {
        checkStrictly: true,
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
    };
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      const res = await categoriesApi(this.form);
      console.log(res);
      const { total, result } = res;
      result.forEach((item, index) => {
        item.index = index + 1;
      });
      this.tableData = result;
      this.total = total;
    },
    edit(row) {
      this.editForm.cat_name = row.cat_name;
      this.editForm.cat_id = row.cat_id;
      console.log(this.editForm);
      this.dialogFormVisible = true;
    },
    async update() {
      await editGoodsCateApi(this.editForm);
      this.dialogFormVisible = false;
      this.getList();
    },
    handleChange() {
      this.$refs.twoCateRef.dropDownVisible = false;
    },
    async addCateDia() {
      const res = await categoriesApi({ type: 2 });
      this.twoCateData = res;
      this.FormVisible = true;
    },
    async qd() {
      if (this.checkCateArr.length !== 0) {
        this.addForm.cat_pid = this.current_cat_id;
        this.addForm.cat_level = this.checkCateArr.length;
      } else {
        this.addForm.cat_pid = 0;
        this.addForm.cat_level = 0;
      }
      await addGoodLitApi(this.addForm);

      this.getList();
      this.FormVisible = false;
    },
    handleSizeChange(val) {
      this.form.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.form.pagenum = val;
      this.getList();
    },
  },
  computed: {
    current_cat_id() {
      return this.checkCateArr[this.checkCateArr.length - 1];
    },
  },
};
</script>
<style>
.el-cascader-panel {
  height: 200px;
}
</style>
<style lang="scss" scoped>
.el-card {
  text-align: left;
}
.el-cascader {
  width: 80%;
}
</style>
