import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function getListAPI() { //获取列表
  return request({
    url: `${requestPath.common}/national-home-page/page`,
    method: 'get'
  })
}