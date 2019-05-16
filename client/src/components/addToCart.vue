<template>
  <div>
    <button @click.prevent="addToCart">add to cart</button>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "AddToCartButton",
  props: ["product"],
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.product);
    }
  }
};
</script>
