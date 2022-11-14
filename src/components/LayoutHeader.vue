<template>
  <div class="layout-header">
    <div class="nav-bread">
      <layout-breadcrumb></layout-breadcrumb>
    </div>
    <strong>admin后台</strong>
    <div class="nav-header">
      <el-avatar size="medium"></el-avatar>
      <el-link>{{username}}</el-link>
      <el-dropdown>
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-link href="">帮助</el-link>
      <el-link href="https://github.com/1659009445/" target="_blank">github</el-link>
    </div>
  </div>
</template>

<script>
import LayoutBreadcrumb from "@/components/LayoutBreadcrumb";
import {logout} from "@/api/authentication";
export default {
  name: "LayoutHeader",
  components: {
    LayoutBreadcrumb
  },
  data() {
    return {
      username: ''
    }
  },
  methods: {
    getUsername(){
      this.username = localStorage.getItem("username")
    },
    logout() {
      logout().then(res => {
        if(res.data.code === '200'){
          this.$store.commit('clearIndexStore')
          this.$router.push('/login')
        }
      })
    }
  },
  watch: {

  },
  created() {
    this.getUsername()
  }
}
</script>

<style scoped>
.layout-header{
  /*display: flex;*/
}
.nav-bread {
  width: 400px;
  float: left;
}
.nav-header {
  width: 400px;
  float: right;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  /*color: #409EFF;*/
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
