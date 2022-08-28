const express = require("express");
const https = require("https");
// to look through the body of the post request and fetch the data based on the name of input(here it is called cityname)we require this new module called body parser
const bodyParser = require("body-parser");
// first we are creating this app constant usinf express this is creating an instance then we further use this object to listen post get etc
const app = express();
// we use app.use to use the body parser module 
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");

})
app.post("/", function(req,res){
  //  we are breaking the original url now "https://api.openweathermap.org/data/2.5/weather?lat =35&long=139&q=london&appid=0419d3647ef515b040b5490507010779&unit=metric;"
  const query = req.body.cityname;
  const apikey= "0419d3647ef515b040b5490507010779";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?lat =35&long=139&q="+query+"&appid="+apikey+"&unit="+unit+";"
  https.get(url, function(response){
    console.log(response.statusCode);
    // response.on is used to get data from the other server
    response.on("data", function(data){
      // json.parson is used to convert the dat aform from hexadecimal to javascript object
      const weatherData = JSON.parse(data);
      const object= {
        name:"angela",
        fav:"ramen"
      }
      // now to get a particular value from the entire data then use json viewer in chrome and copy path of the object
      const temp =weatherData.main.temp;
      const weatherdescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgurl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(weatherdescription);
      //this stringify basically converts json object to string JSON.stringify(object)
      //console.log(JSON.stringify(object));
      // till now we were receiving data from the other server now we will send data from our server to the requested web page using res.send
      // but each app.get can have only 1 res.send but we can have multiple res.write
      res.write("<h1> the temp in london is "+temp+"</h1>");
      res.write("<h1> the weatherdescription is "+weatherdescription+"</h1>");
      res.write("<img src="+imgurl+">");
      res.send();
      })
    });
})

app.listen(300, function(){
  console.log("server running");
})
