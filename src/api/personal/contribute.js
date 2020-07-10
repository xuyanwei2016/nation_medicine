import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

//分页列表
export function getListAPI(params) { 
  return request({
      url: `${requestPath.common}/pro-contribution/page`,
      method: 'get',
      params
  })
}

//删除
export function getdelAPI(data) { 
  return request({
      url: `${requestPath.common}/pro-contribution/batch/delete`,
      method: 'post',
      data
  })
}