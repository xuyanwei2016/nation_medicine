import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function getListAPI(params) { //购物车-列表
    return request({
        url: `${requestPath.resource}/shopping-cart/list`,
        method: 'get',
        params
    })
}

export function deleteAPI(data) { //批量删除
    return request({
        url: `${requestPath.resource}/shopping-cart/batch/delete`,
        method: 'post',
        data
    })
}

export function recommendAPI(params) { //推荐列表
    return request({
        url: `${requestPath.resource}/ebook/recommend`,
        method: 'get',
        params
    })
}

export function favoriteAPI(data) { //收藏
    return request({
        url: `${requestPath.resource}/member-collection/batch/save`,
        method: 'post',
        data
    })
}

export function shoppingAPI(params) { //确认订单列表
    return request({
        url: `${requestPath.resource}/shopping-cart/batch/get?ids=${params}`,
        method: 'get',
    })
}

export function createOrderAPI(data) { //生成订单
    return request({
        url: `${requestPath.order}/order/create-order`,
        method: 'post',
        data
    })
}