### 接口文档返回码格式
- 我在这里统一规范下, 后面的接口里就不写这些了
```
{
  success:  true or false  //  当 true 时, 接口操作成功, false : 接口异常,比如说参数校验失败等
  exceptionType: "", //  异常类型, 一般不用管, success 为 falses时才会有
  errorCode: "",   // 异常码, 一般不用管, success 为 falses时才会有
  message: "xxxxxxxx",  // 异常 文字描述,, success 为 falses时才会有
  result: null  // 结果, 一般是json格式的数据, 具体按实际接口来
}
```
- 测试服务器地址 : http://wpms.eworld-online.com
- 后台测试账号 systemadmin/123456
- swagger-ui 地址 : http://wpms.eworld-online.com/swagger-ui.html

#### 实体信息
-  [园区实体](data/park.md)
-  [企业实体](data/enter.md)

#### 用户登录

- 1.1 [判断邮件在系统中是否存在](user/vifemail.md)
- 1.2 [发送邮件](user/sendEmail.md)
- 1.3 [注册](user/reg.md)
- 1.4 [登录](user/login.md)
- 1.5 [测试登录后的接口](user/test.md)
- 1.6 [页面权限控制](user/auth.md)

####  园区

- 2.1 [查询园区详情](data/parkDetail.md)
- 2.2 [经营分析-车辆](data/console1.1.md)
- 2.3 [经营分析-物业费](data/console1.2.md)
- 2.4 [行业分类-接口调试](http://wpms.eworld-online.com/swagger-ui.html#/itf-enter-info-controller/cyTypeDataUsingPOST)

- 2.4 [车辆同比和环比js算法](cl.html)

#### 企业信息

- 3.1 [查询企业集合--不包含图片](data/enterList.md)
- 3.2 [查询企业详情--包含图片](data/enterDetail.md)
- 3.3 [企业经营数据](data/enterJY.md)

#### 孵化信息

- 4.1 [查询孵化信息](data/fuhua.md)
