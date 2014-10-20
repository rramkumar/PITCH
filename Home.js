$(document).ready(function(){
	$("#homeSubmit").click(function(event){
		 var checked=($('input[name=song]:checked').is(':checked'))
		 if(checked==false)
		 {	
		 	alert("Song Not Selected");
		 }
		 var checked2=($('input[name=level]:checked').is(':checked'))
		 if(checked2==false){
		 	alert("Level not selected");
		}
		else{
			$("#homeDiv").attr("divIsVisible", "false");
			$("#quizDiv").attr("divIsVisible", "true");
			$("#sandboxDiv").attr("divIsVisible", "false");
			var names=($('input[name=song]:checked').val())
			alert(names);
			tones=createAudios(names, 1, 1);
		}
	});

	$("#headerDivTitle").on("click", function(event) {
		$("#homeDiv").attr("divIsVisible", "true");
		$("#quizDiv").attr("divIsVisible", "false");
		$("#sandboxDiv").attr("divIsVisible", "false");
	});
});

// function that does this parametrically
// $("#homeDiv").attr("divIsVisible", "true");
// 		$("#quizDiv").attr("divIsVisible", "false");
// 		$("#sandboxDiv").attr("divIsVisible", "false");