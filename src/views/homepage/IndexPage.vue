<template>
  <div class="index">
    <!--内容区域-->
    <el-row :gutter="20">
      <el-col :span="6" :style="{height: layoutHeight+'px'}">
        <card @chooseQuery="chooseQuery" :option="cardTL" :chart="optionTL" style="top:-50px"></card>
        <card :option="cardBL" :chart="optionBL" style="margin-top: 40px"></card>
      </el-col>
      <el-col :span="12" :style="{position: 'relative',height: layoutHeight+'px'}">
        <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="videoMap" :class="{videoMapAnim:isShowVideo}">
          <MapView :om="MapData"></MapView>
        </div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <nav-bar class="nav"></nav-bar>
      </el-col>

      <el-col :span="6" :style="{height: layoutHeight+'px'}">
        <card :option="cardTR" :chart="optionTR" style="top:-50px"></card>
        <card :option="cardBR" :chart="optionBR" style="margin-top: 40px"></card>
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
      playFlag: false,
      showMap: false,
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
        isCanChoose: true,
        item: {
          title: '本周'
        }
      },
      cardTR: {
        title:'物业费/租金/出租率',
        position: 'TR',
        isCanChoose: false,
        item: {
          title: '本年'
        }
      },
      cardBL: {
        title:'环比数据',
        position: 'BL',
        isCanChoose: true,
        item: {
          title: '本周'
        }
      },
      cardBR: {
        title:'同比数据',
        position: 'BR',
        isCanChoose: true,
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
          data: []
        },
        series:[{
          data:[]
        }]
      },
      optionBR: {
        legend: {
          data:[]
        },
        yAxis: {
          data: []
        },
        series:[{
          data:[]
        }]
      },
      optionTR: {}
    }
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
          this.sendHttpForFee()
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
      busHttp._QueryWY({parkCode:'e',time:new Date().getFullYear()},function(data){
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
          },{
            name:'出租率',
            data:[]
          }]
        }
        if(_.isObject(data)){//parking : 停车费,traffic : 车流量
          obj.yAxis.data = data.axis
          obj.series[0].data = data.property
          obj.series[1].data = data.rent
          obj.series[2].data = data.letting
          me.optionTR = obj
        }else{
          me.$message({
            message: '车辆信息返回数据异常',
            type: 'warning'
          })
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
      this.playFlag = true
      this.showMap = true
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
