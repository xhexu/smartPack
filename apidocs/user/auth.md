#### 用户权限
-  这个系统有4个角色,  系统管理员, 领导,员工, 访客
- 通过注册进去的用户时 访客 角色
1. 在前端给每一个要控制的 页面和按钮,  设置一个唯一的key
2. 然后访问这个接口, 会返回 当前登录用户所有key的集合,然后就可以控制页面权限了

1. url
```
post :  /itfuser/getAuthKeys
```

2. 入参
```
需要传jwt的字段, 登录后返回的jwt字段
```

3. 出参
```
{
  success: true,
  exceptionType: "",
  errorCode: "",
  message: "",
  result: [
    "key_search",
    "key_add",
    "key_update",
    "key_delete"
  ]
}
```
