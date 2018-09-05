<template>
  <div id="indexditu" :style="mapStyle"></div>
</template>

<script>

import dataObj from './MapData.js'
export default {
  name: 'indexMap',
  data () {
    return {
      mapStyle: {
        width:'100%',
        height:'100%'
      },
      mapData:[]
    }
  },
  props: {
    om: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    feathMapData () {
      this.mapData = dataObj
      this.initBaiDuMap({
        data:this.mapData.data,
        longitude:this.om.longitude,
        latitude:this.om.latitude
      })
    },
    initBaiDuMap (option) {
      let map = new BMap.Map("indexditu")
      
      map.centerAndZoom(new BMap.Point(option.longitude,option.latitude), 10)
      map.enableScrollWheelZoom(true)
      map.addTileLayer(new BMap.PanoramaCoverageLayer())
      map.setMapStyle({style : "dark"})

     
      for(var i=0;i<option.data.length;i++){
        var marker = new BMap.Marker(new BMap.Point(option.data[i].point1,option.data[i].point2));  
        var content = option.data[i].address;
        map.addOverlay(marker);               
        let opts = {
          width: 250,
          height: 80,
          title: option.data.title,
          enableMessage: true
        }
        addClickHandler(content,marker,opts);
      }
      function addClickHandler(content,marker,opts){
        marker.addEventListener("mouseover",function(e){
          openInfo(content,e,opts)}
        )
      }
      function openInfo(content,e,opts){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
        var infoWindow = new BMap.InfoWindow(content,opts)  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point) //开启信息窗口
      }
    }
  },
  mounted () {
    this.feathMapData()
  }
}
</script>

<style lang="scss" scoped>
.map{

}
</style>