import request from '@/utils/request'

/**
 * 获取菜单列表
 * @returns {*}
 */
export function getMenuList(){
    return request({
        url: '/sys/menu/list',
        method: 'get',
    })
}

/**
 * 查询单个菜单
 * @param id
 * @returns {*}
 */
export function getMenuInfo(id){
    return request({
        url: '/sys/menu/info/'+ id,
        method: 'get',
    })
}

/**
 * 添加菜单
 * @param menu
 * @returns {*}
 */
export function insertMenu(menu){
    return request({
        url: '/sys/menu/insert',
        method: 'post',
        data: menu
    })
}

/**
 * 删除单个菜单
 * @param id
 * @returns {*}
 */
export function deleteMenu(id){
    return request({
        url: '/sys/menu/delete/'+ id,
        method: 'post',
    })
}

/**
 * 更新菜单
 * @param menu
 * @returns {*}
 */
export function updateMenu(menu){
    return request({
        url: '/sys/menu/update',
        method: 'post',
        data: menu
    })
}

/**
 * 获取全部菜单
 * @returns {*}
 */
export function getHoleNav(){
    return request({
        url: '/sys/menu/nav/add',
        method: 'get',
    })
}



/**
 * 获取角色列表
 * @param current
 * @param size
 * @param name
 * @returns {*}
 */
export function getRoleList(current, size, name){
    return request({
        url: '/sys/role/list'+'?current='+current+'&pageSize='+size+'&param='+name,
        method: 'get',
    })
}

/**
 * 查询单个角色
 * @param id
 * @returns {*}
 */
export function getRoleInfo(id){
    return request({
        url: '/sys/role/info/'+ id,
        method: 'get',
    })
}

/**
 * 添加角色
 * @param role
 * @returns {*}
 */
export function insertRole(role){
    return request({
        url: '/sys/role/insert',
        method: 'post',
        data: role
    })
}

/**
 * 批量删除角色
 * @param ids
 * @returns {*}
 */
export function deleteRole(ids){
    return request({
        url: '/sys/menu/delete/',
        method: 'post',
        data: ids
    })
}

/**
 * 更新角色
 * @param role
 * @returns {*}
 */
export function updateRole(role){
    return request({
        url: '/sys/role/update',
        method: 'post',
        data: role
    })
}

/**
 * 更新角色权限信息
 * @param id
 * @param perms
 * @returns {*}
 */
export function updateRolePerm(id, perms){
    return request({
        url: '/sys/role/perm/'+id,
        method: 'post',
        data: perms
    })
}





/**
 * 获取用户列表
 * @param current
 * @param size
 * @param name
 * @returns {*}
 */
export function getUserList(current, size, name){
    return request({
        url: '/sys/user/list'+'?current='+current+'&pageSize='+size+'&param='+name,
        method: 'get',
    })
}

/**
 * 查询单个用户
 * @param id
 * @returns {*}
 */
export function getUserInfo(id){
    return request({
        url: '/sys/user/info/'+ id,
        method: 'get',
    })
}

/**
 * 添加用户
 * @param user
 * @returns {*}
 */
export function insertUser(user){
    return request({
        url: '/sys/user/insert',
        method: 'post',
        data: user
    })
}

/**
 * 批量删除用户
 * @param ids
 * @returns {*}
 */
export function deleteUser(ids){
    return request({
        url: '/sys/user/delete/',
        method: 'post',
        data: ids
    })
}

/**
 * 更新用户
 * @param user
 * @returns {*}
 */
export function updateUser(user){
    return request({
        url: '/sys/user/update',
        method: 'post',
        data: user
    })
}

/**
 * 更新用户角色信息
 * @param id
 * @param ids
 * @returns {*}
 */
export function updateUserRole(id, ids){
    return request({
        url: '/sys/user/role/'+ id,
        method: 'post',
        data: ids
    })
}

/**
 * 管理员重置密码
 * @param id
 * @returns {*}
 */
export function updatePasswordByAdmin(id){
    return request({
        url: '/sys/user/pass/admin/'+ id,
        method: 'post',
    })
}


