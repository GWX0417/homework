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
      <!-- 警告 -->
      <el-alert
        :closable="false"
        title="消息提示的文案"
        type="info"
        center
        show-icon
      >
      </el-alert>
      <!-- 警告 -->
      <br />
      <!-- 步骤条 -->
      <el-steps :active="active * 1" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 步骤条 -->
      <br />
      <!-- 标签页 -->
      <el-form :model="addgoodsFrom">
        <el-tabs
          tab-position="left"
          v-model="active"
          :before-leave="beforeLave"
          @tab-click="handleClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称">
              <el-input v-model="addgoodsFrom.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="addgoodsFrom.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="addgoodsFrom.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="addgoodsFrom.goods_number"></el-input>
            </el-form-item>
            <el-cascader
              v-model="rid"
              :options="catData"
              :props="defaultProps"
              @change="handleChange"
            ></el-cascader>
          </el-tab-pane>

          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item1.attr_name"
              v-for="item1 in manyParams"
              :key="item1.id"
            >
              <el-checkbox-group v-model="item1.attr_vals">
                <el-checkbox
                  :label="item2"
                  v-for="(item2, index) in item1.attr_vals"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyParams"
              :key="item.id"
            >
              <el-input>{{ item.attr_vals }}</el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
               <!-- headers脱离了ajax,要手动配置请求头 -->
                   
            <el-upload
              action="http://www.ysqorz.top:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
                <el-button size="small" type="primary">点击上传</el-button>  
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
          <el-tab-pane label="完成" name="5">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>

      <!-- 标签页 -->
    </el-card>
  </div>
</template>

<script>
import { grtGoodsApi, getGoodsparams } from "@/http/api";
import { escape } from "querystring";
import { log } from "util";
export default {
  data() {
    return {
      active: "0", //联动id
      //from表单
      addgoodsFrom: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      rid: [], //当前选中数组分类级别
      catData: [], //联级框的数据源
      manyParams: [], //动态数据
      onlyParams: [], //静态数据
      defaultProps: {
        expandTrigger: "hover", //鼠标滑动效果
        label: "cat_name",
        value: "cat_id",
      },
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
  },
  created() {
    this.grtGoods();
  },
  methods: {
    //渲染商品列表Api
    async grtGoods() {
      const res = await grtGoodsApi();
      console.log(res);
      this.catData = res;
    },
    //点击联级滑动
    handleChange() {},
    //点击菜单获得索引
    async handleClick() {
      if (this.active === "1") {
        //调取动态参数接口
        const res = await getGoodsparams(this.ridEnd);
        console.log(this.ridEnd);
        res.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        this.manyParams = res;
      } else if (this.active === "2") {
        //调取静态参数
        this.onlyParams = await getGoodsparams(this.ridEnd, "only");
      }
    },
    //切换前判断是不是非空
    beforeLave(newActive, oldActive) {
      console.log(newActive, oldActive);
      if (oldActive === "0" && this.rid.length !== 3) {
        this.$message({
          type: "error",
          message: "请选择三级联动",
        });
        return false;
      }
    },
    // 上传成功
    handleSuccess(res) {
      console.log("上传成功", res);
      this.addgoodsFrom.pics.push({
        pic: res.data.tmp_path,
      });
    }, 
    // 删除上传
    handleRemove(res) {
      console.log("删除上传", res);
      const index = this.addgoodsFrom.pics.findIndex((item) => {
        return item.pic === res.response.data.tmp_path;
      });
      this.addgoodsFrom.pics.splice(index, 1);
    },
     handlePreview(){

    }
  },
  computed: {
    ridEnd() {
      return this.rid[this.rid.length - 1];
    },
  },
};
</script>

<style lang="scss" scoped></style>
