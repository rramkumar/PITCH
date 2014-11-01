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
	


	tones=createAudios("dannyboy", 1, 1);

	hangInteractions();


$("#quizSubmit").click(function(event){
 var checked=(($('input[name=tone1]:checked').is(':checked'))&&($('input[name=tone2]:checked').is(':checked'))&&($('input[name=tone3]:checked').is(':checked'))&&($('input[name=tone4]:checked').is(':checked'))&&($('input[name=tone5]:checked').is(':checked')))
 if(checked==false)
 {	
 	alert("Answer Not Selected");
}else{
	
	var correct=true;
	for(var i=0; i<tones.length; i++){
		var temp1=tones[i];
		var temp3=i+1;
		var temp4="tone" + temp3.toString();
		var temp2=($('input[name="'+temp4+'"]:checked').val());
		if(temp1!=temp2){
			correct=false;
		}
	}
	if(correct){
		alert("You win!");
	}else{
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

function createAudios(songName, numberOutOfTune, degreeOutOfTune) {
	//Reads the JSON File
	var levels=($('input[name=level]:checked').val());
	var datas=$.getJSON( "test.json", function( data ) {
	});
		//randomize how many/which tracks will be out of tune, and which direction
	var tones=[0,0,0,0,0];
	var degreeOutOfTune1="0";
	var degreeOutOfTune2="0";
	var degreeOutOfTune3="0";
	var degreeOutOfTune4="0";
	var degreeOutOfTune5="0";
	var level=0;
	//inject the silent file source for this song
	$("#audio0").html("<source src=\"" + musicRelativePath + songName + "/" + songName + "0" + ".mp3\" type=\"audio/mpeg\">");
	//Calculates which instrument
	var random= Math.random()*5;
    random=Math.floor(random);
    random=random+1;
    //Chooses degree
    var degree=Math.random()*2;
    degree=Math.floor(degree);
    switch(degree){
    	case 0: 
    		level="-1";
    		break;
    	case 1:
    		level="1";
    		break;
    }
	switch(random){
		case 1:
			degreeOutOfTune1=level;
			tones[0]=level;
			break;
		case 2:
			degreeOutOfTune2=level;
			tones[1]=level;
			break;
		case 3:
			degreeOutOfTune3=level;
			tones[2]=level;
			break;
		case 4:
			degreeOutOfTune4=level;
			tones[3]=level;
			break;
		case 5:
			degreeOutOfTune5=level;
			tones[4]=level;
			break;
	}

	audio0 = document.getElementById("audio0");
	audio1 = new Audio(musicRelativePath + songName + "/" + songName + "1" + degreeOutOfTune1 + ".mp3");
	audio2 = new Audio(musicRelativePath + songName + "/" + songName + "2" + degreeOutOfTune2 + ".mp3");
	audio3 = new Audio(musicRelativePath + songName + "/" + songName + "3" + degreeOutOfTune3 + ".mp3");
	audio4 = new Audio(musicRelativePath + songName + "/" + songName + "4" + degreeOutOfTune4 + ".mp3");
	audio5 = new Audio(musicRelativePath + songName + "/" + songName + "5" + degreeOutOfTune5 + ".mp3");
	return tones;
}

function hangInteractions() {
	audio1.load();
	audio2.load();
	audio3.load();
	audio4.load();
	audio5.load();
		
	//play all Audio objects when the master audio element is played
	//this starts all of them to avoid future startup costs, then pauses them as fast as possible
	//then it schedules the concurrent setting all of them to the master's current time, and then schedules their concurrent playing
	$("#audio0").on('play', function(event) {
		audio1.play();
		audio2.play();
		audio3.play();
		audio4.play();
		audio5.play();
		audio1.pause();
		audio3.pause();
		audio2.pause();
		audio4.pause();
		audio5.pause();
		setTimeout(function(){audio1.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio2.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio3.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio4.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio5.currentTime=audio0.currentTime;}, 100);

		setTimeout(function(){audio1.play();audio2.play();audio3.play();audio4.play();audio5.play();}, 100);
	});

	//pause all Audio objects when the master audio element is paused
	$("#audio0").on("pause", function(event) {
		audio1.pause();
		audio2.pause();
		audio3.pause();
		audio4.pause();
		audio5.pause();
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
				audio5.muted=true;
				$("#mute1").val("Unmute");
				$("#mute2").val("Unmute");
				$("#mute3").val("Unmute");
				$("#mute4").val("Unmute");
				$("#mute5").val("Unmute");
			} else {
				audio1.muted=audio1Muted;
				audio2.muted=audio2Muted;
				audio3.muted=audio3Muted;
				audio4.muted=audio4Muted;
				audio5.muted=audio5Muted;
				redrawMuteButtons();
			}}, null);
	});

	//when the master audio element's volume is changed, it controls all the volumes together
	$("#audio0").on('volumechange', function(event) {
		$("#volume1").val(audio0.volume);
		$("#volume2").val(audio0.volume);
		$("#volume3").val(audio0.volume);
		$("#volume4").val(audio0.volume);
		$("#volume5").val(audio0.volume);
		audio1.volume = $("#volume1").val();
		audio2.volume = $("#volume2").val();
		audio3.volume = $("#volume3").val();
		audio4.volume = $("#volume4").val();
		audio5.volume = $("#volume5").val();
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
	$("#volume5").mousemove(function(event) {
		audio5.volume = $("#volume5").val();
	});

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

/*
audioPlayer.play();
audioPlayer.pause();
audioPlayer.duration; - Returns the length of the music track.
audioPlayer.currentTime = 0;
audioPlayer.loop = true;
audioPlayer.muted = true;
*/