// WARNING!! THIS PLAYER WAS MADE WHEN I DID KNOW LESS OF JS. IT REALLY TRASH1!
// DON'T USE THIS!!!!!!





// Data stuff
var Player_State = 0;


var muted = false;

var videoContainer;
var video = document.createElement("video"); 
video.src = UI_Player_Settings["players"][0]["resolution"]["720p"];
video.loop = false;
video.muted = muted;

videoContainer = { 
	video : video,
	ready : false,   
};

var Is_Settings_Open = false;
var Filler_Backround = true;
var Fullscreen = false;
var images = ["play_large.png", "pause.png", "play.png", "rewatch.png", "settings.png", "max.png", "min.png"];
var images_ready = new Map();


function GetPlayerElement(type, player_id){
	if(type == 0) return document.getElementById(UI_Player_Settings["players"][player_id]["canvas_id"]);
	if(type == 1) return GetPlayerElement(0, player_id).getContext("2d");
}

/*
// ------------------------------
//	Loading in images into map
// ------------------------------
*/
	
	for (img of images) {
		const image = new Image(0, 0);
		image.onload = images_ready.set(img, image);
		image.src = "../samples/" + img;
	}
	
	
	
	//Loading up image
	var video_thumbnail_play_ready = false;
	const video_thumbnail = new Image(0, 0);
	video_thumbnail.onload = MakeReady(1);
	video_thumbnail.src = UI_Player_Settings["players"][0]["thumbnail_url"];
	

function MakeReady(img_id){
	
	if(img_id == 1){
		video_thumbnail_ready = true;
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

GetPlayerElement(0,0).onmousemove = function(e) {
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
	document.body.removeChild(GetPlayerElement(0,0));
	document.body.innerHTML += "<h2>ERROR: Can't load video</h2><br>";
	document.body.innerHTML += "Browser too old?";
}

video.oncanplay = readyToPlayVideo; 

function readyToPlayVideo(event){
	videoContainer.scale = Math.min(
		GetPlayerElement(0,0).width / this.videoWidth, 
		GetPlayerElement(0,0).height / this.videoHeight); 

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
	
	if((mouse_posX == check_mouse_posX && mouse_posY == check_mouse_posY &&  Player_State == 2) || (video_thumbnail_ready && images_ready.has("play_large.png") && Player_State == 1)){
		return; // Not need to update, optimizing performance.
	}
	var canvas = GetPlayerElement(0,0);
	var ctx = GetPlayerElement(1,0)
	
	if(!videoContainer.video.paused && videoContainer.video.currentTime > 0){ 
		Player_State = 2; // change state to play player if not already
	}
	
	ctx.clearRect(0,0,canvas.width, canvas.height); // clear screen
	
		
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	//ctx.fill(); //fill black screen
	

	
	if(Player_State == 0){
		

		if(video_thumbnail_ready && images_ready.has("play_large.png")) {
			ctx.drawImage(video_thumbnail, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(images_ready.get("play_large.png"), canvas.width / 2 - 256, canvas.height / 2 - 256, 512, 512);
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
			ctx.fillRect(6, canvas.height -36, canvas.width - 12, 4);
			ctx.filter = "none";
			
			var size = (video.currentTime/video.duration) * (canvas.width - 12);
			
			ctx.restore();
			
			ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
			ctx.fillRect(6, canvas.height -36, size, 4);
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
			if(images_ready.has("settings.png")) {
				ctx.drawImage(images_ready.get("settings.png"), canvas.width - 64, canvas.height -32, 32, 32);	
			}
			if(images_ready.has("max.png")) {
				ctx.drawImage(images_ready.get("max.png"), canvas.width - 32, canvas.height -32, 32, 32);	
			}
			if(videoContainer.video.paused){
				if(videoContainer.video.ended){
					if(images_ready.has("rewatch.png")) {
						ctx.drawImage(images_ready.get("rewatch.png"), 16, canvas.height -32, 32, 32);
					}
				} else{
					if(images_ready.has("play.png")) {
						ctx.drawImage(images_ready.get("play.png"), 16, canvas.height -32, 32, 32);
						
					}
				}
			} else {
				if(images_ready.has("pause.png")) {
					ctx.drawImage(images_ready.get("pause.png"), 16, canvas.height -32, 32, 32);
				}
			}
		}
	}
	
}





function onClickPlayer(){
	if(videoContainer !== undefined && videoContainer.ready){
		
		var canvas = GetPlayerElement(0,0);
		var ctx = GetPlayerElement(1,0);
		
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
			
			//
			var regionX = 6;
			var regionY = canvas.height - 52;
			var regionW = canvas.width - 12;
			var regionH = 20;
			
			if(HitBox(regionX, regionY, regionW, regionH, mouse_posX, mouse_posY)){
				var calc = (video.duration * (mouse_posX - 6)) / (canvas.width - 12);
				video.currentTime = calc
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
	if(x < mx && w+x > mx){
		if(y < my && y+h > my){
			return true;
		}
	}
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
GetPlayerElement(0,0).addEventListener("click", onClickPlayer);
setInterval(updateCanvas, 16);