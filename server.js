const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const weatherapp = require('./app-promise');  


const port = process.env.PORT || 3000;
app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((request, response, next) => {
	var now = new Date().toString();
	var log = now + ' ' + request.method + ' ' + request.url;
	fs.appendFile('./log/server.txt', log + '\n', (err) => {
		if(err){
			console.log(err);
		}
	});
	console.log(log);
	next();
});

// app.use((request, response, next) => {
// 	response.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
	//console.log(request.query.address);
	//var temp = weatherapp.getWeather(request.query.address);
	var user = {
		name: 'Andrew',
		likes: ['Biking', 'Cities']
	};
	response.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello ' + user.name + ' welcome to test website',
		user: user
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle:'About Page',
	});
});

app.get('/test', (request, response) => {
	response.sendFile(__dirname+ '/view/SPAtest.html');
});

app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		pageTitle: 'Projects',
		projects: ['https://github.com/senel34/node-test-deploy']
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to handle response'
	})
});

app.listen(port, () => {
	console.log('Server is up on port 3000');
});
