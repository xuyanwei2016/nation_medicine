 /**
  * @Author:      skyeGao
  * @Email:       yyjzp1314@126.com
  * @DateTime:    2019-04-07 21:55:17
  * @Description: Description 
  */
 
import Cookies from 'js-cookie'
import { USERCENTERPREFIX, USERCENTER_NEWS_URL, USERCENTER_INDEX_URL, USERCENTER_RETRIEVEPSW_URL } from '@/utils/code'

const TokenKey = 'TaxOnline-Token'
const LoginUserKey = 'user'   // 财税智库统一登录平台登录成功后存储的cookie的key

export const getCookie = (key) => Cookies.get(key)

export const setCookie = (key, data) => Cookies.set(key, data)

export const removeCookies = (keysArr) => {
  keysArr.forEach( key => {
    Cookies.remove(key)
  })
}

export const setToken = (token) => {
  return Cookies.set(TokenKey, token)
}
export const getToken = () => {
  return Cookies.get(TokenKey)
}
export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

export const setUserToken = (token) => {
  return Cookies.set(LoginUserKey, token)
}

export const isLogin = () => {
  if (getCookie(TokenKey) || getCookie(LoginUserKey)) {
    const userData = Cookies.getJSON(LoginUserKey)
    if (userData) {
      const { token } = userData.data
      if (!getToken()) {
        setCookie(TokenKey, token)
      }
      return true
    }
  }
  return false
}

export const logout = () => {
  removeCookies([TokenKey,LoginUserKey])
  const { protocol, host, pathname, search } = window.location
  window.location.href = `${protocol}//${host}${pathname}${search}`;
}

export const getUserInfo = () => {
  let info = void 0
  if (isLogin()) {
    const { nickName, img: avater, ...others  } = Cookies.getJSON(LoginUserKey).data // 需要知道当前登录用户是个人用户还是机构用户
    info = { nickName, avater, ...others }
  }
  return info
}

// 去公共个人中心登录
export const sudoLogin = (type) => {
  const locationUrl = window.location.href;
  window.location.href = `${USERCENTERPREFIX}${locationUrl}&type=${type}`;
}

// 去公共个人中心消息
export const sudoNews = () => {
  window.location.href = `${USERCENTER_NEWS_URL}`;
}

// 去往个人中心首页
export const sudoIndex = (userType) => { // 0-普通用户 1-专家 2-机构
  window.location.href = `${USERCENTER_INDEX_URL}?utype=${userType}`;
}

// 去往个人中心 - 修改密码
export const sudoRetrievePsw = () => {
  window.location.href = `${USERCENTER_RETRIEVEPSW_URL}`;
}

// level 判断登录用户类别 
export const USERLEVELTYPE = {
  GENERAL: 0,       // 普通用户
  EXPERT: 1,        // 专家用户
  ORGANIZATION: 2,  // 机构用户
}
export const getUserLevelTypeCode = () => {
  if (isLogin()) {
    const userData = Cookies.getJSON(LoginUserKey)
    if (userData) {
      return userData.data.level
    }
  }
  return ''
}




