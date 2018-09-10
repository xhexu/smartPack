<template>
<div class="index">
  <el-row>
    <el-col :span="4" :style="{height: layoutHeight+'px'}">
      <div class="back" @click="callBack" >返回</div>
    </el-col>
    <el-col :span="16" :style="{height: layoutHeight+'px'}">
      <div style="width: 100%;height:100%;position: relative;margin: auto; " >
        <div style="position: absolute;left: 0px;top:0px;max-width: 5%;height: 90%;" >
          <img  style="height: 100%"  src="../../assets/top_bar_left.png"/>
        </div>
        <div id="video_id" style="height:90%;width: 90%;margin: 15px auto;">
        </div>
        <div style="position: absolute;right: 0px;top:0px;max-width: 5%;height: 90%;">
          <img  style="height: 100%"  src="../../assets/top_bar_right.png"/>
        </div>
      </div>
    </el-col>
    <el-col :span="4" :style="{height: layoutHeight+'px'}">
    </el-col>
  </el-row>
</div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import videoUtil from '../../http/WebVideoUtil'
import videoConfig from '../../http/webVideoList'

export default {
  name: 'videoDetail',
  components: {
    navBar
  },
  data () {
    return {
      video: {},
      index: '0',
      szIP: '',
      iPort: '',
      szPassword: '',
      szUserName: '',
      divId: 'video_id'
    }
  },
  methods: {
    callBack () {
      this.$router.push({path: '/monitorDetail', query: {index: 4}})
    },
    videoInit () {
      let inde = this.$route.query.index
      console.info(inde)
      let config = videoConfig[inde]
      let param = {
        szIP: config.ip,
        iPort: config.port,
        szPassword: config.password,
        szUserName: config.name,
        divId: 'video_id'
      }
      param.success = (e) => {
        // console.info(e)
      }
      param.error = (e) => {
        console.error(e)
      }
      console.info(param)
      this.video = videoUtil(param)
    }
  },
  mounted () {
    this.videoInit()
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
.index{
  height:100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  .back{
    display: block;width:110px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
    background: url('../../assets/btn.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    text-decoration: none;color:#ccc;
  }
}
</style>
