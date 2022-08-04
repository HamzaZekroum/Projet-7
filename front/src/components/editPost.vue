<template>

<navbar/>
    
    <div class="createTxt">
        <div class="welcome"> Post editing </div>
        <div class="txt">

            <textarea v-model="message" rows="5" cols="80">

        </textarea>
        </div>
        <div class="image-father">
            <div class="image-edit">
                <img :src="url" alt="post image">
            </div>
        </div>

        <div class="btn-upload">
            <input type="file" name="imageUrl" accept="image/png, image/jpeg" @change="uploadImage">
        </div>
        <div  v-if="message" class="btn-post">
            <button  v-on:click="edit" class="bn632-hover bn28">Save</button>
        </div>
        <div class="btn-post">
            <router-link to="/"><button class="bn632-hover bn28">Back</button></router-link>
        </div>
    </div>
</template>

<script>
import navbar from '../components/navbar.vue' 

export default {
    name: 'editPost',

    components : {
        navbar

    },



    data() {

        return {

            message: '',
            image: '',
            token: JSON.parse(localStorage.getItem('user-info')).token,
            userId: JSON.parse(localStorage.getItem('user-info')).userId,
            id: '',
            url: ''
        }
    },


    created() {
        this.id = this.$route.params.id

    },



    async mounted() {



        fetch(`http://localhost:3000/api/posts/${this.id}`, {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + this.token,
            },
        })
            .then(response => response.json())
            .then(post => {
                console.log(post)
                this.message = post.message
                this.url = post.imageUrl
            })
            .catch(error => console.log(error.error))

    },

    methods: {



        uploadImage(event) {
            this.image = event.target.files[0]
            this.url = URL.createObjectURL(this.image);


        },



        edit() {

            if (!this.image) {
                fetch(`http://localhost:3000/api/posts/${this.id}`, {
                    method: 'PUT',
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({

                        message: this.message

                    })

                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.$router.push({ name: 'Accueil' })
                    })
                    .catch(error => console.log(error.error))

            } else {

                let formData = new FormData()

                formData.append('post', JSON.stringify({ message: this.message }))
                formData.append('image', this.image)

                fetch(`http://localhost:3000/api/posts/${this.id}`, {
                    method: 'PUT',
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                    },
                    body: formData,

                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.$router.push({ name: 'Accueil' })

                    })
                    .catch(error => console.log(error.error))






            }
        },

        

    }




}
</script>
