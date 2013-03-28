
function DistractionVis(hist, songLength, start, end, all) {
	this.history = hist;
	this.start = start;
	this.end = end;
	this.historyPeriod = end.getTime() - start.getTime();
	this.averages = new Array();
	this.intervals = new Array();
	this.scale = d3.scale.linear().domain([this.start.getTime(), this.end.getTime()]).range([0, songLength]);
	this.all = all;
}

DistractionVis.prototype.playAudio = function(blockCount) {
	var blockBound = this.start.getTime() + (this.historyPeriod / blockCount);
	var blockLength = this.historyPeriod / blockCount;
	var items = 0;
	var distractionCount = 0;
	var waitTime = this.scale(blockLength);

	for(var i=(this.all ? 0 : findDate(this.start)); i<(this.all ? history[history.length-1] : findDate(this.end)); i++) {
		if(processTime(this.history[i]).getTime() < blockBound) {
			items++;
			if(this.history[i].distraction) {
				distractionCount++;
			}
		}
		else {
			this.averages.push((distractionCount/items)*100);
			this.intervals.push(processTime(this.history[i]).getTime());
			items = 1;
			distractionCount = this.history[i].distraction ? 1 : 0;
			blockBound += blockLength;
		}
	}

	document.getElementById("concerto").play();
	var that = this;
	for(var i=0; i<this.averages.length; i++) (function() {
		var value = that.averages[i];
		setTimeout(function() {
			var roundedVal = Math.floor(value/10)*10;
			if(roundedVal > 0) {
				document.getElementById("z" + roundedVal).play();
			}
		}, (i+1)*10000);
	})()
}

function processTime(visit) {
	var year = visit.time.substring(0,4);
	var month = visit.time.substring(5,7);
	var date = visit.time.substring(8,10);
	var hour = visit.time.substring(11,13);
	var minute = visit.time.substring(14,16);
	var second = visit.time.substring(17, 19);
	return new Date(year, month-1, date, hour, minute, second);
}

function findDate(dateVal) {
	for(var i=0; i<history.length; i++) {
		if(processTime(history[i]).getTime() >= dateVal.getTime()) {
			return i;
		}
	}
}
