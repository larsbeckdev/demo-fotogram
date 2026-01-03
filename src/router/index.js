import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/HomeView.vue'),
      meta: {
        title: 'Übersicht',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: () => import('../views/error/Error404View.vue'),
      meta: {
        title: 'Seite nicht gefunden',
      },
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} – Fotogram` : 'Fotogram'
})

export default router
