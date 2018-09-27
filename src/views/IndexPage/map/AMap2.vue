<template>
  <div class="chart">
    <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../../assets/top_bar.png"/>
    <div class="trMap" id="container" style="width: 95%;height:93%"></div> 
    <img style="position: absolute;left: 0;bottom: 0;width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" src="../../../assets/top_bar.png"/>
    <div class="chartBg" v-show="isShowWindow" @click="openWindow"></div>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../../assets/top_bar.png"/>
        <!-- <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,1);">
          
        </div> -->
        <div class="trMap" id="bigMap" style="width: 95%;height:93%"></div> 
        <img style="position: absolute;left: 0;bottom: 0;width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" src="../../../assets/top_bar.png"/>
      </div>
    </div>

  </div>
</template>
<script>
import MAP_DATA from './MapData.js'

export default {
  name: 'AMap',
  props: {
    height: String
  },
  data () {
    return {
      markerList:[],
      isShowWindow: false
    }
  },
  methods: {
    openWindow () {
      if(!this.isShowWindow){
        this.isShowWindow = true
        this.initMap("bigMap")
      }else{
        this.isShowWindow = false
      }
    },
    initMap (domId) {
      let me = this
      this.markerList = MAP_DATA.data
      if(!window.hasOwnProperty("AMap")){
        this.$message({
          message: '地图加载失败,请检查网络连接',
          type: 'warning'
        })
        return
      }
      var map = new AMap.Map(domId, {
          center: [121.26306,31.200271],
          resizeEnable: true,
          rotateEnable:true,
          pitchEnable:true,
          zoom: 17,
          pitch:65,
          rotation:65,
          viewMode:'3D',//开启3D视图,默认为关闭
          expandZoomRange:true,
          zooms:[3,30],
          mapStyle: 'amap://styles/31f60891d7dfe06e604e11bafed3fe92'//设置地图的显示样式
      });

      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      for (var i = 0, marker,info = []; i < this.markerList.length; i++) {
          var marker = new AMap.Marker({
              position: [this.markerList[i].point1,this.markerList[i].point2],
              map: map
          });
          info = []
          info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>"+this.markerList[i].title+"</b>");
          info.push("地址 :"+this.markerList[i].address+"</div>");
          marker.content =  info.join("<br/>");
          marker.on('click', markerClick);
      }
      function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
      }
      map.setFitView();

    }
  },
  mounted () {
    this.initMap("container")
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width:100%;
  height:235px;
  position:relative;
}
.trMap{
  width: 100%;
  min-height:200px;
  margin: 0 auto;
  position:relative;
  top: 10px;
}
.bigChart{
  position: relative;
  width: 700px;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 50%;
  z-index: 999;
  margin: -225px 0 0 -350px;
  padding: 10px;
  animation: bg_chart_in 1s;
  .btns{
    position:absolute;
    right: 50px;
    top:30px;
    z-index:1000;
    div {
      display: inline-block;
      background-color: #00E4FF;
      padding: 1px 10px;
      font-size: 14px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}
.chartBg{
  z-index:888;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: rgba(0,0,0, 0.7);
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
}
.bigBg{
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  z-index:888;
  animation: bg_anim 1s;
  -moz-animation: bg_anim 1s; 
  -webkit-animation: bg_anim 1s;  
  -o-animation: bg_anim 1s;
}
@keyframes bg_anim{
  0%{opacity: 0;}
  100%{opacity: 1;}
}
.chart_tip{
  position: absolute;
  width: 100%;
  top: 50%;
  color:#00E4FF;
}
@keyframes bg_chart_in{
  0%{transform: scale(0.2);opacity: 0;}
  100%{ transform: scale(1);opacity: 1;}
}
@media screen and (min-width: 1400px) {
    .chart{
      width:100%;
      height:350px;
    }
}
</style>