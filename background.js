try {
  console.log("background.js: Entering script");

  // Correct the callback function to accept the 'details' parameter
  function handleInstallation(details) {
    if (details.reason === 'install') {
      console.log('background.js: handleInstallation(): Extension installing');

      // For example, inject content script into active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.runtime.sendMessage({ action: 'injectContentScript', tabId: activeTab.id });
      });
    } else if (details.reason === 'update') {
      console.log('background.js: handleInstallation(): Extension updating');
    }
  };

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("background.js: onUpdated.addListener: Adding addListener to active tab: ", tabId);
    if (changeInfo.status === 'complete') {
      // Inject content script on tabs update
      chrome.runtime.sendMessage({ action: 'injectContentScript', tabId });
    }
    console.log("background.js: onUpdated.addListener: Completed operation");
  });

  console.log("background.js: Before onInstalled.addListener");

  // Add the listener correctly with the 'handleInstallation' function
  chrome.runtime.onInstalled.addListener(handleInstallation);

  console.log("background.js: After onInstalled.addListener");
  console.log("background.js: Script complete");
} catch(error) {
  console.error("background.js: ERROR in background.js: ", error);
}
