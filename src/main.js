import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify.js'

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')