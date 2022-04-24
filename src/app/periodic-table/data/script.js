var express = require('express');
const path = require('path');
var app = express();
var fs = require('fs');
// const cors = require('cors')

app.set('view engine', 'pug')
app.use(express.static("dist"));

app.get('/', (req, res) => {
  var elms = JSON.parse(fs.readFileSync('new_elms.json', 'utf8'));
  res.render('creative', {elements:elms})
})

// var corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }

// app.use(cors(corsOptions))

app.listen(3000, function () {
  console.log('http://localhost:3000')
})