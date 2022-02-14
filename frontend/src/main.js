import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LayoutPlugin } from  'bootstrap-vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faClone,
  faSearch,
  faUserLock,
  faTrashAlt,
  faBell,
  faUserEdit,
  faTimesCircle,
  faPencilAlt,
  faCheckCircle,
  faFileImport,
  faImage,
  faEye,
  faEyeSlash,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faEye, faEyeSlash, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faClone, faSearch, faUserLock, faTrashAlt, faBell, faUserEdit, faTimesCircle, faPencilAlt, faCheckCircle, faFileImport, faImage);
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
