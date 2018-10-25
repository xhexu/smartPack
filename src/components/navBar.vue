<template>
  <el-row style="width:40%; margin:0 auto;align-self: center;">
    <el-col :span="4" :offset="1" v-for="item in navList" :key="item.index" :class="{active: item.index==nowIndex}">
      <div @click="clickMenu(item)">{{item.title}}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      nowIndex: 0,
      navList: [{
        title: '经营分析',
        index: 0,
        path:'/index'
      },{
        title: '园区展示',
        index: 1,
        path:'/show'
      },{
        title: '园区管控',
        index: 2,
        path:'/management'
      },{
        title: '孵化管理',
        index: 3,
        path:'/hatch'
      },{
        title: '视频监控',
        index: 4,
        path:'/monitor'
      }]
    }
  },
  methods: {
    clickMenu (item) {
      this.nowIndex = item.index
      this.$router.push({path: item.path, query: {index: item.index}})
    }
  },
  mounted () {
    let index = this.$route && this.$route.query && this.$route.query.index ? this.$route.query.index : 0
    if (index === 4) {
      this.$router.push({path: '/monitorDetail'})
      this.nowIndex = 4
    } else {
      this.clickMenu(this.navList[0])
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-col {
    background: transparent url('/static/btn.png') no-repeat center;
    cursor: pointer;
    margin-left: 0px;
    div {
      display: block;
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
    div {
      color: #bb4b00;
    }
  }
  .el-col-offset-1{
    margin-left: 2.8%;
  }

</style>
