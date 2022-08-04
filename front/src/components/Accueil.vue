<template>
  <div class="container">
    <navbar />
    <createPost />
    <wall />
  </div>



</template>

<script>
import createPost from '../components/createPost.vue'
import wall from '../components/wall.vue' 
import navbar from '../components/navbar.vue' 



export default {

  name: 'Accueil',

 
  
  components: {
    navbar,
    createPost,
    wall

  },


mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'signup' })
        }
        
        

        
        


    }
}
</script>

<style>
</style>