// User Information App - Ajax

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/views'));

app.set('views', './src/views');
app.set('view engine', 'jade');


app.get('/', function(request, response) {
	var users = [];
	fs.readFile('./users.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);

		response.render('index', {
			users: users
		});
	});
});

// this renders the search bar
app.get('/users/search', function(request, response) {
	response.render('search');
})

// this is where the ajax request takes place 
app.post('/users/search', bodyParser.urlencoded({
	extended: true
}), function(request, response) {
	fs.readFile('users.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);
		var results = [];
		for (i = 0; i < users.length; i++) {
			if ((users[i].firstname.indexOf(request.query.autocomplete) === 0) || (users[i].lastname.indexOf(request.query.lastautocomplete) === 0)) {
				results.push(users[i].firstname + " " + users[i].lastname)
			}
		}
		response.send(results)
	});
});

// This concatonates the each parsed data object and sends it in an array
app.get('/users/searchresult', function(request, response) {
	fs.readFile('users.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);
		var results = [];

		for (i = 0; i < users.length; i++) {
			if (users[i].firstname === request.query.firstname || users[i].lastname === request.query.lastname) {
				results = results.concat(users[i]);
			}
		}
		response.render('searchresult', {
			results: results
		});
	});
});


var server = app.listen(3000, function() {
	console.log('UsersInfoApp listening on port: ' + server.address().port);
});