var express = require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authentication');

// AUTH ROUTES -----------------------------------------------------------------
// Method to allow a user to login from a form
router.route("/login")
  .post(authenticationController.login);

// Method to allow a user to register from a form
router.route("/register")
  .post(authenticationController.register);
// -----------------------------------------------------------------------------

// USERS ROUTES ----------------------------------------------------------------
// -----------------------------------------------------------------------------

// PROFILES ROUTES -------------------------------------------------------------
// -----------------------------------------------------------------------------

module.exports = router;
