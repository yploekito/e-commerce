<template>
  <div>
    <div style="background-color: #333333; color:#d6d6d6">
      <div class="container">
        <div class="row justify-content-left px-5">
          <div
            style="text-align:center"
            class="navCategory col"
            v-for="category in categories"
            :key="category"
            @click="changeCategory(category)"
          >{{category}}</div>
        </div>
      </div>
    </div>
    <router-view/>
    <b-container class="mt-5">
      <b-row id="paged">
        <card
          v-for="(product,index) in pagedProduct"
          :product="product"
          :status="status"
          :key="index"
          class="col-sm-6 col-md-4 col-lg-3 col-12 my-3"
          style="height:475px"
        ></card>
      </b-row>
    </b-container>
    <pagination @paged="paged" :perPage="perPage" :data="productInActiveCategory"/>
    <!-- <pagination @paged='paged' :data='productInActiveCategory' :perPage="perPage"></pagination> -->
  </div>
</template>

<script>
import api from '@/api/api.js'
import card from '@/components/cards.vue'
import pagination from '@/components/pagination.vue'
export default {
  name: 'products',
  data () {
    return {
      categories: ['Lifestyle', 'Sports and Hobby', 'Productivity'],
      products: {
        Lifestyle: [],
        'Sports and Hobby': [],
        Productivity: []
      },
      activeCategory: 'Productivity',
      status: 'products',
      currentPage: 1,
      perPage: 4,
      pagedProduct: ''
    }
  },
  components: { card, pagination },
  computed: {
    productInActiveCategory: function () {
      return this.products[this.activeCategory]
    },
    islogin () {
      return this.$store.state.islogin
    }

    // paginatedData(){
    //     let start=(this.currentPage-1) * this.perPage
    //     let end = start + this.perPage
    //     return this.productInActiveCategory.slice(start,end)
    // }
  },
  methods: {
    paged (data) {
      this.pagedProduct = data
      //   console.log(data);
      //   this.pagedProduct = data
    },
    changeCategory (category) {
      this.activeCategory = category
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
  created () {
    console.log(this.$store.state.islogin)
    if (!this.islogin) {
      this.$router.push('/')
    } else {
      api
        .get('/product')
        .then(({ data }) => {
          for (let i = 0; i < Object.keys(this.products).length; i++) {
            this.products[Object.keys(this.products)[i]] = []
            console.log(data)
          }
          data.forEach(eachData => {
            // filter by category
            let currentCategory = eachData.category
            if (currentCategory) {
              this.products[currentCategory].push(eachData)
            }
          })
        })
        .catch(err => {
          console.log('disini error')
          console.log(err)
        })
    }
  }
}
</script>
