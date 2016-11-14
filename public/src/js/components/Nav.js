var React          = require('react');
var browserHistory = require('react-router').browserHistory;
var Link           = require('react-router').Link

/*********************/
/****LocalStorage*****/
/********************/

var token = localStorage.getItem('token');
var id    = localStorage.getItem('id');
var type  = localStorage.getItem('type');

if(!token)browserHistory.push('/login')

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">JetTwoProject</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {(type === 'contractor') ? <li><Link to='/dashbored' >Dashbored</Link></li> : ''   }
            {(type === 'contractor') ? <li><Link to='/search' >Search</Link></li> : ''   }
            {(type === 'contractor') ? <li><Link to='/viewpaidinvoice' >View Paid Invoice</Link></li> : ''   }
            {(type === 'contractor') ? <li><Link to='/livechat' >Live Chat</Link></li> : ''   }
            {(type === 'approver') ? <li><Link to='/redirecttoapproverviewuser' >View All Contractor</Link></li> : ''   }
            {(type === 'approver') ? <li><Link to='/approveradduser' >Add User</Link></li> : ''   }
            {(type === 'approver') ? <li><Link to='/livechat' >Live Chat</Link></li> : ''   }
            {(type === 'invoice_admin') ? <li><Link to='/needpay' >Need Pay</Link></li> : ''   }
            {(type === 'invoice_admin') ? <li><Link to='/invoicesearch' >Invoice Search</Link></li> : ''   }
            {(this.props.tokens) ? <li><Link to='/login' className="glyphicon glyphicon-log-in">Login</Link></li> :   <li><Link to='/logout' className="	glyphicon glyphicon-log-out">Logout</Link></li> }
          </ul>
        </div>
      </nav>
    )
  },
});
module.exports = Nav;
