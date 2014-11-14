//globals 

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

	$("#headerDivTitle").on("click", function(event) {
		showDiv("home");
	});

	parseJSONFiles();
});

function showDiv(which) {
	if (which=="home") {
		audio0.pause();
		audio0.currentTime=0;

		//do the move
		$("#homeDiv").attr("divIsVisible", "true");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "false");
	}
	if (which=="quiz") {
		audio0.pause();
		audio0.currentTime=0;

		$("#homeDiv").attr("divIsVisible", "false");
		$("#quizDiv").attr("divIsVisible", "true");
		$("#sandboxDiv").attr("divIsVisible", "false");

		//reset quiz answers
		$("#tone1inTune").prop("checked", true);
		$("#tone2inTune").prop("checked", true);
		$("#tone3inTune").prop("checked", true);
		$("#tone4inTune").prop("checked", true);
		if (numVoices >= 5) {
			$("#tone5inTune").prop("checked", true);
		}

		$("#quizTitle").html(game.currentSongTitle + ', Difficultly Level ' + game.currentLevel);

		$("#toggleHints").hide();
	}
	if (which=="sandbox") {
		audio0.pause();
		audio0.currentTime=0;
		$("#homeDiv").attr("divIsVisible", "false");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "true");
	}


	
	
	//reset custom player

	
	//volumes
	volume1.value=1;
	volume2.value=1;
	volume3.value=1;
	volume4.value=1;
	if(numVoices>=5){
		volume5.value=1;
	}


	//mute button
	audio1.muted=false;
	audio2.muted=false;
	audio3.muted=false;
	audio4.muted=false;
	if(numVoices>=5){
		audio5.muted=false;
	}
	$("#mute1").val("Mute");
	$("#mute2").val("Mute");
	$("#mute3").val("Mute");
	$("#mute4").val("Mute");
	if(numVoices>=5){
		$("#mute5").val("Mute");
	}
}

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
	    	songsInsert += '<li><input type="radio" name="song" value="'+obj.objName+'">' + obj.title + ' </li>';
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