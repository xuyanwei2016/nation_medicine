import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function countSafeAPI(params) { //我的账户安全
  return request({
      url: `${requestPath.member}/personal-center/get/safeinfo`,
      method: 'get',
      //params
  })
}

export function countChangePassAPI(data) { //修改密码
  return request({
      url: `${requestPath.member}/personal-center/update/password`,
      method: 'post',
      data
  })
}

export function countChangePhoneAPI(data) { //修改绑定手机号
  return request({
      url: `${requestPath.member}/personal-center/update/phone`,
      method: 'post',
      data
  })
}

export function countUnbindAPI(data) { //解绑账户
  return request({
      url: `${requestPath.member}/personal-center/unbind/${data}`,
      method: 'post',
      //data
  })
}
