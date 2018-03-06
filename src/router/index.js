import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AppAuthentication from '@/components/authentication/AppAuthentication'
import AppChat from '@/components/chat/chat'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/authentication',
      name: 'AppAuthentication',
      component: AppAuthentication
    },
    {
      path: '/chat',
      name: 'AppChat',
      component: AppChat
    },
  ]
})
