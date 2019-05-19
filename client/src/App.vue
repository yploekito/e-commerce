<template>
  <div>
    <b-navbar id="nav" align-h="between" class="p-3" sticky>
      <b-col class="d-flex">
        <router-link to="/" class="px-4">
          <img
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/551/2002088551_bb090502-e605-471d-a94f-e5a2e97c1f1a.png?cb=1558195078')"
            style="width:15vw"
          >
        </router-link>
        <router-link v-if="islogin" to="/products" class="px-4" light>Products</router-link>
      </b-col>
      <b-col class="d-flex flex-row justify-content-end">
        <router-link v-if="islogin" to="/sell" class="px-4">sell</router-link>
        <router-link v-if="islogin" to="/cart" class="px-4">cart</router-link>
        <a class="px-4" @click="$bvModal.show('login-modal')" href="#" v-if="!islogin"><div v-if='!register'>login</div><div v-else>register</div></a>
        <a class="px-4" href='#' v-else @click.prevent="logout">logout</a>
      </b-col>
    </b-navbar>
    <div>
      <router-view/>
    </div>
    <b-modal id="login-modal" hide-footer>
      <template slot="modal-title">Login Here</template>
      <div class="d-block text-center">
        <div>

          <b-form @submit.prevent="submit"  >
            <b-form-group
              id="name"
              label="Your Name:"
              label-for="name"
              v-if='register'
            >
              <b-form-input
                id="input-name"
                v-model="name"
                required
                placeholder="Enter name"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Password:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
          <a href="#" v-if='!register' @click.prevent='toRegister(true)'>no account yet? click here</a>
          <a href='#' v-if='register' @click.prevent='toRegister(false)'>already have an account? click here</a>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      islogin: false,
      email: '',
      password: '',
      name: '',
      register: false
    }
  },
  methods: {
    submit () {
      if (!this.register) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/signin',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            this.$store.commit('login')
            this.islogin = true
            this.$bvModal.hide('login-modal')
            this.email = ''
            this.password = ''
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:3000/signup',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            return axios({
              method: 'post',
              url: 'http://localhost:3000/signin',
              data: {
                email: this.email,
                password: this.password
              }
            })
          })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            this.$store.commit('login')
            this.islogin = true
            this.$bvModal.hide('login-modal')
            this.email = ''
            this.password = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    logout () {
      localStorage.removeItem('token')
      this.islogin = false
      this.$store.commit('logout')
    },
    toRegister (data) {
      this.register = data
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('login')
    }
    this.islogin = this.$store.state.islogin
    console.log(this.islogin, 'hiii')
  }
}
</script>
