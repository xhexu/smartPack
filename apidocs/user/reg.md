#### 用户注册

1. url
```
post :  /itfuser/reg
```

2. 入参
```
email : 邮件地址,    必填
name : 姓名,    必填
pwd : 密码,    必填
sex : 1 男, 2 女,    必填
vifcode : 验证码,    必填
```

3. 出参
```
-- 成功
{
  success: true,
  exceptionType: "",
  errorCode: "",
  message: "",
  result: null
}

-- 失败样例
{
  success: false,
  exceptionType: "BUSINESS",
  errorCode: "2000",
  message: "名称不能为空!",
  result: null
}
{
  success: false,
  exceptionType: "BUSINESS",
  errorCode: "2000",
  message: "发送的验证码已经失效, 请重新发送",
  result: null
}
```
