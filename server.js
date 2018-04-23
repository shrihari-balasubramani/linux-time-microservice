// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/getTime/:givenTime',function(req,res, next){
	var jsonToSend ,
		isUnixTime = !isNaN(req.params.givenTime),
      dateGiven;
	if(isUnixTime){
		dateGiven = new Date(req.params.givenTime*1000);
	}else{
		dateGiven = new Date(req.params.givenTime);
	}
	if(dateGiven.toDateString() == 'Invalid Date'){
		jsonToSend = {unixDate: null ,naturalDate: null };
	}else{
		jsonToSend = {unixDate: Math.floor(dateGiven.getTime()/1000) ,naturalDate: dateGiven.toDateString()  }	
	}	
	res.json(jsonToSend);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
