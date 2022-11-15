import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default {
    state: {
        fileName: '',
    },
    getters: {
    },
    mutations: {
        setFileName(state,name) {
            state.fileName = name
        }
    },
    actions: {
    },
}
