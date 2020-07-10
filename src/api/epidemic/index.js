import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

//疫情轮播图
export function getImgsAPI(params) {
  return request({
    url: `${requestPath.common}/home-page/signvalue`,
    method: 'get',
    params
  })
}

/*医药资讯/考试专栏列表*/
export function getInforAPI(params) {
  return request({
    url: `${requestPath.common}/information/bulletin-content/page`,
    method: 'get',
    params
  })
}

/*抗疫专题-推荐位数据展示*/
export function getTopicAPI(params) {
  return request({
    url: `${requestPath.resource}/recommend/topic/content/page`,
    method: 'get',
    params
  })
}

/*防控知识推荐位更多*/
export function getTopicMoreAPI(params) {
  return request({
    url: `${requestPath.resource}/recommend/topic/content/more/page`,
    method: 'get',
    params
  })
}

/*搜索*/
export function searchAPI(params) {
  return request({
    url: `resource/wap/resource/search`,
    method: 'get',
    params
  })
}

/*文章详情*/
export function getActicleDetialAPI(params) {
  return request({
    url: `${requestPath.resource}/article-library/get/${params}`,
    method: 'get',
    params
  })
}

/*文章详情*/
export function getActicleDetialAPI1(params) {
  return request({
    url: `${requestPath.resource}/article-library/ky/get/${params}?allFlag=true`,
    method: 'get',
    params
  })
}
