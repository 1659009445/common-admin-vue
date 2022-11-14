<template>
  <div >
    <el-breadcrumb separator="/" class="breadcrumb-container">
      <el-breadcrumb-item v-for="item in routeList" :key="item">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "LayoutBreadcrumb",
  computed: {
    routeList: {
      get(){
        return this.$store.state.menus.routeLists
      },
      set() {
        return null
      }
    }
  },
  created() {
  }
}
</script>

<style scoped>
.breadcrumb-container{
  margin-top: 24px;
  font-size: 15px;
  display: flex;
  align-items: center;
}
</style>
