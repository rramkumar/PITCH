//globals 

//var LEVEL_SPEC_JSON_PATH = "./levels.json";
var game= {
	songs: {},
	levels: {},
	LEVEL_SPEC_JSON_PATH: "./levels.json",
	SONGS_SPEC_JSON_PATH: "./songs.json"
};

$(document).ready(function(){
	$("#homeSubmit").click(function(event){
		 var checked=($('input[name=song]:checked').is(':checked'));
		 if(checked==false) {	
		 	alert("Song Not Selected");
		 }
		 var checked2=($('input[name=level]:checked').is(':checked'));
		 if(checked2==false) {
		 	alert("Level not selected");
		} else {
			showDiv("quiz");
			var names=($('input[name=song]:checked').val());
			alert(names);
			tones=createAudios(names, 1, 1);
		}
	});

	$("#headerDivTitle").on("click", function(event) {
		showDiv("home");
	});

	parseJSONFiles();
	//makeSelectionButtons();
});

function showDiv(which) {
	if (which=="home") {
		//reset homepage options
		$(".songSelectRadio").removeAttr("checked");
		$(".levelSelectRadio").removeAttr("checked");

		//do the move
		$("#homeDiv").attr("divIsVisible", "true");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "false");
	}
	if (which=="quiz") {
		$("#homeDiv").attr("divIsVisible", "false");
		$("#quizDiv").attr("divIsVisible", "true");
		$("#sandboxDiv").attr("divIsVisible", "false");

		//reset quiz answers
		$("#tone1inTune").prop("checked", true);
		$("#tone2inTune").prop("checked", true);
		$("#tone3inTune").prop("checked", true);
		$("#tone4inTune").prop("checked", true);
		$("#tone5inTune").prop("checked", true);
	}
	if (which=="sandbox") {
		$("#homeDiv").attr("divIsVisible", "false");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "true");
	}

	audio0.pause();
	audio0.currentTime=0;

	//reset custom player

	
	//volumes
	volume1.value=1;
	volume2.value=1;
	volume3.value=1;
	volume4.value=1;
	volume5.value=1;

	//mute button
	audio1.muted=false;
	audio2.muted=false;
	audio3.muted=false;
	audio4.muted=false;
	audio5.muted=false;
	$("#mute1").val("Mute");
	$("#mute2").val("Mute");
	$("#mute3").val("Mute");
	$("#mute4").val("Mute");
	$("#mute5").val("Mute");
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
	    	songsInsert += '<li><input type="radio" name="song" value="'+obj.objName+'">' + obj.song + ' </li>';
	    	console.log(obj.song);
	    });

	    $(".songs").html(songsInsert);
    	console.log( "Done" );
	})
	.fail(function() {
	    console.log( "error" );
	})
	.always(function() {
	    console.log( "complete:Enjoy the game" );
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
	    	levelsInsert += '<li><input type="radio" name="level" value="level'+(index+1)+'"> Level ' + (index+1) + ' </li>';
	    	//console.log(obj.level);
	    });

	    $(".levels").html(levelsInsert);
		console.log( "Done" );
	})
	.fail(function() {
	    console.log( "error" );
	})
	.always(function() {
	    console.log( "complete:Enjoy the game" );
	});
}