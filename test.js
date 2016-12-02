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
	it('Login API - success', function(done) {
		request.post(
			    'http://localhost:3001/login',
			    { form: { username: 'a',password:'b' } },
			    function (error, response, body) {
			    	
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });	
	it('Get Profile API', function(done) {
		request.post(
			    'http://localhost:3001/getProfile',
			    { form: { user_id: '1' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });	
	it('Get Advertisement API', function(done) {
		request.post(
			    'http://localhost:3001/getAdv',
			    { form: { adv_id: '25' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	it('Bid API', function(done){
		request.post(
			    'http://localhost:3001/addBidOffer',
			    { form: { adv_id: '19',user_id:'17',bid_price:'1' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
		
	});
	
	
});


