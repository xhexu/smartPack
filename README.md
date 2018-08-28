#### 接口文档
- [文档地址](apidocs/README.md)

##### 2018-08-23项目搭建  
* 当前项目环境依赖：vue:2.5.2  node >= 6.0.0  webpack:^3.6.0
* 项目使用Eslint校验语法错误，可在config/index.js 中搜索useEslint:false 关闭
* 项目使用scss css预处理框架

##### 2018-08-25基础功能  

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
##### 2018-08-26 经营分析页面  
* 界面图表和视频区域动画(60%)

##### 2018-08-27 经营分析页面  
* 引入饿了么UI
* 调整经营分析页面代码

##### 2018-08-28 经营分析页面  
* 页面图表调整
* 抽取顶部公共导航  