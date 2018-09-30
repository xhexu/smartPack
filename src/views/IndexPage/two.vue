<template>
  <div class="chart">
    <img style="width: 100%" src="../../assets/top_bar.png"/>
    <div class="trMap" @click="openWindow" id="chart-two"></div>
    <div class="chart_tip" v-if="info" v-text="info"></div>
    <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" src="../../assets/top_bar.png"/>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <div class="btns">
          <div v-bind:class="{'activeClass':isActive=='y'}" @click="clickBtn('y')">同比</div>
          <div v-bind:class="{'activeClass':isActive=='q'}" @click="clickBtn('q')">环比</div>  
        </div>
        <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../assets/top_bar.png"/>
        <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,1);">
          <div id="two-bigChart" style="width: 100%;height:100%"></div>
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
      info:"",
      isActive: 'y',
      dataObj:{
        property :[],  //物业费
        propertyArrearage :[]//物业欠费
      },
      queryParams:{
        parkCode:'e',
        time:new Date().getFullYear()
      }
    }
  },
  methods: {
     initData () {
      this.dataObj = {
        property :[],  //物业费
        propertyArrearage :[]//物业欠费
      },
      this.queryParams = {
        parkCode:'e',
        time:new Date().getFullYear()
      }
    },
     clickBtn (flag) {
      let me = this
      me.isActive = flag
      me.initData()
      flag=='y'?(()=>{
        busHttp._QueryYoYForRent(me.dataObj,"/itfparkinfo/searchWY",me.queryParams,(res)=>{
          me.initMap(res,"two-bigChart",{
            title:{
              text:'2018年度',
              top: '6%'
            },
            series:[{
              type:'line'
            },{
              type:'line'
            }]
          })
        },(error)=>{
          me.errorEvent(error)
        })
      })():(()=>{
        busHttp._QueryQoQForRent(me.dataObj,"/itfparkinfo/searchWY",me.queryParams,(res)=>{
          me.initMap(res,"two-bigChart",{
            title:{
              text:'2018年度',
              top: '6%'
            },
            series:[{
              type:'line'
            },{
              type:'line'
            }]
          })
        },(error)=>{
          me.errorEvent(error)
        })
      })()
    },
    errorEvent (error) {
      this.info = "暂无数据"
      if(error){
        this.$message({
          message: error.message,
          type: 'warning'
        })
      }
    },
    openWindow () {
      if(!this.isShowWindow){
        this.isShowWindow = !this.isShowWindow
        this.initData()
        this.clickBtn('y')
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
    sendHttpForFee (domId,option) {
      let me = this
      busHttp._QueryRent(me.dataObj,me.queryParams,function(data){
        if(_.isObject(data)){
          me.initMap(data,domId,option)
        }
      },function(error){
          me.info = "暂无数据"
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
          title: {
              text: option?option.title.text:'物业费',
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
              data: ['收缴率','物业费金额(元)'],
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
          yAxis: [{
              type: 'value',
              show: false,
              boundaryGap: [0, 1]
          },{
              type: 'value',
              show: false,
              boundaryGap: [0, 1]
          }],
          xAxis: [{
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
          },{
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
                  show: false,
                  textStyle: {
                      color: '#fff'
                  }
              }
          }],
          series : [{
            name:'收缴率',
            type:'line',
            barWidth: '30%',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:obj.rate||obj.propertyArrearage,
            itemStyle: {
              normal: {
                color: '#fffc00',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fffc00',
                    fontSize: 12
                  },
                  formatter:'{c}%'   
                }
              }
            }
          },{
            name:'物业费金额(元)',
            type:option?option.series[1].type:'bar',
            barWidth: '30%',
            data:obj.property,
            itemStyle: {
              normal: {
                color:'#00E4FF',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#00E4FF',
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
    this.sendHttpForFee('chart-two')
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width:100%;
  height:200px;
  position: relative;
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
      background-color:#7bbac7;
      color:#000;
      padding: 1px 10px;
      font-size: 14px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
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
.activeClass{
  background-color: #00E4FF !important;
  color:#fff !important;
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
    }
}
</style>