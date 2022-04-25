import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },  
    {
      path: '/admin',
      name: 'admin',
      component:()=>import('../src/views/admin.vue'),
      redirect:'/welcome',
      children:[
        {
          path: '/welcome',
          name: 'welcome',
          component:()=>import('../src/views/welcome.vue')
        },
        {
          path: '/users',
          name: 'users',
          component:()=>import('../src/views/users.vue')
        },
      ]
    },
  ]
})
