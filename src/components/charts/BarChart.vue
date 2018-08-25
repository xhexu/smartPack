<template>
  <div class="barChart">
  	<div class="echarts" id="echarts-bar"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'BarChart',
  data () {
    return {}
  },
  method () {

  },
  beforeCreate () {

  },
  beforeMount () {

  },
  mounted () {
  	let $echartsDOM = document.getElementById('echarts-bar')
  	let barEcharts = echarts.init($echartsDOM)
  	let option = {
  		title: {
  			text: 'DEMO'
  		},
  		tooltip: {},
  		legend: {
  			data: ['xx']
  		},
  		xAxis: {
  			data: ['xx','aa','mm']
  		},
  		yAxis: {},
  		series: [{
  			name: '小路',
  			type: 'bar',
  			data: [10,23,32,33,50]
  		}]
  	}
  	barEcharts.setOption(option)
  },
  beforeUpdate () {

  },
  undated () {

  },
  beforeDestory () {

  },
  destoryed () {
    
  }
}
</script>

<!-- 图表 -->
<style lang="scss" scoped>
.barChart{
	.echarts{
		width: 100%;
		height:100%;
	}
}
</style>
