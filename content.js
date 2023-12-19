// Function to create and play a simple beep sound
function playClickSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();

  oscillator.type = 'sine'; // You can change the waveform
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Set frequency
  oscillator.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1); // Adjust the duration of the sound
}

// Add a click event listener to the document
document.addEventListener('click', playClickSound);
