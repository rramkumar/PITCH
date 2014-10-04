var audio1 = new Audio("Flute.mp3");
var audio2 = new Audio("Clarinet.mp3");
var audio3 = new Audio("Trumpet.mp3");
var audio4 = new Audio("Trombone.mp3");
var audio5 = new Audio("Tuba.mp3");
var audio1Muted=false; //vars record whether a track is to be muted independent of muting by the master control in the audio tag
var audio2Muted=false;
var audio3Muted=false;
var audio4Muted=false;
var audio5Muted=false;

$(document).ready(function() {
	var audio0 = document.getElementById("audio0"); // the silent track that serves as the master, from which other audio tracks are set
	audio1.load();
	audio2.load();
	audio3.load();
	audio4.load();
	audio5.load();
		

	$("#audio0").on('play', function(event) {
		audio1.play();
		audio2.play();
		audio3.play();
		audio4.play();
		audio5.play();
		audio1.pause();
		audio2.pause();
		audio3.pause();
		audio4.pause();
		audio5.pause();
		setTimeout(function(){audio1.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio2.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio3.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio4.currentTime=audio0.currentTime;}, 100);
		setTimeout(function(){audio5.currentTime=audio0.currentTime;}, 100);

		setTimeout(function(){audio1.play();audio2.play();audio3.play();audio4.play();audio5.play();}, 100);
	});

	$("#audio0").on('pause', function(event) {
		audio1.pause();
		audio2.pause();
		audio3.pause();
		audio4.pause();
		audio5.pause();
	});

	$("#audio0").on('mouseup', function(event) {
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

	$("#audio0").on('volumechange', function(event) {
		volume1.value = audio0.volume;
		volume2.value = audio0.volume;
		volume3.value = audio0.volume;
		volume4.value = audio0.volume;
		volume5.value = audio0.volume;
		audio1.volume = $("#volume1").val();
		audio2.volume = $("#volume2").val();
		audio3.volume = $("#volume3").val();
		audio4.volume = $("#volume4").val();
		audio5.volume = $("#volume5").val();
	});

	$("#volume1").on('change', function(event) {
		audio1.volume = $("#volume1").val();
	});
	$("#volume2").on('change', function(event) {
		audio2.volume = $("#volume2").val();
	});
	$("#volume3").on('change', function(event) {
		audio3.volume = $("#volume3").val();
	});
	$("#volume4").on('change', function(event) {
		audio4.volume = $("#volume4").val();
	});
	$("#volume5").on('change', function(event) {
		audio5.volume = $("#volume5").val();
	});

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

});

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

/*
audioPlayer.play();
audioPlayer.pause();
audioPlayer.duration; - Returns the length of the music track.
audioPlayer.currentTime = 0;
audioPlayer.loop = true;
audioPlayer.muted = true;
*/