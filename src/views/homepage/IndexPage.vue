<template>
  <div class="index">
    <!--title-->
    <div class="index_title">
      <img src="../../assets/title.png">
    </div>


    <!--内容区域-->
    <div id="main">
      <div class="main-left">
        <div class="main-left_tl">
          <div style="position: absolute;top: 28px;left: 22px;font-size: 14px;color: #01A4AE;">本周</div>
          <div style="position: absolute;top: 20px;left: 80px;color: #01A4AE;">车辆信息</div>
          <div style="width: 80%;height: 90%;position: absolute;top: 40px;left: 50px;">
            <bar-chart :option="optionTL"></bar-chart>
          </div>
        </div>
        <div class="main-left_bl">
          <div style="position: absolute;bottom: 28px;left: 22px;font-size: 14px;color: #01A4AE;">本周</div>
          <div style="position: absolute;bottom: 20px;left: 80px;color: #01A4AE;">物业费</div>
          <div style="width: 80%;height: 90%;position: absolute;left: 50px;top: -20px;">
            <bar-chart :option="optionBL"></bar-chart>
          </div>
        </div>
      </div>

      <!--视频播放区-->
      <div class="main-center">
        <div class="main-center_video" >
          <img style="margin-top: 250px;" :class="{animTop:isPlayAnimation}" src="../../assets/top_bar.png">
          <div class="videoMap" :class="{videoMapAnim:isShowVideo}"></div>
          <video v-show="!isShowVideo"  width="320" height="240" controls>
            <source src="/static/video.avi" type="video/avi">
            <source src="movie.ogg" type="video/ogg">
          您的浏览器不支持Video标签。
          </video>
          <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" :class="{animBtm:isPlayAnimation}" src="../../assets/top_bar.png">
          <nav-bar></nav-bar>
        </div>
      </div>


      <div class="main-right">
        <div class="main-right_tr">
          <div style="position: absolute;top: 28px;right: 22px;font-size: 14px;color: #01A4AE;">本周</div>
          <div style="position: absolute;top: 20px;right: 80px;color: #01A4AE;">租金表</div>
          <div style="width: 80%;height: 80%;position: absolute;top: 40px;right: 40px;">
            <bar-chart :option="optionTR"></bar-chart>
          </div>
        </div>
        <div class="main-right_br">
          <div style="position: absolute;bottom: 28px;right: 22px;font-size: 14px;color: #01A4AE;">本周</div>
          <div style="position: absolute;bottom: 20px;right: 80px;color: #01A4AE;">出租率</div>
          <div style="width: 80%;height: 80%;position: absolute;right: 40px;">
            <bar-chart :option="optionBR"></bar-chart>
          </div>
        </div>
      </div>
    </div>



    <!--导航-->
    <!-- <div class="index_btns">
      <ul>
        <li style="background: transparent url('../../assets/btn.png') no-repeat 0 0">
          经营分析
        </li>
        <li>园区展示</li>
        <li>园区管控</li>
        <li>孵化管理</li>
        <li>视频监控</li>
      </ul>
    </div> -->
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import BarChart from '../../components/charts/BarChart.vue'
import navBar from '../../components/navBar.vue'

export default {
  name: 'IndexPage',
  components: {
    BarChart,
    navBar
  },
  data () {
    return {
      isPlayAnimation:false,
      isShowVideo: false,
      optionTL: {
        legend: {
          data:['车流量', '停车费']
        },
        yAxis: {
          data: ['9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series: [{
          name:'车流量',
          data:[18203, 23489, 29034, 104970, 131744, 630230]
        },{
          name:'停车费',
          data:[18203, 23489, 29034, 104970, 131744, 630230]
        }]
      },
      optionBL: {
        legend: {
          data:[]
        },
        yAxis: {
          data: ['9-3','9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series:[{
          data:[630230, 18203, 23489, 29034, 104970, 131744, 630230]
        }]
      },
      optionBR: {
        legend: {
          data:[]
        },
        yAxis: {
          data: ['9-3','9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series:[{
          data:[630230, 18203, 23489, 29034, 104970, 131744, 630230]
        }]
      },
      optionTR: {
        legend: {
          data:[]
        },
        yAxis: {
          data: ['9-3','9-4','9-5','9-6','9-7','9-8','9-9']
        },
        series:[{
          data:[630230, 18203, 23489, 29034, 104970, 131744, 630230]
        }]
      }
    }
  },
  methods: {
    /**
     * 查询数据
     * @return {[type]} [description]
     */
    queryChartData () {
      this.$http.get('/user', {
        params: {
          ID: 12345
        }
      }).then(function (response) {
          console.log(response);
      }).catch(function (error) {
          console.log(error);
      });
    },
    playAanimation () {
      let me = this
      this.isPlayAnimation = !this.isPlayAnimation
      setTimeout(function(){
        me.isShowVideo = !me.isShowVideo
      },200)
    }
  },
  beforeCreate () {

  },
  beforeMount () {
    this.isPlayAnimation = false
    this.isShowVideo = false
  },
  mounted () {
    //查询首页数据
    this.queryChartData()
    this.playAanimation()
    let me = this
    setInterval(function(){
      me.optionBL.series = [{
          data:[parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000), parseInt(Math.random()*1000)]
      }];
    },5000)
  }
}
</script>

<!-- 首页样式 -->
<style lang="scss" scoped>
.index{
  &_title{
    font-size: 20px;
  }
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
      &_bl{
        left:50px;
        position: relative;
        background:transparent url('/static/divBL.png') no-repeat;
        background-size:100% 100%;
        height: 300px;
        max-width: 260px;
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
      &_br{
        right:-55px;
        position:relative;
        background:transparent url('/static/divBR.png') no-repeat;
        background-size:100% 100%;
        height: 300px;
        max-width: 260px;
      }
    }
  }
  &_map{
    min-height: 300px;
    width: 90%;
  }
  &_btns{

  }
}
</style>
