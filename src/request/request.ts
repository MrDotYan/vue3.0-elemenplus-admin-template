import axios from 'axios';
import _get from 'lodash/get';
import storage from 'store';
import QS from 'qs';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/',
  timeout: 10000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: any) => {
  const status = _get(error, 'response.status');
  switch (status) {
    /* eslint-disable no-param-reassign */
    // 上面的eslint注释，是让eslint不要检测这段代码
    case 400: error.message = '请求错误'; break;
    case 401: error.message = '未授权，请登录'; break;
    case 403: error.message = '拒绝访问'; break;
    case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
    case 408: error.message = '请求超时'; break;
    case 500: error.message = '服务器内部错误'; break;
    case 501: error.message = '服务未实现'; break;
    case 502: error.message = '网关错误'; break;
    case 503: error.message = '服务不可用'; break;
    case 504: error.message = '网关超时'; break;
    case 505: error.message = 'HTTP版本不受支持'; break;
    default: break;
    /* eslint-disabled */
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: any) => {
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${storage.get('ACCESS_TOKEN')}`;
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response: any) => {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, errorHandler);



/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
function get(url: string, params: Record<string, string>) {
  return new Promise((resolve, reject) => {
    request.get(url, {
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
function post(url: string, params: Record<string, string>) {
  return new Promise((resolve, reject) => {
    request.post(url, QS.stringify(params))
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