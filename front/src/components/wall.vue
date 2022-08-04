<template>
    <div class="getposts">
        <!-- Card -->
        <div v-for="post in posts" class="card">
            <!-- Post Header -->
            <div class="post-header">
                <div class="Profile-name"> {{ post.firstName.charAt(0).toUpperCase() + post.firstName.slice(1)  }} {{ post.lastName }}</div>
                <div class="time">{{ post.time }} {{ post.date }}</div>
            </div>
            <!-- image -->
            <div class="card-img"> <img :src="post.imageUrl" alt="post image"></div>
            <!-- Text -->
            <div class="card-txt">
                <p>{{ post.message }} </p>
            </div>
            <!-- Edit and Delete -->
            <div v-if="userId == post.userId || userId == adminId " class="btns">
                <div class="router">
                    <router-link :to="`/editPost/${post._id}`">
                        <button class="bn632-hover bn28">Edit</button>
                    </router-link>
                </div>
                <div class="router">
                    <button @click="deletePost(post._id)" class="bn632-hover bn28">Delete</button>
                </div>

            </div>
            <!-- Likes -->
            <div class="likes">
                <a v-if="!post.usersDisliked.includes(userId)" style="cursor : pointer " @click="like(post._id)">
                    <span :style="post.usersLiked.includes(userId) ? 'color : red;' : 'color : black;'" class="material-symbols-outlined">
                        
                        thumb_up
                        
                    </span>
                </a>
                <span class="likesNumer"> {{ post.usersLiked.length }}</span>
                /
                <a v-if="!post.usersLiked.includes(userId)" style="cursor : pointer " @click="disLike(post._id)">
                    <span :style="post.usersDisliked.includes(userId) ? 'color : red;' : 'color : black;' " class=" material-symbols-outlined">
                        thumb_down
                    </span>
                </a>
                <span class="likesNumer"> {{ post.usersDisliked.length}}</span>
            </div>
            <!-- <div>users liked {{ post.usersLiked }}</div>
            <div>users disliked {{ post.usersDisliked }}</div> -->


        </div>
        <!-- End of CARD -->






    </div>
</template>

<script>






export default {



    name: 'wall',


    data() {
        return {
            name: '',
            firstName: JSON.parse(localStorage.getItem('user-info')).firstName,
            userId: JSON.parse(localStorage.getItem('user-info')).userId,
            token: JSON.parse(localStorage.getItem('user-info')).token,
            adminId : process.env.VUE_APP_ID,






            posts: [],

        }

    },


    methods: {

        deletePost(id) {
            console.log(id)
            fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + this.token,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.posts.splice(this.posts.findIndex(post => post._id === id), 1)

                })
                .catch(error => console.log(error.error))




        },



        like(id) {


//vue code

            let result = this.posts.find(post => post._id == id)   // find post by post  object id
            let condition = (result.usersLiked.includes(this.userId)) // checking if post iclude userid in userslikes
            

            if (!condition) {      // if the userid didnt icludes 

                
                result.usersLiked.push(this.userId)     //pushing the userid in the usersliked array


                let total = result.usersLiked.length  //  caclul how many usersid on the usersliked array

                result.likes = total     // updating the vue model by the new calcul


                console.log(total) //

// API code

                fetch(`http://localhost:3000/api/posts/${id}/like`, {
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        like: 1
                    })



                })
                    .then().then(response => response.json())
                    .then(data => {

                        console.log(data)

                    })
                    .catch(error => console.log(error.error))

            } else {


// vue code
                result.usersLiked.splice(result.usersLiked.findIndex(usersLiked => usersLiked.id === id), 1)
                
                let total = result.usersLiked.length  //  caclul how many usersid on the usersliked array

                result.likes = total     // updating the vue model by the new calcul


                console.log(total) //


// API code

                fetch(`http://localhost:3000/api/posts/${id}/like`, {
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        like: 0
                    })

                })
                    .then().then(response => response.json())
                    .then(data => {

                        console.log(data)


                    })
                    .catch(error => console.log(error.error))
            }


        },
        disLike(id) {


//vue code

            let result = this.posts.find(post => post._id == id)   // find post by post  object id
            let condition = (result.usersDisliked.includes(this.userId)) // checking if post iclude userid in userslikes
            

            if (!condition) {      // if the userid didnt icludes 

                
                result.usersDisliked.push(this.userId)     //pushing the userid in the usersliked array


                let total = result.usersDisliked.length  //  caclul how many usersid on the usersliked array

                result.dislikes = total     // updating the vue model by the new calcul


                console.log(total) //

// API code

                fetch(`http://localhost:3000/api/posts/${id}/like`, {
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        like: -1
                    })



                })
                    .then().then(response => response.json())
                    .then(data => {

                        console.log(data)

                    })
                    .catch(error => console.log(error.error))

            } else {


// vue code
                result.usersDisliked.splice(result.usersDisliked.findIndex(usersDisliked => usersDisliked.id === id), 1)
                
                let total = result.usersDisliked.length  //  caclul how many usersid on the usersliked array

                result.dislikes = total     // updating the vue model by the new calcul


                console.log(total) //


// API code

                fetch(`http://localhost:3000/api/posts/${id}/like`, {
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        like: 0
                    })

                })
                    .then().then(response => response.json())
                    .then(data => {

                        console.log(data)


                    })
                    .catch(error => console.log(error.error))
            }


        },



 

    },

    async mounted() {

        


        fetch('http://localhost:3000/api/posts', {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + this.token,
            },
        })
            .then().then(response => response.json())
            .then(data => {
                console.log(data)
                this.posts = data.reverse()
            })
            .catch(error => console.log(error.error))

        


    },



}

</script>