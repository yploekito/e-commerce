import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    islogin: false
  },
  mutations: {
    updateCart (state, data) {
      let cartContent = data.cart
      state.cart = cartContent
      console.log(state.cart)
    },
    getCurrentCart (state, data) {
      state.cart = data
    },
    login (state) {
      state.islogin = true
    },
    logout (state) {
      state.islogin = false
    }
  },
  actions: {
    addToCart (context, payload) {
      console.log(payload)
      api
        .patch(`/user/cart/add/${payload._id}`)
        .then(({ data }) => {
          context.commit('updateCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // payload = {product:... , qty: ... }
    subtractQty (context, payload) {
      api
        .patch(`/user/cart/remove/${payload.product._id}`)
        .then(({ data }) => {
          console.log(payload.qty, 'qty')
          console.log('hello')
          for (let i = 0; i < payload.qty - 1; i++) {
            context.dispatch('addToCart', payload.product)
          }
          if (payload.qty === 1) {
            context.commit('updateCart', data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    emptyCart (context) {
      let payload = {}
      api
        .patch('/user/cart')
        .then(({ data }) => {
          // console.log(data)
          context.commit('updateCart', payload.cart = [])
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
})
