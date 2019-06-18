import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: resolve => require(['@/components/home'], resolve),
      redirect: "homepage",
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          meta: {
            keepAlive: true
          },
          component: resolve => require(['@/components/layout/homepage'], resolve),

        },
        {
          path: 'classify',
          name: 'classify',
          component: resolve => require(['@/components/layout/classify'], resolve),
          redirect: '/classify/self',
          children: [
            {
              path: 'strict',
              name: 'strict',
              component: resolve => require(['@/components/child/classify/strict'], resolve)
            },
            {
              path: 'self',
              name: 'self',
              component: resolve => require(['@/components/child/classify/self'], resolve)
            }
          ]

        }, {
          path: 'cart',
          name: 'cart',

          component: resolve => require(['@/components/layout/cart'], resolve),

        }, {
          path: 'mine',
          name: 'mine',
          component: resolve => require(['@/components/layout/mine'], resolve),

        }
      ]
    }, {
      path: "/details",
      name: "/details",
      component: resolve => require(['@/components/child/details/details'], resolve),
      children: [{
        path: "/details/ns/ns-cake-page",
        name: "/details/ns/ns-cake-page",
        component: resolve => require(['@/components/child/details/details'], resolve),
      },
      {
        path: "/details/cake-page/:pname",
        name: "/details/cake-page",
        component: resolve => require(['@/components/child/details/details'], resolve),
      },
      {
        path: "/details/rup/rup-cake-page",
        name: "/details/rup/rup-cake-page",
        component: resolve => require(['@/components/child/details/details'], resolve),
      }
        ,
      {
        path: "/details/jz/jz-cakepage/:pname",
        name: "/details/jz/jz-cakepage",
        component: resolve => require(['@/components/child/details/details'], resolve),
      }
      ]
    },{
      path: "/cake-assess/:id",
      name: "/cake-assess",
      component: resolve => require(['@/components/child/details/comment'], resolve),
    }, {
      path: '/order',
      name: 'order',
      component: resolve => require(['@/components/child/mine/order'], resolve),

    }
  ]
})

export default router
