var audio0;
var audio1;
var audio2;
var audio3;
var audio4;
var audio5;

var musicRelativePath = "assets/music/";

//vars record whether each track is to be muted independent of muting by the master control in the audio tag
var audio1Muted=false;
var audio2Muted=false;
var audio3Muted=false;
var audio4Muted=false;
var audio5Muted=false;
var tones;


$(document).ready(function() {
	


	
	$("#quizSubmit").click(function(event){
		var checked = (($('input[name=tone1]:checked').is(':checked'))&&($('input[name=tone2]:checked').is(':checked'))&&($('input[name=tone3]:checked').is(':checked'))&&($('input[name=tone4]:checked').is(':checked')))
		// check 5th answer if there's a 5th voice
		if (numVoices >= 5) {
			checked = checked&&($('input[name=tone5]:checked').is(':checked'));
		}
		if (checked==false) {	
			alert("Answer Not Selected");
		} else {
			var correct=true;
			for (var i=0; i<tones.length; i++) {
				var temp1=tones[i];
				var temp3=i+1;
				var temp4="tone" + temp3.toString();
				var temp2=($('input[name="'+temp4+'"]:checked').val());
				if (temp1!=temp2) {
					correct=false;
				}
			}
			if (correct) {
				alert("You win!");
			} else {
				alert("try again");
			}
		}
	});

});

//edit val of button for when the master audio element's mute is clicked to unmute
function redrawMuteButtons() {
	if (audio1.muted) {
		$("#mute1").val("Unmute");
	} else {
		$("#mute1").val("Mute");
	}
	if (audio2.muted) {
		$("#mute2").val("Unmute");
	} else {
		$("#mute2").val("Mute");
	}
	if (audio3.muted) {
		$("#mute3").val("Unmute");
	} else {
		$("#mute3").val("Mute");
	}
	if (audio4.muted) {
		$("#mute4").val("Unmute");
	} else {
		$("#mute4").val("Mute");
	}
	if (audio5.muted) {
		$("#mute5").val("Unmute");
	} else {
		$("#mute5").val("Mute");
	}
}

function createAudios(songName, difficultyLevel) {
	var numberOutOfTune = game.levels[difficultyLevel-1].numberOutOfTune;
	//5 minus value returned to ensure the levels match file names
	// files are named 10,11,12,13,14 in order of increasing out-of-tune-ness,
	// whereas difficulties are 1, 2, 3, 4 in order of increasing difficulty of perception (i.e. decreasing out-of-tune-ness)
	var degreeOutOfTune = 5-game.levels[difficultyLevel-1].degreeOutOfTune;
	var voicePattern = game.levels[difficultyLevel-1].voicePattern;
	var numberOfVoices;
	var voices;
	for (var i = 0; i < game.songs.length; i++) {
		if (game.songs[i].objName==songName) {
			numberOfVoices = game.songs[i].voices.length;
			voices=game.songs[i].voices;
		}
	}

	$("#quizVoiceComponents").empty();
	var quizContentAppend = "";

	for (var i=1; i<=numberOfVoices; i++) {
		var voiceName = voices[i-1];
		quizContentAppend += '<div id="quizPartDiv'+i+'" class="quizPartDiv">';
		quizContentAppend += 	'<input type="range" id="volume'+i+'" class="volumeSlider" min="0" max="1" value="1" step=".01">';
		quizContentAppend += 	'<input type="button" id="mute'+i+'" class="m-btn blue" value="Mute"> <span>'+voiceName+' Volume</span>';
		quizContentAppend += 	'<ul class="choices">';
		quizContentAppend += 		'<li><input type="radio" name="tone'+i+'" value="-1" id="tone'+i+'flat">Flat </li>';
		quizContentAppend += 		'<li><input type="radio" name="tone'+i+'" value="0" id="tone'+i+'inTune" checked>In Tune </li>';
		quizContentAppend += 		'<li><input type="radio" name="tone'+i+'" value="1" id="tone'+i+'sharp">Sharp </li>';
		quizContentAppend += 	'</ul></div><br>';
	}

	$("#quizVoiceComponents").html(quizContentAppend);


	//randomize how many will be out of tune
	numberOutOfTune = randomizeNumberOutOfTune(numberOutOfTune);
	var OutOfTuneArray = randomizeOutOfTuneArray(numberOutOfTune, numberOfVoices, degreeOutOfTune, voicePattern);
	$("#audio0").html("<source src=\"" + musicRelativePath + songName + "/" + songName + "0" + ".mp3\" type=\"audio/mpeg\">");
	audio0 = document.getElementById("audio0");
	audio1 = new Audio(musicRelativePath + songName + "/" + songName + "1" + "0" + ".mp3");
	alert(musicRelativePath + songName + "/" + songName + "1" + "0" + ".mp3");
	audio2 = new Audio(musicRelativePath + songName + "/" + songName + "2" + "0" + ".mp3");
	audio3 = new Audio(musicRelativePath + songName + "/" + songName + "3" + "0" + ".mp3");
	audio4 = new Audio(musicRelativePath + songName + "/" + songName + "4" + "0" + ".mp3");

	if(numberOfVoices==4) {
		audio5 = new Audio(musicRelativePath + songName + "/" + songName + "0" + ".mp3");
	}else{
		audio5 = new Audio(musicRelativePath + songName + "/" + songName + "5" + "0" + ".mp3");
	}
	return OutOfTuneArray;
}

function hangInteractions(tester) {
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
	$("#audio0").on('play', function(event) {
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
	$("#audio0").on("pause", function(event) {
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
	$("#audio0").on("mouseup", function(event) {
		console.log("#audio0 onmouseup");
		setTimeout(function(){
			if (audio0.muted) {
				audio1.muted=true;
				audio2.muted=true;
				audio3.muted=true;
				audio4.muted=true;
				if(numVoices>=5){
					audio5.muted=true;
				}
				$("#mute1").val("Unmute");
				$("#mute2").val("Unmute");
				$("#mute3").val("Unmute");
				$("#mute4").val("Unmute");
				if(numVoices>=5){
					$("#mute5").val("Unmute");
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
			}}, null);
	});

	//when the master audio element's volume is changed, it controls all the volumes together
	$("#audio0").on('volumechange', function(event) {
		$("#volume1").val(audio0.volume);
		$("#volume2").val(audio0.volume);
		$("#volume3").val(audio0.volume);
		$("#volume4").val(audio0.volume);
		if(numVoices>=5){
			$("#volume5").val(audio0.volume);
		}
		audio1.volume = $("#volume1").val();
		audio2.volume = $("#volume2").val();
		audio3.volume = $("#volume3").val();
		audio4.volume = $("#volume4").val();
		if(numVoices>=5){
			audio5.volume = $("#volume5").val();
		}
	});

	//when the mouse is moved on volume sliders, change the volume property of the audio object
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
	}
	//when an individual mute button is clicked, mute/unmute the Audio object, record the state (audioXMuted vars), and update the button
	$("#mute1").on('click', function(event) {
		if (audio1.muted) {
			audio1.muted=false;
			audio1Muted=false;
			$("#mute1").val("Mute");
		} else {
			audio1.muted=true;
			audio1Muted=true;
			$("#mute1").val("Unmute");
		}
	});
	$("#mute2").on('click', function(event) {
		if (audio2.muted) {
			audio2.muted=false;
			audio2Muted=false;
			$("#mute2").val("Mute");
		} else {
			audio2.muted=true;
			audio2Muted=true;
			$("#mute2").val("Unmute");
		}
	});
	$("#mute3").on('click', function(event) {
		if (audio3.muted) {
			audio3.muted=false;
			audio3Muted=false;
			$("#mute3").val("Mute");
		} else {
			audio3.muted=true;
			audio3Muted=true;
			$("#mute3").val("Unmute");
		}
	});
	$("#mute4").on('click', function(event) {
		if (audio4.muted) {
			audio4.muted=false;
			audio4Muted=false;
			$("#mute4").val("Mute");
		} else {
			audio4.muted=true;
			audio4Muted=true;
			$("#mute4").val("Unmute");
		}
	});
	$("#mute5").on('click', function(event) {
		if (audio5.muted) {
			audio5.muted=false;
			audio5Muted=false;
			$("#mute5").val("Mute");
		} else {
			audio5.muted=true;
			audio5Muted=true;
			$("#mute5").val("Unmute");
		}
	});
}

function randomizeNumberOutOfTune(numberOutOfTune) {
	if (numberOutOfTune==1) {
		var rand = Math.floor(Math.random()*10);
		if (rand == 0) {
			return 0;
		} else {
			return 1;
		}
	} else if (numberOutOfTune=2) {
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
//All the level specifications!!!!
function randomizeOutOfTuneArray(numberOutOfTune, numberOfVoices, degreeOutOfTune, voicePattern) {
	var OutofTuneArray;
	var sOrf1=sharpOrFlat();
	var sOrf2=sharpOrFlat();
	var valueOutOfTune1=sOrf1+degreeOutOfTune.toString();
	var valueOutOfTune2=sOrf2+degreeOutOfTune.toString();
	if(numberOutOfTune==0){
		if(numberOfVoices==5){
			OutofTuneArray=["0","0","0","0","0"];
			return OutofTuneArray;
		}else{
			OutofTuneArray=["0","0","0","0"];
			return OutofTuneArray;
		}
	}
	if (numberOfVoices == 4) {
		OutofTuneArray=["0","0","0","0"];
		if (numberOutOfTune==1) {
			if(voicePattern==1){
				var temp=Math.floor(Math.random()*2);
				if(temp==0){
					OutofTuneArray[0]=valueOutOfTune1;
				}else{
					OutofTuneArray[3]=valueOutOfTune1;
				}
			}
			if(voicePattern==2){
				var temp=Math.floor(Math.random()*2);
				if(temp==0){
					OutofTuneArray[1]=valueOutOfTune1;
				}else{
					OutofTuneArray[2]=valueOutOfTune1;
				}

			}
			if(voicePattern==3){
				var temp=Math.floor(Math.random()*numberOfVoices);
				OutofTuneArray[temp]=valueOutOfTune1;
			}
			
		}else{
			if(voicePattern==1){
				OutofTuneArray[0]=valueOutOfTune1;
				OutofTuneArray[3]=valueOutOfTune2;
			}else if(voicePattern==2){
				OutofTuneArray[1]=valueOutOfTune1;
				OutofTuneArray[2]=valueOutOfTune2;
			}else{
				var arr=[0,1,2,3];
				arr=shuffle(arr);
				OutofTuneArray[arr[0]]=valueOutOfTune1;
				OutofTuneArray[arr[1]]=valueOutOfTune2;
			}
		}
	} else if (numberOfVoices == 5) {
		OutofTuneArray=["0","0","0","0","0"];
		if (numberOutOfTune==1) {
			if(voicePattern==1){
				var temp=Math.floor(Math.random()*2);
				if(temp==0){
					OutofTuneArray[0]=valueOutOfTune1;
				}else{
					OutofTuneArray[4]=valueOutOfTune1;
				}
			}
			if(voicePattern==2){
				var temp=Math.floor(Math.random()*3)+1;
				OutofTuneArray[temp]=valueOutOfTune1;
			}
			if(voicePattern==3){
				var temp=Math.floor(Math.random()*numberOfVoices);
				OutofTuneArray[temp]=valueOutOfTune1;
			}
		}else{
			if(voicePattern==1){
				OutofTuneArray[0]=valueOutOfTune1;
				OutofTuneArray[4]=valueOutOfTune2;
			}else if(voicePattern==2){
				var arr=[1,2,3];
				arr=shuffle(arr);
				OutofTuneArray[1]=valueOutOfTune1;
				OutofTuneArray[2]=valueOutOfTune2;
			}else{
				var arr=[0,1,2,3,4];
				arr=shuffle(arr);
				OutofTuneArray[arr[0]]=valueOutOfTune1;
				OutofTuneArray[arr[1]]=valueOutOfTune2;
			}
		}

	}
	return OutofTuneArray
}
function sharpOrFlat(){
	var sharpFlat=Math.floor(Math.random()*2);
		if(sharpFlat==0){
			return "";
		}else{
			return "-";
		}
}
function shuffle(array){
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


/*
audioPlayer.play();
audioPlayer.pause();
audioPlayer.duration; - Returns the length of the music track.
audioPlayer.currentTime = 0;
audioPlayer.loop = true;
audioPlayer.muted = true;
*/