<template>
  <div class='row justify-content-center'>
    <b-button class="bg-primary" @click="changePage(-1)">&lt;</b-button>
    <b-button class="bg-success" @click="toFirstPage">First Page</b-button>
    <div class=' px-3 pt-2' style='color:white'>{{currentPage}} </div>
    <b-button class="bg-success" @click="toLastPage">Last Page</b-button>
    <b-button class="bg-primary" @click="changePage(1)">&gt;</b-button>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  // props:['perPage', 'data'],
  props: ['perPage', 'data'],
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    paginatedData () {
      let start = (this.currentPage - 1) * this.perPage
      let end = start + this.perPage
      return this.data.slice(start, end)
    },
    lastPage () {
      return Math.ceil(this.data.length / this.perPage)
    }
  },
  watch: {
    paginatedData () {
      this.$emit('paged', this.paginatedData)
    }
  },
  methods: {
    changePage (number) {
      if (
        this.currentPage + number > 0 &&
        this.currentPage + number <= this.lastPage
      ) {
        this.currentPage += number
        console.log(this.paginatedData)
      }
    },
    toFirstPage () {
      this.currentPage = 1
    },
    toLastPage () {
      this.currentPage = this.lastPage
    }
  },
  created () {
    // console.log(this.paginatedData)
    // this.$emit('paged', this.paginatedData)
  }
}
</script>
