<template>
  <div>
    <b-row id="nav" align-h="between" class="p-3">
      <b-col class='d-flex'>
        <router-link to="/" class="px-4">Home</router-link>
        <router-link to="/about" class="px-4">Products</router-link>
      </b-col>
      <b-col class='d-flex flex-row justify-content-end'>
        <router-link to="/cart" class="px-4">cart</router-link>
      </b-col>
    </b-row>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
