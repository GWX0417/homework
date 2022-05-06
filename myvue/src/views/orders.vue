<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 -->
    <el-card style="margin-top: 20px">
      <!-- 搜索区域 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 300px"
        v-model="keyword"
      >
        <el-button
          @click="search"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <!-- 搜索区域 -->
      <!-- 列表区域 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <div>
              <el-tag type="danger" v-show="scope.row.pay_status == 0"
                >未付款</el-tag
              >
              <el-tag type="success" v-show="scope.row.pay_status == 1"
                >已付款</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.create_time | data }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="add"
              circle
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-location"
              circle
              @click="addwuliu"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表区域 -->
    </el-card>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paramsinfo.pagenum"
      :page-sizes="[1, 5, 10, 20, 30]"
      :page-size="paramsinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 分页区域 -->
    <!-- 修改地址对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="省市区/县">
          <el-cascader
            :options="options"
            :props="defaultArr"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            autocomplete="off"
            style="width: 300px; margin-top: 10px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 修改地址对话框 -->
    <!-- 物流进度对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleArr">
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(item, index) in activities"
          :key="index"
          :timestamp="item.time"
          :icon="item.icon"
          :color="item.color"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleArr = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleArr = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 物流进度对话框 -->
  </div>
</template>

<script>
import city from "@/assets/city";
// console.log(city);
import wuliu from "@/assets/wuliu";
console.log(wuliu);
import { getordersList } from "@/http/api";
export default {
  data() {
    return {
      activities: wuliu[0].data,

      options: city,
      defaultArr: {
        expandTrigger: "hover",
        children: "children",
        label: "label",
        value: "value",
      },
      tableData: [], //订单列表数据
      paramsinfo: {
        query: "",
        pagenum: 1,
        pagesize: 6,
      },
      total: 0, //总条数
      keyword: "", //搜索关键字
      dialogFormVisible: false, //模态框显示隐藏
      dialogFormVisibleArr: false, //查看物流进度模态框
    };
  },
  created() {
    this.getorder();
    console.log(wuliu.data);
  },
  methods: {
    async getorder() {
      const res = await getordersList(this.paramsinfo);
      console.log(res);
      this.tableData = res.goods;
      this.total = res.total;
    },
    //一共多少页
    handleSizeChange(val) {
      this.paramsinfo.pagesize = val;
      this.getorder();
    },
    //每页显示多少条
    handleCurrentChange(val) {
      this.paramsinfo.pagenum = val;
      this.getorder();
    },
    //搜素
    search() {
      this.paramsinfo.query = this.keyword;
      this.getorder();
    },
    //点击编辑按钮，弹出模态框
    add() {
      this.dialogFormVisible = true;
    },
    //查看物流进度
    addwuliu() {
      this.dialogFormVisibleArr = true;
    },
    handleChange() {},
  },
  filters: {
    data(val) {
      return new Date(val).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
