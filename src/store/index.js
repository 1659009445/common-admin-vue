import Vue from 'vue'
import Vuex from 'vuex'

import menus from './modules/menus'
import tabs from './modules/tabs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: ''
  },
  getters: {
  },
  mutations: {
    setToken: (state,token) => {
      state.token = token
      localStorage.setItem("token",token)
    },
    setUsername: (state,username) => {
      state.username = username
      localStorage.setItem("username",username)
    },
    clearIndexStore: (state) => {
      localStorage.clear()

      state.token = ''
      state.username = ''

      menus.state.menuLists = []
      menus.state.permLists = []
      menus.state.routeLists = []
      menus.state.hasRoutes = false

      tabs.state.editableTabsValue = 'Index'
      tabs.state.editableTabs = [{name: '首页', title: '首页'}]
    }
  },
  actions: {
  },
  modules: {
    menus,
    tabs,
  }
})
