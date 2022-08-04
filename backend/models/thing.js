const mongoose = require('mongoose')



const postSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    date: String,
    time: String,
    imageUrl: String, 
    message: String,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String]
})

module.exports = mongoose.model('Post', postSchema)