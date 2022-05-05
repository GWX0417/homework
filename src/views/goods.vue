<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-divider></el-divider>
    <el-card>
      <!-- 搜索区域 -->
      <el-input
        placeholder="请输入内容"
        style="width: 300px"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" style="margin-left: 30px" @click="addgoods">添加商品</el-button>
      <!-- 搜索区域 -->
      <el-divider></el-divider>
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.add_time | data }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              @click="del(scope.row.goods_id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格区域 -->
    </el-card>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 分页区域 -->
    <!-- 模态框区域 -->
    <!-- 模态框区域 -->
  </div>
</template>

<script>
import { goodsApi, goodsdel } from "@/http/api";
export default {
  data() {
    return {
      tableData: [], //商品列表数据
      //请求数据参数
      params: {
        pagenum: 1,
        pagesize: 6,
        query: "",
      },
      total: 0,
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    //商品列表渲染数据
    async getGoods() {
      const res = await goodsApi(this.params);
      console.log(res);
      this.total = res.total;
      this.tableData = res.goods;
    },
    handleSizeChange(size) {
      this.params.pagesize = size;
      this.getGoods();
    },
    handleCurrentChange(num) {
      this.params.pagenum = num;
      this.getGoods();
    },
    //删除商品
    del(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await goodsdel(id);
          console.log("123");
          this.getGoods();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //跳转到goodsadd页面
    addgoods(){
      this.$router.push('/goodsadd')
    }
  },
  filters: {
    data(val) {
      return new Date(val).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
