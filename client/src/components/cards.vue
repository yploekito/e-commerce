<template>
  <div>
    <h4>{{product.name}}</h4>
      <b-card :img-src="product.image" img-alt="Card image" img-top>
      <b-card-text>
        {{priceFormat}}
        {{product.description}}
      </b-card-text>
      <AddToCart :product='product'/>
    </b-card>  
  </div>
</template>

<script>
import AddToCart from '@/components/addToCart.vue'

export default {
  name: 'cards',
  props: ['product'],
  data(){
    return {
      price: this.product.price
    }
  },
  components:{
    AddToCart
  },
  computed:{
    priceFormat(){
      let newPrice = this.price +''
      let array = []
      for(let i = newPrice.length-1; i>=0; i-=3){
        let first = newPrice[i-2] || ''
        let second = newPrice[i-1] || ''
        let temp = first+ second + newPrice[i]
        array.unshift(temp)
      }
      newPrice = array.join('.')
      newPrice = 'Rp' + newPrice
      return newPrice
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

