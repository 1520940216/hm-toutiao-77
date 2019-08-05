// 配置一个axios 导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '../router'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 在每次请求之前，获取token信息，追加在headers中
// 请求拦截器：在每次请求前 做某一些事情
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 跳转到登录页面 this.$router.push('/login')
    // 方式1
    // location.hash = '#/login'
    // 方式2
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 进行导出
export default axios
