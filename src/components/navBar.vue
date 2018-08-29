<template>
  <el-row style="width:720px; margin: 20px auto;">
    <el-col :span="4">
      <router-link to="index">经营分析</router-link>
    </el-col>
    <el-col :span="4"  :offset="1">
      <router-link to="show">园区展示</router-link>
    </el-col>
    <el-col :span="4"  :offset="1">
      <router-link to="management">园区管控</router-link>
    </el-col>
    <el-col :span="4"  :offset="1">
      <router-link to="">孵化管理</router-link>
    </el-col>
    <el-col :span="4"  :offset="1">
      <router-link to="">视频监控</router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-col {
    background: transparent url('/static/btn.png') no-repeat;
    background-size: 100% 100%;
    a {
      display: block;
      width: 100%;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      color: #01A4AE;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
    }
  }
  .el-col:hover {
    background-image: url("/static/btn_active.png");
    a {
      color: #bb4b00;
    }
  }
</style>
