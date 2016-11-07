var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('App', function() {
  it('should pass this test and be deployed onto heroku', function(done) {
    done();
  });
})
