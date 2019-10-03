let audioCtx;
let source;
let buffer;

function getData() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  fetch('kick.wav').then(response => {
    response.arrayBuffer().then(audioData => {
      audioCtx.decodeAudioData(audioData, function(audioBuffer) {
          buffer = audioBuffer;
          source = generateAudioBufferSourceNode(audioCtx, buffer);
        },
        function(e){"Error with decoding audio data" + e.error});
    });
  });
}

function generateAudioBufferSourceNode(context, buffer) {
  const node = context.createBufferSource();
  node.buffer = buffer;
  node.connect(context.destination);
  return node;
}

function kick(){
  if (!buffer) {
    getData();
    return;
  }
  generateAudioBufferSourceNode(audioCtx, buffer).start(0);
}

window.addEventListener('mousedown', kick);
window.addEventListener('keydown', kick);