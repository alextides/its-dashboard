import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import globalMixin from '@/mixins/globalMixin'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'

// For form-wizard
require('@core/assets/fonts/feather/iconfont.css')

// Custom Mixin
Vue.mixin(globalMixin)

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('accessToken')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
})
