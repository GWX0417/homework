<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-card style="margin-top: 30px">
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
      >
      </el-alert>
      <!-- 选择商品分类 -->
      <el-row style="margin-top: 10px">
        <el-col :span="3">
          <p>选择商品分类:</p>
        </el-col>
        <el-col :span="20">
          <!-- <p>选中的分类数组:{{ checkAll }}--当前的分类:{{ current_cate_id }}</p> -->
          <el-cascader
            v-model="checkAll"
            :options="goodscateData"
            :props="defaultprops"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- 选择商品分类 -->
      <!-- 商品分类参数列表tab -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加按钮 -->
          <el-row>
            <el-col>
              <el-button type="primary" size="mini" :disabled="isOk"
                @click="add"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <!-- 添加按钮 -->
          <!-- 参数列表 -->
          <el-table border :data="many" style="margin-top: 10px">
            <el-table-column width="100px" type="expand">
              <template slot-scope="scope">
                <div>
                  <el-tag
                    v-for="(item, index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(scope.row, index)"
                  >
                    {{ item }}
                  </el-tag>
                  <el-input
                    class="tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="xg(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="del(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 参数列表 -->
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
            <!-- 添加按钮 -->
          <el-row>
            <el-col>
              <el-button type="primary" size="mini" :disabled="isOk" @click="add"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <!-- 添加按钮 -->
          <!-- 参数列表 -->
          <el-table border :data="only" style="margin-top: 10px">
            <el-table-column width="100px" type="expand">
              <template slot-scope="scope">
                <div>
                  <el-tag
                    v-for="(item, index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(scope.row, index)"
                  >
                    {{ item }}
                  </el-tag>
                  <el-input
                    class="tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="xg(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="del(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 参数列表 -->
        </el-tab-pane>
      </el-tabs>
      <!-- 商品分类参数列表tab -->
    </el-card>
    <!-- 修改分类参数 -->
    <el-dialog title="修改动态参数" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="动态参数" prop="attr_name">
          <el-input
            autocomplete="off"
            v-model="ruleForm.attr_name"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="xgparams">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改分类参数 -->
    <!-- 添加分类参数 -->
    <el-dialog title="添加动态参数" :visible.sync="dialogFormVisibleArr">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="动态参数" prop="attr_name">
          <el-input
            autocomplete="off"
            v-model="ruleForm.attr_name"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleArr = false">取 消</el-button>
        <el-button type="primary" @click="addparamsArr">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加分类参数 -->
  </div>
</template>

<script>
import {
  categoriesApi,
  getGoodsparams,
  addparams,
  delparams,
  addparamsApi,
} from "@/http/api";
export default {
  data() {
    return {
      activeName: "many", //默认activeName为many  动态参数类型
      defaultprops: {
        expandTrigger: "hover",
        children: "children",
        label: "cat_name",
        value: "cat_id",
      },
      checkAll: [], //存放选中分类id组成的数组
      goodscateData: [], //商品分类数据源
      many: [], //动态参数数组
      only: [], //静态参数数组
      inputVisible: false,
      inputValue: "",
      dialogFormVisibleArr: false, //添加用户模态框
      dialogFormVisible: false, //修改用户模态框
      rules: {
        attr_name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      ruleForm: {
        attr_name: "",
      },
    };
  },
  mounted() {
    this.getgoodscateList();
  },
  methods: {
    //商品分类列表
    async getgoodscateList() {
      const res = await categoriesApi();
      console.log(res);
      this.goodscateData = res;
    },
    //三级分类选中改变是触发
    handleChange() {
      this.getgoodsparamsList();
    },
    //获取商品参数列表
    async getgoodsparamsList() {
      if (this.checkAll.length !== 3) {
        //错误提示
        this.$message({
          type: "error",
          message: "你需要选择三级分类，才能添加或编辑参数",
        });
        return false;
      }
      const res = await getGoodsparams(this.current_cate_id, this.activeName);
      console.log(res);
      if (this.activeName == "many") {
        res.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        console.log(res);
        //渲染动态参数
        this.many = res;
      } else if (this.activeName == "only") {
        //渲染静态数据
        res.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        console.log(res);
        //渲染动态参数
        this.only = res;
      }
    },
    //点击tab栏改变值
    handleClick() {
      this.getgoodsparamsList();
    },
    //删除tab标签是触发
    async handleClose(row, index) {
      console.log(row.attr_vals);
      row.attr_vals.splice(index, 1);
      await addparams(this.current_cate_id, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(","),
      });
      this.getgoodsparamsList();
    },
    //点击回车添加
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length > 0) {
        row.attr_vals.push(row.inputValue);
        await addparams(this.current_cate_id, row.attr_id, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals.join(","),
        });
      }
      row.inputVisible = false;
      row.inputValue = "";
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async del(row) {
      await delparams(this.current_cate_id, row.attr_id);
      this.getgoodsparamsList();
    },
    xg(row) {
      this.dialogFormVisible = true;
      this.ruleForm = row;
    },
    async xgparams() {
      await addparams(this.current_cate_id, this.ruleForm.attr_id, {
        attr_name: this.ruleForm.attr_name,
        attr_sel: this.activeName,
        attr_vals: this.ruleForm.attr_vals.join(","),
      });
      this.getgoodsparamsList();
      this.dialogFormVisible = false;
    },
    //添加分类
    add() {
      this.dialogFormVisibleArr = true;
    },
    async addparamsArr() {
      await addparamsApi(this.current_cate_id, {
        attr_name: this.ruleForm.attr_name,
        attr_sel: this.activeName,
      });
      this.getgoodsparamsList();
    },
  },
  computed: {
    isOk() {
      return this.checkAll.length !== 3;
    },
    current_cate_id() {
      return this.checkAll.at(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-cascader {
  width: 300px;
}
.el-tag {
  margin: 6px 10px;
}
.el-input .tag {
  width: 100px;
}
</style>
