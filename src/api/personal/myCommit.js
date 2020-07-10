import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function personAPI(params) { //我的评论-医著/文章
  return request({
      url: `${requestPath.common}/comment/personal`,
      method: 'get',
      params
  })
}

export function personDelAPI(data) { //我的评论-医著/文章-删除单个
  return request({
      url: `${requestPath.common}/comment/delete/${data}`,
      method: 'post',
      data
  })
}

export function personDelAllAPI(data) { //我的评论-医著/文章-删除全部
  return request({
      url: `${requestPath.common}/comment/batch/delete`,
      method: 'post',
      data
  })
}
