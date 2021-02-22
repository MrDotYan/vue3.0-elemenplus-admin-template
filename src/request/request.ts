/**axios封装
  * 请求拦截、相应拦截、错误统一处理
  */
import axios from 'axios';
import QS from 'qs';
import sessionStore from 'store/storages/sessionStorage';

//默认地址
axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "http://ve3admin.onlyylt.top";

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    console.log({
      ...config,
      headers: {
        ...config.headers,
        XToken: sessionStore.read('token')
      }
    })
    return {
      ...config,
      headers: {
        ...config.headers,
        XToken: sessionStore.read('token')
      }
    };
  },
  error => {
    return Promise.reject(error);
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      window.console.log(error.response.data.message);
      return Promise.reject(error.response);
    }
  }
);
/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export default {
  get,
  post
}