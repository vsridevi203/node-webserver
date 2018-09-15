const express = require('express');
const hbs = require('hbs');
const fs = require('fs', (err) => {
  if (err) {console.log(err);
  }
});

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log( log );
  fs.appendFile('server.log', log + '\n');
next();
});

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
});
app.get('/', (req,res)=> {
  // res.send('<h1>hello express! </h1>')

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'

  });
});

app.get('/about', (req,res) => {
  // res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

var error ={'error': 'response error',
            'message': 'bad request'
};

app.get('/bad', (req,res)=> {
  res.send(error);
});
app.listen(3000, ()=> {
  console.log("Server listening on port 3000");
});