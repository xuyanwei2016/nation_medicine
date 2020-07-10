import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

// 医药资讯/考试专栏列表
export function getListAPI(params) { 
  return request({
    url: `${requestPath.common}/information/bulletin-content/page`,
    method: 'get',
    params
  })
}

// 医药资讯详情/考试专栏详情
export function medicalDetailsAPI(id) { 
  return request({
    url: `${requestPath.common}/information/bulletin-content/${id}`,
    method: 'get'
  })
}


// 在线咨询列表
export function getListsAPI(params) { 
  return request({
    url: `${requestPath.common}/pro-qa/page1`,
    method: 'get',
    params
  })
}

// 专家答疑
export function getquestionAPI(params) { 
  return request({
    url: `${requestPath.common}/pro-qa/page2`,
    method: 'get',
    params
  })
}


// 我要提问
export function getAskAPI(data) { 
  return request({
    url: `${requestPath.common}/pro-qa/add-question`,
    method: 'post',
    data
  })
}


// 医家-其他用户接口
// 查询
export function getCheckAPI(id) { 
  return request({
    url: `${requestPath.resource}/authorLibrary/${id}`,
    method: 'get'
  })
}

// 经典医案
export function classicalAPI(params) { 
  return request({
    url: `${requestPath.resource}/article-library/page`,
    method: 'get',
    params
  })
}


// 关注
export function attentionAPI(data) { 
  return request({
    url: `${requestPath.resource}/member-collection/batch/save`,
    method: 'post',
    data
  })
}

// 取消关注
export function cancelAttentionAPI(data) { 
  return request({
    url: `${requestPath.resource}/member-collection/batch/delete`,
    method: 'post',
    data
  })
}

// 相关分享
export function getShareAPI(params) { 
  return request({
    url: `${requestPath.common}/pro-contribution/info-page`,
    method: 'get',
    params
  })
}

// 医学著作
export function getEbookAPI(params) { 
  return request({
    url: `${requestPath.resource}/ebook/page`,
    method: 'get',
    params
  })
}

// 相关名医
export function relevantMedicalAPI(data) { 
  return request({
    url: `${requestPath.resource}/authorLibrary/other/list?num=${data.num}&nationsType=${data.nationsType}`,
    method: 'get',
    data
  })
}
