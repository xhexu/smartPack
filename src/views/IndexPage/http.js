import _http from '../../http/http.js'
import _ from 'underscore'


export default {
    /**
     * 查询园区车辆信息 (左上)
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryParkCL: function (params,onSuccess,onError) {
    	_http.post("/itfparkinfo/searchCL",params).then(res=>{
    		if(res.success){
    			if(_.isArray(res.result)&&res.result.length>0){
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
    				onSuccess&&onSuccess(data)
    			}else{
    				onError&&onError()
    			}
    		}else{
    			console.error(res.message)
    		}
		}).catch(err=>{
            console.error(err)
			onError&&onError(err)
		})
    },
    /**
     * 查询物业费，租金，出租率（右上）
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryWY: function(params,onSuccess,onError){
        _http.post("/itfparkinfo/searchWY",params).then(res=>{
            if(res.success){
                if(_.isArray(res.result)){
                    var obj = _.groupBy(res.result,'dataType')
                    var keys = _.keys(obj)
                    var data = {
                        axis:[],
                        property:[], //物业费
                        rent:[],  //租金
                        letting:[] //出租率
                    }
                    _.each(keys,function(key){
                        _.each(obj[key],function(v){
                            data[key].push(v.dataValue)
                        })
                    })
                    _.each(obj['property'],function(v){
                        data.axis.push(v.dataTime)
                    })
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
    //同比计算方法
    _YoyALG: function (nowYearLst,lastYearLst,onSuccess){
        var resultObj = {}
        let keys = _.keys(nowYearLst)
        _.each(keys,function(key){
            let lstA = nowYearLst[key]
            let lstB = lastYearLst[key]
            resultObj[key] = []
            _.each(lstA,function(v){
                let valueA = v.dataValue
                let valueB =  ''
                let obj = _.find(lstB,function(b){
                    return v.dataTime == b.dataTime
                })
                if(obj){
                    valueB = obj.dataValue
                    let value = ((valueA-valueB)/valueB).toFixed(2)
                    resultObj[key].push(+value)
                }
            })
        })
        onSuccess&&onSuccess(resultObj)
    },
    //环比计算方法
    _QoQALG: function (nowYearLst,lastYearLst,onSuccess){
        let keys = _.keys(nowYearLst),resultObj = {}
        _.each(keys,function(key){
            let lstA = nowYearLst[key]
            let lstB = lastYearLst[key]
            resultObj[key] = []
            _.each(lstA,function(v,index){
                let valueA = v.dataValue
                let valueB =  ''
                if(v.dataTime=='01'){
                    let obj = _.find(lstB,function(b){
                        return b.dataTime == '12'
                    })
                    if(obj){
                        valueB = obj.dataValue
                    }
                }else{
                    valueB = lstB[index-1].dataValue
                }
                let value = ((valueA-valueB)/valueB).toFixed(3)
                resultObj[key].push(+value)
            })
        })
        onSuccess&&onSuccess(resultObj)
    },

    /**
     * 图表请求
     * @param  {[type]} url       [description]
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    queryLst: function (url,params,onSuccess,onError){
        _http.post(url,params).then(res=>{
            if(res.success){
                if(_.isArray(res.result)){
                    var obj = _.groupBy(res.result,'dataType')
                    var keys = _.keys(obj)
                    var data = {
                        axis: []
                    }
                    _.each(keys,function(key){
                        data[key] = obj[key]
                    })
                    _.each(obj[keys[0]],function(v){
                        data.axis.push(v.dataTime)
                    })
                    onSuccess&&onSuccess(data)
                }
            }
        }).catch(err=>{
            onError&&onError()
        })
    }, 
        
    /**
     * 查询同比数据:车流量，物业费(左下)
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryYoY: function(params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst("/itfparkinfo/searchCL",params,function(nowLst){
            nowYearLst = nowLst
            resultObj.axis = nowLst.axis
            delete nowLst.axis
            params.time = +params.time-1
            me.queryLst("/itfparkinfo/searchCL",params,function(lst){
                lastYearLst = lst
                me._YoyALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    onSuccess&&onSuccess(resultObj)
                })
            })
        },onError)
    },
    /**
     * 查询同比数据:出租率(右下)
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryYoYForWY: function(params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst("/itfparkinfo/searchWY",params,function(nowLst){
            nowYearLst = nowLst
            resultObj.axis = nowLst.axis
            delete nowLst.axis
            params.time = +params.time-1
            me.queryLst("/itfparkinfo/searchWY",params,function(lst){
                lastYearLst = lst
                me._YoyALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    onSuccess&&onSuccess(resultObj)
                })
            })
        },onError)
    },
    
    /**
     * 查询环比（左下）
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryQoQ: function(params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst("/itfparkinfo/searchCL",params,function(nowLst){
            nowYearLst = nowLst
            resultObj.axis = nowLst.axis
            delete nowLst.axis
            params.time = +params.time-1
            me.queryLst("/itfparkinfo/searchCL",params,function(lst){
                lastYearLst = lst
                me._QoQALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    onSuccess&&onSuccess(resultObj)
                })
            })
        })
    },

    /**
     * 查询环比:出租率,物业费（右下）
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryQoQForWY: function(params,onSuccess,onError){
        var me = this, nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst("/itfparkinfo/searchWY",params,function(nowLst){
            nowYearLst = nowLst
            resultObj.axis = nowLst.axis
            delete nowLst.axis
            params.time = +params.time-1
            me.queryLst("/itfparkinfo/searchWY",params,function(lst){
                lastYearLst = lst
                me._QoQALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    onSuccess&&onSuccess(resultObj)
                })
            })
        })
    }
}