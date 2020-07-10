import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function detailsOrderAPI(params) { //我的订单-支付页面的详情
    return request({
        url: `${requestPath.order}/order/${params}`,
        method: 'get',
    })
}

export function payOrderAPI(params) { //我的订单-支付接口
    return request({
        url: `${requestPath.order}/order/pay`,
        method: 'get',
        params
    })
}

export function testOrderAPI(data) { //我的订单-支付接口
    return request({
        url: `${requestPath.order}/order/test`,
        method: 'post',
        data
    })
}