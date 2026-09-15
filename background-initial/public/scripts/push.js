if('showNotification' in ServiceWorkerRegistration.prototype) {
    // This means web push is available in the browser
    // Also we can check if the push manager is available in the window object
    document.getElementById("push").style.display = "block";
}

document.getElementById("btnPushSubscribe").addEventListener("click", async event => {
    console.log("Requesting permission for push notifications");
    // Check if the browser supports push notifications
    if('showNotification' in ServiceWorkerRegistration.prototype) {
        const state = await Notification.requestPermission()
        if(state === 'granted') {
            // We can request Push Subscription
            const swReg = await navigator.serviceWorker.ready;
            const details = await swReg.pushManager.subscribe({
                userVisibleOnly: true, 
                applicationServerKey: 'BFE5NFOjwN8UE19f0houXMgXzmrdnolpmB9qKEean6Qg3M1A6DvXKpXZlaD5KIIG-5wC6fSRlae5KEL9b3fSyHQ'
            })
            console.log(details);
            log("Web Push subscribed")

            fetch("/push/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    endpoint: details.endpoint,
                    keys: {
                        // Getting the array buffer which is bytes and convertin it to base 64 string, so as to put it in the JSON
                        auth: arrayBufferToBase64(details.getKey('auth')), 
                        p256dh: arrayBufferToBase64(details.getKey('p256dh'))
                    }
                })
            })
        }
    } else {
        log("Web push is not available");
    }
})






/*** DATA CONVERSION UTILITIES ***/

function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i=0; i<len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

 // Snippet from https://www.npmjs.com/package/web-push
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}