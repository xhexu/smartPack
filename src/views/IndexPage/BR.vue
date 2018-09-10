<template>
  <div style="width:100%;height:100%">
    <div class="brMap" @click="openWindow" id="chart-br"></div>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart">
        <div id="br-bigChart" style="width: 100%;height:100%"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import busHttp from './http.js'
import _ from 'underscore'

export default {
  name: 'BL',
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
        this.sendHttpForYoY({parkCode:'e',time:new Date().getFullYear()},'br-bigChart')
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
    sendHttpForYoY (item,domId) {
      let me = this
      let params = {
        parkCode:'e',
        time:new Date().getFullYear()
      }
      busHttp._QueryYoYForWY(params,function(data){
        if(_.isObject(data)){
          me.initMap(data,domId)
        }else{
          me.$message({
            message: '车辆信息返回数据异常',
            type: 'warning'
          })
        }
      })

      // busHttp._QueryQoQForWY(params,function(data){
      //   if(_.isObject(data)){
      //     me.initMap(data,domId)
      //   }else{
      //     me.$message({
      //       message: '车辆信息返回数据异常',
      //       type: 'warning'
      //     })
      //   }
      // })
    },
    getOption (obj) {
      let options = {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['物业费','租金','出租率'],
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
              type: 'category',
              boundaryGap: false,
              data: obj.axis,
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
              }
          },
          yAxis: {
              type: 'value',
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
                  },
                  formatter: '{value} %'
              }
          },
          series: [
              {
                  name:'物业费',
                  type:'line',
                  data:obj.property,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true, //开启显示
                        textStyle: { //数值样式
                          color: '#fff',
                          fontSize: 12
                        }
                      }
                    }
                  }
              },
              {
                  name:'租金',
                  type:'line',
                  data:obj.rent,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true, //开启显示
                        textStyle: { //数值样式
                          color: '#fff',
                          fontSize: 12
                        }
                      }
                    }
                  }
              },
              {
                  name:'出租率',
                  type:'line',
                  data:obj.letting,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true, //开启显示
                        textStyle: { //数值样式
                          color: '#fff',
                          fontSize: 12
                        }
                      }
                    }
                  }
              }
          ]
      }
      return options
    }
  },
  mounted () {
    this.sendHttpForYoY({time:'2018'},'chart-br')
  }
}
</script>

<style lang="scss" scoped>
.brMap{
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
@media screen and (min-width: 1400px) { 
    .bigChart{
      width: 850px;
      height: 600px;
      margin: -300px 0 0 -400px;
    }
}
</style>