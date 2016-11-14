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
//  ----------------------------------------------------------------
router.route("/getContractor")
  .get(userController.getContractor);
// ----------------------------------------------------------
//------------------------------------------------------------
router.route("/addTimesheet/:id")
  .post(userController.addContractorTimeSheet)
  .get(userController.getTimeSheetAppending);
// -----------------------------------------------------------------------------

router.route("/getidtimesheet/:id")
  .post(userController.getIdTimeSheet);

router.route("/updateTimesheet/:id")
  .post(userController.updateTimesheet)

router.route("/deleteTimesheet/:id")
  .delete(userController.deleteTimesheet)

router.route("/sendforapprovel/:id")
  .post(userController.sendForApprovel)

router.route("/getApproveltimesheets/:id")
   .get(userController.getTimeSheetNeedsApprovel)

router.route("/approverapproved/:id")
      .post(userController.approverApproved)

router.route("/approverdeclined/:id")
      .post(userController.approverDeclined)

router.route("/getcomment/:id")
      .get(userController.getComment)

router.route("/search/:id")
      .post(userController.search)

router.route("/paid/:id")
      .post(userController.paid)

router.route("/changePaid/:id")
      .post(userController.changePaidStatus)

router.route("/invoicesearch")
      .post(userController.invoiceSearch)

router.route("/updatecontractor/:id")
      .post(userController.updateContractor)


router.route("/getcontractorid/:id")
      .get(userController.getContractorID)

module.exports = router;
