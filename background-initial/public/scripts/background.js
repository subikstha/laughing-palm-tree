navigator.serviceWorker.register("/sw.js");

// Page Visibility API
let backgroundInitialTimestamp;
window.addEventListener("visibilitychange", event => {
    if(document.visibilityState == 'hidden') {
        const now = new Date().toLocaleTimeString();
        log(`Page is hidden at ${now}`);
        backgroundInitialTimestamp = performance.now();
    } else {
        const timeElapsed = parseInt(performance.now() - backgroundInitialTimestamp);
        log(`Page is visible after being hidden for ${timeElapsed/1000} seconds`);
    }
})

// Beacon
document.getElementById("btnBeacon").addEventListener("click", event => {
});

// Background Sync
document.getElementById("btnSync").addEventListener("click", async event => {

});

// Background Periodic Sync
document.getElementById("btnPeriodicSync").addEventListener("click", async event => {
   
});

// Background Fetch
document.getElementById("btnFetch").addEventListener("click", async event => {
   
});