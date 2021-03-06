/*
	Code created by Alex Britt, and Rahul Ramkumar
*/

//Var used for current song
var currentSong;
var currentCall=0;
var MUTED_IMG_PATH="./assets/images/muted.png";
var UNMUTED_IMG_PATH="./assets/images/unmuted.png";
//Method to change the part of one piece
//Called if the user changes the tunage of a piece
function createNewSandbox(songName,callback,part,tune){
	//Resets the player
	audio0.pause();
	audio0.currentTime=0;

	drone1.muted=true;
	drone2.muted=true;


	//Uses the part var pased in to determine which instrument source to change
	if(part==1){
		audio1.src=(MUSIC_RELATIVE_PATH + songName + "/" + songName + "1" + tune + ".mp3");
		audio1.load();
	}
	else if(part==2){
		audio2.src=(MUSIC_RELATIVE_PATH + songName + "/" + songName + "2" + tune + ".mp3");
		audio2.load();
	}else if(part==3){
		audio3.src=(MUSIC_RELATIVE_PATH + songName + "/" + songName + "3" + tune + ".mp3");
		audio3.load();
	}else if(part==4){
		audio4.src=(MUSIC_RELATIVE_PATH + songName + "/" + songName + "4" + tune + ".mp3");
		audio4.load();
	}else if(part==5){
		audio5.src=(MUSIC_RELATIVE_PATH + songName + "/" + songName + "5" + tune + ".mp3");
		audio5.load();
	}

}
//Creates the sandbox when selected from the home screen. 

function createSandbox(songName, callback) {
	currentCall++;
	console.log(currentCall);
	// change displayed title in the sandbox
	currentSong=songName;
	var insertTitle = game.currentSongTitle.split('--')[0];
	insertTitle = insertTitle.substring(0, insertTitle.length-1) + ", Sandbox";
	$("#sandboxTitle").html(insertTitle);


	var voices;
	for (var i = 0; i < game.songs.length; i++) {
		if (game.songs[i].objName==songName) {
			numberOfVoices = game.songs[i].voices.length;
			voices=game.songs[i].voices;
		}
	}

	// open table and write first row
	for (var i=1; i<=numberOfVoices; i++) {
		var voiceName = voices[i-1];
		console.log(voiceName);
		$("#sandboxInstrumentTitle"+i).html(voiceName);
	}
	//Creates drones and set them to loop,and muted
	drone1 = new Audio(MUSIC_RELATIVE_PATH+ songName + "/" + songName + "Drone" + "1" + ".mp3");
	drone2 = new Audio(MUSIC_RELATIVE_PATH+ songName + "/" + songName + "Drone" + "2" + ".mp3");
	drone1.preload="auto";
	drone1.loop=true;
	drone1.load();
	drone1.muted=true;
	drone1.play();
	drone2.preload="auto";
	drone2.loop=true;
	drone2.load();
	drone2.muted=true;
	drone2.play();
	//Volume controls for all the parts
	$("#sandboxVolume1").mousemove(function(event) {
		audio1.volume = $("#sandboxVolume1").val();
	});
	$("#sandboxVolume2").mousemove(function(event) {
		audio2.volume = $("#sandboxVolume2").val();
	});
	$("#sandboxVolume3").mousemove(function(event) {
		audio3.volume = $("#sandboxVolume3").val();
	});
	$("#sandboxVolume4").mousemove(function(event) {
		audio4.volume = $("#sandboxVolume4").val();
	});
	if(numVoices>=5){
		$("#sandboxVolume5").mousemove(function(event) {
			audio5.volume = $("#sandboxVolume5").val();
		});
	}
	$("#sandboxVolumeDrone2").mousemove(function(event) {
		drone2.volume = $("#sandboxVolumeDrone2").val();
	});
	$("#sandboxVolumeDrone1").mousemove(function(event) {
		drone1.volume = $("#sandboxVolumeDrone1").val();
	});
	//Sets the parts to all be intune to start
	$("#sandboxAudio0").html("<source src=\"" + MUSIC_RELATIVE_PATH + songName + "/" + songName + "0" + ".mp3\" type=\"audio/mpeg\">");
	audio0 = document.getElementById("sandboxAudio0");
	audio0.load();
	audio1 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "10" + ".mp3");
	audio2 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "20" + ".mp3");
	audio3 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "30" + ".mp3");
	audio4 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "40" + ".mp3");
	//Test for fidth voice
	if(numberOfVoices==4) {
		audio5 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "0" + ".mp3");
	} else {
		audio5 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "50" + ".mp3");
	}


	// hide 5th voice line if only 4 voices
	if (numberOfVoices == 4) {
		$("#sandboxInstrumentRow5").attr("isVisible", "false");
	} else {
		$("#sandboxInstrumentRow5").attr("isVisible", "true");
	}
	audio1.load();
	audio2.load();
	audio3.load();
	audio4.load();
	if(numVoices>=5){
		audio5.load();
	}
	//Used to ensure that more than one version of the player is not running.
	if(currentCall<=1){
		callback();
	}
}
function hangInteractionsSandbox() {

		
	//play all Audio objects when the master audio element is played
	//this starts all of them to avoid future startup costs, then pauses them as fast as possible
	//then it schedules the concurrent setting all of them to the master's current time, and then schedules their concurrent playing
	$("#sandboxAudio0").on('play', function(event) {
		audio1.play();
		audio2.play();
		audio3.play();
		audio4.play();
		if(numVoices>=5){
			audio5.play();
		}
		audio1.pause();
		audio3.pause();
		audio2.pause();
		audio4.pause();
		if(numVoices>=5){
			audio5.pause();
		}
		setTimeout(function(){audio1.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio2.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio3.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio4.currentTime=audio0.currentTime;}, 100);
		if(numVoices>=5){
			setTimeout(function(){audio5.currentTime=audio0.currentTime;}, 100);
		}	
		setTimeout(function(){audio1.play();audio2.play();audio3.play();audio4.play();if(numVoices>=5){audio5.play();}}, 100);
	});

	//pause all Audio objects when the master audio element is paused
	$("#sandboxAudio0").on("pause", function(event) {
		audio1.pause();
		audio2.pause();
		audio3.pause();
		audio4.pause();
		if(numVoices>=5){
			audio5.pause();
		}
	});

	//when the master audio element is clicked on, check for muted/unmuted state
	//(there's no onmuted event for it, so we used onmouseup)
	$("#sandboxAudio0").on("mouseup", function(event) {
		setTimeout(function(){
			console.log("in the player");
			if (audio0.muted) {
				audio1.muted=true;
				audio2.muted=true;
				audio3.muted=true;
				audio4.muted=true;
				if(numVoices>=5){
					audio5.muted=true;
				}
				redrawSandboxMuteButtons();
			} else {
				audio1.muted=audio1Muted;
				audio2.muted=audio2Muted;
				audio3.muted=audio3Muted;
				audio4.muted=audio4Muted;
				if(numVoices>=5){
					audio5.muted=audio5Muted;
				}
				redrawSandboxMuteButtons();
			}}, 100);
	});

	//when the master audio element's volume is changed, it controls all the volumes together
	$("#sandboxAudio0").on('volumechange', function(event) {
		$("#sandboxVolume1").val(audio0.volume);
		$("#sandboxVolume2").val(audio0.volume);
		$("#sandboxVolume3").val(audio0.volume);
		$("#sandboxVolume4").val(audio0.volume);
		if(numVoices>=5){
			$("#sandboxVolume5").val(audio0.volume);
		}
		audio1.volume = $("#sandboxVolume1").val();
		audio2.volume = $("#sandboxVolume2").val();
		audio3.volume = $("#sandboxVolume3").val();
		audio4.volume = $("#sandboxVolume4").val();
		if(numVoices>=5){
			audio5.volume = $("#sandboxVolume5").val();
		}
	});

	
	//when the mouse is moved on volume sliders, change the volume property of the audio object
	
	//when an individual mute button is clicked, mute/unmute the Audio object, record the state (audioXMuted vars), and update the button
	
	$("#sandboxMute1").on('click', function(event) {
		console.log("here");
		if (audio1.muted) {
			audio1.muted=false;
			audio1Muted=false;
			$("#sandboxMute1").attr("src",UNMUTED_IMG_PATH);
		} else {
			//console.log("here");
			audio1.muted=true;
			audio1Muted=true;
			$("#sandboxMute1").attr("src",MUTED_IMG_PATH);
		}
	});
	$("#sandboxMute2").on('click', function(event) {
		if (audio2.muted) {
			audio2.muted=false;
			audio2Muted=false;
			$("#sandboxMute2").attr("src",UNMUTED_IMG_PATH);
		} else {
			audio2.muted=true;
			audio2Muted=true;
			$("#sandboxMute2").attr("src",MUTED_IMG_PATH);
		}
	});
	$("#sandboxMute3").on('click', function(event) {
		if (audio3.muted) {
			audio3.muted=false;
			audio3Muted=false;
			$("#sandboxMute3").attr("src",UNMUTED_IMG_PATH);
		} else {
			audio3.muted=true;
			audio3Muted=true;
			$("#sandboxMute3").attr("src",MUTED_IMG_PATH);
		}
	});
	$("#sandboxMute4").on('click', function(event) {
		if (audio4.muted) {
			audio4.muted=false;
			audio4Muted=false;
			$("#sandboxMute4").attr("src",UNMUTED_IMG_PATH);
		} else {
			audio4.muted=true;
			audio4Muted=true;
			$("#sandboxMute4").attr("src",MUTED_IMG_PATH);
		}
	});
	$("#sandboxMute5").on('click', function(event) {
		if (audio5.muted) {
			audio5.muted=false;
			audio5Muted=false;
			$("#sandboxMute5").attr("src",UNMUTED_IMG_PATH);
		} else {
			audio5.muted=true;
			audio5Muted=true;
			$("#sandboxMute5").attr("src",MUTED_IMG_PATH);
		}
	});

	$("#sandboxMuteDrone1").on('click', function(event){
		if(drone1.muted){
			drone1.muted=false;
			$("#sandboxMuteDrone1").attr("src",UNMUTED_IMG_PATH);
		}else{
			drone1.muted=true;
			$("#sandboxMuteDrone1").attr("src",MUTED_IMG_PATH);
		}
	});

	


	$("#sandboxMuteDrone2").on('click', function(event){
		if(drone2.muted){
			drone2.muted=false;
			$("#sandboxMuteDrone2").attr("src",UNMUTED_IMG_PATH);
		}else{
			drone2.muted=true;
			$("#sandboxMuteDrone2").attr("src",MUTED_IMG_PATH);
		}
	});
	//If the value of a select element changes, the method calls the createNewSandbox method
	//with the part that changes and its new value
		$("#sandboxTuning1").change(function(){
			var e = document.getElementById("sandboxTuning1");
			var strUser = e.options[e.selectedIndex].value;
			setTimeout(function(){ createNewSandbox(currentSong,hangInteractionsSandbox,1,strUser)},100);
		});	
		$("#sandboxTuning2").change(function(){
			var e = document.getElementById("sandboxTuning2");
			var strUser = e.options[e.selectedIndex].value;
			setTimeout(function(){ createNewSandbox(currentSong,hangInteractionsSandbox,2,strUser)},100);
		});	
		$("#sandboxTuning3").change(function(){
			var e = document.getElementById("sandboxTuning3");
			var strUser = e.options[e.selectedIndex].value;
			setTimeout(function(){ createNewSandbox(currentSong,hangInteractionsSandbox,3,strUser)},100);
		});	
		$("#sandboxTuning4").change(function(){
			var e = document.getElementById("sandboxTuning4");
			var strUser = e.options[e.selectedIndex].value;
			setTimeout(function(){ createNewSandbox(currentSong,hangInteractionsSandbox,4,strUser)},100);
		});	
		$("#sandboxTuning5").change(function(){
			var e = document.getElementById("sandboxTuning5");
			var strUser = e.options[e.selectedIndex].value;
			setTimeout(function(){ createNewSandbox(currentSong,hangInteractionsSandbox,5,strUser)},100);
		});	

		//Button to return home
		$("#sandboxReturnHome").on("click", function(event) {
			console.log("THis is a test");
		showDiv("home");
	});

}

function redrawSandboxMuteButtons() {
	if (audio1.muted) {
		$("#sandboxMute1").attr("src",MUTED_IMG_PATH);
	} else {
		$("#sandboxMute1").attr("src",UNMUTED_IMG_PATH);
	}
	if (audio2.muted) {
		$("#sandboxMute2").attr("src",MUTED_IMG_PATH);
	} else {
		$("#sandboxMute2").attr("src",UNMUTED_IMG_PATH);
	}
	if (audio3.muted) {
		$("#sandboxMute3").attr("src",MUTED_IMG_PATH);
	} else {
		$("#sandboxMute3").attr("src",UNMUTED_IMG_PATH);
	}
	if (audio4.muted) {
		$("#sandboxMute4").attr("src",MUTED_IMG_PATH);
	} else {
		$("#sandboxMute4").attr("src",UNMUTED_IMG_PATH);
	}
	if (audio5.muted) {
		$("#sandboxMute5").attr("src",MUTED_IMG_PATH);
	} else {
		$("#sandboxMute5").attr("src",UNMUTED_IMG_PATH);
	}
}