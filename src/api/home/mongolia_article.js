import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'


// 列表
export function getListAPI(params) { 
  return request({
    url: `${requestPath.resource}/article-library/page`,
    method: 'get',
    params
  })
}


// pdf文章阅读页
export function pdfDetailsAPI(id) { 
  return request({
    url: `${requestPath.resource}/article-library/get/${id}`,
    method: 'get'
  })
}