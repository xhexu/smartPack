<template>
<div>
  <div align="left">
    <img style="left:20px;" src="../../assets/title.png" />
  </div>
<div class="login-container">
<el-form :model="registerForm" ref="registerForm" label-width="100px" class="login-form">
  <div class="title-container">
        <h3 class="title">重置密码</h3>
      </div>
  <el-row >
  <el-col :span="18" >
<el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="registerForm.email"></el-input>
    
  </el-form-item>
  </el-col>
  <el-col :span="4" :offset="1">
  <el-button :disabled="but_disabled" @click.prevent="sendMessage(registerForm.email)">{{but_text}}</el-button>
  </el-col>
</el-row>

  <el-form-item
    label="验证码"
    prop="verification"
    :rules="{
      required: true, message: '验证码不能为空', trigger: 'blur'
    }"
  >
  <el-input v-model="registerForm.verification"></el-input>
  </el-form-item>

  <el-form-item label="新密码" prop="password">
    <el-input v-model="registerForm.password" type="password"></el-input>
  </el-form-item>
 <el-form-item label="重新输入" prop="password2">
    <el-input v-model="registerForm.password2" type="password"></el-input>
  </el-form-item>
  {{!isSame && "密码不同"}}
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
    <el-button @click="loginForm()">登录</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>
<script>
  export default {
    name: 'register',
    data() {
      return {
        registerForm: {
          email: '',
          password:'',
          password2:'',
          verification:''
        },
        sendTime:0,
        but_disabled:false
      };
    },
    methods: {
      submitForm(formName) {
        
      },
      loginForm() {
        this.$router.push({path:'/login'})
      },
      verification(formName){

      },
      timeFun:function(){
        if(this.sendTime <= 0){
          return;
        }
        let time = this.sendTime;
        setTimeout(() => {
                this.sendTime = time-1;
                this.timeFun();
            }, 1000);
      },
      sendMessage(email){
        console.info(email);
        this.sendTime=30;
        this.timeFun();
      }
    },
    computed:{
      but_text:function(){
        if(this.sendTime == 0){
          this.but_disabled = false;
          return '验证码';
        }else{
          this.but_disabled = true;
          return this.sendTime+'(秒)';
        }
      },
      isSame:function(){
        return this.password === this.password2;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  background: url('../../../static/login_bg.png') no-repeat;;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 450px;
    padding: 35px 35px 15px 35px;
    margin: 20px auto;
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