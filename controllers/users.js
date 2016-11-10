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


function deleteTimesheet(req,res){
  User.findOne({_id: req.params.id}, function (err, contractor) {
    if (err) return res.status(401).send({error: err});
    if (!contractor) return res.status(500).send({error: 'Database error, is it connected?'});

    contractor.TimeSheet.id(req.body.id).remove();
    contractor.save(function (err) {
      if(!err) console.log('timesheet deleted');
    });

    return res.status(200).send({
      message: 'DELETED',
    });
  });

  // console.log(req.body.id);
}


function updateContractor(req, res) {

}

function updateTimesheet(req, res) {

 console.log(req.body.datas.timesheetData);

  User.update({'TimeSheet._id': req.body.datas.id}, {'$set': {

    'TimeSheet.$.Date1': req.body.datas.timesheetData.date1 ,
    'TimeSheet.$.Time1': req.body.datas.timesheetData.timein1 ,
    'TimeSheet.$.LunchStart1': req.body.datas.timesheetData.lunchstart1 ,
    'TimeSheet.$.LunchEnd1': req.body.datas.timesheetData.lunchend1 ,
    'TimeSheet.$.Timeout1': req.body.datas.timesheetData.Timeout1 ,

    'TimeSheet.$.Date2': req.body.datas.timesheetData.date2 ,
    'TimeSheet.$.Time2': req.body.datas.timesheetData.timein2 ,
    'TimeSheet.$.LunchStart2': req.body.datas.timesheetData.lunchstart2 ,
    'TimeSheet.$.LunchEnd2': req.body.datas.timesheetData.lunchend2 ,
    'TimeSheet.$.Timeout2': req.body.datas.timesheetData.Timeout2 ,


    'TimeSheet.$.Date3': req.body.datas.timesheetData.date3 ,
    'TimeSheet.$.Time3': req.body.datas.timesheetData.timein3 ,
    'TimeSheet.$.LunchStart3': req.body.datas.timesheetData.lunchstart3 ,
    'TimeSheet.$.LunchEnd3': req.body.datas.timesheetData.lunchend3 ,
    'TimeSheet.$.Timeout3': req.body.datas.timesheetData.Timeout3 ,


    'TimeSheet.$.Date4': req.body.datas.timesheetData.date4 ,
    'TimeSheet.$.Time4': req.body.datas.timesheetData.timein4 ,
    'TimeSheet.$.LunchStart4': req.body.datas.timesheetData.lunchstart4 ,
    'TimeSheet.$.LunchEnd4': req.body.datas.timesheetData.lunchend4 ,
    'TimeSheet.$.Timeout4': req.body.datas.timesheetData.Timeout4 ,


    'TimeSheet.$.Date5': req.body.datas.timesheetData.date5 ,
    'TimeSheet.$.Time5': req.body.datas.timesheetData.timein5 ,
    'TimeSheet.$.LunchStart5': req.body.datas.timesheetData.lunchstart5 ,
    'TimeSheet.$.LunchEnd5': req.body.datas.timesheetData.lunchend5 ,
    'TimeSheet.$.Timeout5': req.body.datas.timesheetData.Timeout5 ,




    'TimeSheet.$.TotalHourWorked': req.body.datas.timesheetData.totalWorkedHour ,
  }}, function(err) {

  if(!err) console.log('sucess')
      });




}






function removeContractor(req, res) {}

module.exports = {
  deleteTimesheet : deleteTimesheet,
  getIdTimeSheet : getIdTimeSheet,
  getTimeSheet   : getTimeSheet,
  getContractor   : getContractor,
  updateContractor: updateContractor,
  removeContractor: removeContractor,
  addContractorTimeSheet : addContractorTimeSheet,
  updateTimesheet : updateTimesheet
}
