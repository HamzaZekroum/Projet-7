<template>
    
    <div class="welcome"> Welcome <h2> {{firstName.charAt(0).toUpperCase() + firstName.slice(1) }} {{lastName}},</h2> Enjoy reading and posting</div>
    <div class="createTxt">
        <div class="txt">

            <textarea v-model="post" rows="5" cols="80" placeholder="type here">
          
        </textarea>
        </div>
        <div class="image-father">
            <div class="image-edit">
                <img v-if="image" :src="url" alt="image for post" >
            </div>
        </div>
        <div class="btn-upload">
            <input type="file" name="imageUrl" accept="image/png, image/jpeg" @change="uploadImage">

        </div>
        <div class="btn-post">
            <button v-if="image && post " v-on:click="send" class="bn632-hover bn28">Post</button>
        </div>
    </div>
</template>

<script>



export default {
    name: 'createPost',

    


    data() {
            
        
        return {



            post: '',
            image: '',
            userId: JSON.parse(localStorage.getItem('user-info')).userId,
            token: JSON.parse(localStorage.getItem('user-info')).token,
            firstName: JSON.parse(localStorage.getItem('user-info')).firstName,
            lastName: JSON.parse(localStorage.getItem('user-info')).lastName,
            url: null

        }
    },






    methods: {

        send() {

            let formData = new FormData()

            formData.append('post', JSON.stringify({ message: this.post, firstName: this.firstName, lastName: this.lastName , userId : this.userId}))
            formData.append('image', this.image)

            fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + this.token,
                },
                body: formData,





            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    location.reload();
                })
                .catch(error => console.log(error.error))
                





        },

        

        

        uploadImage(event) {
            this.image = event.target.files[0]
            this.url = URL.createObjectURL(this.image);
        }



    },
    



}
</script>