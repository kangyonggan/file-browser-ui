import Vue from 'vue';
import axios from 'axios';

let env = {};

// 根据环境设置各种地址
axios.defaults.baseURL = '/file-browser/';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8805/';
}

export default env;
Vue.prototype.env = env;



