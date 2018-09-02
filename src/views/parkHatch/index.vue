<template>
  <div>
  <div class="layout">
    <el-row>
      <el-col :span="6" class="left">
        <card ref="policy" :option="cardTL" :info="policy" ></card>
        <card ref="incubator" :option="cardBL" :info="incubator" ></card>
      </el-col>
      <el-col :span="12" style="position: relative;height: 480px;">
        <img style="top:220px;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="building"  :class="{animMap:showMap}">
          <div @click="shenQing" style="cursor:pointer;background:transparent url('/static/hatch_but_bg.png') no-repeat center;height: 28px;width: 92px;color: #01A4AE;">申请</div>
          <img style="height: 100%;" src="/static/hatch_center.gif"/>
        </div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:220px;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <nav-bar class="nav"></nav-bar>
      </el-col>
      <el-col :span="6" class="right">
        <card :option="cardTR" :info="activity"></card>
        <card :option="cardBR" :info="guide"></card>
      </el-col>
    </el-row>

  </div>
    <el-dialog title="申请文件" :visible.sync="dialogFormVisible">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://www.sesame.kim:8086/itfincubationinfo/save"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">申请</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import Card from './Card.vue'
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  name: 'IndexPage',
  components: {
    navBar,
    Card
  },
  data () {
    return {
      playFlag: false,
      showMap: false,
      showBox: false,
      form: {
        name: ''
      },
      dialogFormVisible: false,
      clientHeight:0,
      cardTL: {
        title:'政策',
        position: 'TL'
      },
      cardTR: {
        title:'活动',
        position: 'TR'
      },
      cardBL: {
        title:'孵化器',
        position: 'TL'
      },
      cardBR: {
        title:'指南',
        position: 'TR'
      },
      policy: [],
      activity: [],
      incubator: [],
      guide: []
    }
  },
  watch: {
    clientHeight(newValue, oldValue) {
      console.log(newValue)
    }
  },
  created () {
    console.info('---created---');
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    animate(){
      let vm = this;
      vm.playFlag = true;
      vm.showMap = true;
      setTimeout(()=>{
        vm.showBox = true;
      },500)
    },
    shenQing () {
      this.dialogFormVisible = true;
    },
    beginLoadData () {
      this.$http.post('/itfincubationinfo/list')
        .then((response) => {
          if (response.data.success) {
            this.doData(response.data.result)
          } else {
            this.$message(response.data.message)
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
        }else if (data[index].type === 'activity') {
          this.activity.push(data[index])
        }else if (data[index].type === 'incubator') {
          this.incubator.push(data[index])
        }else if (data[index].type === 'guide') {
          this.guide.push(data[index])
        }
      }
      this.$nextTick()
    }
  },
  beforeCreate () {
    console.info('---beforeCreate---');
  },
  beforeMount () {
    console.info('---beforeMount---');
    this.beginLoadData();
  },
  mounted () {
    this.animate()
  },
  render () {
    console.info('---mounted---');
    return {}
  },
  beforeUpdate () {
    console.info('---beforeUpdate---');
  },
  updated () {
    console.info('---updated---');
  }
}
</script>

<style lang="scss" scoped>
  .layout{
    height: 100%;max-width: 1366px;min-width:1200px;margin: 0 auto;position: relative;
    img.anim{
      width:100%;position: absolute;left: 0;transition: all .5s ease .5s;-webkit-transition:all .5s ease .5s;
    }
    .building{
      width:95%;height:95%;opacity:0;margin: 15px auto;background:url('/static/bg_view.png') no-repeat center;
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
    .nav{
      position:absolute;bottom:-60px;
    }
  }
  .left{
    b{
      left:31px;
    }
    .box{
      padding-left: 20%;
    }
  }
  .right{
    b{
      right:31px;
    }
    .box{
      background-image:url("/static/divTR.png");padding-left: 10%;padding-right: 15%;
    }
  }
  .box{
    width:60%;background: url('/static/divTL.png') no-repeat;background-size: 100% 100%;color:#01A4AE;position: relative;
    font-weight: bold;text-align: left;margin:80px auto;position: relative;padding-top: 100px;padding-bottom:50px;font-size: 14px;
    b{color:red;position: absolute;font-size: 16px; top:33px;}
    .btn{
      display: block;width:50%; height:36px; margin: 0 auto; line-height: 36px;text-align: center;
      background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none;color:#ccc;
    }
  }
</style>
