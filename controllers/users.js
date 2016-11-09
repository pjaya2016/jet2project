var User = require('../models/user');

var defultTimeSheet = {
  Date1           : '',
  Time1           : '00:00',
  LunchStart1     : '00:00',
  LunchEnd1       : '00:00',
  Timeout1        : '00:00',
  Date2           : '',
  Time2           : '00:00',
  LunchStart2     : '00:00',
  LunchEnd2       : '00:00',
  Timeout2        : '00:00',
  Date3           : '',
  Time3           : '00:00',
  LunchStart3     : '00:00',
  LunchEnd3       : '00:00',
  Timeout3        : '00:00',
  Date4           : '',
  Time4           : '00:00',
  LunchStart4     : '00:00',
  LunchEnd4       : '00:00',
  Timeout4        : '00:00',
  Date5           : '',
  Time5           : '00:00',
  LunchStart5     : '00:00',
  LunchEnd5       : '00:00',
  Timeout5        : '00:00',
  TotalHourWorked : '0',
  StartDate       : '' ,
  EndDate         : '' ,
  Status          : 'appending'
}


function getContractor(req, res) {
  User.find({type : 'contractor'}, function (err, contractor) {
    if (err) return res.status(401).send({error: err});
    if (!contractor) return res.status(500).send({error: 'Database error, is it connected?'});
    console.log(contractor)
    return res.status(200).send({
      message: 'contractor info sucessfully accessed',
      contractor : contractor
    });
  });
}

function addContractorTimeSheet(req, res) {
  User.findOne({_id: req.params.id}, function (err, contractor) {
    if (err) return res.status(401).send({error: err});
    if (!contractor) return res.status(500).send({error: 'Database error, is it connected?'});

    contractor.TimeSheet.push(defultTimeSheet);

    contractor.save(function (err) {
      if (!err) console.log('Success!');
    });

    // contractor.TimeSheet.pop();
    // contractor.save(function (err) {
    //   if (!err) console.log('Success!');
    // });

  });
}

function getTimeSheet(req, res) {
  User.findOne({_id: req.params.id}, function (err, contractor) {
    if (err) return res.status(401).send({error: err});
    if (!contractor) return res.status(500).send({error: 'Database error, is it connected?'});

    return res.status(200).send({
      message: 'contractor info sucessfully accessed',
      contractor : contractor.TimeSheet
    });

  });
}

function getIdTimeSheet(req, res) {
  User.findOne({_id: req.params.id}, function (err, contractor) {
    if (err) return res.status(401).send({error: err});
    if (!contractor) return res.status(500).send({error: 'Database error, is it connected?'});

    return res.status(200).send({
      message: 'contractor info sucessfully accessed',
      TimeSheetID : contractor.TimeSheet.id(req.body.TimeSheet)
    });
  });
}


function updateContractor(req, res) {

}

function updateTimesheet(req, res) {

// User.findOne({_id: req.params.id}, function (err, timesheet) {
//   if (err) return res.status(401).send({error: err});
//   if (!timesheet) return res.status(500).send({error: 'Database error, is it connected?'});
//
//    var timesheets = timesheet.TimeSheet.id(req.body.datas.id);
//        timesheets  = req.body.datas.timesheetData;
//
//   // timesheet.save(function (err) {
//   //     if (!err) console.log('Successfully updated!');
//   // });
//
// // // console.log(req.body.datas.id)
// //
// console.log(timesheets)
//
// });



}


function removeContractor(req, res) {}

module.exports = {
  getIdTimeSheet : getIdTimeSheet,
  getTimeSheet   : getTimeSheet,
  getContractor   : getContractor,
  updateContractor: updateContractor,
  removeContractor: removeContractor,
  addContractorTimeSheet : addContractorTimeSheet,
  updateTimesheet : updateTimesheet
}
