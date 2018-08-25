import BarChartComponent from './charts/BarChart.vue'

export default {
	BarChart: {
		install: function(Vue){
			Vue.component('BarChart',BarChartComponent)
		}
	}
}