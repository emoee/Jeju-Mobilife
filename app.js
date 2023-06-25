const express = require("express");
const app = express();

app.listen(8080, function(){
    console.log("listening on 8080");
});

app.listen(3000, function(){
    console.log("App is running on port 3000");
});

app.get("/", function(req, res){
    sendfile("home.html");
});