// 封装能发ajax请求的函数
import axios from "axios";
import qs from 'qs';
// 问题提示组件
import {message} from 'antd';

// 配置请求的基础路径
axios.defaults.baseURL = 'http://localhost:5001';

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 解构赋值data和mathod以便后续使用
    const {data, method} = config;
    // 如果是post请求，且data是object格式，转化为字符串连接的query格式
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
      config.data = qs.stringify(data);
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    // 显示错误信息
    message.error("请求失败！" + error.message)
    // 让错误不再往下进行
    return new Promise(() => {})
  });

export default axios;