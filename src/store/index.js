import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import insurance from '@/store/modules/insurance'




export default new Vuex.Store({
    modules: {
        insurance
    }
})
