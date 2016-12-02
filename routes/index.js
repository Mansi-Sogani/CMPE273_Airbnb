

/*
 * GET home page.
 */

exports.index = function(req, res){
	 if(req.session.user_id){
	console.log("here");
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	 
  res.render('home', { title: 'Express' });
	 }
		else{
			console.log("here");
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			 
		  res.render('landing', { title: 'Express' });
		}
};


