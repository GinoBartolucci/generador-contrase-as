import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
