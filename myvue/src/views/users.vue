<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-divider></el-divider>
    <el-card>
      <!-- 搜索区域 -->
      <el-input
        v-model="keyword"
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 300px"
      >
        <el-button
          slot="append"
          @click="search"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button type="primary" style="margin-left: 30px" @click="addUsers"
        >添加用户</el-button
      >
      <!-- 搜索区域 -->
      <el-divider></el-divider>
      <!-- 表格区域 -->
      <el-table border style="width: 100%" :data="users">
        <el-table-column fixed label="#" type="index"></el-table-column>
        <el-table-column fixed label="姓名" prop="username"></el-table-column>
        <el-table-column fixed label="邮箱" prop="email"></el-table-column>
        <el-table-column fixed label="电话" prop="mobile"></el-table-column>
        <el-table-column fixed label="角色" prop="role_name"></el-table-column>
        <el-table-column fixed label="状态">
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              v-model="scope.row.mg_state"
              inactive-color="#ff4949"
              @change="zt({ id: scope.row.id, type: scope.row.mg_state })"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="xg(scope.row)"
              icon="el-icon-edit"
              size="mini"
            >
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格区域 -->
      <!-- 分页区域 -->
      <el-pagination
        @size-change="sl"
        @current-change="ys"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="params.pagesize"
        :current-page="params.pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 分页区域 -->
    </el-card>
    <!-- 模态框区域 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        label-width="80px"
        :model="user"
        ref="refuser"
        :rules="loginFromRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input autocomplete="off" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input autocomplete="off" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input autocomplete="off" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input autocomplete="off" v-model="user.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框区域 -->
    <!-- 修改模态框区域 -->
    <el-dialog title="修改用户" :visible.sync="xgFormVisible">
      <el-form
        label-width="80px"
        :model="Fromuser"
        ref="refuser"
        :rules="loginFromRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            :disabled="true"
            autocomplete="off"
            v-model="Fromuser.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input autocomplete="off" v-model="Fromuser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input autocomplete="off" v-model="Fromuser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xgFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addxg">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改模态框区域 -->
  </div>
</template>

<script>
import { UsersApi, delApi, ztApi, tjApi, xgApi } from "@/http/api";
export default {
  data() {
    return {
      keyword: "", //搜索关键字
      users: [], //用户列表数据
      //请求数据参数
      params: {
        pagenum: 1,
        pagesize: 6,
        query: "",
      },
      total: 0,
      //模态框显示和隐藏
      dialogFormVisible: false,
      //修改模态框的显示隐藏
      xgFormVisible: false,
      //添加用户
      user: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //修改用户
      Fromuser: {
        username: "",
        email: "",
        mobile: "",
        id: 0,
      },
      //添加用户表单验证
      loginFromRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //渲染用户列表
    async getList() {
      const res = await UsersApi(this.params);
      console.log(res);
      this.users = res.users;
      this.total = res.total;
    },
    //搜索
    search() {
      this.params.query = this.keyword;
      this.getList();
    },
    //点击分页器的下拉刷新菜单触发
    sl(size) {
      this.params.pagesize = size;
      this.getList();
    },
    //点击页码数量触发
    ys(num) {
      this.params.pagenum = num;
      this.getList();
    },
    //删除单个用户
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delApi(id);
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //点击添加用户模态框显示
    addUsers() {
      this.dialogFormVisible = true;
    },
    //添加用户
    add() {
      this.$refs.refuser.validate((valid) => {
        if (!valid) return false;
        tjApi(this.user);
        this.getList();
        this.dialogFormVisible = false;
        this.user = {
          username: "",
          password: "",
          email: "",
          mobile: "",
        };
      });
    },
    //状态
    zt(obj) {
      ztApi(obj);
    },
    //修改用户
    xg(obj) {
      this.xgFormVisible = true;
      this.Fromuser = obj;
      console.log(this.Fromuser);
    },
    addxg() {
      this.$refs.refuser.validate(async (valid) => {
        if (!valid) return false;
        await xgApi(this.Fromuser);
        this.getList();
        this.xgFormVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
