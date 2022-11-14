<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "App",
    watch: {
      $route: {
        handler (to,from){
          if(to.path !== '/login'){
            let tab = {
              name: to.name,
              title: to.name
            }
            this.$store.commit('addTab',tab)
            this.$store.commit('cleanRouteList')
            this.$store.commit('setRouteList',to)
          }
        },
        immediate: true
      }
    }
  }
</script>

<style>
html, body, #app {
  font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 15px;
}
a{
  text-decoration: none;
}
</style>
