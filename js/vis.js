
var vizzy = null;

$(function() {

	// static variables that should be dynamic... but we're lazy.
	var songLength = 407;
	var blockCount = 40;

	var startM = document.getElementById("startmonth");
	var startD = document.getElementById("startdate");
	var startY = document.getElementById("startyear");
	var endM = document.getElementById("endmonth");
	var endD = document.getElementById("enddate");
	var endY = document.getElementById("endyear");
	var allHistory = document.getElementById("all-history");

	$("#buttan").click(function() {
		if(allHistory.checked) {
			vizzy = new DistractionVis(history, songLength, processTime(history[0]), processTime(history[history.length-1]), true);
		}
		else {
			vizzy = new DistractionVis(history, songLength, new Date(startY.value, startM.value, startD.value), new Date(endY.value, endM.value, endD.value), false); // for now, history object is viewable in history_data.js
		}
		vizzy.playAudio(blockCount);
		document.getElementById("fft").style.visibility="visible";
	});

});
