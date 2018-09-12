<template>
  <div class="index">
    <!--内容区域-->
    <el-row>
      <router-link class="back"  :to="{path:'/monitor',query:{index:4}}">返回</router-link>
      <el-col :span="2" :style="{height: layoutHeight+'px'}">
      </el-col>
      <el-col :span="20" >
        <div style="width: 25%;position: relative;float: left" v-for="(item,index ) in videoConfig">
          <div style="margin: 20px 5px;" @click="loginHandel(item.sequence)">
            <img style="width: 100%"  src="../../assets/top_bar.png"/>
            <div style="color: #00fcff;">{{item.title}}</div>
            <img style="width:100%;"  :src="item.imgUrl ? item.imgUrl: '/static/building.gif'"/>
            <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;"  src="../../assets/top_bar.png"/>
          </div>
        </div>
      </el-col>
      <el-col :span="2" :style="{height: layoutHeight+'px'}">
      </el-col>
    </el-row>
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
      name: '',
      videoConfig: []
    }
  },
  methods: {
    login () {
      this.dialogFormVisible = true
    },
    loginHandel (index) {
      this.$router.push({path: '/videoDetail', query: {index: index}})
    }
  },
  mounted () {
    this.$http.post('/itfvideo/list')
      .then((data) => {
        if (data.success) {
          this.videoConfig = data.result
        } else {
          this.$message(data.message)
        }
      })
      .catch(function (error) {
        console.info(error)
      })
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
    display: block;width:110px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
    background: url('../../assets/btn.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    text-decoration: none;color:#00fcff;
  }
}
</style>
