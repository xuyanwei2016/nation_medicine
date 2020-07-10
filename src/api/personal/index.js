import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

//获取评论列表
export function getCommentListAPI(params) { 
  return request({
    url: `${requestPath.common}/comment/page`,
    method: 'get',
    params
  })
}

// 查询余额
export function getPayAPI() { 
  return request({
    url: `${requestPath.pay}/assets/get/balance`,
    method: 'get'
  })
}

// 个人中心-机构
export function getInstitutionAPI(data) { 
  return request({
    url: `${requestPath.member}/personal-center/get/member?id=${data.id}`,
    method: 'get',
    data
  })
}