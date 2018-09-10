<template>
  <div class="layout">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20" :style="{position: 'relative',height: layoutHeight+'px'}">
        <!--<img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>-->
        <div id="allMap"  :class="{animMap:showMap}">
          <iframe height="100%" width="100%" src="http://www.360vrpano.com/index.php/Project/viewProject/id/28985.html"></iframe>
        </div>
        <!--<img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>-->
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>
    <el-row >
      <el-col :span="12" :offset="6">
        <div style="position: relative;width: 100%;margin: 0 auto;padding: 0 auto">
          <nav-bar class="nav"></nav-bar>
        </div>
      </el-col>
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
    // this.initMap()
  },
  data () {
    return {
      playFlag: false,
      showMap: false
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
    height: 100%;min-width:1200px;margin: 0 auto;position: relative;
    img.anim{
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
