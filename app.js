//Definitions
var express = require('express');
var cons = require('consolidate');
var app = express();
var expressLess = require('express-less');

// Set Mustache as the Template Engine
app.engine('html', cons.mustache);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up Static Files
app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/img', express.static(__dirname + '/assets/img'));

// Set up LESS
app.use('/css', expressLess(__dirname + '/assets/less', { compress: true }));

// Index Page
app.get('/', function (req, res){
	res.render('index', {
		title: 'Sassy AF',
		partials : {
			head : '/partials/head'
		}
	});
});

// All Errors Except for 404 Page.
app.use(function(err, req, res, next){
	var requestedURL = req.protocol + '://' + req.get('Host') + req.url;
	console.error(err.stack);
	console.log(err.stack + '  URL: ' + requestedURL);
	res.render('error', {title: err.stack});
});

// 404 Error Page.
app.use(function(req, res, next){
	var requestedURL = req.protocol + '://' + req.get('Host') + req.url;
	console.log('Error: 404 - ' + requestedURL );
	// res.render('error', {title: '404'});
	res.render('error', {
		title: 'what are you doing here',
		partials : {
			head : '/partials/head'
		}
	});
});

// Set the Server Up
var server = app.listen(1337, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('App is listening at http://%s:%s', host, port)
});
