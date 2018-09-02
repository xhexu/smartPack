<template>
  <div class="index">
    <!--内容区域-->
    <el-row :gutter="20" style="height:100%">
      <el-col :span="6" style="height:100%">
        <div class="main-left">
          <card @chooseQuery="chooseQuery" :option="cardTL" :chart="optionTL"></card>
          <div style="margin-top:50px">
            <card :option="cardBL" :chart="optionBL"></card>
          </div>
        </div>
      </el-col>
      <el-col :span="12" style="height:100%">
        <el-row style="margin-top:5%;height:100%">
          <div class="main-center" :style="{height:jsHeight}">
            <div class="main-center_video" >
              <img style="margin-top: 250px;" :class="{animTop:isPlayAnimation}" src="../../assets/top_bar.png">
              <div class="videoMap" :class="{videoMapAnim:isShowVideo}">
                <MapView :om="MapData"></MapView>
              </div>
              <img style="position: absolute;bottom: 0;left:0;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" :class="{animBtm:isPlayAnimation}" src="../../assets/top_bar.png">
            </div>
          </div>
          <el-row style="margin-top:40px">
            <div>
              <nav-bar></nav-bar>
            </div>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div class="main-right">
          <card :option="cardTR" :chart="optionTR"></card>
          <div style="margin-top:50px">
            <card :option="cardBR" :chart="optionBR"></card>
          </div>
        </div>
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import Card from './Card.vue'
import MapView from './map/Map.vue'
import busHttp from './parkanalyzeHttp.js'
import _ from 'underscore'

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
      jsHeight: document.body.clientHeight>768?630+'px':'60%',
      MapData: {
        height:400,
        longitude:121.269869,
        latitude:31.205909
      },
      cardTL: {
        title:'车辆信息',
        position: 'TL',
        item: {
          title: '本周'
        }
      },
      cardTR: {
        title:'物业费',
        position: 'TR',
        item: {
          title: '本年'
        }
      },
      cardBL: {
        title:'租金表',
        position: 'BL',
        item: {
          title: '本周'
        }
      },
      cardBR: {
        title:'出租率',
        position: 'BR',
        item: {
          title: '本周'
        }
      },
      optionTL: {},
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
  mounted () {
    this.playAanimation()
    this.queryParkInfo()
    
    this.sendHttpForCar({type:'d',time:''})
    this.sendHttpForFee()
  },
  methods: {
    queryParkInfo () {
      busHttp._QueryParkInfo({searchDetail:'',code:606060},function(){

      },function(){

      })
    },
    chooseQuery (item) {
      switch(item.cardId){
        case 'TL':
          this.sendHttpForCar(item)
        case 'TR':
          this.sendHttpForCar(item)
      }
    },
    //查询车辆信息
    sendHttpForCar (item) {
      let me = this
      let params = {
        parkCode:'e',
        type:item.type,
        time:item.time
      }
      busHttp._QueryParkCL(params,function(data){
        var obj = {
          legend: {
            data:['车流量', '停车费']
          },
          yAxis: {
            data: []
          },
          series: [{
            name:'车流量',
            data:[]
          },{
            name:'停车费',
            data:[]
          }]
        }
        if(_.isObject(data)){//parking : 停车费,traffic : 车流量
          obj.yAxis.data = data.axis
          obj.series[0].data = data.traffic
          obj.series[1].data = data.parking
          me.optionTL = obj
        }else{
          me.$message({
            message: '车辆信息返回数据异常',
            type: 'warning'
          })
        }
      })
    },
    //查询物业费
    sendHttpForFee () {
      let me = this
      busHttp._QueryWY({parkCode:'e',time:new Date().getFullYear()},function(res){
        var obj = {
          legend: {
            data:['物业费', '租金', '出租率']
          },
          yAxis: {
            data: []
          },
          series: [{
            name:'物业费',
            data:[]
          },{
            name:'租金',
            data:[]
          }]
        }
      },function(error){

      })
    },
    //查询租金信息
    sendHttpForRent (querParams) {
      this.$http.post('/user', querParams)
      .then(function (response) {
          
        }).catch(function (error) {
          
        })
    },
    //查询出租率
    sendHttpForRate (querParams) {
      this.$http.post('/user', querParams)
      .then(function (response) {
          
        }).catch(function (error) {
          
        })
    },
    playAanimation () {
      let me = this
      this.isPlayAnimation = !this.isPlayAnimation
      setTimeout(function(){
        me.isShowVideo = !me.isShowVideo
      },200)
    }
  },
  beforeMount () {
    this.isPlayAnimation = false
    this.isShowVideo = false
  }
}
</script>

<!-- 首页样式 -->
<style lang="scss" scoped>
.index{
  height:100%;
  max-width: 1920px;
  margin: 0 auto;
  &_title{
    font-size: 20px;
  }
  .main-left{
    position: relative;
    top: -55px;
    height: 100%;
  }
  .main-right{
    position: relative;
    top: -55px;
    height: 100%;
  }
  .main-center{
    width:100%;
    float:left;
    position: relative;
    img{
      width:100%;
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
      width: 95%;
      margin:auto 0;
      margin-left: 2.5%;
      top: 0;
      bottom: 0;
      right:0;
      left:0;
      height: 95%;
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
}
</style>
