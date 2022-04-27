<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-divider></el-divider>
    <!-- 表格区域 -->
    <el-table :data="tableData" border>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <div>
            <el-tag type="primary" v-show="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-show="scope.row.level == 1">二级</el-tag>
            <el-tag type="warning" v-show="scope.row.level == 2">三级</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格区域 -->
  </div>
</template>

<script>
import { qxApi } from "@/http/api";
export default {
  data() {
    return {
      tableData: [], //权限数据
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await qxApi("list");
      console.log(res);
      this.tableData = res;
    },
  },
};
</script>

<style lang="scss" scoped></style>
