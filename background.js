function updateIcon(windowCount) {
    let svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <text x="50%" y=".9em" fill="hsl(36, 100%, 50%)" font-size="180" font-family="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" text-anchor="middle">📝</text>
    <rect x="40" y="90" width="120" height="140" fill="rgba(240, 21, 21, 0.59)"/>
    <text x="100" y="200" fill="#000" font-size="150" font-family="system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" text-anchor="middle" id="windowCount">${windowCount}</text>
  </svg>`;
  
    let encodedData = encodeURIComponent(svgData);
    browser.browserAction.setIcon({ path: `data:image/svg+xml;charset=utf-8,${encodedData}` });
}  

function updatePopup() {
  // Update icon on startup
  checkAndUpdateIcon();

    browser.windows.getAll().then((windows) => {
        if (windows.length > 2) { 
        const title = "Slow down!";
        const content = "Too many windows"
        browser.notifications.create({
        type: "basic",
        iconUrl: browser.extension.getURL("smiley.svg"),
        title,
        message: content,
        });

      } else {
       // browser.browserAction.setPopup({popup: ""});
      }
    });
  }
  
  // Initial check when the extension starts
  updatePopup();
  
  // Listen for new windows being opened
  browser.windows.onCreated.addListener(updatePopup);
  
  // Listen for windows being closed
  browser.windows.onRemoved.addListener(updatePopup);
  
  function checkAndUpdateIcon() {
    browser.windows.getAll().then((windows) => {
      updateIcon(windows.length);
    });
  }

//  browser.browserAction.setPopup({popup: "/popup.html"});

browser.browserAction.setPopup({popup: ""});

let currentWindowIndex = 0;

function setCurrentWindow() {
  browser.windows.getAll().then((windows) => {
    currentWindowIndex = windows.findIndex(win => win.focused);
  });
  
}

//browser.windows.onFocusChanged.addListener(setCurrentWindow);

browser.browserAction.onClicked.addListener(() => {
    browser.windows.getAll().then((windows) => {
      

      if (windows.length > 1) {
        // Assuming you want to switch to the next window in the list
        //let currentWindowIndex = windows.findIndex(win => win.focused);
        let nextWindowIndex = (currentWindowIndex + 1) % windows.length;
        let nextWindowId = windows[nextWindowIndex].id;

      // Get the current dimensions and positions of the active window
      browser.windows.get(windows.find(win => win.focused).id).then((currentWindow) => {
        let updateInfo = {
          left: currentWindow.left,
          top: currentWindow.top,
          width: currentWindow.width,
          height: currentWindow.height,
          focused: true
        };

        // Switch to the next window and set its position and dimension
        browser.windows.update(nextWindowId, updateInfo);
      });
        currentWindowIndex++;
      }
    });
  });
  