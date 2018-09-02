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
    }
}