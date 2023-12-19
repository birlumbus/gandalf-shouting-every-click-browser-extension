console.log("content.js: Entering script")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("content.js: Adding listener to runtime")

  if (message.action === 'playClickSound') {
    playSound();
  }
});

document.addEventListener('click', () => {
  console.log("content.js: Adding event listener to document")

  // Trigger the playClickSound function in background.js
  chrome.runtime.sendMessage({ action: 'playClickSound' });

  console.log("content.js: Event listener added")
});

console.log("")
function playSound() {
  console.log("content.js: About to play the sound!!")
  const audio = new Audio(chrome.runtime.getURL('audio/pop.mp3'));
  audio.play();
  console.log("content.js: Played the sound. (^v^)")
}
