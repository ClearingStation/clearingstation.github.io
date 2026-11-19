// Sends one lead to the Cloudflare Worker (worker/lead.js).
// The promise resolves only when the Worker confirms delivery. It rejects on any failure.
function sendLead(fields) {
    return fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
    }).then(function (res) {
        if (!res.ok) throw new Error('Lead not sent: ' + res.status);
    });
}
