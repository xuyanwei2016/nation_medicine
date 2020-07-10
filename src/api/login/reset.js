import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function phoneAPI(params) { //发送手机短信
    return request({
        url: `${requestPath.member}/permissions/password1`,
        method: 'get',
        params
    })
}

export function checkPhoneAPI(params) { //验证手机短信
    return request({
        url: `${requestPath.member}/permissions/password2`,
        method: 'get',
        params
    })
}

export function passwordAPI(data) { //新密码
    return request({
        url: `${requestPath.member}/permissions/password3`,
        method: 'post',
        data
    })
}