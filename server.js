var express = require("express");
var bodyParser = require("body-parser");
var stormpath = require("express-stormpath");
var fs = require('fs');
var app = express();
app.use(express.static(__dirname + '/'));


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: '6G6UCTOJJWLBRUZ73PRX023I7',
      secret: 'i9AIHgjlVBToIhYZX/DUA8fKq+TUgpDEGleQeK6FrgY'
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/3UXGpJ9k0hoGYhxR7SKLIv'
  },

  web: {
    register: {
      // after registering and logging in, the user will be redirected to /index.html
      nextUri: '/index.html'
      
    }
  }
}));
app.on('stormpath.ready', function() {
console.log('Stormpath Ready');
});



app.get('/checklogin',stormpath.getUser, function(req, res) {
    if (req.user) {
        res.send(req.user.email);
    } else {
    res.send('Not logged in');
    }    
});



//readpost
app.get('/readpost', function(req, res) {
   
    fs.readFile('db/db.json', 'utf8', function(err, data) {
        res.end(data);
    });
    
});

app.post('/addpost', stormpath.loginRequired, function(req, res) {
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