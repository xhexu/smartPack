<template>
  <div class="index">
    <el-row>
      <el-col :span="7" class="left">
        <card :option="cardTL" :info="optionTL" :clientHeight="clientHeight"></card>
        <card :option="cardBL" :info="optionBL" :clientHeight="clientHeight"></card>
      </el-col>
      <el-col :span="10" class="center">
        <img class="imgT" src="../../assets/top_bar.png"/>
        <div class="view">
          <img src="../../assets/building.gif"/>
        </div>
        <img class="imgB" src="../../assets/top_bar.png"/>
        <nav-bar></nav-bar>
      </el-col>
      <el-col :span="7" class="right">
        <card :option="cardTR" :info="optionTR"></card>
        <card :option="cardBR" :info="optionBR"></card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import navBar from '../../components/navBar.vue'
import Card from './Card.vue'

export default {
  name: 'IndexPage',
  components: {
    navBar,
    Card
  },
  data () {
    return {
      clientHeight:0,
      isPlayAnimation:false,
      isShowVideo: false,
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
      optionTL: [{
        title:'xxxx',
        detail:'aaaaaaa',
        time:'2018-7-23'
      },{
        title:'xxxx',
        detail:'bbbbbbbb',
        time:'2018-7-23'
      },{
        title:'xxxx',
        detail:'cccccccc',
        time:'2018-7-23'
      }],
      optionBL: [{
        title:'xxxx',
        detail:'aaaaaaa',
        time:'2018-7-23'
      },{
        title:'xxxx',
        detail:'bbbbbbbb',
        time:'2018-7-23'
      },{
        title:'xxxx',
        detail:'cccccccc',
        time:'2018-7-23'
      }],
      optionBR: [{
        title:'xxxx',
        detail:'aaaaaaa'
      },{
    title:'xxxx',
        detail:'bbbbbbbb'
      },{
    title:'xxxx',
        detail:'cccccccc'
      }],
      optionTR: [{
        title:'xxxx',
        detail:'aaaaaaa'
      },{
    title:'xxxx',
        detail:'bbbbbbbb'
      },{
    title:'xxxx',
        detail:'cccccccc'
      }]
    }
  },
  watch: {
    clientHeight(newValue, oldValue) {
      console.log(newValue)
    }
  },
  methods: {
    /**
     * 查询数据
     * @return {[type]} [description]
     */
    queryChartData () {

    },
    playAanimation () {
      let me = this
      this.isPlayAnimation = !this.isPlayAnimation
      setTimeout(function(){
        me.isShowVideo = !me.isShowVideo
      },200)
    }
  },
  beforeCreate () {

  },
  beforeMount () {
    this.isPlayAnimation = false
    this.isShowVideo = false
  },
  mounted () {
    //查询首页数据
    this.queryChartData()
    this.playAanimation()
    let me = this
     /**setInterval(function(){
     me.optionTR.series = [{
          data:[parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000)]
      }];
    },5000)

    setInterval(function(){
      me.optionBR.series = [{
          data:[parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000)]
      }];
    },10000)**/
  }
}
</script>

<style lang="scss" scoped>
  .boxA{
    background: url('/static/divTL.png') no-repeat;background-size: 100% 100%;width:40%;font-size: 14px;color:#01A4AE;font-weight: bold;padding:100px 0 50px 80px;text-align: left;
    margin: 100px auto 0; position: relative;
    b{color:red;position: absolute;font-size: 16px; top:32px;left:32px;}
    a.btn{display: block;width:156px; height:44px; margin: 30px auto 0; line-height: 44px;text-align: center;background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none;color:#ccc;}
  }
  .boxB{
    background: url('/static/divTR.png') no-repeat;background-size: 100% 100%;width:40%;font-size: 14px;color:#01A4AE;font-weight: bold;padding:100px 60px 50px 40px;text-align: left;
    margin: 100px auto 0; position: relative;
    b{color:red;position: absolute;font-size: 16px; top:34px;right:34px;}
    a.btn{display: block;width:156px; height:44px; margin: 30px auto 0; line-height: 44px;text-align: center;background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none; color:#ccc;}
  }
  .left{}
  .center{
    .imgT{width:100%;}
    .view{
      width:95%;margin: -15px auto;background:url('/static/bg_view.png') no-repeat center;background-size: 100% 100%;
      img{width:100%;margin: 80px auto 10px;}
    }
    .imgB{width:100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);}
  }
  .right{}
</style>