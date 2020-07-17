import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import constants from './constants';

// 10s超时
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject({
    respCo: constants.FAILURE,
    respMsg: error + ''
  });
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.respCo === constants.SUCCESS) {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
}, function (error) {
  if (!error.isAxiosError) {
    return Promise.reject(error);
  }
  return Promise.reject({
    respCo: constants.FAILURE,
    respMsg: error + ''
  });
});

Vue.use(VueAxios, axios);

export default axios;