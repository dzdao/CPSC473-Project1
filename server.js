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

app.post('/addpost', function(req, res) {
    console.log("in server");
    var title = req.body.title;
    var link = req.body.link;
    var length;
    var data;
    var content;
    fs.readFile('db/db.json', 'utf8', function(err, data){
        content = JSON.parse(data);
        length = content['questions'].length;
        var data = content['questions'];

        data.push({
            "id" : length + 1,
            "title": title,
            "link":link,
            "vote": 0,
            "users": []
        });

        console.log(data);
        fs.writeFile("db/db.json", JSON.stringify(content), 'utf8');
        res.end();
    });
    
});

app.listen(5000, function() {
    console.log("Started on PORT 5000");
})