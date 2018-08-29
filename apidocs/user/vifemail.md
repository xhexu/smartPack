#### 判断邮箱是否存在

1. url
```
post :  /itfuser/vifEmail
```

2. 入参
```
email : 邮件地址,    必填
```

3. 出参
```
-- 成功
{
  "success": true,
  "exceptionType": "",
  "errorCode": "",
  "message": "",
  "result": "Y"
}

-- 失败样例
{
  success: false,
  exceptionType: "BUSINESS",
  errorCode: "2000",
  message: "邮箱账号不能为空!",
  result: null
}
```
