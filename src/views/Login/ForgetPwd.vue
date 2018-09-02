<template>
<div>
  <div align="left">
    <img style="left:20px;height: 90px" src="/static/login_login.png" />
  </div>
<div class="login-container">
<el-form :model="forgetPwdForm" ref="forgetPwdForm" label-width="100px"  :rules="forgetPwdRules" class="login-form">
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
    <el-input v-model="forgetPwdForm.email"></el-input>

  </el-form-item>
  </el-col>
  <el-col :span="4" :offset="1">
  <el-button :disabled="but_disabled" @click.prevent="sendMessage(forgetPwdForm.email)">{{but_text}}</el-button>
  </el-col>
</el-row>
  <el-row >
    <el-col :span="18" >
  <el-form-item
    label="验证码"
    prop="vifcode"
    :rules="{
      required: true, message: '验证码不能为空', trigger: 'blur'
    }"
  >
  <el-input v-model="forgetPwdForm.vifcode"></el-input>
  </el-form-item>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="18" >
  <el-form-item label="新密码" prop="pwd">
    <el-input v-model="forgetPwdForm.pwd" type="password"></el-input>
  </el-form-item>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="18" >
 <el-form-item label="重新输入" prop="pwd2">
    <el-input v-model="forgetPwdForm.pwd2" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    <el-button @click="loginForm()">登录</el-button>
  </el-form-item>
    </el-col>
  </el-row>
</el-form>
</div>
</div>
</template>
<script>
export default {
  name: 'forgetPwd',
  data() {
    const validatePwd2 = (rule, value, callback) => {
      if (this.isDiffer) {
        callback(new Error('两次密码不一样.'))
      } else {
        callback()
      }
    }
    return {
      forgetPwdForm: {
        email: '',
        pwd: '',
        pwd2: '',
        vifcode: ''
      },
      sendTime:0,
      but_disabled:false,
      forgetPwdRules: {
        email: { required: true, trigger: 'blur', message: '请输入昵称'},
        vifcode: [{ required: true, trigger: 'blur', message: '请输入验证码'}],
        pwd: [{ required: true, trigger: 'blur', message: '请输入密码'}],
        pwd2: [{ required: true, trigger: 'blur', validator: validatePwd2 }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$http.post('/itfuser/updatePwd', `email=${this.forgetPwdForm.email}&pwd=${this.forgetPwdForm.pwd}&vifcode=${this.forgetPwdForm.vifcode}`)
        .then( (response) => {
          console.info(response)
          if (response.data.success) {
            this.$router.push({path: '/'})
          }else{
            this.$message(response.data.message)
          }
        })
        .catch((error) => {
          this.$message('发送失败，请稍后再试!');
        });
    },
    loginForm() {
      this.$router.push({path:'/login'})
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
      this.sendTime = 30;
      this.$http.post('/itfuser/sendEmail', `email=${this.forgetPwdForm.email}`)
        .then( (response) => {
          console.info(response)
          if (response.data.success) {
            this.$message('发送成功')
          }else{
            this.$message(response.data.message)
          }
        })
        .catch((error) => {
          this.$message('发送失败，请稍后再试!');
        });
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
    isDiffer () {
      if(this.forgetPwdForm.pwd != ''
        && this.forgetPwdForm.pwd2 != ''
        && this.forgetPwdForm.pwd != this.forgetPwdForm.pwd2){
        return true;
      }else{
        return false;
      }
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
  background: url('../../../static/login_bg.png') no-repeat;
  background-size:100% ;-moz-background-size:100% ;
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
