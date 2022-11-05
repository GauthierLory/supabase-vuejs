import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify.js'

createApp(App).use(vuetify).mount('#app')
