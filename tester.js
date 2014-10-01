$(document).ready(function(){
var t0=document.getElementById("I0");
var t1=document.getElementById("I1");
var t2=document.getElementById("I2");
var t3=document.getElementById("I3");
var t4=document.getElementById("I4");
var t5=document.getElementById("I5");

t0.load();
t1.load();
t2.load();
t3.load();
t4.load();
t5.load();

t0.play();
t1.play();
t2.play();
t3.play();
t4.play();
t5.play();	

//t2.currentTime=t1.currentTime;
//t3.currentTime=t1.currentTime;
//t4.currentTime=t1.currentTime;
//t5.currentTime=t1.currentTime;

t0.pause();
t1.pause();
t2.pause();
t3.pause();
t4.pause();
t5.pause();

//setTimeout(function(){t1.play();t2.play();t3.play();t4.play();t5.play();}, 3000);
//setTimeout(function(){t1.currentTime=t0.currentTime;t2.currentTime=t0.currentTime;t3.currentTime=t0.currentTime;t4.currentTime=t0.currentTime;t5.currentTime=t0.currentTime;}, 10);
setTimeout(function(){t1.currentTime=t0.currentTime;}, 100);
setTimeout(function(){t2.currentTime=t0.currentTime;}, 100);
setTimeout(function(){t3.currentTime=t0.currentTime;}, 100);
setTimeout(function(){t4.currentTime=t0.currentTime;}, 100);
setTimeout(function(){t5.currentTime=t0.currentTime;}, 100);

setTimeout(function(){t1.play();t2.play();t3.play();t4.play();t5.play();}, 100);

/*t0.play();
t1.play();
t2.play();
t3.play();
t4.play();
t5.play();
*/

//t1.defaultPlaybackRate=4;
//t2.defaultPlaybackRate=4;
//t3.defaultPlaybackRate=4;
//t4.defaultPlaybackRate=4;
//t5.defaultPlaybackRate=4;



/*t2.play();
t3.play();
t4.play();
t5.play();
*/		
});