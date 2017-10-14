const express = require("express");

var app = express();

app.use("/", express.static(__dirname));

app.listen(5000, function(){
	console.log("server now listening on http://localhost:5000");
});