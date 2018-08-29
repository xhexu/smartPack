import echarts from 'echarts'

export default {
	/**
	 * 柱形图基本配置
	 * @type {Object}
	 */
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
        }
    ]
}