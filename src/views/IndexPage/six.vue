<template>
  <div class="chart">
    <img style="width: 100%" src="../../assets/top_bar.png"/>
    <div class="trMap" @click="openWindow" id="chart-six"></div>
    <div class="chart_tip" v-if="info" v-text="info"></div>
    <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" src="../../assets/top_bar.png"/>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../assets/top_bar.png"/>
        <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,1);">
          <div id="six-bigChart" style="width: 100%;height:100%"></div>
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
      isShowWindow: false,
      info: ''
    }
  },
  methods: {
    openWindow () {
      if(!this.isShowWindow){
        this.isShowWindow = !this.isShowWindow
        let me = this
        setTimeout(()=>{
          me.initMap({
            series:{
              radius : [20, 110]
            }
          },'six-bigChart')
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
      window.chartList.push(barEcharts) 
    },
    sendHttpForFee (domId) {
      let me = this
      busHttp._QueryWY({parkCode:'e',time:new Date().getFullYear()},function(data){
        if(_.isObject(data)){
          me.initMap(data,domId)
        }else{
          me.info=  "暂无数据"
          if(error){
            me.$message({
              message: error.message,
              type: 'warning'
            })
          }
        }
      },function(error){

      })
    },
    getOption (obj) {
      
      var option =  {
        title : {
            text: '产业分类',
            left:'5%',
            top:'2%',
            textStyle:{
              color:'#00E4FF'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : true,
        series : [
            {
                name:'面积模式',
                type:'pie',
                radius : [10, 60],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                    {value:10, name:'物流'},
                    {value:5, name:'其它'},
                    {value:15, name:'金融'},
                    {value:25, name:'商务'},
                    {value:20, name:'信息科技'},
                    {value:35, name:'医疗'},
                    {value:30, name:'其它'},
                    {value:40, name:'服务'}
                ],
                color:['#308AD5','#3063D5','#0540C5','#308AD5','#0E9AB3','#3063D5','#0E9AB3','#3063D5']
            }
        ]
      }
      if(obj.hasOwnProperty('series')){
        option.series[0].radius = obj.series.radius
      }
      return option
    }
  },
  mounted () {
    this.initMap({},'chart-six')
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
  animation:bg_chart_in 1s;
  animation: bg_chart_in 1s;
  -moz-animation: bg_chart_in 1s; 
  -webkit-animation: bg_chart_in 1s;  
  -o-animation: bg_chart_in 1s;
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
      height: 600px;
      margin: -300px 0 0 -400px;
    }
    .chart{
      width:100%;
      height:350px;
    }
}
</style>