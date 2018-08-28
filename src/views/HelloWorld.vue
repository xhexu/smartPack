<template>
  <div class="echart">
    <!-- <bar-chart :option="option"></bar-chart> -->
    <card :option="card" :chart="option"></card>
  </div>
</template>

<script>
import BarChart from '../components/charts/BarChart.vue'
import Card from './homepage/Card.vue'
import echarts from 'echarts'

export default {
  name: 'HelloWorld',
  data () {
    return {
      card: {
        title:'测试',
        position: 'BL',
        item: {
          title: '本月'
        }
      },
      option: {}
    }
  },
  mounted () {
    let me = this
    setTimeout(function(){
      var option = {
        legend: {
          data:['2011', '2012']
        },
        yAxis: {
          data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [{
          name:'2011',
          data:[18203, 23489, 29034, 104970, 131744, 630230]
        },{
          name:'2012',
          data:[18203, 23489, 29034, 104970, 131744, 630230]
        }]  
      }
      
      me.option = me.$set(me.option, option)
      console.log(me.option)
    },4000)
  },
  components: {
    BarChart,
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .echart{
  width: 100%;
  height:400px;
 }
</style>
