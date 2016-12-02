// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'Ashu@1988',
    database : 'airbnb',
    debug    :  false,
    port : 3306
});    



//fetching the data from the sql server
function fetchData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);

	pool.getConnection(function(err,connection)
	{
        if (err) {

          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query(sqlQuery,function(err,rows){
            connection.release();
            if(!err) {
            	console.log(rows);
            	callback(err, rows);
            }  
            else{
            	callback(err, rows);
            }   
            console.log("error");
            console.log(err);
        });

        connection.on('error', function(err) {      
              console.log("Error in connection database");
              return;     
        });
  });

	
	
}
exports.fetchData=fetchData;

//fetching user reviews
exports.fetchUserReviews=function(callback,sqlQuery){
	 console.log("sql query is"+sqlQuery);
	 pool.getConnection(function(err,connection)
				{
			            if (err) {

			                  res.json({"code" : 100, "status" : "Error in connection database"});
			                 return;
			        }    

			        console.log('connected as id ' + connection.threadId);
			        
			        connection.query(sqlQuery,function(err,rows){
			            connection.release();
			            if(!err) {
			            	console.log(rows);
			            	callback(err, rows);
			            }   
			            console.log("error");
			            console.log(err);
			        });

			        connection.on('error', function(err) {      
			              console.log("Error in connection database");
			              return;     
			        });
			  });

}

//for fetching top 10 property revenues

exports.fetchPropertyRevenues=function(callback,sqlQuery)
{
  console.log("query is"+sqlQuery);
   pool.getConnection(function(err,connection)
			{
		            

		        console.log('connected as id ' + connection.threadId);
		        
		        connection.query(sqlQuery,function(err,rows){
		            connection.release();
		            if(!err) {
		            	  console.log(rows);
		            	  callback(err, rows);
		            }   
		            console.log("error");
		            console.log(err);
		        });

		        connection.on('error', function(err) {      
		              console.log("Error in connection database");
		              return;     
		        });
		  });

   
}

exports.fetchCityRevenues=function(callback,sqlquery){
	
	console.log("query"+sqlquery);
	pool.getConnection(function(err,connection){
		 if(err)
			 {
			  throw err;
			 }
		  connection.query(sqlquery,function(err,rows){
			   if(!err)
				   {
				    
				    console.log(rows);
				    callback(err,rows);
				     
				   }
			   console.log("error is "+err);
			   connection.release();
			  
			   
		  })
		
		
		
	})
	
	
}
	  
	
	
