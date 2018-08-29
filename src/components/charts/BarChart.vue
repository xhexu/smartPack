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
      randomId: 'echarts-dom'+ new Date().getTime()+ Math.random()
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
      if(option&&option.series){
        let list = []
        baseOption.series.length = option.series.length
        _.each(option.series,function(key,index){
          list.push(_.extend(baseOption.series[index],key))
        })
        baseOption.series = list
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
