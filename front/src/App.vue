<template>
  <!-- <nav>
    <router-link to="/sign-up">SignUp</router-link> |
    <router-link to="/login">Login</router-link>
  </nav> -->
  <router-view/>
  <!-- <SignUp /> -->
  
</template>
<script>
// import SignUp from './components/SignUp.vue'
// import Login from './components/Login.vue'
export default {
  name: 'app',
  // components: {
  //   SignUp
  // }
}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #db4d4d;
}
</style>
