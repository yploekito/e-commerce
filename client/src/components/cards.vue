<template>
  <div class="wrapper" style="height:100%" @click.prevent="eachProduct">
    <b-card class="homeCard og" style="height:100%; background-color:#e5e5e5">
      <div class="mb-4" style="height:250px; overflow:hidden">
        <b-card-img :src="product.image" style="width:100%; overflow:hidden"/>
      </div>
      <div class="row">
        <h6 class="text-truncate col-sm-12">{{product.name}}</h6>
        <b-card-text class="col-sm-12" style="color:grey;font-size:small">{{priceFormat}}</b-card-text>
        <!-- <b-card-text v-if="status != 'home'" class='col-sm-12'>
          {{product.description}}
        </b-card-text>-->
        <b-card-text v-if="status != 'home' " class="col-sm-12">In stock:{{product.stock}}</b-card-text>
        <AddToCart v-if="status !='cart' && status != 'home' " :product="product"/>
        <div v-if="status == 'cart' ">
          <button @click.prevent="subtractQty">-</button>
          Qty: {{qtyBuy}}
          <button @click.prevent="add">+</button>
        </div>

      </div>
    </b-card>
  </div>
</template>

<script>
import AddToCart from '@/components/addToCart.vue'

export default {
  name: 'cards',
  props: ['product', 'status', 'qtyBuy'],
  // data () {
  //   return {
  //     price: this.product.price,
  //   }
  // },
  methods: {
    add () {
      this.$store.dispatch('addToCart', this.product)
    },
    subtractQty () {
      this.$store.dispatch('subtractQty', {
        product: this.product,
        qty: this.qtyBuy
      })
    },
    eachProduct () {
      this.$router.push(`/products/${this.product._id}`)
      window.scrollTo(0, 0)
      console.log('hello')
    }
  },
  components: {
    AddToCart
  },
  computed: {
    priceFormat () {
      // console.log(this.price)
      let newPrice = this.product.price + ''
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
