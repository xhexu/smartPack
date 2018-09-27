/**
 * 浏览器变化,地图自适应大小
 * @type {Array}
 */
import _ from 'underscore'

window.chartList = []
window.setChartList = function(obj){
	var index = _.findIndex(window.chartList,function(v){
		return obj.key == v.key
	})
	if(index==-1){
		window.chartList.push(obj)
	}
}
window.onresize = function(){
  if(window.chartList.length>0){
    window.chartList.forEach((obj)=>{
      obj.fn.resize()
    })
  }
}