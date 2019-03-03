const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const apiKey = 'eccf1197c549a9f538754f9570bdcc11';

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })

app.listen(1337, function () {
  console.log('Example app listening on port 1337!')
})



















// const express = require('express')
// const bodyparser = require('body-parser');

// const app = express()

// app.use(express.static('public'));
// app.use(bodyparser.urlencoded({extended: true}));

// app.set('view engine','ejs');


// // app.get('/', function (req, res) {
// //   //res.send('Hello World!')
// //   res.render('index');
// // });

// app.get('/', function (req, res) {
//     res.render('index');
//   })

// app.post('/', function (req, res) {
//     res.render('index');
//     console.log(req.body.city);
// })

// app.listen(1337, function () {
//   console.log('Example app listening on port 1337!')
// })