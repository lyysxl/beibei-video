import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import(/* webpackChunkName: "tv" */ '../views/TV.vue')
  },
  {
    path: '/movie',
    name: 'movie',
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue')
  },
  {
    path: '/player/:type/:id',
    name: 'player',
    component: () => import(/* webpackChunkName: "player" */ '../views/Player.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
