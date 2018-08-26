##智慧园区项目

###2018-08-23项目搭建  

说明：
	* 当前项目环境依赖：vue:2.5.2  node >= 6.0.0  webpack:^3.6.0
	* 项目使用Eslint校验语法错误，可在config/index.js 中搜索useEslint:false 关闭
	* 项目使用scss css预处理框架

####2018-08-25基础功能  

* 引入echarts图表库，
  * 柱状图
* 引入axios用作http请求;可在http文件夹下配置baseURL后端服务器地址
  * 用法:在vue组件需要发送请求的地方直接调用;需要指定请求的URL和入参(JSON格式)
```javascript
 GET:
	// 向具有指定ID的用户发出请求
	this.$http.get('/user?ID=12345')
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	// 也可以通过 params 对象传递参数
	this.$http.get('/user', {
	    params: {
	      ID: 12345
	    }
	}).then(function (response) {
	    console.log(response);
	}).catch(function (error) {
	    console.log(error);
	});
 POST:
 	this.$http.post('/user', {
	    firstName: 'Fred',
	    lastName: 'Flintstone'
	}).then(function (response) {
    	console.log(response);
  	}).catch(function (error) {
    	console.log(error);
  	});
```
