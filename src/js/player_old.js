// WARNING!! THIS PLAYER WAS MADE WHEN I DID KNOW LESS OF JS. IT REALLY TRASH1!
// DON'T USE THIS!!!!!!





// Data stuff
var Player_State = 0;


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
	//ready?
	var video_thumbnail_play_ready = false;
	var video_thumbnail_ready = false;
	var pause_button_ready = false;
	var play_button_ready = false;
	var rewatch_button_ready = false;
	
	//Loading up image
	const video_thumbnail = new Image(0, 0);
	video_thumbnail.onload = MakeReady(1);
	video_thumbnail.src = '../samples/thumbnail.png';
	
	const video_thumbnail_play = new Image(0, 0);
	video_thumbnail_play.onload = MakeReady(2);
	video_thumbnail_play.src = '../samples/play_large.png';
	
	const pause_button = new Image(0, 0);
	pause_button.onload = MakeReady(3);
	pause_button.src = '../samples/pause.png';
	
	const play_button = new Image(0, 0);
	play_button.onload = MakeReady(4);
	play_button.src = '../samples/play.png';
	
	const rewatch_button = new Image(0, 0);
	rewatch_button.onload = MakeReady(5);
	rewatch_button.src = '../samples/rewatch.png';



function MakeReady(img_id){
	if(img_id == 1){
		video_thumbnail_ready = true;
	} else if(img_id == 2){
		video_thumbnail_play_ready = true;
	} else if(img_id == 3){
		pause_button_ready = true;
	} else if(img_id == 4){
		play_button_ready = true;
	} else if(img_id == 5){
		rewatch_button_ready = true;
	}
}


/*
// ------------------------------
//	Menu Stuff
// ------------------------------
*/

var pause_regionX = 0;
var pause_regionY = canvas.height - 32;
var pause_regionW = 64;
var pause_regionH = 32;
var pause_regionIN = false;



var mouse_posX = 0;
var mouse_posY = 0;


canvas.onmousemove = function(e) {
	mouse_posX = e.clientX - this.getBoundingClientRect().left,
	mouse_posY = e.clientY - this.getBoundingClientRect().top;
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
	
	if(!videoContainer.video.paused && videoContainer.video.currentTime > 0){  

		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fill();
	}
	

	
	if(Player_State == 0){
		ctx.clearRect(0,0,canvas.width,canvas.height);



		if(video_thumbnail_ready) {
			ctx.drawImage(video_thumbnail, 0, 0, canvas.width, canvas.height);
		}
		if(video_thumbnail_play_ready){
			ctx.drawImage(video_thumbnail_play, canvas.width / 2 - 256, canvas.height / 2 - 256, 512, 512);
		}

		
		function drawPlay_button() {
			ctx.drawImage(play_button, 0, 0, canvas.width, canvas.height);
		}
		
		
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "rgba(0, 0, 0, 0)";
		ctx.fill();
	
		if(ctx.isPointInPath(mouse_posX, mouse_posY)){
			pause_regionIN = true;
		} else {
			pause_regionIN = false;
		}
		
		
	} else {
		
	
	
	
	
	
	ctx.beginPath();
	ctx.rect(pause_regionX, pause_regionY, pause_regionW, pause_regionH);
	ctx.fillStyle = "rgba(0, 0, 0, 0)";
	ctx.fill();
	
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
		

		ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
		ctx.fill();
		DrawMenus()
	}
	}
	requestAnimationFrame(updateCanvas);
}
function DrawMenus() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	//ctx.filter = "blur(4px)";
	
	ctx.rect(0, canvas.height -32, canvas.width, 32);
	ctx.fill();
	ctx.filter = "none";
	
	if(videoContainer.video.paused){
		if(videoContainer.video.ended){
			if(rewatch_button_ready) {
				ctx.drawImage(rewatch_button, 16, canvas.height -32, 32, 32);
			}
		} else{
			if(play_button_ready) {
				ctx.drawImage(play_button, 16, canvas.height -32, 32, 32);
			}
		}
	} else {
		if(pause_button_ready) {
			ctx.drawImage(pause_button, 16, canvas.height -32, 32, 32);
		}
	}
	
}




function playPauseClick(){
	if(videoContainer !== undefined && videoContainer.ready){
		if(pause_regionIN){
			if(videoContainer.video.paused){
				Player_State = 1;
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