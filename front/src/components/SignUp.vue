<template>

<navbar />
 



  <div class="register">
    <input type="text" v-on:keyup.enter="signUp" v-model="firstName" placeholder="Enter name">
    <input type="text" v-on:keyup.enter="signUp" v-model="lastName" placeholder="Enter  your last name">
    <input  type="email" v-on:keyup.enter="signUp" v-model="email" placeholder="Enter email">
    <input type="password" v-on:keyup.enter="signUp" v-model="password" placeholder="Enter password">

    <button class="bn632-hover bn28" v-on:click="signUp">Sign up</button>
    <div>{{ error }}</div>
  </div>
</template>
/* eslint-disable */
<script>

import navbar from '../components/navbar.vue'


export default {
  name: 'SignUp',

  components : {
    navbar
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: ''

    }
  },


  methods: {
    async signUp() {


      //***************** */

      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


      if (!this.email.match(regexEmail)  || !this.firstName || !this.lastName || !this.email || !this.password) {
        this.error = 'Verifiez les champs'

      } else {


        fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password })
        })
          .then(response => response.json())
          .then(result => {

            if (result.error) {

              this.error = result.error._message
              console.log(result.error.message)


            } else {

              console.log(result)
              localStorage.setItem("user-info", JSON.stringify(result))
              this.$router.push({ name: 'Accueil' })
            }

          })
          
          }


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

