import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

// 获取个人信息
export function informationAPI(data) { 
    return request({
        url: `${requestPath.member}/personal-center/get/safeinfo`,
        method: 'get',
        data
    })
}

// 个人信息详情
export function detailsAPI(data) { 
    return request({
        url: `${requestPath.member}/personal-center/get/member?id=${data.id}`,
        method: 'get'
    })
}

// 编辑个人信息
export function editAPI(data) { 
    return request({
        url: `${requestPath.member}/personal-center/update/member`,
        method: 'post',
        data
    })
}

// 热门产品
export function getHotProductsAPI() { 
    return request({
        url: `${requestPath.resource}/ebook/hot-products`,
        method: 'get'
    })
}

// 最近订单
export function orderListAPI(data) { //获取评论列表
    return request({
      url: `${requestPath.order}/order/list/recently`,
      method: 'get',
      data
    })
  }


