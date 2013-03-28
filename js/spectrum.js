function updateSpectrum() {
  var canvas = document.getElementById('fft'),
    ctx = canvas.getContext('2d'),
    channels,
    rate,
    frameBufferLength,
    fft;

  // Clear the canvas before drawing spectrum
  ctx.clearRect(0,0, canvas.width, canvas.height);

  for (var i = 0; i < 300; i++ ) {
    var j = Math.random();
    j *= 100;
    // Draw rectangle bars for each frequency bin
    ctx.fillRect(i * 10, canvas.height, 2, -j);
  }
}

function updateClock() {
  // Gets the current time
  var now = new Date();

  // Get the hours, minutes and seconds from the current time
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Format hours, minutes and seconds
  if (hours < 10) {
      hours = "0" + hours;
  }
  if (minutes < 10) {
      minutes = "0" + minutes;
  }
  if (seconds < 10) {
      seconds = "0" + seconds;
  }

  // Gets the element we want to inject the clock into
  var elem = document.getElementById('clock');

  // Sets the elements inner HTML value to our clock data
  elem.innerHTML = 'time: ' + hours + ':' + minutes + ':' + seconds;
}

