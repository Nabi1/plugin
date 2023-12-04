console.log("Background script running");
chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  if (message.action === "openTab") {
    chrome.tabs.create({ url: message.url });
  }
});
