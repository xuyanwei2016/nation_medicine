import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'
/*用戶登出*/
export function loginOutAPI(params) {
  return request({
    url: `${requestPath.member}/permissions/logout`,
    method: 'get',
    params
  })
}

export function getCommentListAPI(params) { //获取评论列表
  return request({
    url: `${requestPath.common}/comment/page`,
    method: 'get',
    params
  })
}

export function commentSaveAPI(data) { //评论或回复
  return request({
    url: `${requestPath.common}/comment/save`,
    method: 'post',
    data
  })
}

export function ebookDetailAPI(params) { //医著详情页
  return request({
    url: `${requestPath.resource}/ebook/get/${params.id}`,
    method: 'get',
    params
  })
}
export function articleDetailAPI(params) { //文章详情页
  return request({
    url: `${requestPath.resource}/article-library/get/${params.id}`,
    method: 'get',
    params
  })
}
export function recommendListAPI(params) { //民族推荐位
  return request({
    url: `${requestPath.resource}/recommend/content/list`,
    method: 'get',
    params
  })
}
export function authorLibraryDetailAPI(params) { //医家详情页
  return request({
    url: `${requestPath.resource}/authorLibrary/${params.id}`,
    method: 'get',
    params
  })
}
export function resourceAPI(params) { //获取资源分类
  return request({
    url: `${requestPath.resource}/resource/Type/list`,
    method: 'get',
    params
  })
}

export function commentAgreeAPI(data) { //点赞
  return request({
    url: `${requestPath.common}/comment/agree?commentId=${data.commentId}`,
    method: 'post',
    data
  })
}

export function ebookOtherAPI(params) { //同类书排行
  return request({
    url: `${requestPath.resource}/ebook/other/list`,
    method: 'get',
    params
  })
}

export function relevantArticleAPI(params) { //相关文章
  return request({
    url: `${requestPath.resource}/article-library/relation-resource/get/${params.bookId}`,
    method: 'get',
    params
  })
}

export function getCommentDetailAPI(params) { //查看评论详情及回复
  return request({
    url: `${requestPath.common}/comment/get/${params.oid}`,
    method: 'get',
    params
  })
}

export function nationalListAPI(params) { //查看评论详情及回复
  return request({
    url: `${requestPath.common}/national-home-page/Type/list`,
    method: 'get',
    params
  })
}
export function collectionAPI(data) { //点击收藏
  return request({
    url: `${requestPath.resource}/member-collection/batch/save`,
    method: 'post',
    data
  })
}
export function cancelcollectionAPI(data) { //取消收藏
  return request({
    url: `${requestPath.resource}/member-collection/batch/delete`,
    method: 'post',
    data
  })
}
export function shopCartAPI(data) { //添加购物车
  return request({
    url: `${requestPath.resource}/shopping-cart/save`,
    method: 'post',
    data
  })
}
/*答疑详情*/
export function proQaAPI(params) { //获取问题详情
  return request({
    url: `${requestPath.common}/pro-qa/${params.oid}`,
    method: 'get',
    params
  })
}
export function proQapageAPI(params) { //获取热门问题
  return request({
    url: `${requestPath.common}/pro-qa/top`,
    method: 'get',
    params
  })
}
export function saveCorrectAPI(data) { //保存纠错
  return request({
    url: `${requestPath.common}/error-correct/save`,
    method: 'post',
    data
  })
}

export function memberMsgAPI(params) { //获取用户信息
  return request({
    url: `${requestPath.member}/personal-center/get/member`,
    method: 'get',
    params
  })
}

/* 我的关注*/
export function myCollectAPI(params) { //我的关注列表
  return request({
    url: `${requestPath.resource}/member-collection/page-my-collect`,
    method: 'get',
    params
  })
}

/*我的收藏*/
export function myCollectionAPI(params) { //我的收藏列表
  return request({
    url: `${requestPath.resource}/member-collection/page`,
    method: 'get',
    params
  })
}



/*我的书架*/
export function myShelfAPI(params) { //我的书架列表
  return request({
    url: `${requestPath.order}/order/page/buy`,
    method: 'get',
    params
  })
}

/*在线咨询 留言内容*/
export function recommendAPI(params) { //推荐教材
  return request({
    url: `${requestPath.resource}/recommend/content/list`,
    method: 'get',
    params
  })
}
export function searchListAPI(params) { //搜索按钮
  return request({
    url: `${requestPath.resource}/resource/search/list`,
    method: 'get',
    params
  })
}
export function answerAPI(data) { //回答问题
  return request({
    url: `${requestPath.common}/pro-qa/answer`,
    method: 'post',
    data
  })
}

