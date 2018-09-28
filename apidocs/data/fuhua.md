#### 孵化信息获取 [#调试地址](http://101.132.179.45:8086/swagger-ui.html#/itf-incubation-info-controller/listUsingPOST_1)

1. url
```
post :  /itfincubationinfo/list
```

2. 入参 
```
无
```

3. 出参
```
// type : 有4个, 这个接口最多只会返回4个结果, 4个类型一样一个
policy : 政策
activity : 活动
incubator : 孵化器
 guide : 指南

{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": [
    {
      "title": "第二个指南",
      "type": "policy",
      "content": "11111111111111111"
    },
    {
      "title": "第一个活动",
      "type": "activity",
      "content": "<p>第一个活动第一个活动</p><p><img src=\"http://127.0.0.1:8086/layuiadmin/layui/images/face/13.gif\" alt=\"[偷笑]\"><img src=\"http://127.0.0.1:8086/layuiadmin/layui/images/face/14.gif\" alt=\"[亲亲]\"><br></p><p><img src=\"http://10.1.187.84:8072/wpms/e/2018/09/02/1535860634589_a.jpg\" alt=\"undefined\"><br></p>"
    },
    {
      "title": "第一个孵化器",
      "type": "incubator",
      "content": "<p>第一个孵化器第一个孵化器第一个孵化器第一个孵化器</p>"
    },
    {
      "title": "第一个指南",
      "type": "guide",
      "content": "<p>第一个指南第一个指南第一个指南第一个指南</p>"
    }
  ]
}
```
