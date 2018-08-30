<template>
  <div class="index">
    <!--内容区域-->
    <div id="main">
      <div class="main-left">
        <card :option="cardTL" :info="optionTL"></card>
        <card :option="cardBL" :info="optionBL"></card>
      </div>

      <!--视频播放区-->
      <div class="main-center">
        <div class="main-center_video" >
          <img style="margin-top: 250px;" :class="{animTop:isPlayAnimation}" src="../../assets/top_bar.png">
          <div class="videoMap" :class="{videoMapAnim:isShowVideo}"></div>
          <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" :class="{animBtm:isPlayAnimation}" src="../../assets/top_bar.png">
        </div>
        <div class="main-center_navbar">
          <nav-bar></nav-bar>
        </div>
      </div>

      <div class="main-right">
        <card :option="cardTR" :info="optionTR"></card>
        <card :option="cardBR" :info="optionBR"></card>
      </div>
    </div>
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

<!-- 首页样式 -->
<style lang="scss" scoped>
.index{
  max-width: 1366px;
  margin: 0 auto;
  &_title{
    font-size: 20px;
  }
  #main{
    width: 100%;
    .main-left{
      position: relative;
      top: -55px;
      width:25%;
      min-height:800px;
      float: left;
    }
    .main-center{
      width:50%;
      height:800px;
      float:left;
      position: relative;
      img{
        width:90%;
        -webkit-transition:all .5s ease .5s;
        transition: all .5s ease .5s;
      }
      &_video{
        min-height:300px;
      }
      &_navbar{
        position:absolute;
        left:-40px;
      }
      .animTop{
        margin-top:50px !important;
      }
      .animBtm{
        margin-top:360px !important;
      }
      .videoMap{
        width: 85%;
        margin-left: 50px;
        top: 64px;
        height: 49%;
        position: absolute;
        background:transparent url('/static/hatch_center.gif') no-repeat center;
        background-size: 100% 100%;
        opacity: 0;
        transition: all .5s ease .5s;
        -webkit-transition:all .5s ease .5s;
      }
      .videoMapAnim{
        opacity: 1;
      }
    }
    .main-right{
      position: relative;
      top: -50px;
      width:25%;
      height:800px;
      float:right;
    }
  }
  &_map{
    min-height: 300px;
    width: 90%;
  }
  &_btns{

  }
}
</style>
