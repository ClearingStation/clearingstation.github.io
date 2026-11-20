// Cloudflare Worker for old URLs. GitHub Pages cannot send a 301 or a 410,
// so this Worker answers before the request reaches it.
//   - clearingstation.ca (no www): 301 to the same path on www.
//   - an old page that moved: 301 to its new page.
//   - an old prototype or tool: 410, so Google drops it from search.
// To change a URL: edit MOVED or GONE here, and its route in redirect.toml.

const WWW = 'https://www.clearingstation.ca';

// Old URL -> new page.
const MOVED = {
    '/landing-doctors.htm': '/bookkeeping-physicians-winnipeg.html',
    '/document-scanning.htm': '/bookkeeping-physicians-winnipeg.html',
    '/index.htm': '/',
    '/index1.htm': '/',
    '/index2.htm': '/',
    '/index3.htm': '/',
    '/about.htm': '/about.html',
    '/about2.htm': '/about.html',
    '/plans.htm': '/plans.html',
    '/plans2.htm': '/plans.html',
    '/plans-old.htm': '/plans.html',
    '/start.htm': '/start.html',
    '/landing.htm': '/start.html',
    '/offer.htm': '/start.html',
    '/form.htm': '/start.html',
    '/services.htm': '/services.html',
    '/support.htm': '/support.html',
    '/security.htm': '/security.html',
};

// Old prototypes and tools, gone for good.
const GONE = [
    '/automation.htm', '/bench.htm', '/dash.htm', '/dashboard.htm', '/dashboard_no_other_currencies.htm',
    '/document_editor.htm', '/document_editor_batch_actions.htm', '/document_editor_batch_search.htm',
    '/document_editor_compare.htm', '/document_editor_compare_new_window.htm', '/document_editor_long.htm',
    '/document_editor_pdf.htm', '/invoice_tool.htm', '/journal_entries.htm', '/login.htm', '/note.htm',
    '/odo.htm', '/odbalibi.htm',
];

const GONE_PAGE = '<!doctype html><meta charset="utf-8"><title>Page removed | ClearingStation</title>'
    + '<p>This page no longer exists. <a href="/">Go to ClearingStation</a></p>';

const redirect = (to) => new Response(null, { status: 301, headers: { Location: to } });
const gone = () => new Response(GONE_PAGE, { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

export default {
    fetch(req) {
        const url = new URL(req.url);
        const path = url.pathname;
        if (url.hostname !== 'www.clearingstation.ca') return redirect(WWW + (MOVED[path] || path) + url.search);
        if (MOVED[path]) return redirect(WWW + MOVED[path] + url.search);
        if (GONE.includes(path)) return gone();
        // A route with no entry here: pass the request to the site unchanged.
        return fetch(req);
    },
};
