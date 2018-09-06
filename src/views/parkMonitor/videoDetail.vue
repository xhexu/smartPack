<template>
<div class="index">
  <el-row>
    <el-col :span="2" :style="{height: layoutHeight+'px'}">
      <router-link class="back"  :to="{path:'/monitorDetail',query:{index:4}}">返回</router-link>
    </el-col>
    <el-col :span="20" >
      <div style="width: 100%;position: relative;float: left" >
        <img style="width: 80%"  src="../../assets/top_bar.png"/>
        <div id="video_id" style="height:400px;height: 550px">
        </div>
        <img style="width: 80%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;"  src="../../assets/top_bar.png"/>
      </div>
    </el-col>
    <el-col :span="2" :style="{height: layoutHeight+'px'}">
    </el-col>
  </el-row>
</div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import videoUtil from '../../http/WebVideoUtil'

export default {
  name: 'videoDetail',
  components: {
    navBar
  },
  data () {
    return {
      szIP: '61.134.28.101',
      iPort: '90',
      szPassword: 'a1234567',
      szUserName: 'admin',
      divId: 'video_id'
    }
  },
  methods: {
    videoInit () {
      let param = {
        szIP: '61.134.28.101',
        iPort: '90',
        szPassword: 'a1234567',
        szUserName: 'admin',
        divId: 'video_id'
      }
      param.success = (e) => {console.info(e)}
      param.error = (e) => {console.error(e)}
      videoUtil(param)
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
    display: block;width:80px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
    background: url('../../assets/btn.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    text-decoration: none;color:#ccc;
  }
}
</style>
