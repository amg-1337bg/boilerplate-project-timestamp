// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const {parse} = require("nodemon/lib/cli");
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let obj = { unix: Number, utc: String };
  obj.utc = new Date().toUTCString();
  obj.unix = Date.now();
  res.json(obj);
});
app.get("/api/:date", (req, res, data) => {
  if (!isNaN(Date.parse(req.params.date)))
  {
    console.log ({unix: Date.parse(req.params.date), utc: new Date(Date.parse(req.params.date)).toUTCString()});
    res.json({unix: Date.parse(req.params.date), utc: new Date( Date.parse(req.params.date) ).toUTCString()});
  } else if (new Date( parseInt(req.params.date)) == 'Invalid Date')
    res.json({error: 'Invalid Date'});
  else {
    console.log ({unix: Date.parse(req.params.date), utc: new Date(parseInt(req.params.date)).toUTCString()});
    res.json({unix: parseInt(req.params.date), utc: new Date( parseInt(req.params.date) ).toUTCString()});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
