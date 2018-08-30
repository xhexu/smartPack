<template>
  <div id="indexMap" :style="mapStyle"></div>
</template>

<script>

import dataObj from './MapData.js'
export default {
  name: 'map',
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
      // this.$http.get('./MapData.js').then((res)=>{
      //   me.mapData = res.data
      //   me.initBaiDuMap({
      //     data:me.mapData,
      //     longitude:me.om.longitude,
      //     latitude:me.om.latitude
      //   })
      // })
      console.log(dataObj.data)
      this.mapData = dataObj
      this.initBaiDuMap({
        data:this.mapData.data,
        longitude:this.om.longitude,
        latitude:this.om.latitude
      })
    },
    initBaiDuMap (option) {
      let map = new BMap.Map("indexMap")
      map.setCurrentCity("上海")
      let mapStyle ={ 
        style : "dark"  //设置地图风格为高端黑
      }
      map.setMapStyle(mapStyle)
      // map.setMapType({styleJson:myStyleJson})
      map.enableScrollWheelZoom(true)
      map.centerAndZoom(new BMap.Point(option.longitude,option.latitude), 18)
      let opts = {
        width: 250,
        height: 80,
        title: "数据点信息",
        enableMessage: true
      }
      for(var i=0;i<option.data.length;i++){
        var marker = new BMap.Marker(new BMap.Point(option.data[i].point1,option.data[i].point2));  // 创建标注
        var content = option.data[i].address;
        map.addOverlay(marker);               // 将标注添加到地图中
        addClickHandler(content,marker);
      }
      function addClickHandler(content,marker){
        marker.addEventListener("mouseover",function(e){
          openInfo(content,e)}
        )
      }
      function openInfo(content,e){
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