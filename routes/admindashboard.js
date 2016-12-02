/**
 * New node file
 */
var mysql = require('./mysql');
exports.getadmindashboard=function(req,res){
	
	console.log("admin");
	res.render('admindashboard');
	
}

//10 property revenues

exports.getPropertyRevenue=function(req,res)
{
	console.log("reached propertyRevenue");
	var getRevenues="select prop_id, sum(total) as totalRevenue from trips t,billing b where t.trip_id=b.trip_id group by(prop_id) limit 10";
    mysql.fetchPropertyRevenues(function(err,results){
    	 if(err)
    		 {
    		   console.log(err);
    		 }
    	 else
    		 {
    		   console.log(results);
    		   var test=JSON.stringify(results);
	    	   var parsedValues=JSON.parse(test);
	    	   console.log(parsedValues);
    		   res.send(parsedValues);
	    	   
    		   
    		 }
    	 
    	
    	
    },getRevenues);


}


//for city wise revenues

exports.getCityRevenue=function(req,res){
	console.log("till here");
	
	var getCityRevenues="select city, sum(total) as Revenue from trips t,listings l,billing b  where t.prop_id=l.prop_id and b.trip_id=t.trip_id group by(city)";
	mysql.fetchCityRevenues(function(err,results){
		  if(err){
			   console.log("error"+err);
		  }
		  else
			  {
			  
			   console.log(results);
			   var test=JSON.stringify(results);
	    	   var parsedValues=JSON.parse(test);
	    	   console.log(parsedValues);
    		   res.send(parsedValues);
			   //stuff
			  }
		
		
		
	},getCityRevenues);	
}