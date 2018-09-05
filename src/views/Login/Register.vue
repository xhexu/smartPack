<template>
<div>
  <div align="left">
    <img style="left:20px;height: 90px" src="/static/login_login.png" />
  </div>
<div class="login-container">
<el-form :model="registerForm" ref="registerForm" :rules="registerRules" label-width="100px" class="login-form">
  <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>
  <el-row >
  <el-col :span="18" >
<el-form-item
    prop="email"
    label="邮箱"
    :suffix-icon="emailIsHave?'el-icon-error':''"
    :rules="[
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="registerForm.email"></el-input>

  </el-form-item>
  </el-col>
  <el-col :span="4" :offset="1">
  <el-button :disabled="but_disabled" @click="sendMessage">{{but_text}}</el-button>
  </el-col>
</el-row>
<el-row >
<el-col :span="18">
  <el-form-item
    label="验证码"
    prop="vifcode"
    :rules="{
      required: true, message: '验证码不能为空', trigger: 'blur'
    }"
  >
  <el-input v-model="registerForm.vifcode"></el-input>
  </el-form-item>
</el-col>
</el-row>
  <el-row >
    <el-col :span="18">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="registerForm.name" ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="18">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone" ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="18">
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="registerForm.sex" label="1">男</el-radio>
        <el-radio v-model="registerForm.sex" label="2">女</el-radio>
      </el-form-item>
    </el-col>
  </el-row>
<el-row >
<el-col :span="18">
  <el-form-item label="密码" prop="pwd">
    <el-input v-model="registerForm.pwd" type="password" autoComplete="on"></el-input>
  </el-form-item>
  </el-col>
</el-row>

<el-row >
  <el-col :span="18">
   <el-form-item label="重新输入" prop="pwd2">
      <el-input v-model="registerForm.pwd2" type="password" :suffix-icon="isDiffer?'el-icon-error':''"></el-input>
    </el-form-item>
  </el-col>

</el-row>

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
  data () {
    const validatePwd2 = (rule, value, callback) => {
      if (this.isDiffer) {
        callback(new Error('两次密码不一样.'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
      let tel = /^\d{3,4}-?\d{7,9}$/
      if (!tel.test(value) || !mobile.test(value)) {
        callback(new Error('输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        email: '',
        pwd: '',
        pwd2: '',
        vifcode: '',
        name: '',
        phone: '',
        sex: '1'
      },
      emailIsHave: false,
      sendTime: 0,
      but_disabled: false,
      registerRules: {
        name: { required: true, trigger: 'blur', message: '请输入昵称'},
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        sex: [{ required: true, trigger: 'blur'}],
        pwd: [{ required: true, trigger: 'blur', message: '请输入密码'}],
        pwd2: [{ required: true, trigger: 'blur', validator: validatePwd2 }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$http.post('/itfuser/reg', this.registerForm)
            .then( (data) => {
              if (data.success) {
                this.$router.push({path: '/'})
              } else {
                this.$message(data.message)
              }
            })
            .catch((error) => {
              this.$message('发送失败，请稍后再试!');
            });
        }
      })
    },
    loginForm () {
      this.$router.push({path: '/login'})
    },
    timeFun () {
      if(this.sendTime <= 0){
        return;
      }
      let time = this.sendTime;
      setTimeout(() => {
          this.sendTime = time-1;
          this.timeFun();
      }, 1000);
    },
    sendMessage () {
      this.sendTime=30;
      console.info('发送');
      this.$http.post('/itfuser/sendEmail', `email=${this.registerForm.email}`)
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
  computed: {
    but_text () {
      if(this.sendTime == 0){
        this.but_disabled = false;
        return '验证码';
      }else{
        this.but_disabled = true;
        return this.sendTime+'(秒)';
      }
    },
    isDiffer () {
      if(this.registerForm.pwd != ''
      && this.registerForm.pwd2 != ''
      && this.registerForm.pwd != this.registerForm.pwd2){
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
  background-size:100%;-moz-background-size:100%;
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
