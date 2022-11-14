<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <layout-navbar></layout-navbar>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <layout-tab></layout-tab>
          <div><layout-header-info class="main-window-info"></layout-header-info></div>
          <div class="main-window-container"><router-view></router-view></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutHeader from "@/components/LayoutHeader";
import LayoutNavbar from "@/components/LayoutNavbar";
import LayoutTab from "@/components/LayoutTab";
import LayoutHeaderInfo from "@/components/LayoutHeaderInfo";
export default {
  name: "DashBoard",
  components: {
    LayoutHeader,
    LayoutNavbar,
    LayoutTab,
    LayoutHeaderInfo,
  }
}
</script>

<style scoped>
.main-window-info{
  margin-left: 20px;
  margin-bottom: 10px;
}
.main-window-container{
  padding: 5px;
  margin: 0 20px;

}
.el-container{
  padding: 0;
  margin: 0;
  height: 100vh;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  height: 100vh;
  background-color: #D3DCE6;
  color: #333;
  /*text-align: center;*/
  line-height: 200px;
}
.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  /*text-align: center;*/
  /*line-height: 20px;*/
  padding: 0;
}
.el-menu-vertical-demo {
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>
