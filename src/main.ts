// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'aos/dist/aos.css'
import AOS from 'aos'

const app = createApp(App)

app.use(router)

app.mount('#app')

AOS.init({
  duration: 1000,
  // easing: 'ease-in-out',
  easing: 'ease-out-quad',
  once: false
})
