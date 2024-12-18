// Store visited websites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
      logVisit(tab.url);
  }
});

// Function to log visits
function logVisit(url) {
  const visit = {
      url: url,
      timestamp: new Date().toISOString()
  };

  // Get existing data from storage
  chrome.storage.local.get("websiteLogs", (data) => {
      let logs = data.websiteLogs || [];
      logs.push(visit);

      // Save updated logs to storage
      chrome.storage.local.set({ websiteLogs: logs }, () => {
          console.log("Visit logged:", visit);
      });
  });
}
