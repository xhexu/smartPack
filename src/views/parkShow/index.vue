<template>
  <el-container>
    <el-main>
      <img class="imgT" src="../../assets/top_bar.png"/>
      <div class="view"></div>
      <img class="imgB" src="../../assets/top_bar.png"/>
    </el-main>
    <el-footer>
      <nav-bar></nav-bar>
    </el-footer>
  </el-container>
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
  .el-main{
     width:50%; margin: 0 auto;
    .imgT{width:100%;}
    .view{width:100%;height:450px;}
    .imgB{width:100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);}
  }
</style>
