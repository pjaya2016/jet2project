var express = require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authentication')
    userController           = require('../controllers/users');

// AUTH ROUTES -----------------------------------------------------------------
// Method to allow a user to login from a form
router.route("/login")
  .post(authenticationController.login);

// Method to allow a user to register from a form
router.route("/register")
  .post(authenticationController.register);
// -----------------------------------------------------------------------------

//  ----------------------------------------------------------------
router.route("/getContractor")
  .get(userController.getContractor);
// -----------------------------------------------------------------------------

//  ----------------------------------------------------------------

//-------------------------------------------------------------
router.route("/addTimesheet/:id")
  .post(userController.addContractorTimeSheet)
  .get(userController.getTimeSheet);
// -----------------------------------------------------------------------------

router.route("/getidtimesheet/:id")
  .post(userController.getIdTimeSheet);


  router.route("/updateTimesheet/:id")
    .post(userController.updateTimesheet)


    router.route("/deleteTimesheet/:id")
    .delete(userController.deleteTimesheet)



module.exports = router;
