const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()




function signup(req, res, next) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          token: jwt.sign(
            { userId: user._id },
            process.env.JWT,
            { expiresIn: '24h' }
          ) }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}

function login(req, res, next)  {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur ou Mot de passe incorrect !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Utilisateur le Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              token: jwt.sign(
                { userId: user._id },
                process.env.JWT,
                { expiresIn: '1h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

module.exports = { signup, login } 