import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

//分页列表
export function getListAPI(params) { 
  return request({
      url: `${requestPath.common}/pro-qa/page-my-questions`,
      method: 'get',
      params
  })
}