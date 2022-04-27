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
        <el-table-column width="60" type="expand">
          <template slot-scope="scope">
            <div class="box">
              <div v-if="scope.row.children.length > 0">
                <el-row v-for="item1 in scope.row.children" :key="item1.id">
                  <el-col :span="2">
                    <el-tag
                      closable
                      @close="delTag(scope.row, scope.row.id, item1.id)"
                      >{{ item1.authName }}</el-tag
                    >
                  </el-col>
                  <el-col :span="22">
                    <el-row v-for="item2 in item1.children" :key="item2.id">
                      <el-col :span="2">
                        <el-tag
                          closable
                          type="warning"
                          @close="delTag(scope.row, scope.row.id, item2.id)"
                          >{{ item2.authName }}</el-tag
                        >
                      </el-col>
                      <el-col :span="22">
                        <el-tag
                          @close="delTag(scope.row, scope.row.id, item3.id)"
                          closable
                          type="danger"
                          v-for="item3 in item2.children"
                          :key="item3.id"
                        >
                          {{ item3.authName }}
                        </el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div v-else>此角色暂无数据</div>
            </div>
          </template>
        </el-table-column>
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
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="mini"
              @click="isSetShow(scope.row)"
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

    <!-- 权限 -->
    <el-dialog
      title="提示"
      :visible.sync="setShow"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 树形列表 -->
      <el-tree
        ref="rightTreeRef"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedAll"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setShow = false">取 消</el-button>
        <el-button type="primary" @click="srtRolesOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  jsApi,
  jstjApi,
  jsdelApi,
  jsxgApi,
  getRightsListApi,
  delTagApi,
  setRightApi,
} from "@/http/api";
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
      // 权限
      setShow: false,
      treeData: [],
      defaultProps: {
        // tree默认配置
        label: "authName",
        children: "children",
      },
      checkedAll: [], // 默认选中id组成的数组
      rid: 0, // 当前用户id
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
      this.$refs.ruleForm.validate(async (valid) => {
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
    // 权限
    // 监听关闭
    handleClose() {
      this.checkedAll = [];
      this.setShow = false;
    },
    async isSetShow(row) {
      const res = await getRightsListApi("tree");
      console.log("权限:", res);
      this.treeData = res;
      this.rid = row.id;
      // 递归获取当前角色所拥有的权限数组方法
      this.getCheckedIdAll(row, this.checkedAll);
      console.log("当前角色所有权限", this.checkedAll);
      this.setShow = true;
    },
    getCheckedIdAll(row, checkedAll) {
      if (!row.children) {
        return checkedAll.push(row.id);
      }
      row.children.forEach((item) => {
        this.getCheckedIdAll(item, checkedAll);
      });
    },

    // 点击确定拿到全选和半选的值,最后更新到后台
    async srtRolesOk() {
      // 全选id的数组
      const allchecked = this.$refs.rightTreeRef.getCheckedKeys();
      // 半选id的数组
      const halfchecked = this.$refs.rightTreeRef.getHalfCheckedKeys();
      // 合并全选和半选的数组
      const arr = [...allchecked, ...halfchecked];
      // 将合并的数组转换成字符串
      const arrStr = arr.join(",");
      // 调用角色授权接口
      const res = await setRightApi(this.rid, arrStr);
      console.log("更新", res);
      this.getList();
      this.setShow = false;
    },
    // 删除标签
    async delTag(row, roleid, rightid) {
      // 调用删除的接口
      const res = await delTagApi(roleid, rightid);
      console.log("删除:", res);
      row.children = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag{
  margin: 10px;
}
</style>
