import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'


// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    // baseURL: 'http://192.168.2.230', // api的base_url
    timeout: 50000, // request timeout
    headers: {
        'content-type': 'application/json;charset=UTF-8',
    },
    //withCredentials: true, // default
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    config.headers['Y-Token'] = Cookies.get('Y-Token') // 让每个请求头携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        //console.log(response.data)
        return response
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            //message: error.message,
            type: 'error',
            duration: 50 * 1000
        })
        return Promise.reject(error)
    }
)

export default service