<template>
  <div class="login">
    <div class="admin">
      <h2>电商后台管理系统</h2>
      <el-form :model="loginFrom" ref="loginFromRef" :rules="loginFromRules">
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginFrom.password" placeholder="请输入密码" prefix-icon="el-icon-s-goods"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Login">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LoginApi } from '@/http/api'
  export default {
    data() {
      return {
        //表单数据绑定
        loginFrom: {
          username: '',
          password: ''
        },
        //表单验证规则
        loginFromRules: {
          username: [
            //判断处理
            {
              required: true,
              message: '请输入登录名称',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '输入用户名长度必须在 5 到 20 位之间',
              trigger: 'blur'
            }
          ],
          password: [
            //判断处理
            {
              required: true,
              message: '请输入登录密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '输入密码的长度必须在 5 到 20 位之间',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    mounted() {},
    methods: {
      //登录
      Login() {
        console.log('login')
        this.$refs.loginFromRef.validate(async(valid) => {
          if (!valid) return false
          //开始调用后台登录接口
          const res = await LoginApi(this.loginFrom)
          console.log('是否登录成功：', res)
          this.$router.push('./admin')
        })
      }
    },
  };
</script>

<style lang='scss' scoped>
  .login {
    height: 100%;
    width: 100%;
    background-color: #2b4b6b;
    .admin {
      top: 50%;
      left: 50%;
      width: 30%;
      padding: 25px;
      height: 280px;
      text-align: center;
      position: absolute;
      box-shadow: 3px 3px 3px 3px #fff;
      background-color: #fff;
      border: 2px solid #fff;
      transform: translate(-50%, -50%);
      .el-form-item {
        margin: 40px;
      }
    }
  }
</style>
