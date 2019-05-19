<template>
  <div>
    <section>
      <div class="mb-5">
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          controls
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            caption="Lifestyle"
            img-src="https://1627656913.rsc.cdn77.org/wp-content/uploads/2018/08/jas-pernikahan-1024x480.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Hobbies & Sports"
            img-src="https://www.brittanyflyfishing.com/wp-content/uploads/2019/04/03-jaudy-3579.png"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Productivity"
            img-src="https://techbeacon.com/sites/default/files/styles/social/public/field/image/getting-most-out-of-testing-tools.jpg?itok=DVnScMPA"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </section>
    <b-container class="mt-5">
      <b-row>
        <card
          v-for="(product,index) in products.slice(0,4)"
          :product="product"
          :status="status"
          :key="index"
          class="col-sm-6 col-md-4 col-lg-3 col-12 my-3"
          style="height:375px"
        />
      </b-row>
    </b-container>

    <div
      v-for="image in images"
      class="row my-5 categories p-5 justify-content-between"
      style="background-color:#202020; text-align:right; vertical-align:center"
      :key="image[2]" @click.prevent='gotoProducts'
    >
      <category :image="image" :category="image[2]"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import card from '@/components/cards.vue'
import api from '@/api/api.js'
import category from '@/components/gotoCategory.vue'

export default {
  name: 'home',
  data () {
    return {
      products: [],
      status: 'home',
      images: [
        [
          'http://pngimg.com/uploads/men_shoes/men_shoes_PNG7491.png',
          'http://pngimg.com/uploads/watches/watches_PNG9876.png',
          'lifestyle'
        ],
        [
          'http://pngimg.com/uploads/golf/golf_PNG88.png',
          'http://pngimg.com/uploads/lego/lego_PNG62.png',
          'Sports & Hobby'
        ],
        [
          'http://pngimg.com/uploads/macbook/macbook_PNG82.png',
          'http://pngimg.com/uploads/screwdriver/screwdriver_PNG9515.png',
          'Productivity'
        ]
      ]
    }
  },
  components: {
    card,
    category
  },
  computed: {
    islogin () {
      return this.$store.state.islogin
    }
  },
  watch: {
    islogin: function () {
      if (this.islogin) {
        this.fetchData()
      } else {
        this.products = []
      }
    }
  },
  methods: {
    gotoProducts () {
      this.$router.push('/products')
    },
    fetchData () {
      api
        .get('/product')
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            this.products.push(data[i])
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (!this.$store.state.islogin) {
    } else {
      this.fetchData()
    }
  }
}
</script>
