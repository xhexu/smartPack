<template>
  <div class="index">
    <el-row>
      <el-col :span="6" style="height:100%">
        <div class="t tl">
          <div style="position:absolute;left:13%;top:12%;height:90%;width:90%">
            <barCtl :option="option"></barCtl>
          </div>
        </div>
        <div class="t bl">
          <div style="position:absolute;left:13%;top:2%;height:90%;width:90%">
            <barCbl :option="option"></barCbl>
          </div>
        </div>
      </el-col>

      <el-col :span="12" class="map divHeight">
        <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="videoMap" :class="{videoMapAnim:isShowVideo}">
          <AMap></AMap>
        </div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <!-- <nav-bar class="nav"></nav-bar> -->
      </el-col>

      <el-col :span="6" class="divHeight">
        <div class="t tr">
          <div style="position:absolute;right:10%;top:12%;height:90%;width:90%">
            <barCtr :option="option"></barCtr>
          </div>
        </div>

        <div class="t br">
          <div style="position:absolute;right:10%;top:2%;height:90%;width:90%">
            <barCbr :option="option"></barCbr>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'
import barCtl from './TL.vue'
import barCtr from './TR.vue'
import barCbl from './BL.vue'
import barCbr from './BR.vue'
import AMap from './map/AMap.vue'

export default {
  name: 'IndexPage',
  components: {
    barCtl,
    barCtr,
    barCbl,
    barCbr,
    AMap,
    navBar
  },
  data () {
    return {
      playFlag: false,
      showMap: false,
      isPlayAnimation:false,
      isShowVideo: false,
      option: {
        height: 300
      },
      MapData: {
        height:400,
        longitude:121.269869,
        latitude:31.205909
      }
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
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>

.index{
  height: 100%;
  min-width: 1200px;
  margin: 0 auto;
  position: relative
}
.divHeight{
  height:480px;
}
.map{
  position:relative;
}
.t{
  height:300px;
  width: 280px;
}
.tl{
  background: transparent url('/static/divTL.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  top:-60px;
  margin: 0 auto;
}
.tr{
  background: transparent url('/static/divTR.png') no-repeat;
  background-size: contain;
  position: relative;
  top:-60px;
  margin: 0 auto;
}
.bl{
  background: transparent url('/static/divBL.png') no-repeat;
  background-size: contain;
  position: relative;
  margin: 0 auto;
  top:-40px;
}
.br{
  background: transparent url('/static/divBR.png') no-repeat;
  background-size: contain;
  position: relative;
  margin: 0 auto;
  top:-40px;
}
.animTop{
  top:0!important;
}
.animBtm{
  bottom:0!important;
}
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
  top: 3%;
  left: 2.5%;
  opacity: 0;
  transition: all .5s ease .5s;
  -webkit-transition:all .5s ease .5s;
}
.nav{
  position:absolute;bottom:-60px;
}
@media screen and (min-width: 1400px) { 
    .divHeight{
      height:700px !important;
    }
    .t{
      height:393px !important;
      width: 360px !important;
    }
    .bl{
      top:50px;
    }
    .br{
      top:50px;
    }
    .map{
      position:relative;
      top:50px;
    }
}
</style>