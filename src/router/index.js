import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from '@/store'

import Home from '../views/Home.vue'
import DashBoard from '@/views/DashBoard'

Vue.use(VueRouter)

//解决vue路由重复导航错误  获取原型对象上的push函数  修改原型对象中的push方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {title: '主页', icon: ''},
    component: DashBoard,
    children: [
      {
        path: '/home',
        name: '首页',
        meta: {title: '主页', icon: ''},
        component: Home,
      },
      {
        path: '/sys/user',
        name: '用户管理',
        meta: {title: 'user', icon: ''},
        component: () => import('../views/sys/SysUser')
      },
      {
        path: '/sys/role',
        name: '角色管理',
        meta: {title: 'role', icon: ''},
        component: () => import('../views/sys/SysRole')
      },
      {
        path: '/sys/menu',
        name: '菜单管理',
        meta: {title: 'menu', icon: ''},
        component: () => import('../views/sys/SysMenu')
      },
      {
        path: '/sys/dept',
        name: '部门管理',
        meta: {title: 'menu', icon: ''},
        component: () => import('../views/sys/SysDept')
      },
      {
        path: '/sys/test',
        name: '测试权限',
        meta: {title: 'test', icon: ''},
        component: () => import('../views/sys/Test')
      },
      {
        path: '/sys/info/login',
        name: '登录日志',
        meta: {title: 'test', icon: ''},
        component: () => import('../views/sys/info/Login')
      },
      {
        path: '/sys/info/operate',
        name: '操作日志',
        meta: {title: 'test', icon: ''},
        component: () => import('../views/sys/info/Operate')
      },
      {
        path: '/sys/info/file',
        name: '文件管理',
        meta: {title: 'file', icon: ''},
        component: () => import('../views/sys/info/File')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登录', icon: ''},
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  //获取权限信息
  let token = localStorage.getItem("token")
  let hasRoutes = store.state.menus.hasRoutes
  //获取路由
  if (!hasRoutes && token) {
    axios.get('http://localhost:8088/sys/menu/nav',{
      headers: { token }
    }).then(res => {
      //获取权限数据和菜单数据
      store.commit("setMenuList",res.data.data.menuList)
      store.commit("setPermList",res.data.data.authority)
      let menus = res.data.data.menuList
      menus.forEach( menu => {
      })
    })
    store.commit("setRoutesStatus",true)
  }
  next()

})

// router.beforeEach((to,from,next) => {
//   console.log("---路由守卫---")
//   //获取权限信息
//   let token = localStorage.getItem("token")
//   let hasRoutes = store.state.menus.hasRoutes
//   //获取路由
//   if (!hasRoutes && token) {
//     axios.get('http://localhost:8082/sys/menu/nav',{
//       headers: { token }
//     }).then(res => {
//       //获取权限数据和菜单数据
//       store.commit("setMenuList",res.data.data.menuList)
//       store.commit("setPermList",res.data.data.authority)
//       //获取原路由 旧用法
//       let asyncRoutes = router.options.routes
//       let menus = res.data.data.menuList
//       menus.forEach(menu => {
//         if(menu.children){
//           //将menu下children的路由加入
//           menu.children.forEach(childMenu => {
//             let route = {
//               name: childMenu.name,
//               path: childMenu.path,
//               meta: { icon: childMenu.icon, title: childMenu.title },
//               component: () => import('@/views/' + childMenu.component)
//               // component: (resolve) => require(['../views/' + childMenu.component],resolve)
//             }
//             if(route){
//               //将获取到的新路由添加进原路由
//               asyncRoutes[0].children.push(route)
//               router.addRoute("asyncRoutes",route)
//             }
//           })
//         }
//       })
//     })
//     store.commit("setRoutesStatus",true)
//   }
//   console.log(router.options.routes)
//   next()
//
// })

export default router
