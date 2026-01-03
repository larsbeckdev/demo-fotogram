import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Root component
import App from './App.vue'
import router from './router'

// CSS
import '@/assets/css/main.css'
import '@/assets/css/layout.css'

// Fonts
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/space-grotesk'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
