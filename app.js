const express = require("express");
const app = express();

app.listen(8080, function(){
    console.log("Listening on 8080");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/home.html");
});

app.listen(3000, function(){
    console.log("App is running on port 3000");
});
