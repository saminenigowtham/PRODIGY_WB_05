const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res){
  const cityName = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=59a5b3d94bd6244ed9f85c64257bcd7e&units=metric#";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const tempAppeare = weatherData.main.temp
      const description = weatherData.weather[0].description
      const city = weatherData.name
      const icon = weatherData.weather[0].icon
      const tempFeels = weatherData.main.feels_like

      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.render("index",{
        cityName: city,
        tempAppeare: tempAppeare,
        tempFeels: tempFeels,
        description: description
      });

      console.log(city);
      console.log(tempAppeare);
      console.log(description);

    });
  });
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on 3000");
});
