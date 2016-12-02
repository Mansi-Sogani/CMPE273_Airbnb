/**
 * http://usejsdoc.org/
 */

exports.getSearchResultsPage = function(req, res){
	 if(req.session.user_id){
	
	console.log("search here");
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	 
  res.render('searchResults', { title: 'Express' });
	logger.info('user landed on accounts page',{userid:req.session.user_id});
		}
		else{
			res.render('landing');
		}
};
