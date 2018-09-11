<template>
  <div id="container" style="width: 100%;height:100%"></div> 
</template>
<script>
import echarts from 'echarts'
import MAP_DATA from './MapData.js'

export default {
  name: 'AMap',
  props: {
    height: String
  },
  data () {
    return {
      markerList:[]
    }
  },
  methods: {
    initMap () {
      this.markerList = MAP_DATA.data
      var map = new AMap.Map('container', {
          center: [121.26306,31.200271],
          resizeEnable: true,
          rotateEnable:true,
          pitchEnable:true,
          zoom: 17,
          pitch:65,
          rotation:65,
          viewMode:'3D',//开启3D视图,默认为关闭
          expandZoomRange:true,
          zooms:[3,20],
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
    this.initMap()
  }
}
</script>

<style lang="scss" scoped>
</style>