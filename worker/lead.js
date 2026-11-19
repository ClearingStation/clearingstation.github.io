// Cloudflare Worker: receives a website lead as JSON and forwards it to Telegram.
// The bot token stays here as a secret and never reaches the browser.
// Secrets: BOT_TOKEN, CHAT_ID (see worker/README.md).

// Sites that may post leads. localhost is for `jekyll serve`.
const ORIGINS = ['https://www.clearingstation.ca', 'https://clearingstation.ca', 'http://localhost:4000'];

// Lead fields in message order, with the label shown in Telegram.
const LABELS = { source: 'Source', plan: 'Plan', name: 'Name', phone: 'Phone', email: 'Email', business: 'Business', time: 'Best time' };

// Cut long values and escape the characters Telegram HTML mode reserves.
const escape = (value) => String(value).slice(0, 200).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// One "Label: value" line per filled field.
const message = (lead) => Object.keys(LABELS)
    .filter((key) => lead[key])
    .map((key) => `${LABELS[key]}: <b>${escape(lead[key])}</b>`)
    .join('\n');

const sendTelegram = (text, env) => fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.CHAT_ID, parse_mode: 'HTML', text }),
});

export default {
    async fetch(req, env) {
        const origin = req.headers.get('Origin');
        const headers = { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'Content-Type' };
        const reply = (status, body) => new Response(body, { status, headers });

        if (!ORIGINS.includes(origin)) return new Response('Forbidden', { status: 403 });
        if (req.method === 'OPTIONS') return reply(204, null);
        if (req.method !== 'POST') return reply(405, 'POST only');

        const lead = await req.json();
        // "website" is a hidden trap field. Only bots fill it. Answer ok and drop the lead.
        if (lead.website) return reply(200, 'ok');
        if (!lead.name || !lead.phone) return reply(400, 'Name and phone are required');

        // The browser shows "Thank You" only when Telegram accepted the message.
        const sent = await sendTelegram(message(lead), env);
        if (sent.ok) return reply(200, 'ok');
        // Telegram's reason goes to the Worker log only (`npx wrangler tail`).
        console.log('Telegram refused:', await sent.text());
        return reply(502, 'Telegram did not accept the lead');
    },
};
