<template>
  <div>
    <el-dialog title="申请文件" :visible.sync="dialogFormVisible">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="fileUrl"
        :on-success="handleSuccess"
        :on-error="handleError"
        :headers="headers"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">申请</el-button>
        <div slot="tip" class="el-upload__tip">可根据指南中入驻申请流程，按申请操作要求填写表单上传</div>
      </el-upload>
    </el-dialog>
  <div class="index">
    <el-row>
      <el-col :span="8" class="left" :style="{height: layoutHeight+'px'}">
        <card :option="cardTL" moreTitle="政策" :info="policy" :dataLength="policy_length" style="top:-50px"></card>
        <card :option="cardBL" moreTitle="孵化器" :info="incubator" :dataLength="incubator_length" style="margin-top: 40px"></card>
      </el-col>
      <el-col :span="8" style="margin-top: 5%;"    :style="{position: 'relative',height: layoutHeight/1.5+'px'}">
        <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="building"  :class="{animMap:showMap}">
          <div @click="shenQing" style="cursor:pointer;background:transparent url('/static/hatch_but_bg.png') no-repeat center;
          height: 28px;width: 92px;color: #01A4AE;margin-top: 20px;vertical-align: middle;padding-top: 5px;font-size: 16px">入驻申请</div>
          <img style="height: 60%;vertical-align: middle;margin-top: 8%" src="/static/hatch_center.gif"/>
        </div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
      </el-col>
      <!--<el-col :span="8" style="padding-top: 5%;padding-bottom: 9%" :style="{position: 'relative',height: layoutHeight+'px'}">
        <img style="position: relative;top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="building"  :class="{animMap:showMap}">
          <div @click="shenQing" style="cursor:pointer;background:transparent url('/static/hatch_but_bg.png') no-repeat center;
          height: 28px;width: 92px;color: #01A4AE;margin-top: 20px;vertical-align: middle;">入驻申请</div>
          <div style="height: 70%">
            <img style="height: 100%;" src="/static/hatch_center.gif"/>
          </div>
        </div>
        <img style="position: relative;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
      </el-col>-->
      <el-col :span="8" class="right" :style="{height: layoutHeight+'px'}">
        <card :option="cardTR" moreTitle="活动" :info="activity" :dataLength="activity_length" style="top:-50px"></card>
        <card :option="cardBR" moreTitle="指南" :info="guide" :dataLength="guide_length" style="margin-top: 40px"></card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import Card from './Card'
import http from '../../http/http'
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  name: 'hatch',
  components: {
    navBar,
    Card
  },
  data () {
    return {//http://101.132.179.45:8086
      fileUrl: `${http.defaults.baseURL}/itfincubationinfo/save`,
      headers: {access_token: window.localStorage.getItem('access_token')},
      playFlag: false,
      showMap: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
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
      policy_length: 0,
      activity: [],
      activity_length: 0,
      incubator: [],
      incubator_length: 0,
      guide: [],
      guide_length: 0
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
        if (res.errorCode === '1001') {
          this.$router.push({path: '/login'})
        }
      }
    },
    handleError (res) {
      this.$message('上传异常')
    },
    animate () {
      setTimeout(()=>{
        this.playFlag = true
        this.showMap = true
      },150)
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
      this.policy_length = this.policy.length
      this.activity_length = this.activity.length
      this.incubator_length = this.incubator.length
      this.guide_length = this.guide.length
      this.$nextTick()
    }
  },
  created () {
    this.beginLoadData()
    this.fileUrl = `${http.defaults.baseURL}/itfincubationinfo/save`
  },
  mounted () {
    this.animate()
  },
  computed: {
    layoutHeight(){
      if(document.documentElement.clientHeight>800){
        return 700
      }else if(document.documentElement.clientHeight<700){
        return 460
      }else{
        return 580
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .index{
    height:100%;
    width: 100%;
    margin: 0 auto;
    img.anim{
      width:100%;position: absolute;left: 0;transition: all .5s ease .5s;-webkit-transition:all .5s ease .5s;
    }
    .building{
      text-align: center;
      vertical-align:middle;
      width:95%;height:95%;opacity:0;margin: -5px auto;background:url('/static/bg_view.png') no-repeat center;
      background-size: 100% 100%;transition: all .5s ease 1s;-webkit-transition:all .5s ease 1s;
    }
    .animTop{
      top:0!important;
    }
    .animBtm{
      bottom:0!important;
    }
    .animMap{
      opacity:1.0!important;
    }
  }
  .left{
    b{
      left:12%;
    }
    .box{
      padding-left: 20%;
    }
  }
  .right{
    b{
      right:12%;
    }
    .box{
      background-image:url("/static/divTR.png");padding-left: 10%;padding-right: 15%;
    }
  }
  .box{
    width:45%;background: url('/static/divTL.png') no-repeat;background-size: 100% 100%;color:#01A4AE;position: relative;
    font-weight: bold;text-align: left;margin:30% auto;position: relative;padding-top: 100px;padding-bottom:50px;font-size: 14px;
    b{color:red;position: absolute;font-size: 16px; top:33px;}
    .btn{
      display: block;width:50%; height:36px; margin: 0px auto; line-height: 36px;text-align: center;
      background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none;color:#ccc;
    }
  }
</style>
