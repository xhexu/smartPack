<template>
  <el-row class="layout">
    <el-col :span="6" :offset="2" class="left">
      <img style="top:220px;" :class="{animTop:playFlag,anim:true}" src="../../assets/building_top.png"/>
      <div class="building"  :class="{animMap:showMap}">
        <img style="width:100%;" src="../../assets/building.png"/>
      </div>
      <img style="-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);bottom:220px;" :class="{animBtm:playFlag,anim:true}" src="../../assets/building_top.png"/>
    </el-col>
    <el-col :span="1" :offset="1" class="center">
      <ul>
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
    <el-col :span="14" class="right">
      <el-carousel type="card" trigger="click" indicator-position="none" :autoplay="false" arrow="never">
        <el-carousel-item v-for="item in 6" :key="item"></el-carousel-item>
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
    height: 100%;max-width: 1366px;min-width:1200px;margin: 80px auto;
    .left{
      position: relative;height: 480px;
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
      height: 480px;
      ul{
        li{width:36px;height:36px;background:url('/static/btn_build_index.png') no-repeat center;background-size: 100% 100%;
          margin-bottom:3px;line-height: 36px; color:white;font-weight: bold;cursor: pointer;}
        .active{
          background-image:url("/static/btn_build_index_active.png");color: #bb4b00;
        }
      }
    }
    .right{
      height: 520px;
      .el-carousel{
        height:480px;
        .el-carousel__item {
          width:600px; height:480px;background:url('/static/bg_manage_content.png') no-repeat center;background-size: 100% 100%;opacity: 0;
        }
        .el-carousel__item.is-active {
          opacity: 1.0;
        }
      }
      .btns{
        height:40px; line-height: 40px;color:#01A4AE;font-weight: bold;font-size: 26px;text-align: center;
        .active{color:yellow;}
      }
    }
  }
</style>
