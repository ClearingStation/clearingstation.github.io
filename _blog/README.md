# How to write a blog post

This folder starts with `_`, so Jekyll does not publish it.

## Steps

1. Pick the next title from `CALENDAR.md`.
2. Copy `template.md` to `blog/_posts/YYYY-MM-DD-short-slug.md`.
   The slug becomes the URL: `/blog/short-slug/`. Use the main keyword, max 5–6 words.
3. Fill in the front matter and write the post.
4. Run `bundle exec jekyll serve` and read the post at `http://localhost:4000/blog/short-slug/`.
5. Rebuild `_site` with `JEKYLL_ENV=production bundle exec jekyll build`, then commit and push.
6. In Google Search Console, open URL Inspection, paste the post URL and click "Request indexing".

A post with a future date does not appear until that date, after the next build.
Push it early and it goes live on the next push after its date.

## Rules for every post (this is what makes it rank)

- **One main keyword per post.** Put it in the title, the slug, the description, the first 100 words and one `##` heading.
  Never target the same keyword in two posts. They compete with each other.
- **Title:** max 60 characters, keyword at the start, brand at the end: `... | ClearingStation`.
- **Description:** 140–155 characters. Say what the reader gets. Include "Winnipeg" or "Manitoba" if it fits.
- **Answer first.** The first paragraph answers the question in 2–3 sentences. Google often shows this as the snippet.
- **Length:** 900–1,800 words. Long enough to answer fully, no padding.
- **Structure:** `##` for sections, `###` for sub-points. Short paragraphs. Use lists and tables for numbers and steps.
- **Real experience.** Every post has at least one thing only we know: a client case (no names), a real price,
  a mistake we see often, a Manitoba-specific rule. This is what Google calls E-E-A-T. Posts without it look like AI filler.
- **Internal links:**
  - `service:` in the front matter adds the "How we can help" box. That is the main link.
  - Also link to the same landing page once in the text, with the keyword as link text.
  - Link to 1–2 older posts. Then go back to 1 older post and link to the new one.
- **External links:** link to the official CRA or Manitoba page for every rule or number you quote.
- **FAQ:** add 2–4 real questions in `faq:`. They show at the end and go to Google as FAQ schema.
- **Facts:** check every rate, threshold and deadline on canada.ca or gov.mb.ca on the day you write.
  When a number changes, update the post and set `last_modified_at`.
- **Images (optional):** put them in `images/blog/`, use `.webp`, always write `alt` text.
  For a share image, set `image: /images/blog/name.webp` (1200×630).

## Do not

- Do not publish many thin or near-duplicate posts (for example the same post for 10 cities).
  Google penalizes "scaled content" across the whole site.
- Do not write about document scanning. We no longer offer it.
- Do not call Jennifer a CPA, accountant or VP. She is the Founder of ClearingStation. Do not call her a CRA authorized representative.
  Posts can explain what a CPA or accountant does, but never claim the title for us.
- Do not paste AI text without editing. Read it aloud, add the real case, cut what Jennifer would not say.

## Pace

- Months 1–2: 2 posts per week.
- From month 3: every second day, if Search Console shows new posts get indexed within about a week.
- Each month: update the 3 posts with the most impressions (new facts, better title, more FAQ).
