<template>
<div>
  <div align="left">
    <img style="left:20px;height: 90px" src="/static/login_login.png" />
  </div>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h4 class="title">欢迎登陆智慧园区系统</h4>
      </div>
      <el-form-item prop="email">
        <el-input name="email" type="text" placeholder="请输入用户名" v-model="loginForm.email" autoComplete="on"
        />
      </el-form-item>

    <el-form-item prop="pwd">
      <el-input name="pwd" placeholder="请输入密码"  :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.pwd" autoComplete="on"/>
    </el-form-item>
 <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <a class="a-left" @click="forgetPwd" href="javascript:">忘记密码</a>
        <a class="a-right" @click="register" href="javascript:">注册</a>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        email: '',
        pwd: ''
      },
      loginRules: {
        email: [{required: true, trigger: 'blur'}],
        pwd: [{required: true, trigger: 'blur'}]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http.post('/itfuser/login', {account:this.loginForm.email,pwd:this.loginForm.pwd})
            .then( (response) => {
              if (response.success) {
                window.localStorage.setItem('access_token', response.result)
                this.$router.push({path: '/'})
              }else{
                this.$message(response.message);
              }
            })
            .catch(function (error) {
              console.info(error);
            });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register () {
      this.$router.push({path: '/register'})
    },
    forgetPwd () {
      this.$router.push({path: '/forgetPwd'})
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
.a-left{
  position: absolute;
  left:40px;
  bottom:20px
}
.a-right{
  position: absolute;
  right:40px;
  bottom:20px
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url('../../../static/login_bg.png') no-repeat;
  background-size:100%;-moz-background-size:100%;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    padding: 35px 35px 15px 35px;
    margin: 80px auto;
    background-color:white;
    border-radius:5px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>
