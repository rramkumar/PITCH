//globals 
//Code written by Alex Britt, Jon Medenblik, and Rahul Ramkumar

//Creates an Game object that holds information about the song and levels
//As well as the path to the json files. 
var game= {
	songs: {},
	levels: {},
	currentSongTitle: "",
	currentSongObjName: "",
	currentLevel: 0,
	LEVEL_SPEC_JSON_PATH: "./levels.json",
	SONGS_SPEC_JSON_PATH: "./songs.json",
	hints: false
};
var numVoices;

$(document).ready(function(){
	//Button submit to enter the Quiz div
	//Checks to see if a song is selected
	//Stores value of level selected
	//Sends info to Quiz.js to create Quiz. 
	$("#homeSubmit").click(function(event){
		var checked=($('input[name=song]:checked').is(':checked'));
		if(checked==false) {	
			alert("Song Not Selected");
		}
		var checked2=($('input[name=level]:checked').is(':checked'));
		if(checked==true) {
			game.currentSongObjName = $('input[name=song]:checked').val();
			var selectElement = document.getElementById("levels");
			game.currentLevel = parseInt(selectElement.options[selectElement.selectedIndex].value.substring(5));
			for (var i = 0; i < game.songs.length; i++) {
				if (game.songs[i].objName==game.currentSongObjName) {
					numVoices = game.songs[i].voices.length;
					game.currentSongTitle = game.songs[i].title;
				}
			}
			tones=createAudios(game.currentSongObjName, game.currentLevel); // method is in Quiz.js
			hangInteractions(); // method is in Quiz.js
			showDiv("quiz");
		}
	});
	//handles the clicking of the Sandbox button on home page
	//Checks to ensure song has been selected
	//Sends info to createSandbox method in Sandbox.js
	$("#homeSandboxSubmit").on('click', function(event) {
		var checked=($('input[name=song]:checked').is(':checked'));
		if(checked==false) {	
			alert("Song Not Selected");
		}
		if (checked) {
			game.currentSongObjName = $('input[name=song]:checked').val();
			for (var i = 0; i < game.songs.length; i++) {
				if (game.songs[i].objName==game.currentSongObjName) {
					numVoices = game.songs[i].voices.length;
					game.currentSongTitle = game.songs[i].title;
				}
			}
		}

		createSandbox(game.currentSongObjName, hangInteractionsSandbox);	
		showDiv("sandbox");
	});
	//Method that allows the user to return to the home page
	//IF the title Pitch is clicked
	$("#headerDivTitle").on("click", function(event) {
		showDiv("home");
	});

	parseJSONFiles();
});
//Controls which div is shown.
function showDiv(which) {
	//Called when returning home. 
	if (which=="home") {
		audio0.pause();
		audio0.currentTime=0;
		//do the move
		$("#homeDiv").attr("isVisible", "true");
		$("#quizDiv").attr("isVisible", "false");
		$("#sandboxDiv").attr("isVisible", "false");
	}
	//Called when switching to quiz view
	if (which=="quiz") {
		$("#homeDiv").attr("isVisible", "false");
		$("#quizDiv").attr("isVisible", "true");
		$("#sandboxDiv").attr("isVisible", "false");

		//reset quiz answers
		$("#tone1inTune").prop("checked", true);
		$("#tone2inTune").prop("checked", true);
		$("#tone3inTune").prop("checked", true);
		$("#tone4inTune").prop("checked", true);
		if (numVoices >= 5) {
			$("#tone5inTune").prop("checked", true);
		}

		$("#toggleHints").hide();
		$("#toggleHints").html("Show Hints");
		game.hints=false;
	}
	//Resets the sanbox to defualt start
	//Called when switching to sandbox
	if (which=="sandbox") {
		$("#sandboxTuning1").val(0);
		$("#sandboxVolume1").val(1);
		$("#sandboxTuning2").val(0);
		$("#sandboxVolume2").val(1);
		$("#sandboxTuning3").val(0);
		$("#sandboxVolume3").val(1);
		$("#sandboxTuning4").val(0);
		$("#sandboxVolume4").val(1);
		if(numVoices>=5){
			$("#sandboxTuning5").val(0);
			$("#sandboxVolume5").val(1);
		}
		$("#homeDiv").attr("isVisible", "false");
		$("#quizDiv").attr("isVisible", "false");
		$("#sandboxDiv").attr("isVisible", "true");
	}


	
	
	//reset custom player


	audio0.muted=false;
	audio1Muted=false;
	audio2Muted=false;
	audio3Muted=false;
	audio4Muted=false;
	audio5Muted=false;
	drone1.muted=true;
	drone2.muted=true;
	redrawSandboxMuteButtons();

	$("#mute1").val("Mute");
	$("#mute2").val("Mute");
	$("#mute3").val("Mute");
	$("#mute4").val("Mute");
	if(numVoices>=5){
		$("#mute5").val("Mute");
	}
}
//Mehtod to read in a JSON file and use that to create the home page
function parseJSONFiles() {
	//songs
	var getSongsData = $.getJSON(game.SONGS_SPEC_JSON_PATH, function(json) {
		game.songs=json;
		console.log( "success" );
	})
	.done(function() {
		$(".songs").empty();

		var songsInsert = "";
		$.each(game.songs, function(index, obj) {
			songsInsert += '<li><input class="songSelectRadio" type="radio" name="song" value="'+obj.objName+'">' + obj.title + ' </li>';
			console.log(obj.title);
		});

		$(".songs").html(songsInsert);
		console.log( "Done" );
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		console.log( "complete");
	});

	// levels
	var getLevelData = $.getJSON(game.LEVEL_SPEC_JSON_PATH, function(json) {

		game.levels=json;
		console.log( "success" );
	})
	.done(function() {
		$(".levels").empty();

		var levelsInsert = "";
		$.each(game.levels, function(index, obj) {
			levelsInsert += '<option value="level'+(index+1)+'"> Level ' + (index+1) + ' </option>';
			//console.log(obj.level);
		});

		$(".levels").html(levelsInsert);
		console.log( "Done" );
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		console.log( "complete" );
	});
}