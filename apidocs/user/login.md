#### 用户登录.

1. url
```
post :  /itfuser/login
```

2. 入参
```
account : 用户账号
email : 邮件地址,   
pwd : 密码,    必填
```
- 注意: account 和 email 必须要有一个有值

3. 出参
```
-- 成功
{
  success: true,
  exceptionType: "",
  errorCode: "",
  message: "",
  result: "aaa.bbb.ccc"  //  jwt 字段, 访问需要登录的接口时需要传进去
}

-- 失败样例
{
  success: false,
  exceptionType: "BUSINESS",
  errorCode: "2000",
  message: "用户名或密码错误!",
  result: null
}
```
