<template>
  <div>
    <el-tabs v-model="editableTabsValue"
             type="card"
             closable
             @tab-remove="removeTab"
             @tab-click="clickTab"
    >
      <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "LayoutTab",
  data() {
    return {
      closable: true
    }
  },
  methods: {
    addTab(targetName) {

    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if(activeName === '首页'){
        this.closable = false
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({name: activeName})

    },
    clickTab(targetName) {
      this.$router.push({name: targetName.name})
    }
  },
  computed: {
    editableTabs: {
      set(val) {
        if(val !== null && val !== ''){
          this.$store.state.tabs.editableTabs = val
        }
      },
      get() {
        return this.$store.state.tabs.editableTabs
      }
    },
    editableTabsValue: {
      set(val) {
        this.$store.state.tabs.editableTabsValue = val
      },
      get() {
        return this.$store.state.tabs.editableTabsValue
      }
    }
  }
}
</script>

<style scoped>

</style>
