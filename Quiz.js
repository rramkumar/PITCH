/*
Code Written by Alex Britt, Jon Medenblik, Rahul Ramkumar
*/


//Global variables 
var audio0;
var audio1;
var audio2;
var audio3;
var audio4;
var audio5;
var drone1;

var MUSIC_RELATIVE_PATH = "assets/music/";
var IMAGE_RELATIVE_PATH = "assets/images/";
var FLAT_IMAGE_TAG = '<img src="' +IMAGE_RELATIVE_PATH+ 'flat.png"></img>';
var OK_IMAGE_TAG = '<img src="' +IMAGE_RELATIVE_PATH+ 'ok.png"></img>';
var SHARP_IMAGE_TAG = '<img src="' +IMAGE_RELATIVE_PATH+ 'sharp.png"></img>';
var MUTED_IMAGE_PATH = IMAGE_RELATIVE_PATH+ 'muted.png';
var UNMUTED_IMAGE_PATH = IMAGE_RELATIVE_PATH+ 'unmuted.png';
var CORRECT_MARK_IMAGE_PATH = IMAGE_RELATIVE_PATH+"correctMark.png"

//vars record whether each track is to be muted independent of muting by the master control in the audio tag
var audio1Muted = false;
var audio2Muted = false;
var audio3Muted = false;
var audio4Muted = false;
var audio5Muted = false;
var tones;


$(document).ready(function() {
	//Method to play pause custom player
	$("#mainplaypause").on("click", function(event) {//custom play/pause button
		if (audio0.paused == false){
			audio0.pause();//will in turn call a pause on the rest of the parts.			
			$("#pausegray").attr("isVisible", "false");
			$("#pauseblack").attr("isVisible", "false");
			$("#playblack").attr("isVisible", "false");
			$("#playgray").attr("isVisible", "true");
		}
		else if (audio0.paused == true){
			audio0.play();//will in turn call a pause on the rest of the parts.
			$("#playgray").attr("isVisible", "false");
			$("#playblack").attr("isVisible", "false");
			$("#pauseblack").attr("isVisible", "false");
			$("#pausegray").attr("isVisible", "true");
		}
	});

	$("#mainplaypause").mouseover(function(event) {//changes the play/pause button depending on mouseover
		if (audio0.paused == true){
			$("#pausegray").attr("isVisible", "false");
			$("#pauseblack").attr("isVisible", "false");
			$("#playgray").attr("isVisible", "false");
			$("#playblack").attr("isVisible", "true");
		}
		else if (audio0.paused == false){
			$("#playgray").attr("isVisible", "false");
			$("#playblack").attr("isVisible", "false");
			$("#pausegray").attr("isVisible", "false");
			$("#pauseblack").attr("isVisible", "true");
		}
	});

	$("#mainplaypause").mouseout(function(event) {//changes the play/pause button back after mouseover ends
		if (audio0.paused == true){
			$("#pausegray").attr("isVisible", "false");
			$("#pauseblack").attr("isVisible", "false");
			$("#playblack").attr("isVisible", "false");
			$("#playgray").attr("isVisible", "true");
		}
		else if (audio0.paused == false){
			$("#playgray").attr("isVisible", "false");
			$("#playblack").attr("isVisible", "false");
			$("#pauseblack").attr("isVisible", "false");
			$("#pausegray").attr("isVisible", "true");
		}
	});

	/////////////////////////////////////////////////////////////
	/*  master mute and volume controls removed by client request

	//Method to mute custom player
	$("#mainmute").on("click", function(event) {//custom mute button
		if (audio0.muted == false){
			audio0.muted=true;//mute 0
		}
		else if (audio0.muted == true){
			audio0.muted=false;//unmute 0
		}
		
		setTimeout(function(){// mutes/unmutes the other parts based on part 0
			if (audio0.muted) {
				audio1.muted=true;
				audio2.muted=true;
				audio3.muted=true;
				audio4.muted=true;
				if(numVoices >= 5){
					audio5.muted=true;
				}
				redrawMuteButtons();
			} else {
				audio1.muted=audio1Muted;
				audio2.muted=audio2Muted;
				audio3.muted=audio3Muted;
				audio4.muted=audio4Muted;
				if(numVoices >= 5){
					audio5.muted=audio5Muted;
				}
				redrawMuteButtons();
			}}, 50);
	});
	//Matches parts volume to the custom player volume control
	$("#mainvolumerange").mousemove(function(event) {
		audio1.volume = $("#mainvolumerange").val();
		audio2.volume = $("#mainvolumerange").val();
		audio3.volume = $("#mainvolumerange").val();
		audio4.volume = $("#mainvolumerange").val();
		if (numVoices >= 5){
			audio5.volume = $("#mainvolumerange").val();
		}
		$("#volume1").val($("#mainvolumerange").val());
		$("#volume2").val($("#mainvolumerange").val());
		$("#volume3").val($("#mainvolumerange").val());
		$("#volume4").val($("#mainvolumerange").val());
		if(numVoices >= 5){
			$("#volume5").val($("#mainvolumerange").val());
		}
	});
	//////////////////////////////////////////////////
	*/

	var pausedBeforeSeekPress;//used to let the seeker mouseup function know if it should unpause or not.
	//Method to seek all parts with the main part. 
	var seekShouldUpdate = true; // Lock that won't allow seek to update if the mouse is down.
	$("#mainseekerrange").mousedown(function(event) {
		pausedBeforeSeekPress = audio0.paused;
		seekShouldUpdate = false;
		audio0.pause();
		audio0.currentTime = (($("#mainseekerrange").val())*audio0.duration);	
	});

	$("#mainseekerrange").mouseup(function(event) {//Sets the volume on mouseup.
		audio0.currentTime = (($("#mainseekerrange").val())*audio0.duration);
		if (!pausedBeforeSeekPress) {
			audio0.play();
		}
		seekShouldUpdate = true;
	});

	//Will run the updateAudioTme function whenever the audio time updates and creates an event.
	var audioTracker = document.getElementById("audio0");
	audioTracker.ontimeupdate = function() {updateAudioTime()};

	function twoDigits(n) {//returns a 2 digit number if input is less than 10. Used for displaying seconds.
    	if (n > 9) {
    		return "" + n;
    	} else {
    		return "0" + n
    	}
	}

	function updateAudioTime() {//This redraws the time that is displayed in the custom player. Called on time change events.
		if (seekShouldUpdate) {
			$("#mainseekerrange").val((audio0.currentTime/audio0.duration));
		}
		var currentMinutes = Math.floor(audio0.currentTime / 60);
		var currentSeconds = parseInt(audio0.currentTime % 60, 10);
		var totalMinutes = Math.floor(audio0.duration / 60);
		var totalSeconds = parseInt(audio0.duration % 60, 10);
		$("#timedisplay").html(parseInt(currentMinutes, 10)+ ":" +twoDigits(parseInt(currentSeconds, 10)) + " / "+parseInt(totalMinutes, 10) + ":" + twoDigits(parseInt(totalSeconds, 10)) );
	}

	$('#newExample').click(function(event){
				showDiv('quiz');
				setTimeout(function() {
					tones = createAudios(game.currentSongObjName, game.currentLevel);
				},1000); 
				hangInteractions();
				audio0.pause();
				audio0.currentTime = 0;
				$('#correctIncorrect').addClass('invisibleThings');
				$('.quizAnswerMark').css('visibility', 'hidden');
	});

	//Quiz submit button
	//Goes through and makes sure value of the flat/sharp/intune button
	//Matches the tone of the actual piece. 
	$("#quizSubmit").click(function(event) {
			var correct = true;
			for (var i = 0; i < tones.length; i++) {
				var temp1 = tones[i];
				var temp3 = i+1;
				var temp4 = "tone" + temp3.toString();
				var temp2 = ($('input[name="' +temp4+ '"]:checked').val());
				temp1=parseInt(temp1);
				temp2=parseInt(temp2);
				//Test to see if signs mathes for each instrument in the piece
				if (temp1 < 0 && temp2 >= 0) {
					correct = false;
					markCorrectOrIncorrect(i+1, false);
				} else if (temp1 == 0 && temp2 != 0) {
					correct = false;
					markCorrectOrIncorrect(i+1, false);
				} else if (temp1 > 0 && temp2 <= 0) {
					correct = false;
					markCorrectOrIncorrect(i+1, false);
				} else {
					markCorrectOrIncorrect(i+1, true);
				}
			}
			//Correct result
			if (correct) {
				$('#correctIncorrect').html('Correct!');
				$('#correctIncorrect').removeClass('invisibleThings');
				$('#correctIncorrect').css('background-color', '#3DA54A');
				$('#toggleHints').hide();
				correct = false;
			} else {
				//Incorrect
				$('#correctIncorrect').html('Try Again!');
				$('#correctIncorrect').removeClass('invisibleThings');
				$('#correctIncorrect').css('background-color', '#E63F3F');
				$('#toggleHints').show();
			}
	});
	//Toggle Hints button
	//Turns on answers if selected
	//Only shown after the user submits the first time
	$("#toggleHints").on("click", function(event) {
		if (game.hints) {
			$("#toggleHints").html("Show Hints");
			$(".quizAnswerMark").css('visibility', 'hidden');
		} else {
			$("#toggleHints").html("Hide Hints");
			$(".quizAnswerMark").css('visibility', 'visible');
		}
		game.hints = !game.hints;
	});

	$("#toggleHints").hide();

	$("#quizReturnHome").on("click", function(event) {
		showDiv("home");
	});

});

// edit val of button for when the master audio element's mute is clicked to unmute
function redrawMuteButtons() {
	if (audio1.muted) {
		$("#mute1").attr("src",MUTED_IMAGE_PATH);
	} else {
		$("#mute1").attr("src",UNMUTED_IMAGE_PATH);
	}
	if (audio2.muted) {
		$("#mute2").attr("src",MUTED_IMAGE_PATH);
	} else {
		$("#mute2").attr("src",UNMUTED_IMAGE_PATH);
	}
	if (audio3.muted) {
		$("#mute3").attr("src",MUTED_IMAGE_PATH);
	} else {
		$("#mute3").attr("src",UNMUTED_IMAGE_PATH);
	}
	if (audio4.muted) {
		$("#mute4").attr("src",MUTED_IMAGE_PATH);
	} else {
		$("#mute4").attr("src",UNMUTED_IMAGE_PATH);
	}
	if (audio5.muted) {
		$("#mute5").attr("src",MUTED_IMAGE_PATH);
	} else {
		$("#mute5").attr("src",UNMUTED_IMAGE_PATH);
	}
}

function createAudios(songName, difficultyLevel) {
	// change displayed title in the quiz
	var insertTitle = game.currentSongTitle.split('--')[0];
	insertTitle = insertTitle.substring(0, insertTitle.length-1);
	$("#quizTitle").html(insertTitle + ', Level ' + game.currentLevel);


	var numberOutOfTune = game.levels[difficultyLevel-1].numberOutOfTune;
	// 5 minus value returned to ensure the levels match file names
	// files are named 10,11,12,13,14 in order of increasing out-of-tune-ness,
	// whereas difficulties are 1, 2, 3, 4 in order of increasing difficulty of perception (i.e. decreasing out-of-tune-ness)
	var degreeOutOfTune = 5-game.levels[difficultyLevel-1].degreeOutOfTune;
	var voicePattern = game.levels[difficultyLevel-1].voicePattern;
	var numberOfVoices;
	var voices;
	for (var i = 0; i < game.songs.length; i++) {
		if (game.songs[i].objName == songName) {
			numberOfVoices = game.songs[i].voices.length;
			voices = game.songs[i].voices;
		}
	}
	// Creates the custom music player system each time the player is needed
	// Called after each correct quiz answer ect. 
	var quizContentAppend = "";
	for (var i = 1; i <= numberOfVoices; i++) {
		var voiceName = voices[i-1];
		quizContentAppend += '<div id="quizPartDiv'+i+'" class="quizPartDiv">';
		quizContentAppend += 	'<input type="range" id="volume' +i+ '" class="volumeSlider" min="0" max="1" value="1" step=".01">';
		quizContentAppend += 	'<img class="muteButtons" id="mute' +i+ '" src="' +UNMUTED_IMAGE_PATH+ '" onclick="clicked' +i+ '();"></img><span> ' +voiceName+ '</span>';
		quizContentAppend += 	'<ul class="choices">';
		quizContentAppend += 		'<li><img style="visibility: hidden;" class="quizAnswerMark" id="quizAnswerMark' +i+ '"></li>';
		quizContentAppend += 		'<li class="quizAnswerRadio"><input type="radio" name="tone' +i+ '" value="-1" id="tone' +i+ 'flat">' +FLAT_IMAGE_TAG+ '</li>';
		quizContentAppend += 		'<li class="quizAnswerRadio"><input type="radio" name="tone' +i+ '" value="0" id="tone' +i+ 'inTune" checked>' +OK_IMAGE_TAG+ '</li>';
		quizContentAppend += 		'<li class="quizAnswerRadio"><input type="radio" name="tone' +i+ '" value="1" id="tone' +i+ 'sharp">' +SHARP_IMAGE_TAG+ '</li>';
		quizContentAppend += 	'</ul></div><br>';
	}
	$("#quizVoiceComponents").empty();
	$("#quizVoiceComponents").append(quizContentAppend);
	$("#quizDroneComponents").empty();
	var quizDroneContent = "";
	for(var q = 1; q <= 2; q++){
		var highLow = "";
		if (q == 1) {
			highLow = "High";
		} else if (q == 2) {
			highLow = "Low";
		}
		// Creates the drones player controls
		quizDroneContent += '<div id="quizDronePartDiv' +q+ '" class="quizDronePartDiv">';
		quizDroneContent += '<input type="range" id="volumeDrone' +q+ '" class="volumeSlider" min="0" max="1" value="1" step=".01">';
		quizDroneContent += '<img class="muteButtons" id="muteDrone' +q+ '" src="' +MUTED_IMAGE_PATH+ '" onclick="clickedDrone' +q+ '();"></img> <span> '+highLow+' Drone</span>';
	}

	//Appends the drone components
	$("#quizDroneComponents").append(quizDroneContent);
	drone1 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" +songName+ "Drone1.mp3");
	drone2 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" +songName+ "Drone2.mp3");

	// loads the drones and mutes them (so constantly playing)
	// loops the file to ensure always playing
	drone1.preload = "auto";
	drone1.loop = true;
	drone1.load();
	drone1.muted = true;
	drone1.play();
	drone2.preload = "auto";
	drone2.loop = true;
	drone2.load();
	drone2.muted = true;
	drone2.play();

	// Volume control
	$("#volume1").mousemove(function(event) {
		audio1.volume = $("#volume1").val();
	});
	$("#volume2").mousemove(function(event) {
		audio2.volume = $("#volume2").val();
	});
	$("#volume3").mousemove(function(event) {
		audio3.volume = $("#volume3").val();
	});
	$("#volume4").mousemove(function(event) {
		audio4.volume = $("#volume4").val();
	});
	if(numVoices>=5){
		$("#volume5").mousemove(function(event) {
			audio5.volume = $("#volume5").val();
		});
	// Drone volume control
	}
	$("#volumeDrone2").mousemove(function(event) {
		drone2.volume = $("#volumeDrone2").val();
	});
	$("#volumeDrone1").mousemove(function(event) {
		drone1.volume = $("#volumeDrone1").val();
	});
	// randomize how many will be out of tune
	numberOutOfTune = randomizeNumberOutOfTune(numberOutOfTune);
	// Method used to figure out which part should be out of tune
	// Returns an array with each value
	var outOfTuneArray = randomizeOutOfTuneArray(numberOutOfTune, numberOfVoices, degreeOutOfTune, voicePattern);
	$('#audio0').html('<source src="' +MUSIC_RELATIVE_PATH + songName + '/' +songName+ '0.mp3" type="audio/mpeg">');
	audio0 = document.getElementById("audio0");
	audio0.load();
	audio1 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "1" + outOfTuneArray[0] + ".mp3");
	audio2 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "2" + outOfTuneArray[1] + ".mp3");
	audio3 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "3" + outOfTuneArray[2] + ".mp3");
	audio4 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "4" + outOfTuneArray[3] + ".mp3");

	if(numberOfVoices == 4) {
		audio5 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "0" + ".mp3");
	}else{
		audio5 = new Audio(MUSIC_RELATIVE_PATH + songName + "/" + songName + "5" + outOfTuneArray[4] + ".mp3");
	}
	return outOfTuneArray;

}

// Methods that mute individual parts. 
function clicked1() {
	if (audio1.muted) {
		audio1.muted = false;
		audio1Muted = false;
		$("#mute1").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		audio1.muted = true;
		audio1Muted = true;
		$("#mute1").attr("src",MUTED_IMAGE_PATH);
	}
}

function clicked2() {
	if (audio2.muted) {
		audio2.muted = false;
		audio2Muted = false;
		$("#mute2").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		audio2.muted = true;
		audio2Muted = true;
		$("#mute2").attr("src",MUTED_IMAGE_PATH);
	}
}

function clicked3() {
	if (audio3.muted) {
		audio3.muted = false;
		audio3Muted = false;
		$("#mute3").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		audio3.muted = true;
		audio3Muted = true;
		$("#mute3").attr("src",MUTED_IMAGE_PATH);
	}
}

function clicked4() {
	if (audio4.muted) {
		audio4.muted = false;
		audio4Muted = false;
		$("#mute4").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		audio4.muted = true;
		audio4Muted = true;
		$("#mute4").attr("src",MUTED_IMAGE_PATH);
	}
}

function clicked5() {
	if (audio5.muted) {
		audio5.muted = false;
		audio5Muted = false;
		$("#mute5").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		audio5.muted = true;
		audio5Muted = true;
		$("#mute5").attr("src",MUTED_IMAGE_PATH);
		}
}

function clickedDrone1() {
	if (drone1.muted) {
		drone1.muted = false;
		$("#muteDrone1").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		drone1.muted = true;
		$("#muteDrone1").attr("src",MUTED_IMAGE_PATH);
	}
}

function clickedDrone2() {
	if (drone2.muted) {
		drone2.muted = false;
		$("#muteDrone2").attr("src",UNMUTED_IMAGE_PATH);
	} else {
		drone2.muted = true;
		$("#muteDrone2").attr("src",MUTED_IMAGE_PATH);
	}
}

// Function to load all music values
function hangInteractions() {
	audio1.load();
	audio2.load();
	audio3.load();
	audio4.load();
	if(numVoices >= 5){
		audio5.load();
	}
		
	// play all Audio objects when the master audio element is played
	// this starts all of them to avoid future startup costs, then pauses them as fast as possible
	// then it schedules the concurrent setting all of them to the master's current time, and then schedules their concurrent playing
	$("#audio0").on('play', function(event) {
		audio1.play();
		audio2.play();
		audio3.play();
		audio4.play();
		if (numVoices >= 5) {
			audio5.play();
		}

		audio1.pause();
		audio3.pause();
		audio2.pause();
		audio4.pause();
		if (numVoices >= 5) {
			audio5.pause();
		}

		setTimeout(function(){audio1.currentTime = audio0.currentTime;}, 100);
		setTimeout(function(){audio2.currentTime = audio0.currentTime;}, 100);
		setTimeout(function(){audio3.currentTime = audio0.currentTime;}, 100);
		setTimeout(function(){audio4.currentTime = audio0.currentTime;}, 100);
		if(numVoices >= 5){
			setTimeout(function(){audio5.currentTime = audio0.currentTime;}, 100);
		}	
		setTimeout(function(){
			audio1.play();
			audio2.play();
			audio3.play();
			audio4.play();
			if (numVoices >= 5) {
				audio5.play();
			}
		}, 100);
	});

	// pause all Audio objects when the master audio element is paused
	$("#audio0").on("pause", function(event) {
		audio1.pause();
		audio2.pause();
		audio3.pause();
		audio4.pause();
		if(numVoices >= 5){
			audio5.pause();
		}
	});

	// when the master audio element is clicked on, check for muted/unmuted state
	// (there's no onmuted event for it, so we used onmouseup)
	$("#audio0").on("mouseup", function(event) {
		setTimeout(function() {
			if (audio0.muted) {
				audio1.muted = true;
				audio2.muted = true;
				audio3.muted = true;
				audio4.muted = true;
				if(numVoices >= 5){
					audio5.muted = true;
				}
				redrawMuteButtons();
			} else {
				audio1.muted = audio1Muted;
				audio2.muted = audio2Muted;
				audio3.muted = audio3Muted;
				audio4.muted = audio4Muted;
				if (numVoices >= 5) {
					audio5.muted = audio5Muted;
				}
				redrawMuteButtons();
			}
		}, null);
	});

	// when the master audio element's volume is changed, it controls all the volumes together
	$("#audio0").on('volumechange', function(event) {
		$("#volume1").val(audio0.volume);
		$("#volume2").val(audio0.volume);
		$("#volume3").val(audio0.volume);
		$("#volume4").val(audio0.volume);
		if (numVoices >= 5) {
			$("#volume5").val(audio0.volume);
		}
		audio1.volume = $("#volume1").val();
		audio2.volume = $("#volume2").val();
		audio3.volume = $("#volume3").val();
		audio4.volume = $("#volume4").val();
		if (numVoices >= 5) {
			audio5.volume = $("#volume5").val();
		}
	});	
}
// Method to determine which parts are out of tune
function randomizeNumberOutOfTune(numberOutOfTune) {
	//If at most one is out of tune
	//Then there is a 90% change one is out of tune
	//and a 10% chance 0 are out of tune. 
	if (numberOutOfTune == 1) {
		var rand = Math.floor(Math.random()*10);
		if (rand == 0) {
			return 0;
		} else {
			return 1;
		}
	//IF at max two can be out of tune then
	//10% chance 0 out of tune
	//30% chance 1 out of tune
	//60% chance 2 out of tune
	} else if (numberOutOfTune = 2) {
		var rand = Math.floor(Math.random()*10);
		if (rand == 0) {
			return 0;
		} else if (rand <= 3) {
			return 1;
		} else {
			return 2;
		}
	}
}
// creates an array containing the last part of the filenames, 
// indicating which file will be loaded for each voice
function randomizeOutOfTuneArray(numberOutOfTune, numberOfVoices, degreeOutOfTune, voicePattern) {
	var outOfTuneArray;
	var sOrf1 = sharpOrFlat();
	var sOrf2 = sharpOrFlat();
	var valueOutOfTune1 = sOrf1 + degreeOutOfTune.toString();
	var valueOutOfTune2 = sOrf2 + degreeOutOfTune.toString();
	// If 0 are out of tune just returns all 0's to indicate all should be in tune
	if (numberOutOfTune == 0) {
		if (numberOfVoices == 5) {
			outOfTuneArray = ["0","0","0","0","0"];
			return outOfTuneArray;
		} else {
			outOfTuneArray = ["0","0","0","0"];
			return outOfTuneArray;
		}
	}
	// Calculates the out of tune part based on the specifications
	// From the levels.json file. 
	if (numberOfVoices == 4) {
		outOfTuneArray = ["0","0","0","0"];
		if (numberOutOfTune == 1) {
			if (voicePattern == 1) {
				var temp = Math.floor(Math.random()*2);
				if (temp == 0) {
					outOfTuneArray[0] = valueOutOfTune1;
				} else {
					outOfTuneArray[3] = valueOutOfTune1;
				}
			}
			if (voicePattern == 2) {
				var temp = Math.floor(Math.random()*2);
				if (temp == 0) {
					outOfTuneArray[1] = valueOutOfTune1;
				} else {
					outOfTuneArray[2] = valueOutOfTune1;
				}

			}
			if (voicePattern == 3) {
				var temp=Math.floor(Math.random()*numberOfVoices);
				outOfTuneArray[temp] = valueOutOfTune1;
			}
			
		} else {
			if (voicePattern == 1) {
				outOfTuneArray[0] = valueOutOfTune1;
				outOfTuneArray[3] = valueOutOfTune2;
			} else if (voicePattern == 2){
				outOfTuneArray[1] = valueOutOfTune1;
				outOfTuneArray[2] = valueOutOfTune2;
			} else {
				var arr = [0,1,2,3];
				arr=shuffle(arr);
				outOfTuneArray[arr[0]] = valueOutOfTune1;
				outOfTuneArray[arr[1]] = valueOutOfTune2;
			}
		}
	} else if (numberOfVoices == 5) {
		outOfTuneArray = ["0","0","0","0","0"];
		if (numberOutOfTune == 1) {
			if (voicePattern == 1) {
				var temp = Math.floor(Math.random()*2);
				if (temp == 0) {
					outOfTuneArray[0] = valueOutOfTune1;
				} else {
					outOfTuneArray[4] = valueOutOfTune1;
				}
			}
			if (voicePattern == 2) {
				var temp=Math.floor(Math.random()*3)+1;
				outOfTuneArray[temp] = valueOutOfTune1;
			}
			if (voicePattern == 3) {
				var temp = Math.floor(Math.random()*numberOfVoices);
				outOfTuneArray[temp] = valueOutOfTune1;
			}
		} else {
			if (voicePattern == 1) {
				outOfTuneArray[0] = valueOutOfTune1;
				outOfTuneArray[4] = valueOutOfTune2;
			} else if (voicePattern == 2) {
				var arr = [1,2,3];
				arr = shuffle(arr);
				outOfTuneArray[1] = valueOutOfTune1;
				outOfTuneArray[2] = valueOutOfTune2;
			} else {
				var arr = [0,1,2,3,4];
				arr = shuffle(arr);
				outOfTuneArray[arr[0]] = valueOutOfTune1;
				outOfTuneArray[arr[1]] = valueOutOfTune2;
			}
		}
	}
	return outOfTuneArray;
}
// Method called by show hints
// Marks an instrument as correct if they get the intonation correct
// Marks incorrect if they get the intonation wrong
function markCorrectOrIncorrect(voiceNumber, correct) {
	if (correct) {
		$("#quizAnswerMark"+voiceNumber).attr("src", CORRECT_MARK_IMAGE_PATH);
	} else {
		$("#quizAnswerMark"+voiceNumber).attr("src", IMAGE_RELATIVE_PATH+"incorrectMark.png");
	}
}
// Method is called by randomizeOutOfTuneArray (method to determine which part is out of tune)
// Chooses a random num between 0 and 1
// if 0 the instrument is sharp
// if 1 the instrument is flat
function sharpOrFlat() {
	var sharpFlat = Math.floor(Math.random()*2);
		if (sharpFlat == 0){
			return "";
		} else {
			return "-";
		}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}