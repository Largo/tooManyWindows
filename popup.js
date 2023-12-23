// document.getElementById('switchWindow').addEventListener('click', () => {
//     // Logic to switch between windows
//     // You might need to store the window IDs and switch to the next one in the list
//   });
  
  document.getElementById('switchWindow').addEventListener('click', () => {
    browser.windows.getAll().then((windows) => {
      if (windows.length > 1) {
        // Assuming you want to switch to the next window in the list
        let currentWindowIndex = windows.findIndex(win => win.focused);
        let nextWindowIndex = (currentWindowIndex + 1) % windows.length;
        let nextWindowId = windows[nextWindowIndex].id;
  
        // Switch to the next window
        browser.windows.update(nextWindowId, { focused: true });
      }
    });
  });
