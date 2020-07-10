import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function getReviewAPI(params) { //我的订单-列表
    return request({
        url: `${requestPath.order}/order/list/comment`,
        method: 'get',
        params
    })
}

export function reviewAPI(data) { //我的订单-发表
    return request({
        url: `${requestPath.order}/order/save/comment`,
        method: 'post',
        data
    })
}