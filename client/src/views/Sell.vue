<template>
  <div class="container" style="color:white">
    <b-form @submit.prevent="postProduct">
      <b-form-group label="Name" label-for="name">
        <b-form-input id="name" v-model="name"/>
      </b-form-group>

      <b-form-group label="Stock" label-for="stock">
        <b-form-input id="stock" type="number" v-model="stock"/>
      </b-form-group>

      <b-form-group label="Description" label-for="description">
        <b-form-textarea id="description" v-model="description"/>
      </b-form-group>

      <b-form-group label="Category" label-for="category">
        <select id="category" class="form-control" v-model="category">
          <option>Lifestyle</option>
          <option>Sports and Hobby</option>
          <option>Productivity</option>
        </select>
      </b-form-group>

      <b-form-group label="Price" label-for="price">
        <b-form-input id="price" type="number" v-model="price"/>
      </b-form-group>

      <b-form-group label="Image" label-for="image">
        <b-form-file v-on:change="uploadImage($event)" id="image"/>
      </b-form-group>
      <!-- <b-form-group label="Image" label-for="image2">
        <b-form-input id="image2" v-model="image"/>
      </b-form-group>-->
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '@/api/api.js'
export default {
  name: 'sell',
  data () {
    return {
      options: ['General', 'Games'],
      name: '',
      stock: '',
      description: '',
      category: '',
      price: '',
      image: '',
      file: ''
    }
  },
  methods: {
    uploadImage () {
      this.file = ''
      this.file = event.target.files[0]
    },
    postProduct () {
      //   let inputObj = {
      //     name: this.name,
      //     stock: this.stock,
      //     description: this.description,
      //     category: this.category,
      //     price: this.price,
      //     image: this.file
      //   };
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('stock', this.stock)
      formData.append('description', this.description)
      formData.append('category', this.category)
      formData.append('price', this.price)
      formData.append('image', this.file)

      api
        .post('/product', formData)
        .then(({ data }) => {
          this.name = ''
          this.stock = ''
          this.description = ''
          this.category = ''
          this.price = ''
          this.image = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    islogin () {
      return this.$store.state.islogin
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
    if (!this.islogin) {
      this.$router.push('/')
    }
  }
}
</script>
