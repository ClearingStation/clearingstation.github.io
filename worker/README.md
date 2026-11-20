# Lead Worker

The website forms post leads to this Cloudflare Worker. The Worker forwards them to Telegram.

## Deploy

1. Open @BotFather in Telegram. Send `/revoke` for the bot and copy the new token.
2. Run these commands in this directory:

   ```sh
   npx wrangler login
   npx wrangler secret put BOT_TOKEN   # paste the new token
   npx wrangler secret put CHAT_ID     # the Telegram chat id, for example -780709397
   npx wrangler deploy
   ```

The Worker answers on `https://www.clearingstation.ca/api/lead` (the route in `wrangler.toml`).
The pages post to `/api/lead`, so no page holds a URL or a token.

## Test

```sh
curl -i -X POST https://www.clearingstation.ca/api/lead -H 'Origin: https://www.clearingstation.ca' \
  -H 'Content-Type: application/json' -d '{"source":"Test","name":"Test","phone":"204"}'
```

A `200 ok` response means the lead is in the Telegram chat.

# Redirect Worker

`redirect.js` handles old URLs, because GitHub Pages cannot send a 301 or a 410 itself:

- `clearingstation.ca` (no www) gets a 301 to the same page on `www`.
- Old pages in `MOVED` get a 301 to their new page.
- Old prototypes in `GONE` get a 410, so Google drops them.

To change a URL, edit `MOVED` or `GONE` in `redirect.js` and its route in `redirect.toml`. Then deploy and check:

```sh
npx wrangler deploy -c redirect.toml
curl -sI https://www.clearingstation.ca/landing-doctors.htm | head -3   # 301, Location: .../bookkeeping-physicians-winnipeg.html
curl -sI https://www.clearingstation.ca/login.htm | head -1             # 410
curl -sI https://clearingstation.ca/ | head -3                          # 301 to https://www.clearingstation.ca/
```
