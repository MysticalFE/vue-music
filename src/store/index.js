import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'  //vuex控制台打印
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'//在非生产环境下，使用严格模式

export default new Vuex.Store({
    strict: debug, //在非生产环境下，使用严格模式
    plugins: debug ?[createLogger()] : [],
    actions,
    getters,
    state,
    mutations
})
