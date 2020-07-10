import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function repeatNameAPI(params) { //验证名字是否重复
    return request({
        url: `${requestPath.member}/permissions/isExist`,
        method: 'get',
        params
    })
}

export function phoneCodeAPI(params) { //发送短信验证码
    return request({
        url: `${requestPath.member}/permissions/code-phone`,
        method: 'get',
        params
    })
}

export function registerAPI(data) { //个人-注册
    return request({
        url: `${requestPath.member}/permissions/register/p-member`,
        method: 'post',
        data
    })
}


export function organizaRegisterAPI(data) { //机构-注册
    return request({
        url: `${requestPath.member}/permissions/register/o-member`,
        method: 'post',
        data
    })
}