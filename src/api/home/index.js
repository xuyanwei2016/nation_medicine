import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function nationsAPI(params) { //民族列表
    return request({
        url: `${requestPath.resource}/recommend/home/list`,
        method: 'get',
        params
    })
}

export function nationDetailsAPI(params) { //民族详情
    return request({
        url: `${requestPath.resource}/recommend/content/list`,
        method: 'get',
        params
    })
}

export function nationDetailsPageAPI(params) { //民族详情
    return request({
        url: `${requestPath.resource}/recommend/content/page`,
        method: 'get',
        params
    })
}


export function bulletinAPI(params) { //医药资讯
    return request({
        url: `${requestPath.common}/information/bulletin-content/page`,
        method: 'get',
        params
    })
}

export function bannerAPI(params) { //获取图形验证码
    return request({
        url: `${requestPath.common}/home-page/signvalue`,
        method: 'get',
        params
    })
}

export function searchAPI(params) { //获取图形验证码
    return request({
        url: `${requestPath.resource}/resource/search`,
        method: 'get',
        params
    })
}

export function logoutAPI(params) { //获取图形验证码
    return request({
        url: `${requestPath.member}/permissions/logout`,
        method: 'get',
        params
    })
}