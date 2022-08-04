<template>
<div class="navbar">
    <div class="navbar-container">
        <div   class="logo"><img src="/assets/icon-left-font-monochrome-white.png" alt="logo" /> </div>
        <div v-if="checking" class="login-signup">
            <div class="logout-child"><a href='' v-on:click="logout">Logout</a></div>
        </div>
        <div v-if="!checking" class="login-signup">
            <div  class="">
                <div  class="logout-child"><router-link to="/">Login</router-link></div>
                <div  class="logout-child"><router-link to="/sign-up">SignUp</router-link></div>
            </div>
            
        </div>
    </div>
</div>
    
</template>

<script>


export default {
    name : 'navbar',


    data() {

        return {

            checking : null,
            
        }

    },
    



methods :{

    async logout() {
            localStorage.clear()
            await this.$router.push({ name: 'Login' })

        },


        

},


mounted() {
        
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.checking = false
        }else{
            this.checking = true
        }
        


    }



}



</script>