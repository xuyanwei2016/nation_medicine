import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

// 医药资讯/考试专栏列表
export function saveAPI(data) { 
  return request({
    url: `${requestPath.common}/pro-contribution/save`,
    method: 'post',
    data
  })
}


// 详情
export function detailAPI(id) { 
  return request({
    url: `${requestPath.common}/pro-contribution/${id}`,
    method: 'get'
  })
}