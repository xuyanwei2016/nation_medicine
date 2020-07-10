import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function linksAPI(params) { //友情链接
    return request({
        url: `${requestPath.common}/home-page/links/list`,
        method: 'get',
        params
    })
}

export function footerAPI(params) { //页脚
    return request({
        url: `${requestPath.common}/footer/page`,
        method: 'get',
        params
    })
}

export function footerDetailsAPI(params) { //页脚详情
    return request({
        url: `${requestPath.common}/footer/${params}`,
        method: 'get',
    })
}

export function dictionaryAPI(params) { //获取底部版权
    return request({
        url: `${requestPath.common}/dictionary/get`,
        method: 'get',
        params
    })
}

export function nationListAPI(params) { //民族列表
    return request({
        url: `${requestPath.common}/national-home-page/Type/list`,
        method: 'get',
        params
    })
}

export function shopCartAPI(data) { //添加购物车
    return request({
        url: `${requestPath.resource}/shopping-cart/save`,
        method: 'post',
        data
    })
}

export function messageAPI(params) { //查询是否有未读消息
    return request({
        url: `${requestPath.member}/pm/count`,
        method: 'get',
        params
    })
}