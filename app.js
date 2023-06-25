const express = require("express");
const app = express();

app.listen(8080, function(){
    console.log((new Date()).toLocaleString());
    console.log("Listening on 8080");
});

app.listen(3000, function(){
    console.log((new Date()).toLocaleString());
    console.log("App is running on port 3000");
});

app.get("/", function(req, res){
    console.log("req.ip => " + req.ip);
    console.log("req.hostname => " + req.hostname);
    res.sendFile(__dirname + "/home.html");
});

app.get("/area", function(req, res){
    res.sendFile(__dirname + "/area/area.html");
});
