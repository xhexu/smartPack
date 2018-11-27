#### 园区-经营分析--物业费  [#调试地址](http://wpms.eworld-online.com/swagger-ui.html#/itf-park-info-controller/searchWYUsingPOST)

1. url
```
post :  /itfparkinfo/searchWY
```

2. 入参
```
parkCode : 园区编号 : 必填
time :时间参数, 年份,例如 2018   必填
```

3. 出参
```
-- 参数说明
1. dataTime :  月份
2. dataType : 类型  有五个值
        property : 物业费
        rent : 租金
        letting : 出租率
        rentArrearage : 租金欠费
        propertyArrearage : 物业欠费
3. dataValue : 数值

-- 出参示例
{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": [
    {
      "dataTime": "01",   // 月份
      "dataType": "letting",
      "dataValue": 233
    },
    {
      "dataTime": "02",
      "dataType": "letting",
      "dataValue": 234
    },
    {
      "dataTime": "03",
      "dataType": "letting",
      "dataValue": 235
    },
    {
      "dataTime": "04",
      "dataType": "letting",
      "dataValue": 236
    },
    {
      "dataTime": "05",
      "dataType": "letting",
      "dataValue": 237
    },
    {
      "dataTime": "06",
      "dataType": "letting",
      "dataValue": 238
    },
    {
      "dataTime": "07",
      "dataType": "letting",
      "dataValue": 239
    },
    {
      "dataTime": "08",
      "dataType": "letting",
      "dataValue": 240
    },
    {
      "dataTime": "09",
      "dataType": "letting",
      "dataValue": 241
    },
    {
      "dataTime": "01",
      "dataType": "property",
      "dataValue": 233
    },
    {
      "dataTime": "02",
      "dataType": "property",
      "dataValue": 234
    },
    {
      "dataTime": "03",
      "dataType": "property",
      "dataValue": 235
    },
    {
      "dataTime": "04",
      "dataType": "property",
      "dataValue": 236
    },
    {
      "dataTime": "05",
      "dataType": "property",
      "dataValue": 237
    },
    {
      "dataTime": "06",
      "dataType": "property",
      "dataValue": 238
    },
    {
      "dataTime": "07",
      "dataType": "property",
      "dataValue": 239
    },
    {
      "dataTime": "08",
      "dataType": "property",
      "dataValue": 240
    },
    {
      "dataTime": "09",
      "dataType": "property",
      "dataValue": 241
    },
    {
      "dataTime": "01",
      "dataType": "rent",
      "dataValue": 5993
    },
    {
      "dataTime": "02",
      "dataType": "rent",
      "dataValue": 5994
    },
    {
      "dataTime": "03",
      "dataType": "rent",
      "dataValue": 5995
    },
    {
      "dataTime": "04",
      "dataType": "rent",
      "dataValue": 5996
    },
    {
      "dataTime": "05",
      "dataType": "rent",
      "dataValue": 5997
    },
    {
      "dataTime": "06",
      "dataType": "rent",
      "dataValue": 5998
    },
    {
      "dataTime": "07",
      "dataType": "rent",
      "dataValue": 5999
    },
    {
      "dataTime": "08",
      "dataType": "rent",
      "dataValue": 6000
    },
    {
      "dataTime": "09",
      "dataType": "rent",
      "dataValue": 6001
    }
  ]
}
```
