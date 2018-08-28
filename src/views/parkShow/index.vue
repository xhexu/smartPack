<template>
  <div class="index">
    <!--title-->
    <div class="index_title">
      <img src="../../assets/title.png">
    </div>
    <!--内容区域-->
    <div id="main">
      <div class="main-left"></div>
      <!--园区展示区-->
      <div class="main-center">
        <div class="main-center_video">
          <img style="margin-top: 250px;" :class="{animTop:isPlayAnimation}" src="../../assets/top_bar.png">
          <div class="videoMap"></div>
          <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" :class="{animBtm:isPlayAnimation}" src="../../assets/top_bar.png">
        </div>
        <nav-bar></nav-bar>
      </div>
      <div class="main-right"></div>
    </div>
  </div>
</template>

<script>
import navBar from '../../components/navBar.vue'

export default {
  name: 'show',
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
  .index {
    &_title {
      font-size: 20px;
    }
    #main {
      width: 100%;
      .main-left {
        position: relative;
        top: -55px;
        width: 25%;
        min-height: 800px;
        float: left;
      }
      .main-center {
        width: 50%;
        height: 800px;
        float: left;
        position: relative;
        img {
          width: 90%;
          -webkit-transition: all .5s ease .5s;
          transition: all .5s ease .5s;
        }
        .animTop {
          margin-top: 50px !important;
        }
        .animBtm {
          margin-top: 360px !important;
        }
        .videoMap {
          width: 85%;
          margin-left: 50px;
          top: 64px;
          height: 49%;
          position: absolute;
          background: transparent url('/static/map.png') no-repeat center;
          background-size: 100% 100%;
          opacity: 0;
          transition: all .5s ease .5s;
          -webkit-transition: all .5s ease .5s;
        }
      }
      .main-right {
        position: relative;
        top: -50px;
        width: 25%;
        height: 800px;
        float: right;
      }
    }
    &_map {
      min-height: 300px;
      width: 90%;
    }
    &_btns {

    }
  }
</style>
