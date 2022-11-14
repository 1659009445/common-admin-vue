import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default {
    state: {
        //菜单列表
        menuLists: [],
        //权限列表
        permLists: [],
        //路由列表
        routeLists: [],
        //是否获取路由
        hasRoutes: false,
    },
    getters: {
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuLists = menus
        },
        setPermList(state, perms) {
            state.permLists = perms
        },
        setRoutesStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes
        },
        changeRoutesStatus(state) {
            state.hasRoutes = !state.hasRoutes
        },
        setRouteList(state,route){
            //获取面包屑 只适用于两层循环
            let name = route.name
            let pName
            state.menuLists.forEach(menu => {
                if(menu.children && menu.name !== 'login'){
                    menu.children.forEach(subItem => {
                        if(subItem.name === name){
                            pName = menu.name
                        }
                    })
                }
            })
            state.routeLists.push(pName)
            state.routeLists.push(name)
        },
        cleanRouteList(state) {
            state.routeLists = []
        }
    },
    actions: {
    },
}
