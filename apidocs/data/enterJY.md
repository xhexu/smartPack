####  企业经营数据 [#调试地址](http://wpms.eworld-online.com/swagger-ui.html#/itf-enter-info-controller/searchJYUsingPOST)

1. url
```
post :  /itfenterinfo/searchJY
```

2. 入参 
```
code : 企业编号 : 必填
time : 年份, 例如 2018    必填
```

3. 出参
```
dataTime : 月份
dataType :   income : 收入 , rate : 缴税  
dataValue : 数据的值

{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": [
    {
      "dataTime": "01",
      "dataType": "income",
      "dataValue": 5001
    },
    {
      "dataTime": "02",
      "dataType": "income",
      "dataValue": 2390
    },
    {
      "dataTime": "03",
      "dataType": "income",
      "dataValue": 3211
    },
    {
      "dataTime": "04",
      "dataType": "income",
      "dataValue": 2321
    },
    {
      "dataTime": "05",
      "dataType": "income",
      "dataValue": 4452
    },
    {
      "dataTime": "06",
      "dataType": "income",
      "dataValue": 5573
    },
    {
      "dataTime": "07",
      "dataType": "income",
      "dataValue": 7789
    },
    {
      "dataTime": "08",
      "dataType": "income",
      "dataValue": 8875
    },
    {
      "dataTime": "09",
      "dataType": "income",
      "dataValue": 8891
    },
    {
      "dataTime": "10",
      "dataType": "income",
      "dataValue": 9900
    },
    {
      "dataTime": "11",
      "dataType": "income",
      "dataValue": 10001
    },
    {
      "dataTime": "12",
      "dataType": "income",
      "dataValue": 12211
    },
    {
      "dataTime": "01",
      "dataType": "rate",
      "dataValue": 1000
    },
    {
      "dataTime": "02",
      "dataType": "rate",
      "dataValue": 478
    },
    {
      "dataTime": "03",
      "dataType": "rate",
      "dataValue": 642
    },
    {
      "dataTime": "04",
      "dataType": "rate",
      "dataValue": 464
    },
    {
      "dataTime": "05",
      "dataType": "rate",
      "dataValue": 890
    },
    {
      "dataTime": "06",
      "dataType": "rate",
      "dataValue": 1115
    },
    {
      "dataTime": "07",
      "dataType": "rate",
      "dataValue": 1558
    },
    {
      "dataTime": "08",
      "dataType": "rate",
      "dataValue": 1775
    },
    {
      "dataTime": "09",
      "dataType": "rate",
      "dataValue": 1778
    },
    {
      "dataTime": "10",
      "dataType": "rate",
      "dataValue": 1980
    },
    {
      "dataTime": "11",
      "dataType": "rate",
      "dataValue": 2000
    },
    {
      "dataTime": "12",
      "dataType": "rate",
      "dataValue": 2442
    }
  ]
}
```
