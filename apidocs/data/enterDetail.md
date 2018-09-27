####  查询企业详情信息-包含图片  [#调试地址](http://wpms.eworld-online.com/swagger-ui.html#/itf-enter-info-controller/searchDetailUsingPOST)

1. url
```
post :  /itfenterinfo/searchDetail
```

2. 入参 
- 现在我只给企业编号为: A 的上传了图片, 你们可以去后台,上传图片
```
code : 企业编号 : 必填
```

3. 出参
- [企业实体](enter.md)
```
{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": {
    "id": "650048157bdc4954b8feceb1378b3c24",
    "createUser": "spuer_admin",
    "createTime": 1535780639000,
    "updateUser": "spuer_admin",
    "updateTime": 1535856518000,
    "code": "A",
    "enterpriseName": "A公司",
    "addr": "上海市青浦区华徐公路999号e通世界北区B座3层301A室",
    "parkCode": "e",
    "enterpriseIntro": "A公司好",
    "floor": "B",
    "floorCode": "1-01",
    "corporateName": "张三",
    "corporatePhone": "13112344321",
    "masterName": "陈一",
    "masterPhone": "13112344321",
    "email": "111@qq.com",
    "business": "文化艺术交流策划，设计、制作、代理、发布各类广告，会务服务，展览展示服务，翻译服务，摄影服务，礼仪服",
    "industryType": "文化",
    "regMoney": "1000",
    "offMoney": "1000",
    "regTime": 1470931200000,
    "staffCount": 100,
    "issuing": null,
    "organizing": "上海市市场监督管理局",
    "idCode": "2202222221",
    "taxNumber": "2202222221",
    "leaseStartTime": 1430496000000,
    "leaseEndTime": 1554134400000,
    "freeStartTime": 1554220800000,
    "freeEndTime": 1554307200000,
    "rentType": "年度",
    "rentPrice": "25",
    "rentMoney": "300",
    "freeStopCount": 1,
    "rentStopCount": 4,
    "imgs": "0b0d5cf5c5a0413aa43dca462e641aff,6aeb5aade75b4492b5549f0e3413006e,95cc066ba9b440e39239cb23b3ed4742",
    "remark": null,
    "active": "Y",
    "imgList": [
      {
        "id": "95cc066ba9b440e39239cb23b3ed4742",
        "createUser": "spuer_admin",
        "createTime": 1535856490000,
        "updateUser": null,
        "updateTime": null,
        "name": "c.jpg",
        "url": "http://10.1.187.84:8072/wpms/f/2018/09/02/1535856492604_c.jpg",
        "type": null,
        "exId": null
      },
      {
        "id": "6aeb5aade75b4492b5549f0e3413006e",
        "createUser": "spuer_admin",
        "createTime": 1535856487000,
        "updateUser": null,
        "updateTime": null,
        "name": "b.jpg",
        "url": "http://10.1.187.84:8072/wpms/f/2018/09/02/1535856489947_b.jpg",
        "type": null,
        "exId": null
      },
      {
        "id": "0b0d5cf5c5a0413aa43dca462e641aff",
        "createUser": "spuer_admin",
        "createTime": 1535856482000,
        "updateUser": null,
        "updateTime": null,
        "name": "a.jpg",
        "url": "http://10.1.187.84:8072/wpms/f/2018/09/02/1535856485028_a.jpg",
        "type": null,
        "exId": null
      }
    ]
  }
}
```
