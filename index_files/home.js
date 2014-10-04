$(document).ready(function(){
$("#submit").click(function(event){
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
 var url = "index.html";
$(location).attr('href',url);
}
});
});