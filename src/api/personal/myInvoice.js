import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function invoiceGetAPI(params) { //我的发票列表
  return request({
      url: `${requestPath.order}/invoice/page`,
      method: 'get',
      params
  })
}
export function invoiceGetDetailsAPI(params) { //我的发票详情
  return request({
      url: `${requestPath.order}/invoice/${params}`,
      method: 'get',
      //params
  })
}

export function invoiceBackAPI(params) { //发票回显
  return request({
      url: `${requestPath.order}/invoice/info/`,
      method: 'get',
      params
  })
}

export function invoiceSubmitAPI(data) { //发票提交
  return request({
      url: `${requestPath.order}/invoice/save/open`,
      method: 'post',
      data
  })
}
// export function recordDelAllAPI(data) { //我的浏览记录-清空全部
//   return request({
//       url: `${requestPath.resourceRecord}/record/batch/delete`,
//       method: 'post',
//       data
//   })
// }
