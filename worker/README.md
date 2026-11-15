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
