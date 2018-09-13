<template>
  <div class="chart">
    <img style="width: 100%" src="../../assets/top_bar.png"/>
    <div class="trMap" @click="openWindow" id="chart-tr"></div>
    <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" src="../../assets/top_bar.png"/>
    <div class="chartBg" v-show="isShowWindow" @click="openWindow"></div>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <div class="btns">
          <div class="btns_left">同比</div>
          <div class="btns_right">环比</div>  
        </div>
        <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../assets/top_bar.png"/>
        <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,1);">
          <div id="tr-bigChart" style="width: 100%;height:100%"></div>
        </div>
        <img style="position: absolute;left: 0;bottom: 0;width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" src="../../assets/top_bar.png"/>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import busHttp from './http.js'
import _ from 'underscore'

export default {
  name: 'TR',
  props: {
    option: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isShowWindow: false
    }
  },
  methods: {
    openWindow () {
      if(!this.isShowWindow){
        this.isShowWindow = !this.isShowWindow
        this.sendHttpForFee('tr-bigChart',{
          title:{
            text:'2018年度',
            top: '6%'
          }
        })
      }else{
        this.isShowWindow = false
      }
    },
    initMap (obj,domId,option) {
      let dom = document.getElementById(domId)
      let barEcharts = echarts.init(dom)
      let options = this.getOption(obj,option)
      barEcharts.setOption(options)
      window.chartList.push(barEcharts) 
    },
    sendHttpForFee (domId,option) {
      let me = this
      busHttp._QueryWY({parkCode:'e',time:new Date().getFullYear()},function(data){
        if(_.isObject(data)){
          me.initMap(data,domId,option)
        }else{
          me.$message({
            message: '车辆信息返回数据异常',
            type: 'warning'
          })
        }
      },function(error){

      })
    },
    getOption (obj,option) {
      return {
          title: {
              text: option?option.title.text:'租金信息',
              left:'5%',
              top:option?option.title.top:'2%',
              textStyle:{
                color:'#00E4FF'
              }
          },
          backgroundColor: 'rgba(0, 0, 0, 0)',
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['收缴率','租金金额(万)'],
              top:'15%',
              left:'5%',
              textStyle: {
                color: '#fff'
              },
              selectedMode:false
          },
          grid: {
              left: '1%',
              bottom: '3%',
              containLabel: true
          },
          yAxis: {
              type: 'value',
              show: false,
              boundaryGap: [0, 1]
          },
          xAxis: {
              type: 'category',
              data : obj.axis,
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              splitLine: {
                  show: false
              },
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
              }
          },
          series : [{
            name:'收缴率',
            type:'line',
            barWidth: '30%',
            data:obj.letting,
            itemStyle: {
              normal: {
                color: '#fffc00',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }
          },{
            name:'租金金额(万)',
            type:'bar',
            barWidth: '30%',
            data:obj.rent,
            itemStyle: {
              normal: {
                color:'#00E4FF',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }
          }]
      }
    }
  },
  mounted () {
    this.sendHttpForFee('chart-tr')
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width:100%;
  height:200px;
}
.trMap{
  width: 100%;
  height:100%;
}
.bigChart{
  position: relative;
  width: 700px;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 50%;
  z-index: 999;
  margin: -225px 0 0 -350px;
  padding: 10px;
  .btns{
    position:absolute;
    right: 50px;
    top:30px;
    z-index:1000;
    div {
      display: inline-block;
      background-color: #00E4FF;
      padding: 1px 5px;
      font-size: 14px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}
.chartBg{
  z-index:888;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: rgba(0,0,0, 0.7);
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
}
.bigBg{
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  z-index:889;
}
@media screen and (min-width: 1400px) { 
    .bigChart{
      width: 850px;
      height: 600px;
      margin: -300px 0 0 -400px;
    }
    .chart{
      width:100%;
      height:350px;
    }
}
</style>