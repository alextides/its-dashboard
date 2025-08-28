import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://api.itseducation.asia/',
  // baseURL: 'http://127.0.0.1:8000/',
  timeout: 0,
  headers: { withCredentials: true },
})

axios.defaults.withCredentials = true

Vue.prototype.$http = axiosIns

export default axiosIns
