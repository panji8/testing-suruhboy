// sw-agent.js
self.addEventListener('install', (event) => {
    console.log('[SW Agent] Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW Agent] Activated');
    event.waitUntil(clients.claim());
});

// Menampilkan notifikasi dari pesan (jika ada postMessage)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/6199/6199315.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/6199/6199315.png',
            vibrate: [200, 100, 200],
            tag: 'agent_cs_notif'
        });
    }
});

// Opsional: jika ingin menangkap push dari backend (tidak diperlukan untuk skenario ini)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        event.waitUntil(
            self.registration.showNotification(data.title, {
                body: data.body,
                icon: 'https://cdn-icons-png.flaticon.com/512/6199/6199315.png'
            })
        );
    }
});
