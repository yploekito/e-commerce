<template>
  <div class="home">
    <card v-for='product in products' :product='product'/>
  </div>
</template>

<script>
// @ is an alias to /src
import card from '@/components/cards.vue'
import api from '@/api/api.js'

export default {
  name: 'home',
  data(){
    return{
      products: []
    }
  },
  components: {
    card
  },

  created(){
    api
      .get('/product')
      .then(({data})=>{
        for(let i = 0; i < data.length; i++){
          this.products.push(data[i])
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>
