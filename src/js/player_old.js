// WARNING!! THIS PLAYER WAS MADE WHEN I DID KNOW LESS OF JS. IT REALLY TRASH1!
// DON'T USE THIS!!!!!!





// Data stuff
var muted = false;
var canvas = document.getElementById("example_window");
var ctx = canvas.getContext("2d");
var videoContainer;
var video = document.createElement("video"); 
video.src = mediaSource;
video.loop = false;
video.muted = muted;

videoContainer = { 
	video : video,
	ready : false,   
};


/*
// ------------------------------
//	Thumbnail on load
// ------------------------------
*/
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fill();




const video_thumbnail = new Image(10, 10);
video_thumbnail.onload = drawThumbnail;
video_thumbnail.src = '../samples/thumbnail.png'; // This won't work...



//const icon_thumbnail = new Image(10, 10);
//icon_thumbnail.src = 'LMAO.jpg';
//icon_thumbnail.onload = drawThumbnail();



function drawThumbnail() {
		ctx.drawImage(this, 0, 0, canvas.width, canvas.height);


		//ctx.drawImage(icon_thumbnail, canvas.width / 2, canvas.width / 2, 128, 128);
}

/*
// ------------------------------
//	Menu Stuff
// ------------------------------
*/

var pause_regionX = 0;
var pause_regionY = 0;
var pause_regionW = 300;
var pause_regionH = 300;
var pause_regionIN = false;



var mouse_posX = 0;
var mouse_posY = 0;


canvas.onmousemove = function(e) {
	mouse_posX = e.clientX,
	mouse_posY = e.clientY;
};


/*
// ------------------------------
//	VIDEO & PLAYER STUFF
// ------------------------------
*/



// Error shit..
video.onerror = function(e){
	document.body.removeChild(canvas);
	document.body.innerHTML += "<h2>ERROR: Can't load video</h2><br>";
	document.body.innerHTML += "Browser too old?";
    
}

video.oncanplay = readyToPlayVideo; 

function readyToPlayVideo(event){
	videoContainer.scale = Math.min(
		canvas.width / this.videoWidth, 
		canvas.height / this.videoHeight); 

	videoContainer.ready = true;

	try {
		requestAnimationFrame(updateCanvas);
		videoContainer.video.play();
	} catch(e){
		console.log("bruh");
	}
}






function updateCanvas(){
	ctx.beginPath();
	
	ctx.rect(pause_regionX, pause_regionY, pause_regionW, pause_regionH);
	ctx.fillStyle = ctx.isPointInPath(mouse_posX, mouse_posY) ? "green" : "blue";
	if(ctx.isPointInPath(mouse_posX, mouse_posY)){
		pause_regionIN = true;
	} else {
		pause_regionIN = false;
	}


	



	if(videoContainer !== undefined && videoContainer.ready){ 
		video.muted = muted;
		var scale = videoContainer.scale;
		var vidH = videoContainer.video.videoHeight;
		var vidW = videoContainer.video.videoWidth;
		var top = canvas.height / 2 - (vidH /2 ) * scale;
		var left = canvas.width / 2 - (vidW /2 ) * scale;
		
		if(!videoContainer.video.paused && videoContainer.video.currentTime > 0){  
			ctx.clearRect(0,0,canvas.width,canvas.height); 
			console.log(videoContainer.video.currentTime);
		}
		ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
		DrawMenus()
	}
	requestAnimationFrame(updateCanvas);
}
function DrawMenus() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.rect(0, canvas.height -22, canvas.width, 22);
	ctx.fill();
}




function playPauseClick(){
	if(videoContainer !== undefined && videoContainer.ready){
		if(pause_regionIN){
			if(videoContainer.video.paused){                                 
				videoContainer.video.play();
			}else{
				videoContainer.video.pause();
			}
		}
	}
}


function videoMute(){

	muted = !muted;

	if(muted){
         
	}else{
         
	}
}


// register clicky event
canvas.addEventListener("click", playPauseClick);