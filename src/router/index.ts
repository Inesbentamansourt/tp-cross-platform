import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'
import UpdatePage from '../views/UpdatePage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
 {
  path: '/DetailPage',
  name: 'DetailPage',
  component: DetailPage,
},
{
  path: '/UpdatePage',
  name: 'UpdatePage',
  component: UpdatePage,
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
