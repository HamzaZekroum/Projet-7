const express = require('express');   // importation de express
const app = express();
const router = require('./routes/allroutes')
const mongoose = require('mongoose') // connection a la base de donnéés
const path = require('path');


mongoose.connect(process.env.db, 
{ useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json()) // pour acceder a le core de requete

app.use((req, res, next) => {   // les cors et les autorisation des rootes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(router)
app.use('/images', express.static(path.join(__dirname, 'images')));
  

module.exports = app;