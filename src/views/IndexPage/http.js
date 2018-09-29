import _http from '../../http/http.js'
import _ from 'underscore'


export default {
    /**
     * 产业分类
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryGLCS:function (params,onSuccess,onError) {
        _http.post("/itfenterinfo/cyTypeData",params).then(res=>{
            var data = []
            if(res.success){
                 if(res.result&&res.result.length>0){
                    _.each(res.result,(v,i)=>{
                        data.push({
                            value:v.count,
                            name:v.type+" "+v.rate+"%"
                        })
                    })
                    onSuccess&&onSuccess(data)
                    return
                 }
            }
            onError&&onError(res)
        }).catch(err=>{
            onError&&onError(err)
        })
    },
    /**
     * 查询园区:车流量，停车费
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryParkCL: function (params,onSuccess,onError) {
    	_http.post("/itfparkinfo/searchCL",params).then(res=>{
            var data = {
                axis:[],
                traffic:[],
                parking:[]
            }
    		if(res.success){
    			if(_.isArray(res.result)&&res.result.length>0){
    				var obj = _.groupBy(res.result,'dataType')
    				var keys = _.keys(obj)
    				_.each(keys,function(key){
    					_.each(obj[key],function(v){
	    					data[key].push(v.dataValue)
	    				})
    				})
    				_.each(obj['traffic'],function(v){
    					data.axis.push(params.type == 'd'?v.dataTime.substr(5):v.dataTime)
    				})
                    onSuccess&&onSuccess(data)
                    return
    			}   
    		}
            onError&&onError()
		}).catch(err=>{
			onError&&onError(err)
		})
    },
    /**
     * 查询出租率
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryLetting: function(params,onSuccess,onError){
        _http.post("/itfparkinfo/searchWY",params).then(res=>{
            var data = {
                axis:[],
                letting:[] //出租率
            }
            if(res.success){
                if(_.isArray(res.result)){
                    var obj = _.groupBy(res.result,'dataType')
                    if(_.has(obj,"letting")){
                        _.each(obj["letting"],function(v){
                            data["letting"].push(v.dataValue)
                        })
                        _.each(obj['letting'],function(v){
                            data.axis.push(v.dataTime)
                        })
                    }
                    onSuccess&&onSuccess(data)
                    return
                }
            }
            onError&&onError(res)
        }).catch(err=>{
            onError&&onError(err)
        })
    },
    /**
     * 查询租金，收缴率/查询物业，收缴率
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryRent: function(data,params,onSuccess,onError){
        let me = this
        _http.post("/itfparkinfo/searchWY",params).then(res=>{
            if(res.success){
                if(_.isArray(res.result)){
                    var obj = _.groupBy(res.result,'dataType')
                    let keys = _.keys(data)
                    _.each(keys,function(key){
                        _.each(obj[key],function(v){
                            data[key].push(v.dataValue)
                        })
                    })
                    data.axis = []
                    data.rate = []
                    data.rate = me._CalcRate(data[keys[0]],data[keys[1]])
                    _.each(obj['rent'],function(v){
                        data.axis.push(v.dataTime)
                    })
                    console.log(data)
                    onSuccess&&onSuccess(data)
                }else{
                    console.error('searchCL出参格式异常')
                }
            }else{
                onError&&onError(err)
            }
        }).catch(err=>{
            onError&&onError()
        })
    },
    /**
     * 计算收缴率1
     * @param  {[type]} listA [description]
     * @param  {[type]} ListB [description]
     * @return {[type]}       [description]
     */
    _CalcRate: function(listA,listB){
        let result = []
        _.each(listA,(v,index)=>{
            result.push(Math.round(v/(listB[index]+v)*100))
        })
        return result
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
                    let value = ((valueA-valueB)/valueA).toFixed(2)
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
                let value = ((valueA-valueB)/valueA).toFixed(3)
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
            }else{
                onError&&onError(res)
            }
        }).catch(err=>{
            onError&&onError()
        })
    }, 
        
    /**
     * 查询同比数据
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryYoY: function(url,params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst(url,params,function(nowLst){
            nowYearLst = nowLst
            resultObj.axis = nowLst.axis
            delete nowLst.axis
            params.time = +params.time-1
            me.queryLst(url,params,function(lst){
                lastYearLst = lst
                me._YoyALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    onSuccess&&onSuccess(resultObj)
                })
            },onError)
        },onError)
    },
    /**
     * 查询同比：租金/物业费同环比
     * @param  {[type]} url       [description]
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryYoYForRent: function(data,url,params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst(url,params,function(nowLst){
            let keys = _.keys(data)
            _.each(keys,(key)=>{
                nowYearLst[key] = nowLst[key]
            })
            resultObj.axis = nowLst.axis
            params.time = +params.time-1
            me.queryLst(url,params,function(lst){
                _.each(keys,(key)=>{
                    lastYearLst[key] = lst[key]
                })
                me._YoyALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    console.log(resultObj)
                    onSuccess&&onSuccess(resultObj)
                })
            },onError)
        },onError)
    },

    /**
     * 查询环比数据
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryQoQ: function(url,params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst(url,params,function(nowLst){
            nowYearLst = nowLst
            resultObj.axis = nowLst.axis
            delete nowLst.axis
            params.time = +params.time-1
            me.queryLst(url,params,function(lst){
                lastYearLst = lst
                me._QoQALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    onSuccess&&onSuccess(resultObj)
                })
            },onError)
        },onError)
    },
    /**
     * 查询环比数据：租金/物业费同环比
     * @param  {[type]} params    [description]
     * @param  {[type]} onSuccess [description]
     * @param  {[type]} onError   [description]
     * @return {[type]}           [description]
     */
    _QueryQoQForRent: function(data,url,params,onSuccess,onError){
        var me = this
        var nowYearLst = {},lastYearLst = {}, resultObj = {}
        me.queryLst(url,params,function(nowLst){
            let keys = _.keys(data)
            _.each(keys,(key)=>{
                nowYearLst[key] = nowLst[key]
            })
            resultObj.axis = nowLst.axis
            params.time = +params.time-1
            me.queryLst(url,params,function(lst){
                _.each(keys,(key)=>{
                    lastYearLst[key] = lst[key]
                })
                me._QoQALG(nowYearLst,lastYearLst,function(obj){
                    resultObj = _.extend(resultObj,obj)
                    console.log(resultObj)
                    onSuccess&&onSuccess(resultObj)
                })
            },onError)
        },onError)
    }
}