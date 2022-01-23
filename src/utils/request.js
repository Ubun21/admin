import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '../store/index'
import { checkTimeStamp } from './auth'

const requst = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// todo
requst.interceptors.request.use(config => {
  const token = store.getters.token
  config.headers.icode = 'BAF703E0183BF9AD'
  if (token) {
    if (checkTimeStamp()) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
      return config
    }
    store.dispatch('logOut')
    return Promise.reject(new Error('token was expired'))
  }
  return config
},
error => {
  return Promise.reject(error)
})

requst.interceptors.response.use(response => {
  const { data, success, message } = response.data
  if (success) {
    if (!data) {
      return response.data
    }
    return data
  } else {
    return Promise.reject(message)
  }
},
error => {
  debugger
  if (error.response.status === 401) {
    ElMessage.error('Unauthorized, please login again')
    store.dispatch('logOut')
    return
  }
  return Promise.reject(error)
})

export default requst
