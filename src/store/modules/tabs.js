import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default {
    state: {
        editableTabsValue: 'Index',
        editableTabs: [{name: '首页', title: '首页'}]
    },
    getters: {
    },
    mutations: {
        addTab(state, tabName) {
            let index = state.editableTabs.findIndex(i => i.name === tabName.name);
            if(index === -1 && tabName.title !== null && tabName.name !== null){
                state.editableTabs.push({
                    title: tabName.title,
                    name: tabName.name,
                })
            }
            state.editableTabsValue = tabName.name
        }
    },
    actions: {
    },
}
