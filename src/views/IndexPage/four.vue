<template>
  <div class="chart">
    <img style="width: 100%" src="../../assets/top_bar.png"/>
    <div class="chart_t_bg"></div>
    <div class="trMap" @click="openWindow" id="chart-four"></div>
    <div class="chart_tip" v-if="false" v-text="info"></div>
    <div class="chart_b_bg"></div>
    <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" src="../../assets/top_bar.png"/>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <img style="width: 100%;position: absolute;left: 0;top: 8px" src="../../assets/top_bar.png"/>
        <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,.8);">
          <div id="bChart-four" style="width: 100%;height:100%"></div>
        </div>
        <img style="position: absolute;left: 0;bottom: 2px;width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" src="../../assets/top_bar.png"/>
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
      isShowWindow: false,
      info:'',
      chartRadius: window.innerWidth>1366?110:60,
      queryParams:{
        parkCode:'e',
        time:new Date().getFullYear()
      }
    }
  },
  methods: {
    openWindow () {
      if(!this.isShowWindow&&!this.info){
        this.isShowWindow = !this.isShowWindow
        this.sendHttpForLetting('bChart-four',{
            radius:160,
            title:{
              top:'4%'
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
      window.setChartList({key:domId,fn:barEcharts}) 
    },
    sendHttpForLetting (domId,option) {
      let me = this
      busHttp._QueryLetting(me.queryParams,function(data){
        if(_.isObject(data)){
          me.initMap(data,domId,option)
        }
      },function(error){
          me.info = '暂无数据'
          if(error){
            me.$message({
              message: error.message,
              type: 'warning'
            })
          }
      })
    },
    getOption (obj,option) {
      return {
        title : {
          text: '出租率',
          left:'5%',
          top:option&&option.hasOwnProperty('title')?option.title.top:'-2%',
          textStyle:{
            color:'#00E4FF'
          }
        },
        tooltip: {
          formatter: '{b}'
        },
        radar: [{
          name: {
            textStyle: {
                color: '#fffc00',
                borderRadius: 3,
                padding: [3, 5]
             }
          },
          indicator: (function (){
              let res = [],maxValue = _.max(obj.letting)+10
              for (var i = 1; i <= obj.axis.length; i++) {
                  res.push({text:i+'月',max:maxValue});
              }
              return res;
          })(),
          center: ['50%','50%'],
          radius: option?option.radius:this.chartRadius,
          axisLine:{
            show: true,
            lineStyle:{
              opacity:.1,
              color: '#fffc00'
            }
          },
          splitArea:{
            areaStyle:{
              color: ['#000']
            }
          },
          splitLine:{
            show: true,
            lineStyle:{
              opacity:.1,
              color: '#fffc00'
            }
          }
        }],
        series: [{
            type: 'radar',
            name:'出租率',
            lineStyle:{
              color:'#00E4FF'
            },
            label: {
              show: true,
              position: 'inside',
              color: '#000',
              fontSize: 12,
              formatter: '{c}%',
              backgroundColor:'#00E4FF',
              opacity:0.5,
              borderRadius:3,
              padding:[1,2],
              distance:10
            },
            lineStyle:{
              color:'#00E4FF',
              width:1
            },
            itemStyle: {
              color:'#fffc00'
            },
            data: [{
              value:obj.letting
            }]
        }]
      }
    }
  },
  mounted () {
    this.sendHttpForLetting('chart-four')
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width:100%;
  height:200px;
  position: relative;
  &_t_bg{
    width: 96%;
    height: 25px;
    background-image: linear-gradient(to bottom , rgba(49,49,49, 0.4), rgba(0, 0, 0, 0.1));
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 10px;
  }
  &_b_bg{
    width: 96%;
    height: 25px;
    background-image: linear-gradient(to bottom ,rgba(0, 0, 0, 0.1), rgba(49,49,49, 0.4));
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: -30px;
  }
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
  animation:bg_chart_in 1s;
}
@keyframes bg_chart_in{
  0%{transform: scale(0.2);opacity: 0;}
  100%{ transform: scale(1);opacity: 1;}
}
.bigBg{
  z-index:888;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background-color: rgba(0,0,0, 0.7);
  animation: bg_anim 1s;
  -moz-animation: bg_anim 1s; 
  -webkit-animation: bg_anim 1s;  
  -o-animation: bg_anim 1s;
}
@keyframes bg_anim{
  0%{opacity: 0;}
  100%{opacity: 1;}
}
.chart_tip{
  position: absolute;
  width: 100%;
  top: 50%;
  color:#00E4FF;
}
@media screen and (min-width: 1400px) { 
    .bigChart{
      width: 850px;
      height: 500px;
      margin: -250px 0 0 -400px;
    }
    .chart{
      width:100%;
      height:300px;
      &_b_bg{
        bottom: -40px;
      }
    }
}
</style>