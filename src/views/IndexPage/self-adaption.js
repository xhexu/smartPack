/**
 * 浏览器变化,地图自适应大小
 * @type {Array}
 */
window.chartList = [] 
window.onresize = function(){
  if(window.chartList.length>0){
    window.chartList.forEach((obj)=>{
      obj.resize()
    })
  }
}