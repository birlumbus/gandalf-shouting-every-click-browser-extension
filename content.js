console.log("Initializing audio variables");
const audioTestRawURL = new Audio('audio/pop.mp3');
const audioTestGetURL = new Audio(chrome.runtime.getURL('/audio/pop.mp3'));
console.log("Audio files created");

function preAudioPrint() {
  console.log("Audio files initialized. Playing:");
}

function postAudioPrint() {
  console.log("Audio should have played");
}

function audioTest1() {
  audioTestRawURL.play();
  console.log("playing audioTestRawURL");
}

function audioTest2() {
  audioTestGetURL.play();
  console.log("playing audioTestGetURL");
}

function endOfScript() {
  console.log("End of script");
}

setTimeout(preAudioPrint, 500);
setTimeout(audioTest1, 1500);
setTimeout(audioTest2, 2500);
setTimeout(postAudioPrint, 3500);
setTimeout(endOfScript, 4000);

document.addEventListener('click', () => {
  console.log("Entering addEventListener()");
  console.log(chrome.runtime.getURL('pop.mp3'));
  console.log("tried getting url");
  console.log("moving on now to the rest");

  console.log("content.js: EventListener: click detected");

  playSound();

  console.log("content.js: EventListener: sound played");
});

function playSound() {
  console.log("content.js: playSound(): entered function");
  let audio = new Audio(chrome.runtime.getURL('pop.mp3'));
  console.log("content.js: playSound(): audio created");
  audio.play();
  console.log("content.js: playSound(): audio.play() called");
}

