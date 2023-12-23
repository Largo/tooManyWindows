function updatePopup() {
    browser.windows.getAll().then((windows) => {
        console.log(windows.length);
        browser.browserAction.setPopup({popup: "/popup.html"});

        if (windows.length > 2) {
        //Services.prompt.alert(window, 'title of alert', 'alert msg');
        //alert('Hello, World!'); 
        const title = "notificationTitle";
        const content = "too many windows"
        browser.notifications.create({
        type: "basic",
        iconUrl: browser.extension.getURL("icons/link-48.png"),
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
  