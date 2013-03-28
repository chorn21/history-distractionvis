
var vizzy = null;

$(function() {

	// static variables that should be dynamic... but we're lazy.
	var songLength = 407;
	var blockCount = 40;


	// set start and end dates
	var monthNames = [ "January", "February", "March", "April", "May", "June",
		    "July", "August", "September", "October", "November", "December" ];
	
	var first = history[0].time.split(' ')[0];
	var firstD = first.split('-')[2];
	var firstM = parseInt(first.split('-')[1]);
	var firstY = first.split('-')[0];
	
	var last = history[history.length-1].time.split(' ')[0];
	var lastD = last.split('-')[2];
	var lastM = parseInt(last.split('-')[1]);
	var lastY = last.split('-')[0];
	
	$("#first").text(monthNames[firstM - 1] + " " + firstD + ", " + firstY);
	$("#last").text(monthNames[lastM - 1] + " " + lastD + ", " + lastY);


	// daterange input
	var startM = document.getElementById("startmonth");
	var startD = document.getElementById("startdate");
	var startY = document.getElementById("startyear");
	var endM = document.getElementById("endmonth");
	var endD = document.getElementById("enddate");
	var endY = document.getElementById("endyear");
	var allHistory = document.getElementById("all-history");

	/*
	// TODO: refactor into one generic method w/ inputs
	$(startY).change(function() {
		var year = parseInt($(this).val());
		$(startM).children("option").each(function() {
			var month = parseInt($(this).attr('value'));
			if (year == firstY && month < firstM) {
				$(this).attr('disabled', 'disabled');
			} else if (year == firstY && month == firstM) {
				$(startM).val($(this).attr('value'));
			} else {
				$(this).removeAttr('disabled');
			}
		});
	});

	$(startM).change(function() {
		var month = parseInt($(this).val());
		$(startD).children("option").each(function() {
			var day = parseInt($(this).attr('value'));
			if (month == firstM && day < firstD) {
				$(this).attr('disabled', 'disabled');
			} else if (month == firstM && day == firstD) {
				$(startM).val($(this).attr('value'));
			} else {
				$(this).removeAttr('disabled');
			}
		});
	});

	$(endY).change(function() {
		var year = parseInt($(this).val());
		$(endM).children("option").each(function() {
			var month = parseInt($(this).attr('value'));
			if (year == lastY && month > lastM) {
				$(this).attr('disabled', 'disabled');
			} else if (year == lastY && month == lastM) {
				$(lastM).val($(this).attr('value'));
			} else {
				$(this).removeAttr('disabled');
			}
		});
	});

	$(endM).change(function() {
		var month = parseInt($(this).val());
		$(endD).children("option").each(function() {
			var day = parseInt($(this).attr('value'));
			if (month == lastM && day > lastD) {
				$(this).attr('disabled', 'disabled');
			} else if (month == lastM && day == lastD) {
				$(lastM).val($(this).attr('value'));
			} else {
				$(this).removeAttr('disabled');
			}
		});
	});
	*/


	// start the vis
	$("#buttan").click(function() {
		$("#loading").show();
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
