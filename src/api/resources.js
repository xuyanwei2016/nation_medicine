/*资源管理*/
import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'
/*内容管理分页*/
export function getContListAPI(params) {
  return request({
    url: `${requestPath.resource}/resource-manage/page`,
    method: 'get',
    params
  })
}
/*添加内容*/
export function saveContAPI(data) {
  return request({
    url: `${requestPath.resource}/resource-manage/save`,
    method: 'post',
    data
  })
}
/*分类*/
export function getTypeListAPI(params) {
  return request({
    url: `/sysuser/fg/dictionary/ydcc`,
    method: 'get',
  })
}
/*查看内容详情*/
export function getContDetailAPI(params) {
  return request({
    url: `${requestPath.resource}/resource-manage/get/${params}`,
    method: 'get',
  })
}
/*批量删除 内容*/
export function delContAPI(data) {
  return request({
    url: `${requestPath.resource}/resource-manage/batch/delete`,
    method: 'post',
    data
  })
}
/*批量审核 内容*/
export function changeStatusAPI(data) {
  return request({
    url: `${requestPath.resource}/resource-manage/batch/update/status`,
    method: 'post',
    data
  })
}
/*修改内容*/
export function editContentAPI(data) {
  return request({
    url: `${requestPath.resource}/resource-manage/update`,
    method: 'post',
    data
  })
}

/*视频管理*/
/*列表*/
export function getVideoListAPI(params) {
  return request({
    url: `${requestPath.resource}/video/page`,
    method: 'get',
    params
  })
}
/*批量删除*/
export function delVideoAPI(data) {
  return request({
    url: `${requestPath.resource}/video/batch/delete`,
    method: 'post',
    data
  })
}
/*批量审核/发布*/
export function updateVideoStatusAPI(data) {
  return request({
    url: `${requestPath.resource}/video/batch/update/status`,
    method: 'post',
    data
  })
}
/*添加*/
export function saveVideoAPI(data) {
  return request({
    url: `${requestPath.resource}/video/save`,
    method: 'post',
    data
  })
}
/*修改*/
export function editVideoAPI(data) {
  return request({
    url: `${requestPath.resource}/video/update`,
    method: 'post',
    data
  })
}
/*详情*/
export function getVideoDetailAPI(data) {
  return request({
    url: `${requestPath.resource}/video/get/${data}`,
    method: 'get',
  })
}


/*课程管理*/
/*列表*/
export function getLessonListAPI(data) {
  return request({
    url: `${requestPath.resource}/course/page`,
    method: 'get',
    params:data,
  })
}
/*批量删除*/
export function delLessonAPI(data) {
  return request({
    url: `${requestPath.resource}/course/batch/delete`,
    method: 'post',
    data
  })
}
/*批量审核/发布*/
export function updateLessonStatusAPI(data) {
  return request({
    url: `${requestPath.resource}/course/batch/update/status`,
    method: 'post',
    data
  })
}
/*添加*/
export function saveLessonAPI(data) {
  return request({
    url: `${requestPath.resource}/course/save`,
    method: 'post',
    data
  })
}
/*修改*/
export function editLessonAPI(data) {
  return request({
    url: `${requestPath.resource}/course/update`,
    method: 'post',
    data
  })
}
/*详情*/
export function getLessonDetailAPI(data) {
  return request({
    url: `${requestPath.resource}/course/get/${data}`,
    method: 'get',
  })
}
/*关联列表*/
export function getBindingAPI(data) {
  return request({
    url: `${requestPath.resource}/course/list/binding`,
    method: 'get',
    params:data,
  })
}
/*可关联的列表*/
export function canBindingAPI(data) {
  return request({
    url: `${requestPath.resource}/course/page/binding`,
    method: 'get',
    params:data,
  })
}
/*关联*/
export function bindingAPI(data) {
  return request({
    url: `${requestPath.resource}/course/add/binding`,
    method: 'POST',
    data,
  })
}
/*取消关联*/
export function cancelBindingAPI(data) {
  return request({
    url: `${requestPath.resource}/course/cancel/binding`,
    method: 'POST',
    data,
  })
}
/*修改排序号*/
export function modifySortAPI(data) {
  return request({
    url: `${requestPath.resource}/course/modify/sort`,
    method: 'POST',
    data,
  })
}

/*根据用户ID获取用户认真类型*/
export function getAuthenticateAPI(data) {
  return request({
    url: `${requestPath.memberydcc}/member/get/authenticate/${data}`,
    method: 'get',
  })
}
