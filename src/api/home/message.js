import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

//分页列表
export function getListAPI(params) {
  return request({
      url: `${requestPath.member}/pm/page`,
      method: 'get',
      params
  })
}

//清空消息
export function delInfoAPI(data) {
  return request({
      url: `${requestPath.member}/pm/delete`,
      method: 'post',
      data
  })
}

// 删除
export function deleAPI(id) {
  return request({
      url: `${requestPath.member}/pm/delete/${id}`,
      method: 'post'
  })
}

// 详情页
export function getDetailsAPI(id) {
  return request({
      url: `${requestPath.member}/pm/get/${id}`,
      method: 'get'
  })
}


// 向我提问列表
export function getListsAPI(params) {
  return request({
      url: `${requestPath.common}/pro-qa/page2`,
      method: 'get',
      params
  })
}

// 未读消息
export function getunreadAPI() {
  return request({
      url: `${requestPath.member}/pm/count`,
      method: 'get'
  })
}
