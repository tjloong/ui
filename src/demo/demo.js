import Vue from 'vue'
import Demo from './demo.vue'
import SectionTitle from './title.vue'
import JUI from '../main.js'

import 'tailwindcss/tailwind.css'

Vue.config.productionTip = false

Vue.use(JUI)
Vue.component('section-title', SectionTitle)

new Vue({
  render: h => h(Demo),
}).$mount('#app')
