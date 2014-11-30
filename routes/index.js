var express = require('express');
var router = express.Router();
var fs = require('fs');

//REQUIRE API
var Instagram = require('instagram-node-lib');
var twitter = require("node-twitter");
var Facebook = require('facebook-node-sdk');

var file = require('../keys.json');

/*======================================
                          API SETTINGS
======================================*/
//GET API KEYS
var keys = {
  instakey: file.instagram_key,
  instasecret: file.instagram_secret,
  twitkey: file.twitter_key,
  twitsecret:file.twitter_secret,
  twittoken:file.twitter_token,
  twittokensecret:file.twitter_token_secret,
  facebookkey:file.facebook_key,
  facebooksecret:file.facebook_secret
};

//SET TWITTER KEYS
var twitterCli = new twitter.RestClient(
  keys.twitkey,
  keys.twitsecret,
  keys.twittoken,
  keys.twittokensecret
);

//SET FACEBOOK KEYS
var facebook = new Facebook({ appId: keys.facebookkey, secret: keys.facebooksecret }).setAccessToken('807554819308459|rcICM8YTbN8YGKuJyRnPL26saRs');



//SET INSTAGRAM KEY
Instagram.set('client_id', keys.instakey);
Instagram.set('client_secret', keys.instasecret);

/*======================================
                          GET JSON FILES
======================================*/
//GET FILE
var twitterJSON = 'public/json/twitter.json';
var instagramJSON = 'public/json/instagram.json';
var facebookJSON = 'public/json/facebook.json';





/*======================================
                          CALLBACK FUNCTION
======================================*/

//1579465651
//245144398882598

// facebook.api('/amachang', function(err, data){
// 	console.log(data);
// });
  // "facebook_key": "807554819308459",
  // "facebook_secret": "7058268fe3abae789225f5b888843a41"

facebook.api('/245144398882598/feed', function(err, faceData){
	fs.writeFile(facebookJSON, JSON.stringify(faceData, null, 4), function(){
		if(err){
			console.log(err);
		}
		else{
			return;
		}
	});
});




twitterCli.statusesHomeTimeline({}, function(error, twitData) {
	fs.writeFile(twitterJSON, JSON.stringify(twitData, null, 4), function() {
		if (error){
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    	}
	    if (twitData){
	    	Instagram.users.recent({ 
	    		user_id: 1579465651,
	    		complete: function(instaData){
	    			fs.writeFile(instagramJSON, JSON.stringify(instaData, null, 4), function(err) {
			    		if (err){
			    			console.log(err);
			    		}
			    		else{
						router.get('/', function(req, res) {
					    	var twitData = (JSON.parse(fs.readFileSync('public/json/twitter.json', 'utf8')));
					    	var instaData = (JSON.parse(fs.readFileSync('public/json/instagram.json', 'utf8')));
					    	var faceData = (JSON.parse(fs.readFileSync('public/json/facebook.json', 'utf8')));
					    	res.render('index', {title:"Terra Nova Church", TwitterData:twitData, InstagramData:instaData, FacebookData:faceData});
				    	});
			    		}
			    	});
	    		} });
	    }
	});
});




















module.exports = router;