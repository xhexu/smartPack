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

#### 用户登录

- 1.1 [发送邮件](user/sendEmail.md)
- 1.2 [注册](user/reg.md)
- 1.3 [登录](user/login.md)
- 1.4 [测试登录后的接口](user/test.md)
- 1.5 [页面权限控制](user/auth.md)
