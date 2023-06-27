const express = require("express");
const app = express();

app.listen(8080, function(){
    console.log((new Date()).toLocaleString());
    console.log("Listening on 8080");
});

// Serve static files from the "image" directory
app.use('/image', express.static(__dirname + '/image'));

// Serve static files from the "area" directory
app.use('/area', express.static(__dirname + '/area'));

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
