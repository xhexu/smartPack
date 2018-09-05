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
        <el-col :span="2" :style="{height: layoutHeight+'px'}">
        </el-col>
        <el-col :span="20" >
          <img style="width: 100%;" src="/static/monitor_bg.png" usemap="#planetmap"/>
          <map name="planetmap" id="planetmap">
            <area
              shape="rect"
              coords="0,0,110,260"
              @click="login"
              alt="login" />
          </map>
        </el-col>
        <el-col :span="2" :style="{height: layoutHeight+'px'}">
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12" offset="6">
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
  name: 'monitor',
  components: {
    navBar
  },
  data () {
    return {
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
  }
</style>
