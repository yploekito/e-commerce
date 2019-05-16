import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import api from '@/api/api.js'

export default new Vuex.Store({
  state: {
    cart:[]
  },
  mutations: {

  },
  actions: {
      addToCart(state, payload){
          console.log(payload)
          api
            .patch(`/user/cart/add/${payload._id}`)
            .then(({data})=>{
            })
            .catch(err=>{
                console.log(err)
            })
      }

  }
})
