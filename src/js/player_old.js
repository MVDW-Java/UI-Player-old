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

var Is_Settings_Open = false;
var Filler_Backround = true;
var Fullscreen = false;
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

	const settings_button = new Image(0, 0);
	settings_button.onload = MakeReady(6);
	settings_button.src = '../samples/settings.png';
	
	const max_button = new Image(0, 0);
	max_button.onload = MakeReady(7);
	max_button.src = '../samples/max.png';
	
	const min_button = new Image(0, 0);
	min_button.onload = MakeReady(8);
	min_button.src = '../samples/min.png';

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
	} else if(img_id == 6){
		settings_button_ready = true;
	} else if(img_id == 7){
		max_button_ready = true;
	} else if(img_id == 8){
		min_button_ready = true;
	}
}


/*
// ------------------------------
//	Menu Stuff
// ------------------------------
*/





var mouse_posX = 0;
var mouse_posY = 0;

var check_mouse_posX = 0;
var check_mouse_posY = 0;

canvas.onmousemove = function(e) {
	check_mouse_posX = mouse_posX;
	check_mouse_posY = mouse_posY;
	
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
		
		if(!videoContainer.video.paused){ 
			Player_State = 2;
		}
		
	} catch(e){
		console.log("bruh");
	}
}






function updateCanvas(){

	if((mouse_posX == check_mouse_posX && mouse_posY == check_mouse_posY &&  Player_State == 2) || (video_thumbnail_ready && video_thumbnail_play_ready && Player_State == 1)){
		return; // Not need to update, optimizing performance.
	}
	
	if(!videoContainer.video.paused && videoContainer.video.currentTime > 0){ 
		Player_State = 2; // change state to play player if not already
	}
	
	ctx.clearRect(0,0,canvas.width,canvas.height); // clear screen
	
		
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//ctx.fill(); //fill black screen
	

	
	if(Player_State == 0){
		

		if(video_thumbnail_ready && video_thumbnail_play_ready) {
			ctx.drawImage(video_thumbnail, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(video_thumbnail_play, canvas.width / 2 - 256, canvas.height / 2 - 256, 512, 512);
			Player_State = 1;
		}


	} else if(Player_State == 2) {
		
		if(videoContainer !== undefined && videoContainer.ready){ 
		
			//Draw video
			video.muted = muted;
			var scale = videoContainer.scale;
			var vidH = videoContainer.video.videoHeight;
			var vidW = videoContainer.video.videoWidth;
			var top = canvas.height / 2 - (vidH /2 ) * scale;
			var left = canvas.width / 2 - (vidW /2 ) * scale;
		
			if(Filler_Backround){
				ctx.filter = "blur(12px)";
				ctx.drawImage(videoContainer.video, 0, 0, canvas.width, canvas.height);
			}
			
			ctx.filter = "none";
			ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
			
		

			console.log("draw video");
			
			//Draw Menu
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fillRect(0, canvas.height -32, canvas.width, 32);
			ctx.filter = "none";

			
			
			
			
			ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
			ctx.fillRect(6, canvas.height -36, canvas.width - 12, 3);
			ctx.filter = "none";
			
			var size = (video.currentTime/video.duration) * (canvas.width - 12);
			
			ctx.restore();
			
			ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
			ctx.fillRect(6, canvas.height -36, size, 3);
			ctx.filter = "none";
			console.log(size);
			
			
			if(Is_Settings_Open){
				var menu_pos_x = canvas.width / 2 - 256;
				var menu_pos_y = canvas.height / 2 - 256;
	
				ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
				ctx.fillRect(menu_pos_x, menu_pos_y, 512, 512);

				
				ctx.font = "32px Arial";
				ctx.fillStyle = "rgba(255, 255, 255, 1)";
				ctx.fillText("Settings:", menu_pos_x + 12, menu_pos_y + 32);
				
				ctx.font = "22px Arial";
				if(Filler_Backround){
					ctx.fillStyle = "rgba(0, 255, 0, 1)";
				} else {
					ctx.fillStyle = "rgba(255, 0, 0, 1)";
				}
				ctx.fillText("Weird Resolution Border Content", menu_pos_x + 12, menu_pos_y + 128);
				
			}
			
			
			//menu item drawing
			if(settings_button_ready) {
				ctx.drawImage(settings_button, canvas.width - 64, canvas.height -32, 32, 32);	
			}
			if(max_button_ready) {
				ctx.drawImage(max_button, canvas.width - 32, canvas.height -32, 32, 32);	
			}
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
	}
	
}





function onClickPlayer(){
	if(videoContainer !== undefined && videoContainer.ready){
		
		//click 
		if(Player_State == 1) {
			Player_State = 2;
			videoContainer.video.play();
			return;
			
			
		} else if(Player_State == 2){
			var regionX = 0;
			var regionY = canvas.height - 32;
			var regionW = 64;
			var regionH = 32;
			
			//ctx.beginPath();
			//ctx.rect(pause_regionX, pause_regionY, pause_regionW, pause_regionH);
			//ctx.fill();
			
			if(HitBox(regionX, regionY, regionW, regionH, mouse_posX, mouse_posY)){
				if(videoContainer.video.paused){
					Player_State = 2;
					videoContainer.video.play();
				} else {
					videoContainer.video.pause();
					
				}
			}
			regionX = canvas.width - 64;
			regionY = canvas.height - 32;
			regionW = 32;
			regionH = 32;
			if(HitBox(regionX, regionY, regionW, regionH, mouse_posX, mouse_posY)){
				if(Is_Settings_Open){
					Is_Settings_Open = false;
				} else {
					Is_Settings_Open = true;
				}
			}
			
			
			regionX = canvas.width - 32;
			regionY = canvas.height - 32;
			regionW = 32;
			regionH = 32;
			if(HitBox(regionX, regionY, regionW, regionH, mouse_posX, mouse_posY)){
				canvas.width = screen.width
				canvas.height = screen.height
				openFullscreen()
			}
			
			
			if(Is_Settings_Open){
				regionX = canvas.width / 2 - 256 + 12;
				regionY = canvas.height / 2 - 256 + 108;
				regionW = 356;
				regionH = 32;
				if(HitBox(regionX, regionY, regionW, regionH, mouse_posX, mouse_posY)){
					if(Filler_Backround){
						Filler_Backround = false;
					} else {
						Filler_Backround = true;
					}
				}
			}
			
			
			
		}
	}
}
function HitBox(x, y, w, h, mx, my){
	console.log("Hitbox");
	if(x < mx && w+x > mx){
		console.log("check 1");
		if(y < my && y+h > my){
			console.log("Hitbox true");
			return true;
		}
	}
	console.log("Hitbox false");
	return false;
}

function openFullscreen() {

		
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { /* Firefox */
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE/Edge */
    canvas.msRequestFullscreen();
  }
  	videoContainer.scale = Math.min(
		canvas.width / this.videoWidth, 
		canvas.height / this.videoHeight); 
}



function videoMute(){

	muted = !muted;

	if(muted){
         
	}else{
         
	}
}


// register clicky event
canvas.addEventListener("click", onClickPlayer);
setInterval(updateCanvas, 16);