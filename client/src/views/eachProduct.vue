<template>
  <div>
    <div
      class="fluid-container"
      style="background-image:url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/4RUieTItxik2c5fvx/vector-mesh-modern-technology-abstract-background-geometric-structure-fractal-ultra-high-definition-4k-seamless-loop_rtdsc48d__F0000.png')"
    >
      <div class="row justify-content-end">
        <div class="col-sm-7 col-12 p-5" style="background-color:rgba(241, 240, 240, 0.75)">
          <div class="row">
            <div class="col-12" style="text-align:right">
              <b-row class="justify-content-end">
                <h1>{{currentProduct.name}}</h1>
                <p class="p-2" style="font-size:large">{{priceFormat}}</p>
              </b-row>
            </div>
            <div class="col-12" style="text-align:right">
              <p>Description:</p>
            </div>
            <div class="col-12" style="text-align:right">
              <p>{{currentProduct.description}}</p>
            </div>
            <div class="col-12 py-5" style="text-align:right">
              <addToCart :product="currentProduct"/>
            </div>
          </div>
          <!-- {{currentProduct}} -->
        </div>
        <div class="col-sm-5" style="background-color:white">
          <img :src="currentProduct.image" style="width:80%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";
import addToCart from "@/components/addToCart.vue";

export default {
  name: "productDetail",
  data() {
    return {
      currentProduct: ""
    };
  },
  components: {
    addToCart
  },
  watch: {
    "$route.params.id": {
      handler: function() {
        api
          .get(`/product/${this.$route.params.id}`)
          .then(({ data }) => {
            this.currentProduct = data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      deep: true
    },
    islogin: function() {
      if (this.islogin) {
        //   this.fetchData()
      } else {
        console.log(this.islogin, "kok gak bisa");
        this.$router.push("/");
      }
    }
  },
  //   components: {
  //     card
  //   },
  methods: {
    fetchData() {
      api
        .get(`/product/${this.$route.params.id}`)
        .then(({ data }) => {
          this.currentProduct = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!this.islogin) {
      this.$router.push("/");
    } else {
      console.log("sukses login");
      this.fetchData();
    }
  },
  computed: {
    priceFormat() {
      // console.log(this.price)
      let newPrice = this.currentProduct.price + "";
      let array = [];
      for (let i = newPrice.length - 1; i >= 0; i -= 3) {
        let first = newPrice[i - 2] || "";
        let second = newPrice[i - 1] || "";
        let temp = first + second + newPrice[i];
        array.unshift(temp);
      }
      newPrice = array.join(".");
      newPrice = "IDR " + newPrice;
      return newPrice;
    },
    islogin() {
      return this.$store.state.islogin;
    }
  }
};
</script>
