chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("content.js: RuntimeListener: initialized")

  if (message.action === 'playClickSound') {
    console.log("content.js: RuntimeListener: calling playSound()")
    playSound();
    console.log("content.js: RuntimeListener: playSound() called")
  }
});

document.addEventListener('click', () => {
  console.log("content.js: EventListener: click detected")

  // Trigger the playClickSound function in background.js
  chrome.runtime.sendMessage({ action: 'playClickSound' });

  console.log("content.js: EventListener: message sent to runtime")
});

console.log("")
function playSound() {
  console.log("content.js: playSound(): entered function")
  let audio = new Audio(chrome.runtime.getURL('audio/pop.mp3'));
  console.log("content.js: playSound(): audio created")
  audio.play();
  console.log("content.js: playSound(): audio.play() called")
}
