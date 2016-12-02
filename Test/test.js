var assert = require("assert")
,http = require("http");

var request = require('request');

describe('REST API tests', function(){
	it('First Page API', function(done){
		http.get('http://localhost:3001/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});	
	
	it('Login API ', function(done) {
		request.post(
			    'http://localhost:3001/login',
			    { form: { email: 'divya2rhyme@gmail.com',password:'pass1234' } },
			    function (error, response, body) {
			    	
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('Register API', function(done) {
		request.post(
			    'http://localhost:3001/login',
			    { form: { email: 'test@gmail.com',password:'pass1234', fname:'Ashna',lname:'Sebastian'} },
			    function (error, response, body) {
			    	
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('Get Profile API', function(done) {
		http.get('http://localhost:3001/profile', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	  });	
	
	it('Get Account API', function(done) {
		http.get('http://localhost:3001/account', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	  });
	

	
	it('Hostlistings API', function(done) {
		http.get('http://localhost:3001/hostlistings', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	  });
	
//	it(' Property Detail API', function(done) {
//		http.get('http://localhost:3001/propertyDetail?property_id=123456788', function(res) {
//			assert.equal(200, res.statusCode);
//			done();
//		})
//	  });
//	
	it('Dashboard API', function(done) {
		http.get('http://localhost:3001/dashboard', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	  });
	

	
	it('Logout API', function(done) {
		http.get('http://localhost:3001/logout', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	  });
	
});


