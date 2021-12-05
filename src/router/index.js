import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../layouts/Auth.vue';
import Intercity from "../views/cashier/Intercity";
import DefaultCashier from "../layouts/DefaultCashier";
import Tours from "../views/cashier/Tours";
import CreateTrip from "../views/cashier/CreateTrip";
import store from '../store'
import auth from '../middleware/auth'
import middlewarePipeline from '../middleware/middlewarePipeline'
import Ticket from "../views/cashier/Ticket";
import Register from "../views/Register";
import CarDetail from "../views/cashier/CarDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cashier',
    name: 'Cabinet',
    component: DefaultCashier,
    meta: {
      middleware: [
          auth
      ]
    },
    children: [
      {
        path: '/cashier/intercity',
        name: 'Intercity',
        component: Intercity,
      },
      {
        path: '/cashier/intercity/create',
        name: 'CreateTrip',
        component: CreateTrip
      },
      {
        path: '/cashier/intercity/:carTravelId',
        name: 'CarDetail',
        component: CarDetail
      },
      {
        path: '/cashier/tickets',
        name: 'Ticket',
        component: Ticket
      },
      {
        path: '/cashier/tours',
        name: 'Tours',
        component: Tours
      },
    ]
  },
  {
    path: '/logout',
    name: 'Logout',
    component: {
      beforeRouteEnter(to, from, next) {
        const destination = {
          path: "/",
          query: from.query,
          params: from.params
        };
        if (!from) {
          console.log("no from");
        }
        console.log("running before hook");
        store.commit('logout')
        next(destination);
      }
    }
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
  base: process.env.VUE_APP_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
