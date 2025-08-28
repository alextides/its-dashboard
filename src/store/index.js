import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import auth from './auth'
import courseFinder from './course-finder'
import examForm from './exam-form'
import schoolDB from './school-db'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    courseFinder,
    examForm,
    appConfig,
    verticalMenu,
    schoolDB,
  },
  strict: process.env.DEV,
})
