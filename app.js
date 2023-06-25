const express = require("express");
const app = express();

app.listen(8080, function(){
    console.log((new Date()).toLocaleString());
    console.log("Listening on 8080");
});

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Define routes
app.get("/", function(req, res){
    console.log("req.ip => " + req.ip);
    console.log("req.hostname => " + req.hostname);
    res.sendFile(__dirname + "/home.html");
});

// Start the server
app.listen(3000, function(){
    console.log("App is running on port 3000");
});
