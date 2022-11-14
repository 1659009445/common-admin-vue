<template>
  <div class="layout-navbar">
    <el-col :span="24">
      <el-menu
          :default-active="this.$store.state.tabs.editableTabsValue"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

        <router-link to="/home">
          <el-menu-item index="首页" @click="getSelectedMenu({name: '首页', title: '首页'})">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
        </router-link>

        <el-submenu :index="menu.name" :key="menu.id" v-for="menu in menuList">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.title}}</span>
          </template>
            <router-link :to="subMenu.path" :key="subMenu.id" v-for="subMenu in menu.children">
              <el-menu-item :index="subMenu.name" :key="subMenu.id" @click="getSelectedMenu(subMenu)">
                <template slot="title">
                  <i :class="subMenu.icon"></i>
                  <span slot="title">{{subMenu.title}}</span>
                </template>
              </el-menu-item>
            </router-link>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "LayoutNavbar",
  data() {
    return {
    }
  },
  methods: {
    getSelectedMenu(item){
      //获取子菜单信息并添加进tab
      this.$store.commit('addTab',item)
    }
  },
  computed: {
    menuList: {
      get() {
        return this.$store.state.menus.menuLists
      }
    }
  }
}
</script>

<style scoped>
.layout-navbar{
  height: 100vh;
}
.el-menu-vertical-demo {
  height: 100vh;
}
</style>
