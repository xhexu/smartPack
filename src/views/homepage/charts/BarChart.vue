<template>
  <div class="barChart">
  	<div class="echarts" :id="randomId"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import _ from 'underscore'
import _baseOption from './BaseOption.js'
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
      randomId: 'echarts-dom'+ new Date().getTime()+ Math.random(),
      series: [{
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
        },{
          name: '',
          type: 'bar',
          barWidth:10,
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
          },
          barGap: '10%',
          data: []
      },{
          name: '',
          type: 'bar',
          barWidth:10,
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
          },
          barGap: '10%',
          data: []
      }]
    }
  },
  watch: {
      'option': {
        handler (cval, oval) {
          if(_.has(cval,'series')){
            this.checkAndSetOption()
          }
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
      if(_.isObject(option)&&_.has(option,'series')){
        option = this.extendOption(option)
        this.drawBarChart(option)
      }else{
        console.error('图表入参格式错误')
      }
    },
    extendOption (option) {// 图例，坐标栏目，数据
      let baseOption = _baseOption
      let me = this
      if(option&&option.series){
        let list = []
        me.series.length = option.series.length

        _.each(option.series,function(key,index){
          list.push(_.extend(me.series[index],key))
        })

        baseOption.series = me.series
      }else{
        console.error('图表入参异常')
      }
      baseOption.yAxis.data = option.yAxis.data
      baseOption.legend.data = option.legend.data
      return baseOption
    }
  },
  mounted () {
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
