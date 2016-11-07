var User = require('../models/user'),
    config = require('../config/variables'),
    jwt = require('jsonwebtoken');

function register(req, res) {
  User.create(req.body, function(err, user) {
    if (err) return res.status(401).send({error: err});
    if (!user) return res.status(500).send({error: 'Database error, is it connected?'});

    var token = jwt.sign(user._id, config.secret, {expiresIn: 60*60*24});

    return res.status(200).send({
      message: 'User successfully created',
      token: token,
      user: user
    })
  });
}

function login(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    if (!user) return res.status(403).json({ message: 'No user found.' });
    if (!user.validatePassword(req.body.password)) return res.status(403).json({ message: 'Password validation failed' });

    var token = jwt.sign(user._id, config.secret, {expiresIn: 60*60*24});

    return res.status(200).send({
      message: 'Successfully logged in',
      token: token,
      user: user
    })
  })
}

module.exports = {
  login: login,
  register: register
}
