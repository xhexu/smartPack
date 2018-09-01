<template>
  <div class="layout">
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12" style="position: relative;height: 480px;">
        <img style="top:220px;" :class="{animTop:playFlag}" src="../../assets/top_bar.png"/>
        <div id="allMap"  :class="{animMap:showMap}"></div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:220px;" :class="{animBtm:playFlag}" src="../../assets/top_bar.png"/>
        <nav-bar class="nav"></nav-bar>
      </el-col>
      <el-col :span="6">&nbsp;</el-col>
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
  mounted () {
    this.animate()
    this.initMap()
  },
  data () {
    return {
      playFlag: false,
      showMap: false
    }
  },
  methods: {
    animate(){
      let vm = this;
      vm.playFlag = true;
      vm.showMap = true;
    },
    initMap () {
      let map = new BMap.Map('allMap')
      map.centerAndZoom(new BMap.Point(121.269141, 31.205226), 18)
      map.enableScrollWheelZoom(true)
      // 覆盖区域图层测试
      map.addTileLayer(new BMap.PanoramaCoverageLayer())

      map.setMapStyle({style : "dark"})

      let marker = new BMap.Marker(new BMap.Point(121.269141, 31.205226)); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

      let stCtrl = new BMap.PanoramaControl() //构造全景控件
      stCtrl.setOffset(new BMap.Size(20, 20))
      map.addControl(stCtrl) //添加全景控件
    }
  }
}
</script>

<style lang="scss" scoped>
  .anchorBL {
    display: none;
  }
  .layout{
    height: 100%;max-width: 1366px;margin: 0 auto;position: relative;
    img{
      width:100%;position: absolute;left: 0;transition: all .5s ease .5s;-webkit-transition:all .5s ease .5s;
    }
    #allMap{
      width:95%;height:95%;opacity:0;margin: 15px auto;background:url('/static/bg_view.png') no-repeat center;background-size: 100% 100%;transition: all .5s ease 1s;-webkit-transition:all .5s ease 1s;
    }
    .animTop{
      top:0!important;
    }
    .animBtm{
      bottom:0!important;
    }
    .animMap{
      opacity:1.0!important;
    }
    .nav{
      position:absolute;bottom:-60px;
    }
  }
</style>
