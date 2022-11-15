import axios from 'axios'
import Element from 'element-ui'
import {logout} from "@/api/authentication";

const request = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 10000,
})

request.interceptors.request.use(config => {
    if(localStorage.getItem("token")){
        config.headers.token= localStorage.getItem("token")
    }
    return config
})

request.interceptors.response.use(response => {
    const res = response.data
    const headers = response.headers
    if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
        return response.data
    }
    if (res.code === '401') {
        Element.Message({
            message: res.message || '页面长时间未使用，请重新登录',
            type: 'warning',
            duration: 5000
        })
        this.$store.commit('clearIndexStore')
        this.$router.push('/login').then(r => {})
        return Promise.reject(new Error(res.message || '页面长时间未使用，请重新登录'))
    } else if (res.code !== '200') {
        Element.Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5000
        })
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return response
    }
})

export default request
