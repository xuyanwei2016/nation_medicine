import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function getRelationResourceAPI(params) { //相关资源
    return request({
        url: `${requestPath.resource}/recommend/content/list`,
        method: 'get',
        params
    })
}


export function getRelationResourceDetailsAPI(params) { //详情
    return request({
        url: `${requestPath.resource}/article-library/get`,
        method: 'get',
        params
    })
}


export function getcatalogueAPI(params) { //目录
    return request({
        url: `${requestPath.resource}/ebook/directory`,
        method: 'get',
        params
    })
}

export function getKyRelationResourceDetailsAPI(params) { //详情
  return request({
    url: `${requestPath.resource}/article-library/ky/get`,
    method: 'get',
    params
  })
}
