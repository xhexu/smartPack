<template>
  <el-row class="layout">
    <router-link class="back"  :to="{path:'/management',query:{index:2}}">返回</router-link>
    <el-col :span="6" :offset="1" class="left" :style="{height: layoutHeight-60+'px'}">
      <img style="top:45%;" :class="{animTop:playFlag,anim:true}" src="../../assets/building_top.png"/>
      <div class="building"  :class="{animMap:showMap}">
        <img style="width:80%;" src="../../assets/building.png"/>
      </div>
      <img style="-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);bottom:45%;" :class="{animBtm:playFlag,anim:true}" src="../../assets/building_top.png"/>
    </el-col>
    <el-col :span="1" :offset="1" class="center" :style="{height: layoutHeight-80+'px'}">
      <ul :class="{marT: layoutHeight>599}">
        <li :class="{active:index==12}" @click="itemClick(12)" >12</li>
        <li :class="{active:index==11}" @click="itemClick(11)">11</li>
        <li :class="{active:index==10}" @click="itemClick(10)">10</li>
        <li :class="{active:index==9}" @click="itemClick(9)">9</li>
        <li :class="{active:index==8}" @click="itemClick(8)">8</li>
        <li :class="{active:index==7}" @click="itemClick(7)">7</li>
        <li :class="{active:index==6}" @click="itemClick(6)">6</li>
        <li :class="{active:index==5}" @click="itemClick(5)">5</li>
        <li :class="{active:index==4}" @click="itemClick(4)">4</li>
        <li :class="{active:index==3}" @click="itemClick(3)">3</li>
        <li :class="{active:index==2}" @click="itemClick(2)">2</li>
        <li :class="{active:index==1}" @click="itemClick(1)">1</li>
      </ul>
    </el-col>
    <el-col :span="15" class="right" :style="{height: layoutHeight+'px'}">
      <div class="infoBox">
        <div style="width:80%;height:80%;margin: 16% 0 0 14%;position: relative;">
          <b>{{compData.enterpriseName}}</b>
          <p>{{compData.business}}</p>
          <div id="chart"></div>
        </div>
      </div>
      <p class="btns">
        <span style="margin-right: 80px;"><span style="font-size: 40px;">{{index}}</span>F</span>
        <span style="color:white;font-size: 50px;margin-right:40px;cursor:pointer;" @click="indexI = indexI-1">&lsaquo;</span>
        <span v-for="item in floorData" :key="item.floorCode" style="margin-right:20px;cursor:pointer;" :class="{active:indexI==item.floorCode}" @click="comClick(item.floorCode)">{{item.floorCode}}</span>
        <span style="color:white;font-size: 50px;margin-left:20px;cursor:pointer;" @click="indexI = indexI + 1">&rsaquo;</span>
      </p>
    </el-col>
  </el-row>
</template>

<script>
import navBar from '../../components/navBar.vue'
import echarts from 'echarts'
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  components: {
    navBar
  },
  mounted () {
    this.animate()
    this.initData()
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
      indexI: '1-01',
      data: [],
      floorData: [],
      compData: {},
      yyeData: [],
      nsyData: [],
      myChart: {}
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
    },
    comClick (floorCode) {
      this.compData = {}
      this.yyeData = []
      this.nsyData = []
      this.indexI = floorCode
      for(let i in this.floorData){
        if(floorCode === this.floorData[i].floorCode){
          this.compData = this.floorData[i]
        }
      }
      if(Object.keys(this.compData).length === 0) {
        this.initChart()
        return
      }
      this.$http.post('/itfenterinfo/searchJY', {code: this.compData.code, time: new Date().getFullYear()})
        .then((data) => {
          if (data.success) {
            const resData = data.result
            for (let i in resData){
              let en = resData[i]
              if(en.dataType === 'income'){
                this.yyeData.push(en.dataValue)
              }else{
                this.nsyData.push(en.dataValue)
              }
            }
            this.initChart()
          } else {
            this.$message(data.message)
          }
        })
        .catch(function (error) {
          console.info(error)
        })
    },
    itemClick (index) {
      this.index = index
      this.floorData = []
      for (let i in this.data) {
        let en = this.data[i]
        if (index == en.floorCode.substr(0, 1)) {
          this.floorData.push(en)
        }
      }
      this.comClick(`${index}-01`)
    },
    initChart (){
      // 指定图表的配置项和数据
      let option = {
        color: ['#11eef9', '#f9f211'],
        legend: {
          data: ['营业额', '纳税额']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            spliteLine: {
              show: false
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false,
            spliteLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '营业额',
            type: 'bar',
            barGap: 0,
            label: 'top',
            data: this.yyeData
          },
          {
            name: '纳税额',
            type: 'bar',
            label: 'top',
            data: this.nsyData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    initData(){
      this.$http.post('/itfenterinfo/list',{floor: 'A', parkCode: 'e'})
        .then((data) => {
          if (data.success) {
            this.data = data.result
            this.itemClick(1)
          } else {
            this.$message(data.message)
          }
        })
        .catch(function (error) {
          console.info(error)
        })
      this.myChart = echarts.init(document.getElementById('chart'));
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout{
    height: 100%;min-width:1200px;margin: 0px auto;
    .back{
      display: block;width:40px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
      background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none;color:#ccc;
    }
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
      .infoBox {
        background:url('/static/bg_manage_content.png') no-repeat center;background-size: 100% 100%;text-align: left;width:60%; height:80%;position: absolute;left:15%;
        b{
          color:#01A4AE;font-size: 18px;height:40px; line-height: 40px;padding-left: 20px;width:90%;
        }
        p{
          color:white; font-size:14px;text-indent: 30px;width:95%;height:20px;line-height: 20px;
        }
        #chart{
          position: absolute;left:5%;bottom:10%;height: 60%;width:90%;color:white;
        }
      }
      .btns{
        height:40px; line-height: 40px;color:#01A4AE;font-weight: bold;font-size: 26px;text-align: center;position: absolute;bottom: 20px;left:15%;
        .active{color:yellow;}
      }
    }
  }
</style>
