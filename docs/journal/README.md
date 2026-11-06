# November 2026 Journal series

The series contains 22 English articles: the supplied final White Desert PDF,
then source posts 09–29. Source 08 was not supplied and is not included.
The existing locale fallback serves English where no translation exists.

White Desert is available from 6 November 2026 at 20:00 Cairo time (on deployment
if deployed after that time). The remaining articles release daily at 09:00
Africa/Cairo, 7–27 November. November uses UTC+02:00; timestamps include the
offset explicitly. The authoritative schedule is `data/journal-scheduled.json`.
`november-2026-schedule.json` records the source files and image choices.

## Editing the schedule

Change the post's `publishAt` timestamp and `date` in
`data/journal-scheduled.json`. Keep its visible date in the article's `bodyHtml`
in `content/journal/<slug>.json` in sync. Set `status` to `draft` to hold a post.
Retain the explicit offset when editing a timestamp. For dates outside November,
check Africa/Cairo daylight saving time rather than reusing +02:00 blindly.

Publication is checked on each server request. The Journal index, article route,
metadata and sitemap all use that check, so no cron job or daily deployment is
required. Article-to-article links remain plain text until their target is public.
The date displayed by the page is not itself the access control.

The host must continue to run Next.js as a server (`npm start`), not as a static
export. No public preview query, clock override or draft-reading endpoint was
introduced. Admin access follows the existing authentication rules.

## Content preparation

- White Desert follows the revised PDF's author, route, camp and season details,
  rather than the older Markdown alongside it. The unpublished White Desert
  experience link points to the existing planning form instead.
- Hero photographs come from the existing site library and were visually
  reviewed for relevance. Known Creative Commons attribution is displayed in
  the relevant article; source credits remain in `public/images/credits.json`.
- The supplied metadata suggestions were used with duplicate brand suffixes
  removed. Article, FAQ, breadcrumb, canonical and social metadata use the
  existing site's rendering system.
- Links to the missing private-access article point to the new permits article;
  the permits article itself links to the existing Giza experience instead.
- Official UK and US desert travel advice, museum ticketing, NASA eye-safety
  guidance and the hotel operator's renovation announcement were checked on
  6 November. The advice is an editorial snapshot, not a live advisory feed.
- The supplied blog text remains the basis for business details. Its editorial
  notes flag disagreements with existing non-blog pages about domestic flights,
  hotels, guide requests and permit timing. Those pages were not changed by this
  publication task. Availability and prices should be confirmed in proposals.
- 112 external targets were checked: 88 returned HTTP 200; others returned bot
  blocks, rate limits or network errors, which do not establish a dead link.
  Official UK, US, German and French advice was also accessed through browsing.

## Verification

Run `node --test scripts/journal-schedule.test.mjs` and `npm run build`.
The schedule tests cover every release boundary, Cairo local time, draft and
invalid timestamps, legacy posts, localized links, images, metadata and FAQs.
Browser checks cover mobile and desktop layout, future-post 404s, the Journal
listing and sitemap. Future-time testing uses an external local test harness;
it is not included in the site or accepted from request input.
