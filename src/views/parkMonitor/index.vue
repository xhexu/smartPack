<template>
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
            :coords="clickLayout"
            @click="login"
            alt="login" />
        </map>
      </el-col>
      <el-col :span="2" :style="{height: layoutHeight+'px'}">
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'monitor',
  components: {
  },
  data () {
    return {
      pass: '',
      name: ''
    }
  },
  methods: {
    login () {
      this.$router.push({path: '/monitorDetail', query: {index: 4}})
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
  }
</style>
