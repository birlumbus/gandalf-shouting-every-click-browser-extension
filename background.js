// background.js (service worker)

try {
  console.log("Entered background.js");

  // Correct the callback function to accept the 'details' parameter
  function handleInstallation(details) {
    if (details.reason === 'install') {
      console.log('Extension installed');

      // For example, inject content script into active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.runtime.sendMessage({ action: 'injectContentScript', tabId: activeTab.id });
      });
    } else if (details.reason === 'update') {
      console.log('Extension updated');
    }
  };

  // Add the listener correctly with the 'handleInstallation' function
  chrome.runtime.onInstalled.addListener(handleInstallation);

  console.log("Adding addListener");

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // Inject content script on tabs update
      chrome.runtime.sendMessage({ action: 'injectContentScript', tabId });
    }
  });

  console.log("Added listener");
  console.log("Triggering playClickSoundInContentScript()");

  function playClickSoundInContentScript() {
    // Trigger the playClickSound function in content-script.js
    chrome.runtime.sendMessage({ action: 'playClickSound' });
  }

  console.log("Script complete");
} catch(error) {
  console.error("Error in background.js: ", error);
}
