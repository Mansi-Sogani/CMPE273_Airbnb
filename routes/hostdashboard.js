/**
 * New node file
 */


var winston=require('winston');
var mysql = require('./mysql');


var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)(),
	    new (winston.transports.File)({ filename: './Logs' +
	    '/userTracking.log'
	    })
	 ]
})


var logger1 = new (winston.Logger)({
	  transports: [
	    new (winston.transports.File)({ filename: './Logs' +
	    '/propertyClicks.log'
	    })
	 ]
})


var options={
		from: new Date -  96* 60 * 60 * 1000,
	    until: new Date,
        rows: 1000,
        start: 1,
        order: 'asc',
        fields:['message','userid','timestamp']   
};

var options1={
		from: new Date -  96* 60 * 60 * 1000,
	    until: new Date,
        rows: 100,
        start: 1,
        order: 'asc',
        fields:['hostid','propertyid']   
};



exports.getHostDashboard=function(req,res)
{	
	 if(req.session.user_id){
console.log("session id is"+req.session.user_id);
res.render('hostDashboard');
	 }
		else{
			res.render('landing');
		}
}

exports.getPrinceDashboard=function(req,res){
	 if(req.session.user_id){
console.log("checking prince stuff");
res.render('princeDashboard');
	 }
		else{
			res.render('landing');
		}
}

exports.getPageClicksData=function(req,res)
{
	logger.query(options, function (err, result) {
		
		var data={};
		
	      count=0;
	      count1=0;
	      count2=0;
	      count3=0;
	      count4=0;
	      count5=0;
	      count6=0;
	      count7=0;
	      count8=0;
	      
		
	    if (err) {
	        throw err;
	    }  
	    else
	    	{
	    	    console.log(result)
	    	    for(var j=0;j<result["file"].length;j++)
                  {
	    	    	if(result["file"][j].userid=req.session.user_id)
	    	       {
                   if(result["file"][j].message.match("landed on homepage"))
    	                {
    	                      count=count+1;
    	                 }
                   if(result["file"][j].message.match("user landed on update profile page"))
	                {
	                      count1=count1+1;
	                 }
                   if(result["file"][j].message.match("user landed on profile page"))
	                {
	                      count2=count2+1;
	                 }
                   if(result["file"][j].message.match("user updated his photo"))
	                {
	                      count3=count3+1;
	                 }
                   if(result["file"][j].message.match("user landed on search page"))
	                {
	                      count4=count4+1;
	                 }
                   if(result["file"][j].message.match("landed on property search page"))
	                {
	                      count5=count5+1;
	                 }
                   if(result["file"][j].message.match("user landed on accounts page"))
	                {
	                      count6=count6+1;
	                 }
                   if(result["file"][j].message.match("user requested to becomehost"))
	                {
	                      count7=count7+1;
	                 }
                   if(result["file"][j].message.match("landed on trip page"))
	                {
                	     
	                      count8=count8+1;
	                      
	                 }
                   
                   
                  
                   
                  
                   
                   /*
                   if(result["file"][j].message.match("user landed on profile page"))
	                {
	                      count2=count2+1;
	                 }
                   if(result["file"][j].message.match("user landed on profile page"))
	                {
	                      count2=count2+1;
	                 }*/
	                 
	    	        } //check here 
                  }
	    	    if(count!=undefined&&count1!=undefined&&count2!=undefined&&count3!=undefined&&count4!=undefined&&count5!=undefined&&count6!=undefined&&count7!=undefined)
	    	    {
	    	    	 data=[
	    	    	          {
	    	    	           
	    	    	           "homep":count
	    	    	          },
	    
	    	    	          {
	    	    	        	  
	    	    	        	   "profilep":count2
	    	    	        	  
	    	    	        	  
	    	    	          },

	    	    	          {
	    	    	        	  
	    	    	        	  "searchp":count4
	    	    	        	  
	    	    	          },
	    	    	          
	    	    	          {
	    	    	        	  "PSearch":count5
	    	    	          },
	    	    	          {
	    	    	        	  "accousP":count6
	    	    	          },
	    	    	          {
	    	    	        	  "hostp":count7
	    	    	          },
	    	    	          {
	    	    	        	  "tripspage":count8
	    	    	        	  
	    	    	          }
	    	    	    	 
	    	    	    	]
	    	    	res.send(data);
	    	    	console.log(data); 
	    	    	console.log("testing and sending data");
	    	    	
 
	    	    	
	    	    }
	    	    
	    	
	    	}
	  })
}	   


// for property clicks
exports.getPropertyClicks=function(req,res){
	console.log("entered here");
  logger1.query(options1, function (err, result) {
	var idc=0;
	var property= {};
   if (err) {
       throw err;
       }  
   else
   	  {
	   console.log(result);
   	 for(var j=0;j<result["file"].length;j++)
          {
   		 
   		 if(result["file"][j].hostid==req.session.user_id)
   		    {	 
   		   console.log(result["file"][j].propertyid);
   		         idc++;
   		    // logic to find no of clicks of property id
   		     
   		        var firstpropertyid=result["file"][j].propertyid;
   		        if (!property[firstpropertyid]) 
   		        {
                     property[firstpropertyid] = 1;
                    }
                    else
                    {
                    property[firstpropertyid]=property[firstpropertyid]+1;
                    }
   		     //logic ends
   		       }
    }	
   	 console.log("count is"+idc);
   	 console.log(property);	  
   }
   
       if(property!=undefined)
   	   {
   	     res.send(property);
   	    console.log("sentt");
    	}
     
}) 	

}
///user tracking function

exports.trackUserFunction=function(req,res)
{
  console.log("entered user tracking function");
 
}


exports.getUserReviews=function(req,res){
	  
	  console.log("inside reviews");
	  var hostid=req.session.user_id;
	   var getReviews="select prop_id,rating from reviews where host_id=" + hostid + "";
	   var parsedValues;
	   mysql.fetchUserReviews(function(err,results){
		     if(err)
		    	 {
		    	  console.log(err);
		    	  
		    	 
		    	 }
		     else
		    	 {
		    	   console.log("here");
		    	   console.log(results);		    	   
		    	   var test=JSON.stringify(results);
		    	   var parsedValues=JSON.parse(test);
		    	     
		    	      var data=[];
		    	      var postitiveproperty={};   	   
		    	      var property={}; 
		    	      var k=0;   
		    	      
		    	      for(var i=0;i<parsedValues.length;i++)
			    	    {
			    		  
			    		   var propertyid=parsedValues[i].prop_id;
			    		   if(parsedValues[i].rating=='Excellent'||parsedValues[i].rating=='Good'||parsedValues[i].rating=="Average")
  		                     {
  		        	
			    		         if(!postitiveproperty[propertyid])
			    		        	 {
			    		        	 postitiveproperty[propertyid]=1;
			    		        	 }
			    		         else
			    		        	 {
			    		        	 postitiveproperty[propertyid]=postitiveproperty[propertyid]+1;
			    		        	 }
  		                     }   
			    		  }
		    	      
		    	       if(postitiveproperty!=undefined)
		    	    	   {
		    	    	    res.send(postitiveproperty);
		    	    	     console.log(postitiveproperty);
		    	    	   }
		    	       
		    	   	       	    	          
	    }
		    	         
		    	         
		    	         
		    	   
		    	   
		    	    
		   
	   },getReviews);


/*
var propertyId=[12,14];
var NegativeRatingCount=[3,6];
var PositiveRatingCount=[6,9];
var data=[];
data[0]=
{
	propertyId:propertyId[0],
	NegativeRatingCount:NegativeRatingCount[0],
	PositiveRatingCount:PositiveRatingCount[0]
}

data[1]=

		{
			propertyId:propertyId[1],
			NegativeRatingCount:NegativeRatingCount[1],
			PositiveRatingCount:PositiveRatingCount[1]
		}		


console.log("sending data");
console.log(data);
res.send(data);
*/
}


exports.getUserTracking=function(req,res){
	console.log("reached here");
	
logger.query(options, function (err, result) {
		
		var data=[];
		
	    if (err) {
	        throw err;
	    }  
	    else
	    	{
	    	    console.log(result)
	    	    var count=0;
	    	    var count1=0;
	    	    var count2=0;
	    	    var count3=0;
	    	    var count4=0;
	    	    var count5=0;
	    	    var count6=0;
	    	  
	    	    for(var j=0;j<result["file"].length;j++)
                  {
	    	    	if(result["file"][j].userid=req.session.user_id)
		    	       {
	    	    		  
	                   if(result["file"][j].message.match("user signed on successfully"))
	                	   {
	                	     count++;
	                	         if(count=1)
	                	        	 {
	                	         data[j]=result["file"][j].message;
	                	        	 }
	                	             
	                	    }
	                    if(result["file"][j].message.match("landed on homepage"))
	                    	{
	                    	  count1++;
	                    	if(count1=1)
           	        	          {  
	                    	     data[j]=result["file"][j].message;
           	        	          } 
           	        	      }
	                    if(result["file"][j].message.match("user landed on profile page"))
	                    	{
	                    	   count2++;
	                    	    if(count2=1)
     	        	               { 
	                    	          data[j]=result["file"][j].message;
     	        	               }
	                    	}
	                    if(result["file"][j].message.match("user landed on accounts page"))
	                    	{
	                    	    count3++;
	                    	       if(count3=1)
     	        	                  { 
	                    	          data[j]=result["file"][j].message;
     	        	                  }
	                    	}
	                    if(result["file"][j].message.match("user updated his photo"))
	                    	{
	                    	      count4++;
	                    	      if(count4=1)
       	                                { 
	                    	               data[j]=result["file"][j].message
       	                                }
	                    	}
	                    if(result["file"][j].message.match("landed on property search page"))
                    	{
                    	      count5++;
                    	      if(count5=1)
   	                                { 
                    	               data[j]=result["file"][j].message
   	                                }
                    	}
	                    if(result["file"][j].message.match("landed on trip page"))
                    	{
                    	      count6++;
                    	      if(count6=1)
   	                                { 
                    	               data[j]=result["file"][j].message
   	                                }
                    	}
	                    
	                     
	                    
	                	}
	                 
	                 
                  }
	    	     console.log("sending data");
	    	     console.log(data);
	    	     res.send(data);
	    	}
	    
   })
		
}

exports.getUserNegativeReviews=function(req,res)
{
	
	var hostid=req.session.user_id;
	   var getReviews="select prop_id,rating from reviews where host_id=" + hostid + "";
	   var parsedValues;
	   mysql.fetchUserReviews(function(err,results){
		     if(err)
		    	 {
		    	  console.log(err);	    	 
		    	 }
		     else
		    	 {
		    	   console.log("here");
		    	   console.log(results);		    	   
		    	   var test=JSON.stringify(results);
		    	   var parsedValues=JSON.parse(test);		    	      
		    	      var negativeproperty={};   	   		    	      
		    	      for(var i=0;i<parsedValues.length;i++)
			    	    {
			    		  
			    		   var propertyid=parsedValues[i].prop_id;
			    		   if(parsedValues[i].rating=='Very Bad'||parsedValues[i].rating=='Bad')
		                     {
		        	
			    		         if(!negativeproperty[propertyid])
			    		        	 {
			    		        	 negativeproperty[propertyid]=1;
			    		        	 }
			    		         else
			    		        	 {
			    		        	 negativeproperty[propertyid]=negativeproperty[propertyid]+1;
			    		        	 }
		                     }   
			    		  }
		    	      
		    	       if(negativeproperty!=undefined)
		    	    	   {
		    	    	    res.send(negativeproperty);
		    	    	     console.log(negativeproperty);
		    	    	   }
		    	       
		    	   	       	    	          
	    }
		    	         
		    	         
		    	         
		    	   
		    	   
		    	    
		   
	   },getReviews);

  	

}

//least visited property

exports.getLeastVisitedProperty=function(req,res)
{
	logger1.query(options1, function (err, result) {
		var property= {};
	   if (err) {
	       throw err;
	       }  
	   else
	   	  {
		   console.log(result);
	   	   for(var j=0;j<result["file"].length;j++)
	          {
	   		 
	   		 if(result["file"][j].hostid==req.session.user_id)
	   		    {	 
	   		   console.log(result["file"][j].propertyid);
	   		       
	   		    // logic to find no of clicks of property id
	   		     
	   		        var firstpropertyid=result["file"][j].propertyid;
	   		        if (!property[firstpropertyid]) 
	   		        {
	                     property[firstpropertyid] = 1;
	                }
	                    else
	                    {
	                    property[firstpropertyid]=property[firstpropertyid]+1;
	                    }
	   		     //logic ends
	   		       }
	    }	   
    }
})

}

	





