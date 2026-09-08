# Rawson Learning Lab

Homeschool tuition pathway for **Bella-Rose Rawson** (12) and **George Rawson** (10) — from their current level all the way to **GCSE A\*** potential (grades 8–9) in **Maths, English and Science**.

## Pathway (every subject)

| Stage | Name | Grade band |
|------:|------|------------|
| 1 | First steps | Year 2–4 basics · counting, adding, simple words |
| 2 | Intermediate | Grades 2–3 · fluency |
| 3 | Secure | Grades 3–4 · KS3 secure |
| 4 | GCSE Core | Grades 4–5 · Foundation tier |
| 5 | GCSE Higher | Grades 5–7 · Higher tier |
| 6 | A* Mastery | Grades 8–9 · A* stretch |

Finish every lesson in a stage to unlock the next. Adaptive order still prioritises weaker skills from the placement test.

## Features

- Placement tests in **English**, **Maths** and **Science**
- **Six-stage GCSE → A\* pathway** with unlock progression
- Personalised paths that prioritise weaker skills (GCSE AO / topic mapping)
- Stage-appropriate practice for **George (KS2)** and **Bella-Rose (KS3)** where tagged
- **Adaptive lessons**: teach → worked example → practice; struggle path + BBC Bitesize / Oak links
- Optional **Grok (xAI) AI tutor** + **Grok Voice** (Coach speaks greetings, answers and lesson intros)
- Parent zone: AI key, voice prefs, weekly/monthly goals
- Pathway map, XP, levels, streaks and badges (including Triple A\*)
- Progress autosaves in the browser
- **Family cloud sync** (Firebase) so kids’ iMacs push progress and a parent Mac watches live
- **Export / Import** JSON backups as a safety net

### Optional Grok proxy

Browser apps often cannot call the xAI API directly (CORS). Deploy `worker/` as a Cloudflare Worker and paste the URL into AI settings:

```bash
cd worker
npx wrangler login
npx wrangler secret put XAI_API_KEY
npx wrangler deploy
```

## Live site

https://stewraw25.github.io/rawson-learning-lab/

## Local

Open `index.html` in a browser, or serve the folder with any static server.

## Curriculum note

Stage 1 starts at Year 2–4 (George is 10 and Bella-Rose is 12, both catching up at home). Later stages still climb toward GCSE. Progress bars count **lessons finished**, not the placement-test score.
