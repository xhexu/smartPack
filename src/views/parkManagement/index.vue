<template>
  <div class="layout">
    <el-row>
      <el-col :span="6" class="left" :style="{height: layoutHeight+'px'}">
        <transition name="el-fade-in-linear">
          <div class="box" v-show="showBox">
            <b>A</b>
            <p>本栋共4层</p>
            <p>入驻企业6家</p>
            <p>企业类型包含餐饮，金融，IT等</p>
            <router-link class="btn" to="/buildingA">进入本栋</router-link>
          </div>
        </transition>
        &nbsp;
      </el-col>
      <el-col :span="12" :style="{position: 'relative',height: layoutHeight+'px'}">
        <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <div class="building"  :class="{animMap:showMap}">
          <img style="width:100%;" src="../../assets/building.gif"/>
        </div>
        <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/top_bar.png"/>
        <nav-bar class="nav"></nav-bar>
      </el-col>
      <el-col :span="6" class="right" :style="{height: layoutHeight+'px'}">
        <transition name="el-fade-in-linear">
          <div class="box" v-show="showBox">
            <b>B</b>
            <p>本栋共12层</p>
            <p>入驻企业62家</p>
            <p>企业类型包含餐饮，金融，制造，IT，服务业等</p>
            <router-link class="btn" to="/buildingB">进入本栋</router-link>
          </div>
        </transition>
        &nbsp;
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
  },
  data () {
    return {
      playFlag: false,
      showMap: false,
      showBox: false
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
    animate () {
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
    height: 100%;min-width:1200px;margin: 0 auto;position: relative;
    img.anim{
      width:100%;position: absolute;left: 0;transition: all .5s ease .5s;-webkit-transition:all .5s ease .5s;
    }
    .building{
      width:95%;height:95%;opacity:0;margin: 15px auto;background:url('/static/bg_view.png') no-repeat center;
      background-size: 100% 100%;transition: all .5s ease 1s;-webkit-transition:all .5s ease 1s;
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
  .left{
    b{
      left:12%;
    }
    .box{
      padding-left: 20%;
    }
  }
  .right{
    b{
      right:12%;
    }
    .box{
      background-image:url("/static/divTR.png");padding-left: 10%;padding-right: 15%;
    }
  }
  .box{
    width:45%;background: url('/static/divTL.png') no-repeat;background-size: 100% 100%;color:#01A4AE;position: relative;
    font-weight: bold;text-align: left;margin:30% auto;position: relative;padding-top: 100px;padding-bottom:50px;font-size: 14px;
    b{color:red;position: absolute;font-size: 16px; top:33px;}
    .btn{
      display: block;width:50%; height:36px; margin: 0px auto; line-height: 36px;text-align: center;
      background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none;color:#ccc;
    }
  }
</style>
