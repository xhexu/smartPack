####  查询所有的企业信息  [#调试地址](http://wpms.eworld-online.com/swagger-ui.html#/itf-enter-info-controller/listUsingPOST)

1. url
```
post :  /itfenterinfo/list
```

2. 入参 
```
parkCode : 园区编号 : 必填
```

3. 出参
- [企业实体](enter.md)
```
{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": [
    {
      "id": "881883df27114c62826af2ac0c9e6c5e",
      "createUser": "spuer_admin",
      "createTime": 1535780641000,
      "updateUser": "spuer_admin",
      "updateTime": 1535780641000,
      "code": "L",
      "enterpriseName": "L公司",
      "addr": "上海市青浦区华徐公路999号e通世界北区A座3层301A室",
      "parkCode": "e",
      "enterpriseIntro": "L公司好",
      "floor": "A",
      "floorCode": "5-01",
      "corporateName": "周四",
      "corporatePhone": "13112344321",
      "masterName": "胡三",
      "masterPhone": "13112344321",
      "email": "aa@/com",
      "business": "电力电气设备、机电设备、高低压电气设备、仪器仪表、电子产品的制造、开发、销售；电力工程设计、施工、安装；机电产品、金属材料销售。以",
      "industryType": "金融",
      "regMoney": "1000",
      "offMoney": "1000",
      "regTime": 1470931200000,
      "staffCount": 111,
      "issuing": null,
      "organizing": "上海市市场监督管理局",
      "idCode": "2202222221",
      "taxNumber": "2202222221",
      "leaseStartTime": 1431446400000,
      "leaseEndTime": 1555084800000,
      "freeStartTime": null,
      "freeEndTime": null,
      "rentType": "年度",
      "rentPrice": "25",
      "rentMoney": "300",
      "freeStopCount": 1,
      "rentStopCount": 4,
      "imgs": null,
      "remark": null,
      "active": "Y",
      "imgList": null
    },
    {},{},{}
  ]
}
```
