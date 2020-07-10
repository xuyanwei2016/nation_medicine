import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

// 查询列表
export function checkNation() { 
    return request({
        url: `${requestPath.common}/national-home-page/page`,
        method: 'get'
    })
}


// 查询详情
export function checkNationAPI(id) { 
  return request({
    url: `${requestPath.common}/national-home-page/${id}`,
    method: 'get'
  })
}

// 方剂
export function commonAPI(data) { 
    return request({
      url: `${requestPath.resource}/recommend/content/list?code=${data.code}&num=${data.num}`,
      method: 'get',
      data
    })
  }

