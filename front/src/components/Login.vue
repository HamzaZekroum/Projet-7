<template>

<navbar />

  
  

  <div class="register">


    <input type="text" v-on:keyup.enter="login" v-model="email" placeholder="Enter email">
    <input type="password" v-on:keyup.enter="login" v-model="password" placeholder="Enter password">
    <button class="bn632-hover bn28" v-on:click="login">Login</button>
    <div>{{error}}</div>

  </div>
</template>
/* eslint-disable */

<script>

import navbar from '../components/navbar.vue'

export default {
  name: 'Login',


  components : {
    navbar
  },

  data() {
    return {

      email: '',
      password: '',
      error: ''

    }
  },
  methods: {
    async login() {

      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password })

      })
      .then(response => response.json())
      .then(result => {

        if(result.error) {

        this.error = result.error


        }else{
        
        console.log(result)
        localStorage.setItem("user-info", JSON.stringify(result))
        this.$router.push({ name: 'Accueil' })
        }
      

      })

    }

  },

  mounted() {
    let user = localStorage.getItem('user-info');
    if (user) {
      this.$router.push({ name: 'Accueil' })
    }

  }


}
</script>
