<template>
  <div id="container" style="width: 100%;height:100%"></div> 
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'AMap',
  props: {
    height: String
  },
  data () {
    return {
    }
  },
  methods: {
    initMap () {
      var map = new AMap.Map('container', {
          center: [121.263268,31.200312],
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
      // map.setFeatures(['bg','road','building','polint'])
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style lang="scss" scoped>
</style>