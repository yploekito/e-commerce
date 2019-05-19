<template>
  <div>
    <form @submit.prevent="addToCart">
      <b-button type="submit" class='mx-2 bg-success'>
        <i class="fas fa-cart-plus"></i>
      </b-button>
      <b-button @click.prevent="addQty(-1)">-</b-button>
      {{qty}}
      <b-button @click.prevent="addQty(1)">+</b-button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'AddToCartButton',
  props: ['product'],
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    addQty (number) {
      if (this.qty + number > 0 && this.qty + number <= this.product.stock) {
        this.qty += number
      }
    },
    addToCart () {
      for (let i = 0; i < this.qty; i++) {
        this.$store.dispatch('addToCart', this.product)
      }
    }
  },
  created () {
    // console.log(this.$route.params)
  }
}
</script>
