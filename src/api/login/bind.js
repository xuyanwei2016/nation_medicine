import request from '@/utils/request'
import { requestPath } from '@/utils/global.js'

export function bindAPI(data) { //登录
    return request({
        url: `${requestPath.member}/permissions/bind`,
        method: 'post',
        data
    })
}

// export function codeAPI(params) { //获取图形验证码
//     return request({
//         url: `${requestPath.member}/permissions/code`,
//         method: 'get',
//         params
//     })
// }