<template>
  <div>
  <div>
    <el-dialog title="申请文件" :visible.sync="dialogFormVisible">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://www.sesame.kim:8086/itfincubationinfo/save"
        :on-success="handleSuccess"
        :on-error="handleError"
        :headers="headers"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">申请</el-button>
      </el-upload>
    </el-dialog>
  </div>
  <div class="index">
    <!--内容区域-->
    <el-row :gutter="20">
      <el-col :span="6" :style="{height: layoutHeight+'px'}">
        <card :option="cardTL" :info="policy" style="top:-50px"></card>
        <card :option="cardBL" :info="incubator" style="margin-top: 40px"></card>
      </el-col>
      <el-col :span="12" :style="{position: 'relative',height: layoutHeight+'px'}">
        <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="videoMap" :class="{videoMapAnim:isShowVideo}">
          <div @click="shenQing" style="cursor:pointer;background:transparent url('/static/hatch_but_bg.png') no-repeat center;height: 28px;width: 92px;color: #01A4AE;">申请</div>
          <img style="height: 80%;" src="/static/hatch_center.gif"/>
        </div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
      </el-col>

      <el-col :span="6" :style="{height: layoutHeight+'px'}">
        <card :option="cardTR" :info="activity" style="top:-50px"></card>
        <card :option="cardBR" :info="guide" style="margin-top: 40px"></card>
      </el-col>
    </el-row>

  </div>
</div>
</template>

<script>
import Card from './Card.vue'
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  name: 'hatch',
  components: {
    Card
  },
  data () {
    return {
      headers: {access_token: window.localStorage.getItem('access_token')},
      playFlag: false,
      showMap: false,
      isShowVideo: false,
      dialogFormVisible: false,
      cardTL: {
        title: '政策',
        position: 'TL'
      },
      cardTR: {
        title: '活动',
        position: 'TR'
      },
      cardBL: {
        title: '孵化器',
        position: 'TL'
      },
      cardBR: {
        title: '指南',
        position: 'TR'
      },
      policy: [],
      activity: [],
      incubator: [],
      guide: []
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleSuccess (res) {
      if (res.success) {
        this.$message('上传成功')
        this.dialogFormVisible = false
      } else {
        this.$message(res.message)
      }
    },
    handleError (res) {
      this.$message('上传异常')
    },
    animate () {
      let me = this
      this.playFlag = true
      this.showMap = true
      setTimeout(function () {
        me.isShowVideo = !me.isShowVideo
      }, 200)
    },
    shenQing () {
      this.dialogFormVisible = true
    },
    beginLoadData () {
      this.$http.post('/itfincubationinfo/list')
        .then((data) => {
          if (data.success) {
            this.doData(data.result)
          } else {
            this.$message(data.message)
          }
        })
        .catch(function (error) {
          console.info(error)
        })
    },
    doData (data) {
      for (let index in data) {
        if (data[index].type === 'policy') {
          this.policy.push(data[index])
        } else if (data[index].type === 'activity') {
          this.activity.push(data[index])
        } else if (data[index].type === 'incubator') {
          this.incubator.push(data[index])
        } else if (data[index].type === 'guide') {
          this.guide.push(data[index])
        }
      }
      this.$nextTick()
    }
  },
  mounted () {
    this.animate()
    this.beginLoadData()
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
    img.anim{
      width:100%;
      position: absolute;
      left: 0;
      transition: all .5s ease .5s;
      -webkit-transition:all .5s ease .5s;
    }
    .videoMapAnim{
      opacity: 1 !important;
    }
    .videoMap{
      width: 95%;
      height: 93%;
      position: absolute;
      top: 25px;
      left: 25px;
      opacity: 0;
      transition: all .5s ease .5s;
      -webkit-transition:all .5s ease .5s;
    }
    .nav{
      position:absolute;bottom:-60px;
    }
    .animTop{
      top:0!important;
    }
    .animBtm{
      bottom:0!important;
    }
    &_title{
      font-size: 20px;
    }
    .main-left{
      position: relative;
      top: -55px;
      left: 40px;
      height: 100%;
    }
    .main-right{
      position: relative;
      top: -55px;
      height: 100%;
    }
  }
</style>
