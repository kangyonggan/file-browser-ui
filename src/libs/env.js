import Vue from 'vue';
import axios from 'axios';

let env = {};

// 根据环境设置各种地址
axios.defaults.baseURL = '/api/';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8805/';
} else if (process.env.NODE_ENV === 'hd') {
    axios.defaults.baseURL = 'http://172.190.105.90:8888/api/';
}

export default env;
Vue.prototype.env = env;



