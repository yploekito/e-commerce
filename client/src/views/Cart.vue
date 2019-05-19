<template>
  <div class="container">
    <b-card>
      <h3>Your Cart</h3>
      <div v-for="(product,index) in cart[0]" :key="index" style="height:300px">
        <b-row class="row" style="height:80%">
          <div class="col-sm-3" style="height:80%">
            <img :src="product.image" style="height:100%">
          </div>
          <div class="col-sm-9">
            <b-card-body>
              <b>Product Name:</b>
              {{product.name}}
            </b-card-body>
            <b-card-body>
              <b>Product Description:</b>
              {{product.description}}
            </b-card-body>
            <b-card-body>
              <b>Price :</b>
              {{getPriceFormat(product.price)}} ({{cart[1][index]}})
            </b-card-body>
          </div>
          <div class="col-sm-12">
            <button @click.prevent="subtractQty(product, cart[1][index])">-</button>
            quantity in your cart: {{cart[1][index]}}
            <button
              @click.prevent="add(product.stock, cart[1][index], product)"
            >+</button>
          </div>
        </b-row>
      </div>
      <!-- <card
      v-for="(product,index) in cart[0]"
      :key="index"
      :product="product"
      :status="status"
      :qtyBuy="cart[1][index]"
      class="col-sm-6 col-md-4 col-lg-3 col-12 my-3"
      />-->
      <b-row class="justify-content-between">
        <div class="col">
          <h2>Total: {{total}}</h2>
        </div>
        <div class="col">
          <b-row class="justify-content-end">
            <div class="mx-2">
              <b-button class="bg-danger" @click="emptyCart">Empty Cart</b-button>
            </div>
            <div class="mx-2">
              <b-button class="bg-success">Checkout</b-button>
            </div>
          </b-row>
        </div>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import api from '@/api/api.js'
// import { mapState } from 'vuex'
export default {
  name: 'cart',
  data () {
    return {
      status: 'cart'
    }
  },
  watch: {
    islogin: function () {
      if (this.islogin) {
      } else {
        this.$router.push('/')
      }
    }
  },
  computed: {
    cart () {
      let readyCart = {}
      let qtyCounter = {}
      console.log(this.$store.state.cart, '<<<<<')
      if (this.$store.state.cart) {
        this.$store.state.cart.forEach(product => {
          if (!readyCart[product._id]) {
            readyCart[product._id] = product
            qtyCounter[product._id] = {}
            qtyCounter[product._id] = 1
          } else {
            qtyCounter[product._id] += 1
          }
        })
        let cart = []
        let qty = []
        Object.keys(readyCart).forEach(key => {
          cart.push(readyCart[key])
          qty.push(qtyCounter[key])
        })
        return [cart, qty]
      } else {
        return [[], []]
      }
    },
    total () {
      let total = 0
      this.$store.state.cart.forEach(product => {
        total += product.price
      })
      return this.getPriceFormat(total)
    },
    islogin () {
      return this.$store.state.islogin
    }
  },
  methods: {
    emptyCart () {
      console.log('emptying cart')
      this.$store.dispatch('emptyCart')
    },
    getPriceFormat (price) {
      let newPrice = price + ''
      let array = []
      for (let i = newPrice.length - 1; i >= 0; i -= 3) {
        let first = newPrice[i - 2] || ''
        let second = newPrice[i - 1] || ''
        let temp = first + second + newPrice[i]
        array.unshift(temp)
      }
      newPrice = array.join('.')
      newPrice = 'IDR ' + newPrice
      return newPrice
    },
    subtractQty (product, currentQty) {
      if (currentQty - 1 >= 0) {
        this.$store.dispatch('subtractQty', {
          product: product,
          qty: currentQty
        })
      }
    },
    add (stock, currentQty, product) {
      if (currentQty + 1 <= stock) {
        this.$store.dispatch('addToCart', product)
      }
    }
  },
  created () {
    if (!this.islogin) {
      this.$router.push('/')
    } else {
      api
        .get('/user/cart')
        .then(({ data }) => {
          this.$store.commit('getCurrentCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
