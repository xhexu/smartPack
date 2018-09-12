<template>
  <div class="chart">
    <img style="width: 100%" src="../../assets/top_bar.png"/>
    <div class="trMap" @click="openWindow" id="chart-four"></div>
    <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" src="../../assets/top_bar.png"/>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../assets/top_bar.png"/>
        <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,1);">
          <div id="four-bigChart" style="width: 100%;height:100%"></div>
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
        let me = this
        setTimeout(()=>{
          me.initMap({},'four-bigChart')
        },200)
        
        // this.sendHttpForFee('tr-bigChart')
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
        title : {
            text: '出租率',
            left:'5%',
            top:'2%',
            textStyle:{
              color:'#00E4FF'
            }
        },
        legend: {
            data: ['line']
        },
        polar: {
            center: ['50%', '54%']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 1,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fffc00'
                }
            }
        },
        radiusAxis: {
            min: 0
        },
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#00E4FF',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            },
            data:[11,2,3,4,5,6,7,8,9,10,11,12]
        }],
        animationDuration: 2000
      }
    }
  },
  mounted () {
    this.initMap({},'chart-four')
    // this.sendHttpForFee('chart-tr')
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
}
.bigBg{
  z-index:888;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: rgba(0,0,0, 0.7);
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