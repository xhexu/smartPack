<template>
  <div>
    <el-row>
      <el-col :span="7">1</el-col>
      <el-col :span="10">
        <img class="imgT" src="../../assets/top_bar.png"/>
        <div class="view" id="map"></div>
        <img class="imgB" src="../../assets/top_bar.png"/>
      </el-col>
      <el-col :span="7">1</el-col>
    </el-row>
    <el-row>
      <el-col :span="7">&nbsp;</el-col>
      <el-col :span="10">
        <nav-bar></nav-bar>
      </el-col>
      <el-col :span="7">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  components: {
    navBar
  },
  created () {
    this.initMap()
  },
  data () {
    return {}
  },
  methods: {
    initMap () {
      let map = new BMap.Map('map')
      map.centerAndZoom(new BMap.Point(121.269141, 31.205226), 17)
      map.enableScrollWheelZoom(true)
      // 覆盖区域图层测试
      map.addTileLayer(new BMap.PanoramaCoverageLayer())

      let stCtrl = new BMap.PanoramaControl() //构造全景控件
      stCtrl.setOffset(new BMap.Size(20, 20))
      map.addControl(stCtrl) //添加全景控件
    }
  }
}
</script>

<style lang="scss" scoped>
  .imgT{width:100%;}
  .view{
    width:95%;margin: -15px auto;background:url('/static/bg_view.png') no-repeat center;background-size: 100% 100%;height:510px;
    /*img{width:100%;margin: 80px auto 10px;}*/
  }
  .imgB{width:100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);}
</style>
