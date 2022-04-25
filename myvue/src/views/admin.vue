<template>
  <div>
    <el-container>
      <el-header
        >企业后台管理系统
        <el-button type="info">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isShow ? '65px' : '200px'">
          <header @click="isShow = !isShow">|||</header>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isShow"
          >
            <el-submenu
              :index="index + '1'"
              v-for="(item, index) in menus"
              :key="index"
            >
              <template slot="title">
                <i :class="icon[index]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="ite.path"
                  v-for="(ite, ind) in item.children"
                  :key="ind"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ ite.authName }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view ></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { AdminApi } from "@/http/api";
export default {
  data() {
    return {
      menus: [], //菜单的基本数据
      isShow: false, //左侧菜单栏显示隐藏
      icon: [
        "el-icon-user-solid",
        "el-icon-s-tools",
        "el-icon-s-goods",
        "el-icon-s-order",
        "el-icon-s-data",
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await AdminApi();
      console.log(res);
      this.menus = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #333744;
}
header {
  width: 100%;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
}
.el-header {
  width: 100%;
  color: #fff;
  height: 50px;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #373d41;
  .el-button {
    width: 100px;
  }
}
</style>
