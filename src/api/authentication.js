import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录
 * @param form
 * @returns {*}
 */
export function login(form){
    return request({
        url: '/login',
        method: 'post',
        data: qs.stringify(form)
    })
}

/**
 * 注销
 * @returns {*}
 */
export function logout(){
    return request({
        url: '/logout',
        method: 'post',
    })
}

/**
 * 获取登录验证码
 * @returns {*}
 */
export function getKaptcha(){
    return request({
        url: '/auth/kaptcha',
        method: 'get',
    })
}

/**
 * 获取菜单
 * @returns {*}
 */
export function getNav(){
    return request({
        url: '/sys/menu/nav',
        method: 'get',
    })
}


