import axios from 'axios';
import Vue from 'vue';

let accessToken = localStorage.getItem('token');
const BASE_URL = "http://localhost:3000";
const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-auth-token': accessToken
    }
})
Vue.prototype.$http = http;
Vue.prototype.$http.interceptors.request.use(
  config => {
      if (accessToken) {
          config.headers = Object.assign({
              'x-auth-token': accessToken
          }, config.headers);
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);
module.exports = http;