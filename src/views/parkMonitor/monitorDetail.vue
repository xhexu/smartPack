<template>
<div>
  <div class="loginForm">
    <el-dialog width="25%" title="登录" :visible.sync="dialogFormVisible" class="douming">
      <el-form w>
        <el-form-item >
          <el-row>
            <el-col :offset="6" :span="12" style="max-width: 300px">
              <el-input  type="text" v-model="name" placeholder="请输入账号"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :offset="6" :span="12" style="text-align: center;max-width: 300px;padding-left: auto;padding-right: auto">
              <el-input type="text" v-model="pass" placeholder="请输入密码"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :offset="6" :span="12" style="max-width: 300px">
              <el-button type="primary" @click="loginHandel">登录</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <div class="index">
    <!--内容区域-->
    <el-row>
      <router-link class="back"  :to="{path:'/monitor',query:{index:4}}">返回</router-link>
      <el-col :span="2" :style="{height: layoutHeight+'px'}">
      </el-col>
      <el-col :span="20" >
        <div style="width: 25%;position: relative;float: left" v-for="item in 8">
          <div style="margin: 20px 5px;" @click="login">
            <img style="width: 100%"  src="../../assets/top_bar.png"/>
            <img style="width:100%;"  src="../../assets/building.gif"/>
            <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;"  src="../../assets/top_bar.png"/>
          </div>
           </div>
      </el-col>
      <el-col :span="2" :style="{height: layoutHeight+'px'}">
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="12" :offset="6">
        <div style="position: relative;width: 100%;margin: 0 auto;padding: 0 auto">
          <nav-bar class="nav"></nav-bar>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import navBar from '../../components/navBar.vue'

export default {
  name: 'monitorDetail',
  components: {
    navBar
  },
  data () {
    return {
      dataList: [],
      dialogFormVisible: false,
      pass: '',
      name: ''
    }
  },
  methods: {
    login () {
      this.dialogFormVisible = true
    },
    loginHandel () {
      this.$router.push({path: '/videoDetail', query: {name: this.name, pass: this.pass}})
    }
  },
  mounted () {
  },
  computed: {
    layoutHeight(){
      if(document.documentElement.clientHeight>800){
        return 720
      }else if(document.documentElement.clientHeight<700){
        return 480
      }else{
        return 600
      }
    },
    clickLayout () {
      let clientWidth = document.documentElement.clientWidth
      let imgWidth = clientWidth / 6 * 5
      let imgHeight = imgWidth / 2.3
      let beginX = imgWidth * 0.24
      let beginY = imgHeight * 0.2
      let endX = imgWidth * 0.35
      let endY = imgHeight * 0.31
      return `${beginX},${beginY},${endX},${endY}`
    }
  }
}
</script>

<!-- 首页样式 -->
<style lang="scss" scoped>
.loginForm {
  .douming{
    background: rgba(0, 0, 0, .5);
  }
}
.index{
  height:100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  .nav{
    width: 50%;
    position:absolute;bottom:-60px;
  }
  .back{
    display: block;width:80px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
    background: url('../../assets/btn.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    text-decoration: none;color:#ccc;
  }
}
</style>
