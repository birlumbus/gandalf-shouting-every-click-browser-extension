// background.js (service worker)

try {
  console.log("background.js: Entering script");

  // Correct the callback function to accept the 'details' parameter
  function handleInstallation(details) {
    if (details.reason === 'install') {
      console.log('background.js: Extension installed');

      // For example, inject content script into active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.runtime.sendMessage({ action: 'injectContentScript', tabId: activeTab.id });
      });
    } else if (details.reason === 'update') {
      console.log('background.js: Extension updated');
    }
  };

  // Add the listener correctly with the 'handleInstallation' function
  chrome.runtime.onInstalled.addListener(handleInstallation);

  console.log("background.js: Adding addListener");

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // Inject content script on tabs update
      chrome.runtime.sendMessage({ action: 'injectContentScript', tabId });
    }
  });

  console.log("background.js: Added listener");
  console.log("background.js: Triggering playClickSoundInContentScript()");

  function playClickSoundInContentScript() {
    // Trigger the playClickSound function in content-script.js
    chrome.runtime.sendMessage({ action: 'playClickSound' });
  }

  console.log("background.js: Script complete");
} catch(error) {
  console.error("background.js: Error in background.js: ", error);
}
