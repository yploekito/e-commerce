<template>
  <div
    class="row justify-content-between"
    style="background-color:#202020; text-align:right; vertical-align:center"
  >
    <section v-scroll-reveal.reset class="col-sm-1">
      <img :src="image[0]" style="width:25vw">
    </section>
    <section v-scroll-reveal.reset="{ delay: 150 }" class="col-sm-5">
      <img :src="image[1]" style="width:25vw;">
    </section>
    <section style="color:white; vertical-align:center" v-scroll-reveal.reset="{ delay: 300 }">
      <h1 class="goto">{{category}} ></h1>
    </section>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: ['image', 'category']
}
</script>
