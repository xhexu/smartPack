#### 查询园区详情  [#调试地址](http://wpms.eworld-online.com/swagger-ui.html#/itf-park-info-controller/searchDetailUsingPOST_1)

1. url
```
post :  /itfparkinfo/searchDetail
```

2. 入参
```
code : 园区编号
```

3. 出参
- [园区实体](park.md)
```
{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": {
    "id": "c3a0959c16f840fa87228f3765e5862e",
    "createUser": "spuer_admin",
    "createTime": 1535699360000,
    "updateUser": "spuer_admin",
    "updateTime": 1535699360000,
    "code": "e",
    "parkName": "e通世界",
    "parkAddr": "上海市青浦区徐泾镇徐盈路100号",
    "prpEnterpriseName": "eeee",
    "prpRegTime": 1440604800000,
    "prpLinkmanName": "神秘先生",
    "prpLinkmanPhone": "13122223333",
    "parkPrincipalName": "黑哥",
    "parkPrincipalPhone": "12123542542",
    "parkEmail": "smxs@qq.com",
    "serviceTime": 1534953600000,
    "propertyType": "青铜",
    "floorArea": "100",
    "coveredArea": "200",
    "floorA": 12,
    "floorB": 14,
    "enterpriseIntro": "<p>这个企业好啊, 很牛的存在</p><p><img src=\"http://10.1.187.84:8072/wpms/e/2018/08/31/1535699360819_0.jpg\" alt=\"undefined\"><br></p>",
    "remark": null,
    "active": "Y"
  }
}
```
