import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { makeServer } from "./server"

if (import.meta.env.DEV) {
   await makeServer()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
