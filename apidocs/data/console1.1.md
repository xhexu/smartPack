#### 园区-经营分析--车辆信息  [#调试地址](http://www.sesame.kim:8086/swagger-ui.html#/itf-park-info-controller/searchCLUsingPOST)

1. url
```
post :  /itfparkinfo/searchCL
```

2. 入参 
```
parkCode : 园区编号 : 必填
type : 查询类型, 年: y , 月 : m , 周:d  必填
time :时间参数, 年: 2018 , 月 : 2018-03 , 周:不用传
```

3. 入参示例
```
// 1. 年
parkCode=e&type=y&time=2018
// 2 月
parkCode=e&type=m&time=2018-03
// 3 周
parkCode=e&type=d
```

4. 出参
```
1. dataTime :  根据 参数type 的不同,表示不同的意思
         y : 表示月份 1-12
         m : 表示天 1-31
         d ; 表示天 : 值直接是日期: 例如 : 2018-08-29

2. dataType 有两个值 
        parking : 停车费
        traffic : 车流量

3. dataValue 这个就不解释了
 
{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": [
    {
      "dataTime": "01",
      "dataType": "parking",
      "dataValue": 65503
    },
    {
      "dataTime": "02",
      "dataType": "parking",
      "dataValue": 59990
    },
    {
      "dataTime": "03",
      "dataType": "parking",
      "dataValue": 67332
    },
    {
      "dataTime": "04",
      "dataType": "parking",
      "dataValue": 66075
    },
    {
      "dataTime": "05",
      "dataType": "parking",
      "dataValue": 69223
    },
    {
      "dataTime": "06",
      "dataType": "parking",
      "dataValue": 67905
    },
    {
      "dataTime": "07",
      "dataType": "parking",
      "dataValue": 71114
    },
    {
      "dataTime": "08",
      "dataType": "parking",
      "dataValue": 72075
    },
    {
      "dataTime": "01",
      "dataType": "traffic",
      "dataValue": 6696
    },
    {
      "dataTime": "02",
      "dataType": "traffic",
      "dataValue": 6874
    },
    {
      "dataTime": "03",
      "dataType": "traffic",
      "dataValue": 8525
    },
    {
      "dataTime": "04",
      "dataType": "traffic",
      "dataValue": 9165
    },
    {
      "dataTime": "05",
      "dataType": "traffic",
      "dataValue": 10416
    },
    {
      "dataTime": "06",
      "dataType": "traffic",
      "dataValue": 10995
    },
    {
      "dataTime": "07",
      "dataType": "traffic",
      "dataValue": 12307
    },
    {
      "dataTime": "08",
      "dataType": "traffic",
      "dataValue": 13268
    }
  ]
}
```
