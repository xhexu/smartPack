<template>
  <div>
    <el-row>
      <el-col :span="7">1</el-col>
      <el-col :span="10">
        <img class="imgT" src="../../assets/top_bar.png"/>
        <div class="view"></div>
        <img class="imgB" src="../../assets/top_bar.png"/>
      </el-col>
      <el-col :span="7">1</el-col>
    </el-row>
    <el-row>
      <el-col :span="7">&nbsp;</el-col>
      <el-col :span="10">
        <nav-bar></nav-bar>
      </el-col>
      <el-col :span="7">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
  import navBar from '../../components/navBar.vue'
  require('vue2-animate/dist/vue2-animate.min.css')

  export default {
    components: {
      navBar
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .imgT{width:100%;}
  .view{
    width:95%;margin: -15px auto;background:url('/static/bg_view.png') no-repeat center;background-size: 100% 100%;height:510px;
    /*img{width:100%;margin: 80px auto 10px;}*/
  }
  .imgB{width:100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);}
</style>
