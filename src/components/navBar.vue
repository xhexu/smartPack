<template>
  <el-row style="width:100%; margin:0 auto;">
    <el-col :span="4" :class="{active: index==0}" @click="index=0">
      <router-link :to="{path:'/index',query:{index:0}}">经营分析</router-link>
    </el-col>
    <el-col :span="4" :class="{active: index==1}" @click="index=1"  :offset="1">
      <router-link :to="{path:'/show',query:{index:1}}">园区展示</router-link>
    </el-col>
    <el-col :span="4" :class="{active: index==2}" @click="index=2"  :offset="1">
      <router-link :to="{path:'/management',query:{index:2}}">园区管控</router-link>
    </el-col>
    <el-col :span="4" :class="{active: index==3}" @click="index=3"  :offset="1">
      <router-link :to="{path:'/hatch',query:{index:3}}">孵化管理</router-link>
    </el-col>
    <el-col :span="4" :class="{active: index==4}" @click="index=4"  :offset="1">
      <router-link :to="{path:'/monitor',query:{index:4}}">视频监控</router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      index: 0
    }
  },
  mounted () {
    this.index = this.$route.query.index
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
  .el-col.active{
    background-image: url("/static/btn_active.png");
    a {
      color: #bb4b00;
    }
  }
</style>
