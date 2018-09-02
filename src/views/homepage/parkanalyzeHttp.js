import _http from '../../http/http.js'
import _ from 'underscore'
export default {
	/**
	 * 查询园区详情数据
	 * @param  {[type]} params    [description]
	 * @param  {[type]} onSuccess [description]
	 * @param  {[type]} onError   [description]
	 * @return {[type]}           [description]
	 */
	_QueryParkInfo: function (params,onSuccess,onError) {
    	_http.post("/itfparkinfo/searchDetail",params).then(res=>{
			onSuccess&&onSuccess(obj)
		}).catch(err=>{
			onError&&onError()
		})
    },
    /**
     * 查询园区车辆信息
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryParkCL: function (params,onSuccess,onError) {
    	_http.post("/itfparkinfo/searchCL",params).then(res=>{
    		if(res.success){
    			if(_.isArray(res.result)){
    				var obj = _.groupBy(res.result,'dataType')
    				var keys = _.keys(obj)
    				var data = {
    					axis:[],
    					traffic:[],
    					parking:[]
    				}
    				_.each(keys,function(key){
    					_.each(obj[key],function(v){
	    					data[key].push(v.dataValue)
	    				})
    				})
    				_.each(obj['traffic'],function(v){
    					data.axis.push(params.type == 'd'?v.dataTime.substr(5):v.dataTime)
    				})
    				console.log(data)
    				onSuccess&&onSuccess(data)
    			}else{
    				console.error('searchCL出参格式异常')
    			}
    		}else{
    			console.error(res.message)
    		}
		}).catch(err=>{
			onError&&onError()
		})
    },
    /**
     * 查询物业信息
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryWY: function(params,onSuccess,onError){
        _http.post("/itfparkinfo/searchWY",params).then(res=>{
            if(res.success){
                
            }else{
                console.error(res.message)
            }
        }).catch(err=>{
            onError&&onError()
        })
    }
}