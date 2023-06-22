
const routes = [
  {
    path: '/',
    component: () => import('layouts/Home.vue')
  },
  {
    path: '/event',
    component: () => import('layouts/Event.vue')
  },
  {
    path: '/record',
    component: () => import('layouts/Record.vue')
  },
  {
    path: '/mine',
    component: () => import('layouts/Mine.vue')
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/register',
    component: () => import('layouts/Register.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
