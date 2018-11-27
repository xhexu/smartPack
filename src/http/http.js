import axios from 'axios'
import qs from 'qs'


axios.defaults.baseURL = 'http://wpms.eworld-online.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 5000

axios.interceptors.request.use((config) => {
  if(config.method  === 'post' && typeof config.data === 'object') {
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.error('入参格式异常')
})

axios.interceptors.response.use(function (response) {
	if (response.status == 200){
		return response.data
	}else{
		console.error('请求失败',response)
	}
}, function (error) {
	console.error(error)
	return error;
})

export default axios
