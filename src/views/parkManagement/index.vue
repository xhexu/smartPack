<template>
  <div class="index">
    <!--内容区域-->
    <div id="main">
      <div class="main-left">
        <div class="main-left_tl">
          <div style="position: absolute;top: 28px;left: 30px;font-size: 14px;color: red;">A</div>
          <div style="position: absolute;top: 20px;left: 80px;color: #01A4AE;"></div>
          <div style="width: 80%;height: 90%;position: absolute;top: 40px;left: 50px;">

          </div>
        </div>
      </div>

      <!--gif动态图区-->
      <div class="main-center">
        <div class="main-center_video" >
          <img style="margin-top: 250px;" :class="{animTop:isPlayAnimation}" src="../../assets/top_bar.png">
          <div class="videoMap"></div>
          <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" :class="{animBtm:isPlayAnimation}" src="../../assets/top_bar.png">
          <nav-bar></nav-bar>
        </div>
      </div>


      <div class="main-right">
        <div class="main-right_tr">
          <div style="position: absolute;top: 28px;right: 30px;font-size: 14px;color: red;">B</div>
          <div style="position: absolute;top: 20px;right: 80px;color: #01A4AE;"></div>
          <div style="width: 80%;height: 80%;position: absolute;top: 40px;right: 40px;">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'

export default {
  name: 'management',
  components: {
    navBar
  },
  data () {
    return {
      isPlayAnimation: false
    }
  },
  methods: {
    playAanimation () {
      this.isPlayAnimation = !this.isPlayAnimation
    }
  },
  beforeMount () {
    this.isPlayAnimation = false
  },
  mounted () {
    this.playAanimation()
  }
}
</script>

<!-- 首页样式 -->
<style lang="scss" scoped>
.index{
  #main{
    width: 100%;
    .main-left{
      position: relative;
      top: -55px;
      width:25%;
      min-height:800px;
      float: left;
      &_tl{
        left:50px;
        position: relative;
        background:transparent url('/static/divTL.png') no-repeat;
        background-size:100% 100%;
        height: 300px;
        max-width: 260px;
        margin-bottom: 15px;
      }
    }
    .main-center{
      width:50%;
      height:800px;
      float:left;
      position: relative;
      img{
        width:90%;
        -webkit-transition:all .5s ease .5s;
        transition: all .5s ease .5s;
      }
      &_video{
        min-height:300px;
      }
      .animTop{
        margin-top:50px !important;
      }
      .animBtm{
        margin-top:360px !important;
      }
      .videoMap{
        width: 85%;
        margin-left: 50px;
        top: 64px;
        height: 49%;
        position: absolute;
        background:transparent url('/static/map.png') no-repeat center;
        background-size: 100% 100%;
        opacity: 0;
        transition: all .5s ease .5s;
        -webkit-transition:all .5s ease .5s;
      }
      .videoMapAnim{
        opacity: 1;
      }
    }
    .main-right{
      position: relative;
      top: -50px;
      width:25%;
      height:800px;
      float:right;
      &_tr{
        right:-55px;
        position:relative;
        background:transparent url('/static/divTR.png') no-repeat;
        background-size:100% 100%;
        height: 300px;
        max-width: 260px;
        margin-bottom: 15px;
      }
    }
  }
  &_map{
    min-height: 300px;
    width: 90%;
  }
}
</style>
