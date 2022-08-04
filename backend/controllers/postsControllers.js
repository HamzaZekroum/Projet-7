const Post = require("../models/thing");
const fs = require("fs");
  
function createPost(req, res, next) {
  const date = new Date();
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log(req.body);
  const thingObject = JSON.parse(req.body.post);
  delete thingObject._id;
  const thing = new Post({
    ...thingObject,
    likes: 0,
    dislikes: 0,
    usersLiked : [],
    usersDisliked : [],
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    date:
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear(),
    time: time,
    //name : username
    //lastname : userlastname
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
}

function modifyPost(req, res, next) {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
}

function deletePost(req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = thing.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
}

function getAllPosts(req, res, next) {
  Post.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
}

function getOnePost(req, res, next) {
  Post.findOne({ _id: req.params.id })

    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
}

function likes(req, res, next) { 
 console.log(req.params.id)
 console.log(req.body.userId)
 console.log(req.body.like)

  if (req.body.like == 1) {

    
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { usersLiked: req.body.userId }, $pull: { usersDisliked: req.body.userId } }

    )
    // Post.findOneAndUpdate(
    //   { _id: req.params.id },
    //   { $pull: { usersDisliked: req.body.userId } }
    // )

    

      .then(res.status(200).json({ message: `I like the post  ` }))
      .catch((error) => res.status(404).json({ error }));
  }

  if (req.body.like == -1) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { usersDisliked: req.body.userId }, $pull: { usersLiked: req.body.userId } }
    )
    // Post.findOneAndUpdate(
    //   { _id: req.params.id },
    //   { $pull: { usersLiked: req.body.userId } }
    // )


      .then(res.status(200).json({ message: "I dont like this post" }))
      .catch((error) => res.status(404).json({ error }));

      
  }

  if (req.body.like == 0) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { usersLiked: req.body.userId, usersDisliked: req.body.userId } }
    )

      .then(res.status(200).json({ message: "I dont Know yet" }))
      .catch((error) => res.status(404).json({ error }));
  }
  next()
} 

function vote (req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      

      post.likes = post.usersLiked.length;
      post.dislikes = post.usersDisliked.length;

      post.save()
      .then(() => {
      });
    })
    .catch((error) => res.status(404).json({ error }));

    next()
}
 

module.exports = { createPost, modifyPost, deletePost, getAllPosts , getOnePost, vote, likes };
