import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import Accueil from '../components/Accueil.vue'
import wall from '../components/wall.vue'
import createPost from '../components/createPost.vue'
import editPost from '../components/editPost.vue'
import navbar from '../components/navbar.vue'
import notFound from '../components/notFound.vue'


const routes = [
  {
    path: '/Accueil',
    name: 'Accueil',
    component: Accueil
    
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  

  {
    path : '/wall',
    name: 'wall',
    component : wall

  },

  {
    path: '/createPost',
    name: 'createPost',
    component: createPost
  },
  {
    path: '/editPost/:id',
    name: 'editPost',
    component: editPost
  },
  
  {
    path: '/navbar',
    name: 'navbar',
    component: navbar
  },
  {
    path: '/:notFound(.*)*',
    name: 'notFound',
    component: notFound
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
