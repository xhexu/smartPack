<template>
  <div class="chart">
    <img style="width: 100%" src="../../assets/top_bar.png"/>
    <div class="chart_t_bg"></div>
    <div class="trMap" @click="openWindow" id="chart-two"></div>
    <div class="chart_tip" v-if="info" v-text="info"></div>
    <div class="chart_b_bg"></div>
    <img style="width: 100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);bottom:45%;" src="../../assets/top_bar.png"/>
    <div class="bigBg" v-show="isShowWindow" @click="openWindow">
      <div class="bigChart" @click.stop>
        <div class="btns">
          <div v-bind:class="{'activeClass':isActive=='y'}" @click="clickBtn('y')">同比</div>
          <div v-bind:class="{'activeClass':isActive=='q'}" @click="clickBtn('q')">环比</div>  
        </div>
        <img style="width: 100%;position: absolute;left: 0;top: 0" src="../../assets/top_bar.png"/>
        <div style="width:99%;height:100%;margin: 0 auto;background-color:rgba(0,0,0,.8);">
          <div id="bChart-two" style="width: 100%;height:100%"></div>
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
let now_year = new Date().getFullYear();
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
      isActive: '',
      dataObj:{
        property :[],  //物业费
        propertyArrearage :[]//物业欠费
      },
      queryParams:{
        parkCode:'e',
        time:now_year
      }
    }
  },
  methods: {
     initData () {
      this.isActive = ''
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
      me.initData()
      me.isActive = flag
      flag=='y'?(()=>{
        busHttp._QueryYoYForRent(me.dataObj,"/itfparkinfo/searchWY",{parkCode:'e',time:now_year},(res)=>{
          me.initMap(res,"bChart-two",{
            title:{
              text:now_year+'年度',
              top: '4%'
            },
            series:[{
              type:'line',
              backgroundColor:'rgba(0,0,0,0)',
              color:'#fffc00'
            },{
              type:'line',
              formatter:'{c}%'
            }],
            yAxis:{
              boundaryGap:[0,1]
            },
            tooltip:{
              formatter:'{a0}:{c0}%<br/>{a1}:{c1}%'
            }
          })
        },(error)=>{
          me.errorEvent(error)
        })
      })():(()=>{
        busHttp._QueryQoQForRent(me.dataObj,"/itfparkinfo/searchWY",{parkCode:'e',time:now_year},(res)=>{
          me.initMap(res,"bChart-two",{
            title:{
              text:now_year+'年度',
              top: '4%'
            },
            series:[{
              type:'line',
              formatter:'{c}%'
            },{
              type:'line',
              formatter:'{c}%'
            }],
            yAxis:{
              boundaryGap:[0,1]
            },
            tooltip:{
              formatter:'{a0}:{c0}%<br/>{a1}:{c1}%'
            }
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
        this.sendHttpForFee('bChart-two',{
          title:{
            text:now_year+'年度',
            top: '4%'
          },
          series:[{
            type:'line',
            backgroundColor:'#fffc00',
            color:'#000'
          },{
            type:'bar'
          }],
          tooltip:{
            formatter:'{a0}:{c0}<br/>{a1}:{c1}%'
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
    sendHttpForFee (domId,option) {
      let me = this
      busHttp._QueryRent(me.dataObj,{parkCode:'e',time:now_year},function(data){
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
      let op = {
          title: {
              text: option?option.title.text:'物业费信息',
              left:'5%',
              top:option?option.title.top:'-2%',
              textStyle:{
                color:'#00E4FF'
              }
          },
          backgroundColor: 'rgba(0, 0, 0, 0)',
          tooltip: {
              trigger: 'axis',
              formatter:option?option.tooltip.formatter:'{a0}:{c0}<br/>{a1}:{c1}%',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['收缴率','物业费金额(万元)'],
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
              boundaryGap: [0, 0.2]
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
            data:obj.rate,
            itemStyle: {
              color: '#fffc00'
            },
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              color: option?option.series[0].color:'#000',
              fontSize: 12,
              padding:[2,2],
              formatter:'{c}%',
              backgroundColor:option?option.series[0].backgroundColor:'#fffc00',
              borderRadius:3     
            }
          },{
            name:'物业费金额(万元)',
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
                  },
                  formatter:option?option.series[1].formatter:'{c}'   
                }
              }
            }
          }]
      }
      if(option&&_.has(option,"yAxis")){
        op.yAxis[1].boundaryGap = option.yAxis.boundaryGap
      }
      return op
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
  &_t_bg{
    width: 96%;
    height: 25px;
    background-image: linear-gradient(to bottom , rgba(62, 62, 62, 0.4), rgba(0, 0, 0, 0.1));
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 10px;
  }
  &_b_bg{
    width: 96%;
    height: 25px;
    background-image: linear-gradient(to bottom ,rgba(0, 0, 0, 0.1), rgba(62, 62, 62, 0.4));
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
      &_b_bg{
        bottom: -40px;
      }
    }
}
</style>
