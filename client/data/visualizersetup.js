var initializeVisualizer = function(){

  // Start off by initializing a new context.
  context = new (window.AudioContext || window.webkitAudioContext)();

  if (!context.createGain)
    context.createGain = context.createGainNode;
  if (!context.createDelay)
    context.createDelay = context.createDelayNode;
  if (!context.createScriptProcessor)
    context.createScriptProcessor = context.createJavaScriptNode;


  var context = new webkitAudioContext();
  var audio = $('audio')[0];

  var analyser = context.createAnalyser();
  var source = context.createMediaElementSource(audio);


  source.connect(analyser);
  analyser.connect(context.destination); //speakers


  var visualizer = function(){
    var canvas = $('canvas')[0];
    var drawContext = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    drawContext.fillStyle = 'black';
    drawContext.fillRect(0,0,WIDTH,HEIGHT);

    analyser.smoothingTimeConstant = SMOOTHING;
    analyser.fftSize = FFT_SIZE;

    // draw frequency domain
    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      var value = freqDomain[i];
      var percent = value / 256;
      var height = HEIGHT * percent;
      var offset = HEIGHT - height - 1;
      var barWidth = WIDTH/analyser.frequencyBinCount;
      var hue = i/analyser.frequencyBinCount * 360;
      drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      drawContext.fillRect(i * barWidth, offset, barWidth, height);
    }
    // draw time domain
    analyser.getByteTimeDomainData(freqDomain);
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      var value = freqDomain[i];
      var percent = value / 256;
      var height = HEIGHT * percent;
      var offset = HEIGHT - height - 1;
      var barWidth = WIDTH/analyser.frequencyBinCount;
      drawContext.fillStyle = 'white';
      drawContext.fillRect(i * barWidth, offset, 1, 2);
    }

    requestAnimFrame(visualizer);

  };

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
  })();

  requestAnimFrame(visualizer);

};
// var audio = $('audio');

// function playSound(buffer, time) {
//   var source = context.createMediaElementSource(audio);
//   // var source = context.createBufferSource();
//   // source.buffer = buffer;
//   source.connect(context.destination);
//   source[source.start ? 'start' : 'noteOn'](time);
// }

// function loadSounds(obj, soundMap, callback) {
//   // Array-ify
//   var names = [];
//   var paths = [];
//   for (var name in soundMap) {
//     var path = soundMap[name];
//     names.push(name);
//     paths.push(path);
//   }
//   bufferLoader = new BufferLoader(context, paths, function(bufferList) {
//     for (var i = 0; i < bufferList.length; i++) {
//       var buffer = bufferList[i];
//       var name = names[i];
//       obj[name] = buffer;
//     }
//     if (callback) {
//       callback();
//     }
//   });
//   bufferLoader.load();
// }




// function BufferLoader(context, urlList, callback) {
//   this.context = context;
//   this.urlList = urlList;
//   this.onload = callback;
//   this.bufferList = new Array();
//   this.loadCount = 0;
// }

// BufferLoader.prototype.loadBuffer = function(url, index) {
//   // Load buffer asynchronously
//   var request = new XMLHttpRequest();
//   request.open("GET", url, true);
//   request.responseType = "arraybuffer";

//   var loader = this;

//   request.onload = function() {
//     // Asynchronously decode the audio file data in request.response
//     loader.context.decodeAudioData(
//       request.response,
//       function(buffer) {
//         if (!buffer) {
//           alert('error decoding file data: ' + url);
//           return;
//         }
//         loader.bufferList[index] = buffer;
//         if (++loader.loadCount == loader.urlList.length)
//           loader.onload(loader.bufferList);
//       },
//       function(error) {
//         console.error('decodeAudioData error', error);
//       }
//     );
//   }

//   request.onerror = function() {
//     alert('BufferLoader: XHR error');
//   }

//   request.send();
// };

// BufferLoader.prototype.load = function() {
//   for (var i = 0; i < this.urlList.length; ++i)
//   this.loadBuffer(this.urlList[i], i);
// };
