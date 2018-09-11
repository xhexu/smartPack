<template>
  <div style="width:100%;height:100%">
    <div class="tlMap" @click="openWindow" id="chart-tl" ></div>
    <div class="bigBg" :class="{bgAnim:isShowWindow}" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart">
        <div id="tl-bigChart" style="width: 100%;height:100%"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import busHttp from './http.js'
import _ from 'underscore'

export default {
  name: 'TL',
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
        this.sendHttpForCar({type:'d',time:'2018'},'tl-bigChart')
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
    sendHttpForCar (item,domId) {
      let me = this
      let params = {
        parkCode:'e',
        type:item.type,
        time:item.time
      }
      busHttp._QueryParkCL(params,function(data){
        if(_.isObject(data)){//parking : 停车费,traffic : 车流量
          me.initMap(data,domId)
        }else{
          me.$message({
            message: '车辆信息返回数据异常',
            type: 'warning'
          })
        }
      })
    },
    getOption (obj) {
      let option =  {
          backgroundColor: this.isShowWindow?'rgba(0, 0, 0, 1)':'rgba(0, 0, 0, 0.7)',
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['车流量','停车费'],
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
            name:'车流量',
            type:'bar',
            barWidth: '30%',
            data:obj.traffic,
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
            name:'停车费',
            type:'bar',
            barWidth: '30%',
            data:obj.parking,
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
      return option
    }
  },
  mounted () {
    this.sendHttpForCar({type:'d',time:'2017'},'chart-tl')
  }
}
</script>

<style lang="scss" scoped>
.tlMap{
  width: 100%;
  height:100%;
}
.bigChart{
  position: fixed;
  width: 700px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 50%;
  z-index: 999;
  margin: -200px 0 0 -350px;
  background-color:rgba(0,0,0,0.7);
}
.bgAnim{
  opacity: 0.7 !important;
}
.bigBg{
  transition: all 1s ease-in;
  -webkit-transition:all 1s ease-in;
  z-index:888;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: rgb(220, 213, 213);
  opacity:0;
}
@media screen and (min-width: 1400px) { 
    .bigChart{
      width: 850px;
      height: 600px;
      margin: -300px 0 0 -400px;
    }
}
</style>