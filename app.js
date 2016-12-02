
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , home = require('./routes/home')
   , profile = require('./routes/profile')
   , search = require('./routes/search')
   , property = require('./routes/property')
   , account = require('./routes/account')
      , bid = require('./routes/bid')
      ,trip = require("./routes/trip")
        , host = require('./routes/host')
          , admin = require('./routes/admin')
  , path = require('path');


//sreekar
var winston=require('winston');
var hostdashboard=require('./routes/hostdashboard');
var admindashboard=require('./routes/admindashboard');


var app = express();
var mongoSessionURL = "mongodb://localhost:27017/airbnb";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
app.use(expressSessions({
	  secret: "CMPE273_passport",
	  resave: false,
	  saveUninitialized: false,
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 6 * 1000,
	  store: new mongoStore({
	    url: mongoSessionURL
	  })
	}))
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/logout', home.logout);
app.get('/home', home.getHomePage);
app.get('/profile', profile.getProfilePage);
app.get('/dashboard', profile.getDashboard);
//app.get('/search', search.getSearchResultsPage);
app.get('/propertyDetail', property.getPropertyDetailPage);
app.get('/account', account.getAccountPage);
app.get('/getImageUrl', profile.getImageUrl);
app.get('/getImageByUrl', profile.getImageByUrl);

app.post('/signup', home.signup);
app.post('/login', home.login);
app.post('/becomeHost', home.becomeHost);
app.post('/getProfile', profile.getProfile);
app.post('/getHostImageUrl', profile.getHostImageUrl);
app.post('/updateProf', profile.updateProf);
app.post('/updatePhoto', profile.updatePhoto);
app.post('/cancelAccount', account.cancelAccount);
app.post('/updatePassword', account.updatePassword);
app.get('/search', property.searchProperty);
app.post('/bid', bid.makeOffer);

//Added for trip module


app.post('/book', trip.bookTrip);
app.get('/cancel', trip.cancelTrip);
app.post('/change', trip.changeTrip);
app.get('/bookTrip', trip.bookTripView);
app.post('/checkouttrip', trip.checkout);
app.get('/trips', trip.viewTrips);
app.get('/getPendingTrips',trip.getPendingTrips);
app.get('/getConfirmedTrips',trip.getConfirmedTrips);
app.get('/getPastTrips',trip.getPastTrips);
app.get('/alterations', trip.alterTrips);
app.get('/canceltrip', trip.cancelTrips);
app.get('/changetrip', trip.changeTrips);
app.get('/tripConfirmation', trip.confirmation);

//sreekar configs

app.get('/hostdashboard',hostdashboard.getHostDashboard);
app.get('/getPageClicksData',hostdashboard.getPageClicksData);
app.get('/getPropertyClicksData',hostdashboard.getPropertyClicks);
app.get('/getUserReviews',hostdashboard.getUserReviews);
app.get('/getUserNegativeReviews',hostdashboard.getUserNegativeReviews);
app.get('/getUserTracking',hostdashboard.getUserTracking);
app.get('/getLeastVisitedProperty',hostdashboard.getLeastVisitedProperty);
app.get('/getAdminDashborad',admindashboard.getadmindashboard);
app.get('/getPropertyRevenue',admindashboard.getPropertyRevenue);
app.get('/getCityRevenue',admindashboard.getCityRevenue);


//prince


//host listings page
app.get('/hostlistings', host.redirectToHostListings);
app.post('/getmylistings', host.getmylistings);
app.post('/deletelisting', host.deletelisting);
app.get('/getpicture0', host.getpicture0);
app.get('/getpicture1', host.getpicture1);
app.get('/getpicture2', host.getpicture2);
app.get('/getpicture3', host.getpicture3);
app.get('/getpicture4', host.getpicture4);
app.get('/getpicture5', host.getpicture5);
app.get('/getpicture6', host.getpicture6);
app.get('/getpicture7', host.getpicture7);
app.get('/getpicture8', host.getpicture8);
app.get('/getpicture9', host.getpicture9);
app.get('/getpicture10', host.getpicture10);
app.get('/getpicture11', host.getpicture11);
app.get('/getpicture12', host.getpicture12);
app.get('/getpicture13', host.getpicture13);
app.get('/getpicture14', host.getpicture14);


//create new listing page
app.get('/createnewlisitng', host.redirectToCreateNewListing);
app.post('/uploadptyimages', host.uploadptyimages);
app.post('/submitnewlisitng', host.submitnewlisitng);


//host intro video
app.get('/hostintrovideo', host.redirectToHostIntroVideo);
app.post('/uploadintrovideo', host.uploadintrovdeo);
app.get('/getintrovideo', host.getintrovideo);
app.post('/isthereintrovideo', host.isthereintrovideo);


//upcoming reservations
app.get('/hostreservations', host.redirectToHostReservations);
app.post('/getmyreservations', host.getmyreservations);


//completed reservations
app.get('/completedreservations', host.completedreservations);
app.post('/getcompletedreservations', host.getcompletedreservations);
app.post('/submitrating', host.submitrating);

//host requests
app.get('/hostrequests', host.redirectToHostRequests);
app.post('/getmyrequests', host.getmyrequests);
app.post('/declineuser', host.declineuser);
app.post('/acceptuser', host.acceptuser);
app.post('/getthisuserreviews', host.getthisuserreviews);

//inbox
app.get('/inbox', host.inbox);

//host account
app.get('/hostaccount', host.hostaccount);
app.post('/deactivatehost', host.deactivatehost);

//Admin - Mansi
app.get('/adminLogin', admin.login);
app.post('/adminLogin', admin.adminLogin);
app.get('/adminHome', admin.adminHome);
app.get('/adminActivity', admin.adminActivity);
app.post('/getAdminProfile', admin.getAdminProfile);
app.post('/updateAdminProfile', admin.updateAdminProfile);
app.get('/getAdminDashboard', admin.getAdminDashboard);


app.get('/pendingRequest', admin.pendingRequest);
app.post('/approveHost', admin.approveHost);
app.post('/rejectHost', admin.rejectHost);
app.get('/displayHostsList', admin.displayHostsList);
app.get('/displayUsersList', admin.displayUsersList);
app.get('/displayPropertiesList', admin.displayPropertiesList);
app.get('/viewhost/:userid', admin.viewhost);
app.get('/viewuser/:userid', admin.viewuser);
app.get('/viewproperty/:userid', admin.viewproperty);
app.post('/saveUserReview/:userid', admin.saveUserReview);
app.post('/saveHostReview/:userid', admin.saveHostReview);
app.get('/searchBill', admin.searchBill);
app.post('/searchBillDetails', admin.searchBillDetails);
app.post('/searchhostby', admin.searchhostby);

app.post('/updateAdminPhoto', admin.updatePhoto);//
app.get('/getAdminImageUrl', admin.getImageUrl);//
app.get('/getAdminImageByUrl', admin.getImageByUrl);//

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

