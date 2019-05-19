import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from '@/views/Cart.vue'
import Sell from '@/views/Sell.vue'
import Products from '@/views/Products.vue'
import eachProduct from '@/views/eachProduct.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/cart',
      name: 'cart',
      component: Cart
    }, {
      path: '/sell',
      name: 'sell',
      component: Sell
    }, {
      path: '/products',
      name: 'products',
      component: Products,
      children: [
        {
          path: '/products/:id',
          name: 'eachProduct',
          component: eachProduct
        }
      ]
    }
  ]
})
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
