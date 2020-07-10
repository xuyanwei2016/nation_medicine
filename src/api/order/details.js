import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function detailsAPI(params) { //我的订单-列表
    return request({
        url: `${requestPath.order}/order/${params}`,
        method: 'get',
    })
}