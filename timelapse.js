var RaspiCam = require("raspicam");
var moment = require('moment');

var minute = 60000;
var _timelapse = minute / 4;
var _timeout = minute * 10;
var camera = new RaspiCam({
	mode: "timelapse",
	output: "./timelapse/image_%06d.jpg", // image_000001.jpg, image_000002.jpg,...
	encoding: "jpg",
	timelapse: _timelapse, // take a picture every 15
	timeout: _timeout // 10 minutes
});

camera.on("start", function( err, timestamp ){
	console.log("timelapse started at " + moment().format('MMMM Do YYYY, h:mm:ss a'));
	console.log("Image rate : " + _timelapse)
});

camera.on("read", function( err, timestamp, filename ){
	console.log("timelapse image captured with filename: " + filename + " - " + moment().format('h:mm:ss a'));
});

camera.on("exit", function( timestamp ){
	console.log("timelapse child process has exited");
});

camera.on("stop", function( err, timestamp ){
	console.log("timelapse child process has been stopped at " + moment().format('MMMM Do YYYY, h:mm:ss a'));
});

camera.start();

// test stop() method before the full 12 seconds is up
//setTimeout(function(){
//	camera.stop();
//}, 100000);