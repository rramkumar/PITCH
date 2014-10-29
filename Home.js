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

var audEle = $('#audio0')[0];

// wait for the duration to be loaded, so we know how long the audio is
audEle.onloadedmetadata = function () {
    console.log('loaded metadata, duration: ', audEle.duration);

    // then wait till most of the data is loaded (using the duration)
    audEle.onprogress = function () {
        if (audEle.duration - audEle.buffered.end(0) < 0.5) {
            console.log('file is loaded');
        }
    };
};

});

function showDiv(which) {
	if (which=="home") {
		$("#homeDiv").attr("divIsVisible", "true");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "false");
	}
	if (which=="quiz") {
		$("#homeDiv").attr("divIsVisible", "false");
		$("#quizDiv").attr("divIsVisible", "true");
		$("#sandboxDiv").attr("divIsVisible", "false");
	}
	if (which=="sandbox") {
		$("#homeDiv").attr("divIsVisible", "false");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "true");
	}
}
// function that does this parametrically
// $("#homeDiv").attr("divIsVisible", "true");
// 		$("#quizDiv").attr("divIsVisible", "false");
// 		$("#sandboxDiv").attr("divIsVisible", "false");
