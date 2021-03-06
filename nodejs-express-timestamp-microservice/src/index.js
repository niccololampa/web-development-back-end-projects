/*Coded by Niccolo Lampa. email:niccololampa@gmail.com */
/* TO SEE  ALL FEATURES PLEASE VIEW IN CODESANDBOX FULL/SCREEN ACTUAL MODE * /
/* PREVIEW MODE DOESN'T SHOW ALL FEATURES */

/* Run on http://localhost:8080/ after node index.js */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//function for time-stamp
function timestampProvider(req, res) {
  let dateInput = new Date(req.params.date_string);

  // if date string is empty trigger current date.
  if (req.params.date_string === undefined) {
    dateInput = new Date();
  }

  /* if dateInput is invalid date try converting date string to UNIX to check if it will 
  result to valid date*/
  if (isNaN(dateInput.getTime())) {
    dateInput = new Date(Number(req.params.date_string));
  }

  const unixInput = dateInput.getTime();
  const utcInput = dateInput.toUTCString();

  res.json({ unix: unixInput, utc: utcInput });
}

app.listen(8080);

// //Serving static assets
app.use(express.static(__dirname + '/styling'));

//to ready for post-request
app.use('/', bodyParser.urlencoded({ extended: false }));

// get projectInfo for home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/project-info.html');
});

//generating timestamp from input post-request
app.post('/api/timestamp/:date_string?', (req, res) =>
  timestampProvider(req, res)
);

// Json timestamp microservice
app.get('/api/timestamp/:date_string?', (req, res) =>
  timestampProvider(req, res)
);

/*Coded by Niccolo Lampa. Email: niccololampa@gmail.com */
