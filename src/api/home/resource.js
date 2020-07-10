import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function resourceListAPI(params) { //获取列表
    return request({
        url: `${requestPath.resource}/resource/Type/count?content=${params.content}&nationsType=${params.nationsType}`,
        method: 'get',
        // params
    })
}

export function getListAPI(params) { //获取列表
    return request({
        url: `${requestPath.resource}/resource/search`,
        method: 'get',
        params
    })
}