var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
var Link           = require('react-router').Link;

//need to do invoice date
var SearchForInvoiceAdmin = React.createClass({
  getInitialState(){
    return {
      searchInvoice : ''
    }
  },
  search(e){
    var self = this;
    Dispatcher.dispatch({
      action : 'SEARCHINVOICE',
      search : this.refs.search.value
    })

    userStore.on('invoiceSearch',function(data){
      this.setState({
        searchInvoice : data
      })
    }.bind(this))
  },
  render: function() {

    if(this.state.searchInvoice.data){
      var self = this;
      var map = this.state.searchInvoice.data.invoiceSearch.map(function(item,i){
        if(item){
          return (
            <div key={i} className="panel-group">
              <p>Results {i + 1} </p>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" href="#collapse1">Name : {self.state.searchInvoice.data.contractor[i].firstName}</a>
                  </h4>
                </div>
                <div id="collapse1" className="panel-collapse collapse">
                  <div className="panel-body">
                    <pre>
                      <p className="text-warning">Invoice #id :{ item._id } </p>
                      <p>Date</p>
                      <p>total hours worked : {item.TotalHourWorked}</p>
                      <p>Rate : £7:00</p>
                      <p className="bg-danger text-center" >Total Pay : £ {parseInt(item.TotalHourWorked) * 7}</p>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        else if(i <= 0 ){
          return (<div><h3>No Match : you can search by contractor name or there start date e.g. 2016-11-12</h3></div>)
        }
      })
      return (
        <div className="col-sm-4 col-md-8 col-lg-12">
          <input type='text' ref='search' className="form-control"  placeholder='search ...'/>
          <hr />
          <input type='button' value='search' className="btn btn-primary" onClick={this.search} />
          <hr />
          {map}
        </div>
      )
    }else{
      return (
        <div className="col-sm-4 col-md-8 col-lg-12">
          <input type='text' ref='search' className="form-control" placeholder='search ...' />
          <hr />
          <input type='button' value='search' className="btn btn-primary" onClick={this.search} />
        </div>
      )
    }
  }
});
module.exports = SearchForInvoiceAdmin;
