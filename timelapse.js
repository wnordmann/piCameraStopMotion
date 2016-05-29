var RaspiCam = require("raspicam");

var minute = 60000;
var camera = new RaspiCam({
	mode: "timelapse",
	output: "./timelapse/image_%06d.jpg", // image_000001.jpg, image_000002.jpg,...
	encoding: "jpg",
	timelapse: minute/4, // take a picture every 15
	timeout: 10*minute // 10 minutes
});

camera.on("start", function( err, timestamp ){
	console.log("timelapse started at " + timestamp);
});

camera.on("read", function( err, timestamp, filename ){
	console.log("timelapse image captured with filename: " + filename);
});

camera.on("exit", function( timestamp ){
	console.log("timelapse child process has exited");
});

camera.on("stop", function( err, timestamp ){
	console.log("timelapse child process has been stopped at " + timestamp);
});

camera.start();

// test stop() method before the full 12 seconds is up
setTimeout(function(){
	camera.stop();
}, 100000);