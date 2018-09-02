<template>
  <el-row class="layout">
    <el-col :span="6" :offset="1" class="left" :style="{height: layoutHeight-60+'px'}">
      <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/building_top.png"/>
      <div class="building"  :class="{animMap:showMap}">
        <img style="width:80%;" src="../../assets/building.png"/>
      </div>
      <img style="-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/building_top.png"/>
    </el-col>
    <el-col :span="1" :offset="1" class="center" :style="{height: layoutHeight-80+'px'}">
      <ul :class="{marT: layoutHeight>599}">
        <li :class="{active:index==12}" @click="index=12">12</li>
        <li :class="{active:index==11}" @click="index=11">11</li>
        <li :class="{active:index==10}" @click="index=10">10</li>
        <li :class="{active:index==9}" @click="index=9">9</li>
        <li :class="{active:index==8}" @click="index=8">8</li>
        <li :class="{active:index==7}" @click="index=7">7</li>
        <li :class="{active:index==6}" @click="index=6">6</li>
        <li :class="{active:index==5}" @click="index=5">5</li>
        <li :class="{active:index==4}" @click="index=4">4</li>
        <li :class="{active:index==3}" @click="index=3">3</li>
        <li :class="{active:index==2}" @click="index=2">2</li>
        <li :class="{active:index==1}" @click="index=1">1</li>
      </ul>
    </el-col>
    <el-col :span="15" class="right" :style="{height: layoutHeight+'px'}">
      <el-carousel type="card" trigger="click" indicator-position="none" :autoplay="false" arrow="never"  :style="{height: layoutHeight-100+'px'}">
        <el-carousel-item v-for="item in 6" :key="item"  :style="{width: layoutHeight-100+'px',height: layoutHeight-140+'px'}">
          <div style="width:80%;height:80%;margin: 16% 0 0 14%;position: relative;">
            <b>某某某某公司</b>
            <p>公司简介</p>
            <div class="chart">图表ao</div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <p class="btns">
        <span style="margin-right: 80px;"><span style="font-size: 40px;">{{index}}</span>F</span>
        <span style="color:white;font-size: 50px;margin-right:40px;cursor:pointer;" @click="indexI = indexI-1">&lsaquo;</span>
        <span v-for="item in 6" :key="item" style="margin-right:20px;cursor:pointer;" :class="{active:indexI==item}" @click="indexI=item">{{`${index}-0${item}`}}</span>
        <span style="color:white;font-size: 50px;margin-left:20px;cursor:pointer;" @click="indexI = indexI + 1">&rsaquo;</span>
      </p>
    </el-col>
  </el-row>
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
  },
  computed: {
    layoutHeight () {
      if (document.documentElement.clientHeight>800){
        return 720
      } else if (document.documentElement.clientHeight<700){
        return 480
      } else {
        return 600
      }
    }
  },
  data () {
    return {
      playFlag: false,
      showMap: false,
      showBox: false,
      index: 1,
      indexI: 1
    }
  },
  methods: {
    animate(){
      let vm = this;
      vm.playFlag = true;
      vm.showMap = true;
      setTimeout(()=>{
        vm.showBox = true;
      },500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout{
    height: 100%;min-width:1200px;margin: 0px auto;
    .left{
      position: relative;
      img.anim{
        width:100%;position: absolute;left: 0;transition: all .5s ease .5s;-webkit-transition:all .5s ease .5s;
      }
      .building{
        width:94%;height:95%;opacity:0;margin: 12px 0 0 15px;background:url('/static/bg_view.png') no-repeat center;
        background-size: 100% 100%;transition: all .5s ease 1s;-webkit-transition:all .5s ease 1s;
        img{width:80%;margin: 120px auto;}
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
    }
    .center{
      ul{
        li{width:36px;height:36px;background:url('/static/btn_build_index.png') no-repeat center;background-size: 100% 100%;
          margin-bottom:2px;line-height: 36px; color:white;font-weight: bold;cursor: pointer;}
        .active{
          background-image:url("/static/btn_build_index_active.png");color: #bb4b00;
        }
      }
      .marT{
        margin-top: 100px;
      }
    }
    .right{
      position: relative;
      .el-carousel{
        .el-carousel__item {
          background:url('/static/bg_manage_content.png') no-repeat center;background-size: 100% 100%;opacity: 0;text-align: left;
          b{
            color:#01A4AE;font-size: 18px;height:40px; line-height: 40px;padding-left: 20px;width:90%;
          }
          p{
            color:white; font-size:14px;text-indent: 30px;width:95%;height:20px;line-height: 20px;
          }
          .chart{
            position: absolute;left:5%;bottom:12%;min-height: 50%;
          }
        }
        .el-carousel__item.is-active {
          opacity: 1.0;
        }
      }
      .btns{
        height:40px; line-height: 40px;color:#01A4AE;font-weight: bold;font-size: 26px;text-align: center;position: absolute;bottom: 20px;left:15%;
        .active{color:yellow;}
      }
    }
  }
</style>
