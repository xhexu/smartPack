<template>
  <div id="main">
    <top-bar></top-bar>
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
          <table style="width: 100%;">
            <tr style="width: 100%;">
              <td style="width: 20%">
                <img src="/static/00.gif"/>
              </td>
              <td style="width: 20%">
                <img src="/static/01.gif"/>
              </td>
              <td style="width: 20%">
                <img src="/static/02.gif"/>
              </td>
              <td style="width: 20%">
                <img src="/static/03.gif"/>
              </td>
              <td style="width: 20%">
                <img src="/static/04.gif"/>
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="4" :style="{height: layoutHeight+'px'}">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topBar from '../../components/topBar.vue'
import navBar from '../../components/navBar.vue'
import videoUtil from '../../http/WebVideoUtil'

export default {
  name: 'videoDetail',
  components: {
    topBar,
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
      divId: 'video_id',
      config: {}
    }
  },
  methods: {
    callBack () {
      this.video.passageway.forEach((en, index) => {
        this.video.I_Stop(index)
      })
      this.$router.push({path: '/monitorDetail', query: {index: 4}})
    },
    videoInit () {
      let config = this.config
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
      param.vm = this
      this.video = videoUtil(param)
    }
  },
  mounted () {
    let index = this.$route.query.index
    this.$http.post('/itfvideo/list')
      .then((data) => {
        if (data.success) {
          const videoConfig = data.result
          for (let i = 0; i < videoConfig.length; i++) {
            if (index === videoConfig[i].sequence) {
              this.config = videoConfig[i]
              break
            }
          }
          this.videoInit()
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
    }
  }
}
</script>

<!-- 首页样式 -->
<style lang="scss" scoped>
  #main{
    height: 100%;
    background: url('/static/bg.png');
  }
.index{
  height:100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  .back{
    display: block;width:110px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
    color: #00fcff;
    background: url('../../assets/btn.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
