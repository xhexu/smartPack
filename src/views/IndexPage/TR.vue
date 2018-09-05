<template>
  <div style="width:100%;height:100%">
    <div @click="openWindow" id="chart-tr" style="width: 100%" :style="{height:option.height+'px'}"></div>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart">
        <div id="tr-bigChart" style="width: 100%;height:100%"></div>
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
        this.sendHttpForFee('tr-bigChart')
      }else{
        this.isShowWindow = false
      }
    },
    initMap (obj,domId) {
      let dom = document.getElementById(domId)
      let barEcharts = echarts.init(dom)
      let options = this.getOption(obj)
      barEcharts.setOption(options)
      window.onresize = function(){
        barEcharts.resize()
      }
    },
    sendHttpForFee (domId) {
      let me = this
      busHttp._QueryWY({parkCode:'e',time:new Date().getFullYear()},function(data){
        if(_.isObject(data)){
          me.initMap(data,domId)
        }else{
          me.$message({
            message: '车辆信息返回数据异常',
            type: 'warning'
          })
        }
      },function(error){

      })
    },
    getOption (obj) {
      return {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['物业费', '租金', '出租率'],
              top:'5%',
              left:'15%',
              textStyle: {
                color: '#fff'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              show: false,
              boundaryGap: [0, 1]
          },
          yAxis: {
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
            name:'物业费',
            type:'bar',
            barWidth: '30%',
            data:obj.property,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 0,
                    [
                        {offset: 0, color: '#02F6FC'},
                        {offset: 0.5, color: '#0EC3DC'},
                        {offset: 1, color: '#1A90BD'}
                    ]
                ),
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }
          },{
            name:'租金',
            type:'bar',
            barWidth: '30%',
            data:obj.rent,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 0,
                    [
                        {offset: 0, color: '#EFFB01'},
                        {offset: 0.5, color: '#D7BD0D'},
                        {offset: 1, color: '#BB771A'}
                    ]
                ),
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }
          },{
            name:'出租率',
            type:'bar',
            barWidth: '30%',
            data:obj.letting,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 0,
                    [
                        {offset: 0, color: '#EFFB01'},
                        {offset: 0.5, color: '#D7BD0D'},
                        {offset: 1, color: '#BB771A'}
                    ]
                ),
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
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
.bigChart{
  position: fixed;
  width: 900px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 50%;
  z-index: 999;
  margin: -300px 0 0 -450px;
  background-color:rgba(0,0,0,0.7);
  padding: 10px;
}
.bigBg{
  z-index:888;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: rgba(220, 213, 213, 0.7);
}
</style>