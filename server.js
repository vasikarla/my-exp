const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
const hbs = require('hbs');
const fs = require('fs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `[${now}] : ${req.method} : ${req.path}`;
    fs.appendFile('./server.log', log + '\n', (err) => {
        if (err) {
            console.log("Error");
        }
    });
    next();
});

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', new Date().getFullYear());
hbs.registerHelper('screamIt', (input) => {
    return input.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        name: "Raj Vasikarla",
        year: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        reason: "Unable to process your request"
    });
});

app.get('/projects', (req, res) => {
    res.render('user.hbs', {
        pageTitle: "User Details"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page from HBS"
    });
});

app.listen(port, () => {
    console.log(`App starting @ ${port}`);
});