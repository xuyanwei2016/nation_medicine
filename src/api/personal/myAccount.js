import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function topupGetAPI(params) { //我的充值记录
  return request({
      url: `${requestPath.order}/order/page/topup`,
      method: 'get',
      params
  })
}

export function tradingGetAPI(params) { //我的交易记录
  return request({
      url: `${requestPath.order}/order/page/trading-record`,
      method: 'get',
      params
  })
}
export function createTopupAPI(data) { //我的余额充值
  return request({
      url: `${requestPath.order}/order/create-topup-order?price=${data.price}&payType=${data.payType}`,
      method: 'post',
      //data
  })
}
export function getBalanceAPI(params) { //账户余额
  return request({
      url: `${requestPath.pay}/assets/get/balance`,
      method: 'get',
      params
  })
}

// export function invoiceBackAPI(params) { //发票回显
//   return request({
//       url: `${requestPath.order}/invoice/info/`,
//       method: 'get',
//       params
//   })
// }

// export function invoiceSubmitAPI(data) { //发票提交
//   return request({
//       url: `${requestPath.order}/invoice/save/open`,
//       method: 'post',
//       //data
//   })
// }
