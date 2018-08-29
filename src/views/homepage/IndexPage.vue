<template>
  <div class="index">
    <!--内容区域-->
    <div id="main">
      <div class="main-left">
        <card :option="cardTL" :chart="optionTL"></card>
        <card :option="cardBL" :chart="optionBL"></card>
      </div>

      <!--视频播放区-->
      <div class="main-center">
        <div class="main-center_video" >
          <img style="margin-top: 250px;" :class="{animTop:isPlayAnimation}" src="../../assets/top_bar.png">
          <div class="videoMap" :class="{videoMapAnim:isShowVideo}">
            <MapView :om="MapData"></MapView>
          </div>
          
          <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" :class="{animBtm:isPlayAnimation}" src="../../assets/top_bar.png">
        </div>
        <div class="main-center_navbar">
          <nav-bar></nav-bar>
        </div>
      </div>

      <div class="main-right">
        <card :option="cardTR" :chart="optionTR"></card>
        <card :option="cardBR" :chart="optionBR"></card>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import Card from './Card.vue'
import MapView from './Map.vue'


export default {
  name: 'IndexPage',
  components: {
    navBar,
    Card,
    MapView
  },
  data () {
    return {
      isPlayAnimation:false,
      isShowVideo: false,
      MapData: {
        height:400,
        longitude:121.269869,
        latitude:31.205909
      },
      cardTL: {
        title:'车辆信息',
        position: 'TL',
        item: {
          title: '本月'
        }
      },
      cardTR: {
        title:'物业费',
        position: 'TR',
        item: {
          title: '本月'
        }
      },
      cardBL: {
        title:'租金表',
        position: 'BL',
        item: {
          title: '本月'
        }
      },
      cardBR: {
        title:'出租率',
        position: 'BR',
        item: {
          title: '本月'
        }
      },
      optionTL: {
        legend: {
          data:['车流量', '停车费']
        },
        yAxis: {
          data: ['9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series: [{
          name:'车流量',
          data:[18203, 23429, 29034, 104970, 131744, 63230]
        },{
          name:'停车费',
          data:[18203, 2489, 29034, 104970, 13744, 630230]
        }]
      },
      optionBL: {
        legend: {
          data:[]
        },
        yAxis: {
          data: ['9-1','9-2','9-3','9-4','9-5','9-6','9-7','9-8','9-9','9-10','9-11','9-12','9-13','9-14','9-15','9-16',
          '9-17','9-18','9-19','9-20','9-21','9-22','9-23','9-24','9-25','9-26','9-27','9-28','9-29','9-30','9-31']
        },
        series:[{
          data:[630230, 18203, 23489, 18203, 23489, 29034, 104970, 131744, 630230,630230, 18203, 23489, 29034, 104970, 131744, 630230,630230, 18203, 23489, 18203, 23489, 29034, 104970, 131744, 630230,630230, 18203, 29034, 104970, 131744, 630230]
        }]
      },
      optionBR: {
        legend: {
          data:[]
        },
        yAxis: {
          data: ['9-3','9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series:[{
          data:[630230, 18203, 23489, 29034, 104970, 131744, 630230]
        }]
      },
      optionTR: {
        legend: {
          data:[]
        },
        yAxis: {
          data: ['9-3','9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series:[{
          data:[630230, 18203, 23489, 29034, 104970, 131744, 630230]
        }]
      }
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
    setInterval(function(){
      me.optionTR.series = [{
          data:[parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000)]
      }];
    },5000)

    setInterval(function(){
      me.optionBR.series = [{
          data:[parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000)]
      }];
    },10000)
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
        margin-top:0px !important;
      }
      .animBtm{
        margin-top:410px !important;
      }
      .videoMap{
        width: 85%;
        margin-left: 50px;
        top: 13px;
        height: 55%;
        position: absolute;
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
