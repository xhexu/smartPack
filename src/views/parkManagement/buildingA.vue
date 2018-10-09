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
    <el-col :span="1" :offset="1" class="center" :style="{height: layoutHeight-80+'px'}" style="position: relative">
      <ul :class="{marT: layoutHeight>599}" style="position: absolute;bottom: 50px">
        <li :class="{active:index==6}" @click="itemClick(6)">6</li>
        <li :class="{active:index==5}" @click="itemClick(5)">5</li>
        <li :class="{active:index=='3A'}" @click="itemClick('3A')">3A</li>
        <li :class="{active:index==3}" @click="itemClick(3)">3</li>
        <li :class="{active:index==2}" @click="itemClick(2)">2</li>
        <li :class="{active:index==1}" @click="itemClick(1)">1</li>
      </ul>
    </el-col>
    <el-col :span="15" class="right" :style="{height: layoutHeight+'px'}">
      <div class="infoBox">
        <div style="width:80%;height:80%;margin: 16% 0 0 14%;position: relative;">
          <div id="info_show_id" style="position: relative;height: 45%;width: 100%;overflow-x: hidden;overflow-y: scroll;">
            <b>{{compData.enterpriseName}}</b>
            <p>{{compData.enterpriseIntro}}</p>
          </div>
          <div id="chart" v-show="showChart"></div>
        </div>
      </div>
      <p class="btns">
        <span style="margin-right: 80px;"><span style="font-size: 40px;">{{index}}</span>F</span>
        <span style="color:white;font-size: 50px;margin-right:40px;cursor:pointer;" @click="comClick(-1)">&lsaquo;</span>
        <span v-for="item in showFloorData" :key="item.floorCode" style="margin-right:20px;cursor:pointer;" :class="{active:compData.floorCode==item.floorCode}" @click="comClick(item.floorCode)">{{item.floorCode}}</span>
        <span style="color:white;font-size: 50px;margin-left:20px;cursor:pointer;" @click="comClick(1)">&rsaquo;</span>
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
    },
    showChart(){
      let sum1 = 0;
      let sum2 = 0;
      this.yyeData.forEach((item)=>{
        sum1 = sum1 + item;
      })
      this.nsyData.forEach((item)=>{
        sum2 = sum2 + item;
      })
      return (this.yyeData.length>0 || this.nsyData.length>0) && (sum1 > 0 || sum2 > 0)
    }
  },
  data () {
    return {
      playFlag: false,
      showMap: false,
      showBox: false,
      index: 1,
      indexI: 0,
      data: [],
      showFloorData: [],
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
    showFloorDataInit (param) {
      if (param === 0) {
        if (this.floorData.length <= 6) {
          this.showFloorData = this.floorData
        } else {
          this.showFloorData = this.floorData.slice(0, 6)
        }
      } else {
        if (this.showFloorData.some((en) =>
          en.floorCode === this.compData['floorCode']
        )) {
        } else if (param === 1) {
          let index = Number(this.indexI)
          this.showFloorData = this.floorData.slice(index - 5, index + 1)
        } else {
          let index = Number(this.indexI)
          this.showFloorData = this.floorData.slice(index, index + 6)
        }
      }
    },
    comClick (param) {
      this.compData = {}
      this.yyeData = []
      this.nsyData = []
      if (this.floorData.length === 0) {
        this.initChart()
        this.showFloorData = []
        return
      }
      if (typeof param === 'number') {
        let indexI = Number(this.indexI) + param
        if (indexI >= 0 && indexI < this.floorData.length) {
          this.indexI = indexI
        }
        this.compData = this.floorData[this.indexI]
        this.showFloorDataInit(param)
      } else {
        for (let i in this.floorData) {
          if (param === this.floorData[i].floorCode) {
            this.indexI = i
            continue
          }
        }
        this.compData = this.floorData[this.indexI]
      }
      this.$http.post('/itfenterinfo/searchDetail', {...this.compData})
        .then((data) => {
          if (data.success) {
            const resData = data.result
            this.compData = resData
          } else {
            this.$message(data.message)
          }
        })
        .catch(function (error) {
          console.info(error)
        })

      this.$http.post('/itfenterinfo/searchJY', {...this.compData, time: new Date().getFullYear()})
        .then((data) => {
          if (data.success) {
            const resData = data.result
            for (let i in resData) {
              let en = resData[i]
              if (en.dataType === 'income') {
                this.yyeData.push(en.dataValue)
              } else {
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
    compare (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    itemClick (index) {
      this.index = index
      this.floorData = []
      let list = []
      for (let i in this.data) {
        let en = this.data[i]
        let floorCode = en.floorCode
        let fl = floorCode.split('-')
        if (index == fl[0]) {
          en.floor = index
          en.home = fl[1]
          list.push(en)
        }
      }
      list = list.sort(this.compare('home'))
      this.floorData = list
      this.indexI = 0
      this.comClick(0)
    },
    initChart () {
      // 指定图表的配置项和数据
      let option = {
        color: ['#11eef9', '#f9f211'],
        legend: {
          data: [{name: '营业额(万)', textStyle: {color: '#11eef9'}}, {name: '纳税额(万)', textStyle: {color: '#f9f211'}}]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            spliteLine: {
              show: false
            },
            data: [{value: '1月', textStyle: {color: '#11eef9'}}, {value: '2月', textStyle: {color: '#11eef9'}},{value: '3月', textStyle: {color: '#11eef9'}},{value: '4月', textStyle: {color: '#11eef9'}},
              {value: '5月', textStyle: {color: '#11eef9'}},{value: '6月', textStyle: {color: '#11eef9'}},{value: '7月', textStyle: {color: '#11eef9'}},{value: '8月', textStyle: {color: '#11eef9'}},
              {value: '9月', textStyle: {color: '#11eef9'}},{value: '10月', textStyle: {color: '#11eef9'}},{value: '11月', textStyle: {color: '#11eef9'}},{value: '12月', textStyle: {color: '#11eef9'}}].slice(0, this.nsyData.length)
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
            name: '营业额(万)',
            type: 'bar',
            barGap: 0,
            data: this.yyeData,
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#11eef9',
                fontSize: 12
              },
              formatter: function (obj) {
                let value =  obj.value
                value = Math.round(parseFloat(value) * 10) / 10;

                if (value.toString().indexOf(".") < 0) {
                  value = value.toString() + ".0";
                }
                return value;
              }
            }
          },
          {
            name: '纳税额(万)',
            type: 'bar',
            data: this.nsyData,
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#f9f211',
                fontSize: 12
              },
              formatter: function (obj) {
                let value =  obj.value
                value = Math.round(parseFloat(value) * 10) / 10;

                if (value.toString().indexOf(".") < 0) {
                  value = value.toString() + ".0";
                }
                return value;
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      this.$nextTick(()=>{
        this.myChart.resize()
      })
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
  #info_show_id::-webkit-scrollbar { width: 0 !important }
  #info_show_id{ -ms-overflow-style: none; }
  #info_show_id{ overflow: -moz-scrollbars-none; }
  .layout{
    height: 100%;min-width:1200px;margin: 0px auto;
    .back{
      display: block;width:80px; height:40px; line-height: 40px;text-align: center; position: fixed; left:20px; top:20px;
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
          position: absolute;left:1%;bottom:10%;height: 45%;width:98%;color:white!important;
        }
      }
      .btns{
        height:40px; line-height: 40px;color:#01A4AE;font-weight: bold;font-size: 26px;text-align: center;position: absolute;bottom: 20px;left:15%;
        .active{color:yellow;}
      }
    }
  }
</style>
