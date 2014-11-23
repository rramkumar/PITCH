
function createSandbox(songName, callback) {
	// change displayed title in the sandbox
	var insertTitle = game.currentSongTitle.split('--')[0];
	insertTitle = insertTitle.substring(0, insertTitle.length-1);
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
	//randomize how many will be out of tune
	$("#sandboxAudio0").html("<source src=\"" + MUSIC_RELATIVE_PATH + songName + "/" + songName + "0" + ".mp3\" type=\"audio/mpeg\">");
	audio0 = document.getElementById("sandboxAudio0");
	audio0.load();
	audio1 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "10" + ".mp3");
	audio2 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "20" + ".mp3");
	audio3 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "30" + ".mp3");
	audio4 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "40" + ".mp3");

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

	callback();
}
function hangInteractionsSandbox() {
	audio1.load();
	audio2.load();
	audio3.load();
	audio4.load();
	if(numVoices>=5){
		audio5.load();
	}
		
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
			if (audio0.muted) {
				audio1.muted=true;
				audio2.muted=true;
				audio3.muted=true;
				audio4.muted=true;
				if(numVoices>=5){
					audio5.muted=true;
				}
				$("#sandboxMute1").html("Unmute");
				$("#sandboxMute2").html("Unmute");
				$("#sandboxMute3").html("Unmute");
				$("#sandboxMute4").html("Unmute");
				if(numVoices>=5){
					$("#sandboxMute5").html("Unmute");
				}
			} else {
				audio1.muted=audio1Muted;
				audio2.muted=audio2Muted;
				audio3.muted=audio3Muted;
				audio4.muted=audio4Muted;
				if(numVoices>=5){
					audio5.muted=audio5Muted;
				}
				redrawMuteButtons();
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
		console.log(audio1.muted);
		if (audio1.muted) {
			//console.log("here");
			audio1.muted=false;
			audio1Muted=false;
			$("#sandboxMute1").html("Mute");
		} else {
			//console.log("here");
			audio1.muted=true;
			audio1Muted=true;
			$("#sandboxMute1").html("Unmute");
		}
	});
	$("#sandboxMute2").on('click', function(event) {
		if (audio2.muted) {
			audio2.muted=false;
			audio2Muted=false;
			$("#sandboxMute2").html("Mute");
		} else {
			audio2.muted=true;
			audio2Muted=true;
			$("#sandboxMute2").html("Unmute");
		}
	});
	$("#sandboxMute3").on('click', function(event) {
		if (audio3.muted) {
			audio3.muted=false;
			audio3Muted=false;
			$("#sandboxMute3").html("Mute");
		} else {
			audio3.muted=true;
			audio3Muted=true;
			$("#sandboxMute3").html("Unmute");
		}
	});
	$("#sandboxMute4").on('click', function(event) {
		if (audio4.muted) {
			audio4.muted=false;
			audio4Muted=false;
			$("#sandboxMute4").html("Mute");
		} else {
			audio4.muted=true;
			audio4Muted=true;
			$("#sandboxMute4").html("Unmute");
		}
	});
	$("#sandboxMute5").on('click', function(event) {
		if (audio5.muted) {
			audio5.muted=false;
			audio5Muted=false;
			$("#sandboxMute5").html("Mute");
		} else {
			audio5.muted=true;
			audio5Muted=true;
			$("#sandboxMute5").html("Unmute");
		}
	});

	$("#sandboxMuteDrone1").on('click', function(event){
		if(drone1.muted){
			drone1.muted=false;
			$("#sandboxMuteDrone1").html("Mute");
		}else{
			drone1.muted=true;
			$("#sandboxMuteDrone1").html("Unmute");
		}
	});

	


	$("#sandboxMuteDrone2").on('click', function(event){
		if(drone2.muted){
			drone2.muted=false;
			$("#sandboxMuteDrone2").html("Mute");
		}else{
			drone2.muted=true;
			$("#sandboxMuteDrone2").html("Unmute");
		}
	});

	
}