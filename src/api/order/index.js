import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function getListAPI(params) { //我的订单-列表
    return request({
        url: `${requestPath.order}/order/page`,
        method: 'get',
        params
    })
}

export function deleteAPI(data) { //删除
    return request({
        url: `${requestPath.order}/order/batch/update/display`,
        method: 'post',
        data
    })
}

export function cancelAPI(data) { //取消
    return request({
        url: `${requestPath.order}/order/update/${data}/cancel`,
        method: 'post',
        data
    })
}

export function orderCountAPI(params) { //订单数量
    return request({
        url: `${requestPath.order}/order/count`,
        method: 'get',
        params
    })
}