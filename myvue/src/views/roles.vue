<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-divider></el-divider>
    <el-card>
      <el-button type="primary" @click="addjs">添加角色</el-button>
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
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
              @click="del(scope.row.id)"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-s-tools" size="mini"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格区域 -->
    </el-card>

    <!-- 模态框区域 -->
    <el-dialog title="添加角色" :visible.sync="FormVisible">
      <el-form :model="users" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input autocomplete="off" v-model="users.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input autocomplete="off" v-model="users.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框区域 -->
    <!-- 修改模态框区域 -->
    <el-dialog title="添加角色" :visible.sync="xgFormVisible">
      <el-form
        :model="xgusers"
        label-width="80px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input autocomplete="off" v-model="xgusers.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input autocomplete="off" v-model="xgusers.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xgFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="xgadd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改模态框区域 -->
  </div>
</template>

<script>
import { jsApi, jstjApi, jsdelApi, jsxgApi } from "@/http/api";
import { async } from "q";
export default {
  data() {
    return {
      tableData: [], //角色列表数据
      xgFormVisible: false, //修改角色列表模态框显示隐藏
      FormVisible: false, //添加角色列表模态框显示隐藏
      //添加
      users: {
        roleName: "",
        roleDesc: "",
      },
      //修改
      xgusers: {
        roleName: "",
        roleDesc: "",
      },
      //添加角色表单认证
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //角色数据渲染
    async getList() {
      const res = await jsApi();
      console.log(res);
      this.tableData = res;
    },
    //点击添加角色模态框显示
    addjs() {
      this.FormVisible = true;
    },
    //添加角色
    add() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return false;
        await jstjApi(this.users);
        this.getList();
        this.users = {
          roleName: "",
          roleDesc: "",
        };
        this.FormVisible = false;
      });
    },
    //删除角色用户
    del(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await jsdelApi(id);
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改角色用户
    xg(obj) {
      this.xgFormVisible = true;
      this.xgusers = obj;
    },
    xgadd() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false;
        await jsxgApi(this.xgusers);
        this.getList();
        this.xgFormVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
