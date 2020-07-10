import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function loginAPI(data) { //登录
    return request({
        url: `${requestPath.member}/permissions/login`,
        method: 'post',
        data
    })
}

export function errorAPI(params) { //判断当前用户错误次数
    return request({
        url: `${requestPath.member}/permissions/login/count`,
        method: 'get',
        params
    })
}

export function codeAPI(params) { //获取图形验证码
    return request({
        url: `${requestPath.member}/permissions/code`,
        method: 'get',
        params
    })
}
/*qq登录*/
export function qqLoginAPI(params) {
    return request({
        url: `${requestPath.member}/permissions/qq/login`,
        method: 'get',
        params
    })
}
/*qq登录*/
export function wxLoginAPI(params) {
    return request({
        url: `${requestPath.member}/permissions/wechat/login`,
        method: 'get',
        params
    })
}