
var vizzy = null;

$(function() {

	// static variables that should be dynamic... but we're lazy.
	var songLength = 407;
	var blockCount = 40;

	var y = document.getElementById("year");
	vizzy = new DistractionVis(history, songLength); // for now, history object is viewable in history_data.js

	vizzy.setUpDOM(y);

	$("#buttan").click(function() {
		vizzy.playAudio(blockCount);
		document.getElementById("fft").style.visibility="visible";
	});

});
