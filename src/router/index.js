import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/layouts/Auth.vue';
import Intercity from "../views/cashier/Intercity";
//import Cabinet from "../views/cashier/Cabinet";
import DefaultCashier from "../layouts/DefaultCashier";
import Tours from "../views/cashier/Tours";
import Hotels from "../views/cashier/Hotels";
import CreateTrip from "../views/cashier/CreateTrip";

Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home
  },*/
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/cashier',
    name: 'Cabinet',
    component: DefaultCashier,
    children: [
      {
        path: '/cashier/intercity',
        name: 'Intercity',
        component: Intercity,
        children: [
          {
            path: '/cashier/intercity/create',
            name: 'CreateTrip',
            component: CreateTrip
          }
        ]
      },
      {
        path: '/cashier/hotels',
        name: 'Hotels',
        component: Hotels
      },
      {
        path: '/cashier/tours',
        name: 'Tours',
        component: Tours
      },
    ]
  },
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
