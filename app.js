
// import express from "express";
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res){
    // access city name
    const query = req.body.cityName;
    const apiKey = "db5a24022d15ba078c92140edfd255de";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + unit;

// call the get method 
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        // convert hex data to javascript object
        const weatherData = JSON.parse(data);
        // access temperature data
        const temp = weatherData.main.temp;
        // access weather description
        const weatherDescription = weatherData.weather[0].description;
        // access weather icon
        const icon = weatherData.weather[0].icon;
        // acces  corresponding image
        const imageURL = "http://openweathermap.org/img/wn" + icon + "@2x.png";

        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
    })
});
});




app.listen(5000, function(){
    console.log("Server is running on port 5000")
});