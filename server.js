var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//readpost
app.get('/readpost', function(req, res) {
    fs.readFile('db/db.json', 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
    
});

app.listen(5000, function() {
    console.log("Started on PORT 5000");
})