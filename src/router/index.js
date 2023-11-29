import { createRouter, createWebHistory } from '@ionic/vue-router';
import Main from '../components/Main.vue'
import Exercises from '../components/Exercises.vue'
import Schedule from '../components/Schedule.vue'
import Statistics from '../components/Statistics.vue'

const routes = [
  {
    path: '/',
    redirect: '/main/exercises',
  },
  {
    path: '/main/',
    component: Main,
    children: [
      {
        path: '',
        redirect: 'exercises'
      },
      {
        path: 'exercises',
        component: Exercises        
      },
      {
        path: 'schedule',
        component: Schedule
      },
      {
        path: 'statistics',
        component: Statistics
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
