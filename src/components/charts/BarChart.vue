<template>
  <div class="barChart">
  	<div class="echarts" :id="randomId"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import _ from 'underscore'

export default {
  name: 'BarChart',
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
      randomId: 'echarts-dom'+ new Date().getTime()+ Math.random()
    }
  },
  watch: {
      'option': {
        handler (cval, oval) {
          alert(1111111111111111111)
        },
        deep: true
      }
  },
  methods: {
    drawBarChart (option) {
      let $echartsDOM = document.getElementById(this.randomId)
      let barEcharts = echarts.init($echartsDOM)
      barEcharts.setOption(option)
    },
    checkAndSetOption () {
      let option = this.option
      if(_.isObject(option)){
        option = this.extendOption(option)
        this.drawBarChart(option)
      }else{
        console.error('图表入参异常')
      }
    },
    extendOption (option) {
      let baseOption = {
        backgroundColor: 'rgba(128, 128, 128, 0)',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [],
            top:20,
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
        series: [
            {
                name: '',
                type: 'bar',
                barWidth:10,
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
                },
                barGap: '10%',
                data: []
            },
            {
                name: '',
                type: 'bar',
                barWidth:10,
                data: [],
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
            }
        ]
      }
      let series = option.series
      if(option&&option.series){
        _.each(series,function(key,index){
          baseOption.series[index] = _.extend(baseOption.series[index],key)
        })
      }else{
        console.error('图表入参异常')
      }
      baseOption.yAxis.data = this.option.yAxis.data
      baseOption.legend.data = this.option.legend.data
      delete option.series
      delete option.yAxis
      delete option.legend
      _.extendOwn(baseOption,this.option)
      console.log(baseOption)
      return baseOption
    }
  },
  mounted () {
  	this.checkAndSetOption()
  }
}
</script>

<!-- 图表 -->
<style lang="scss" scoped>
.barChart{
  width: 100%;
  height:100%;
	.echarts{
		width: 100%;
		height:100%;
	}
}
</style>
