import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'



export function recordGetAPI() { //我的浏览记录
  return request({
      url: `${requestPath.resource}/record/list`,
      method: 'get' 
  })
}

export function recordDelAllAPI(data) { //我的浏览记录-清空全部
  return request({
      url: `${requestPath.resource}/record/batch/delete`,
      method: 'post',
      data
  })
}