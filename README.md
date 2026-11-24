# Rawson Learning Lab

Homeschool tuition pathway for **Bella-Rose Rawson** (12) and **George Rawson** (10) — from their current level through to GCSE, **working towards grades 8–9** (this is a practice path, not a promised grade) in **Maths, English and Science**.

## Pathway (every subject)

| Stage | Name | Grade band |
|------:|------|------------|
| 1 | First steps | Year 2–4 basics · counting, adding, simple words |
| 2 | Intermediate | Grades 2–3 · fluency |
| 3 | Secure | Grades 3–4 · KS3 secure |
| 4 | GCSE Core | Grades 4–5 · Foundation tier |
| 5 | GCSE Higher | Grades 5–7 · Higher tier |
| 6 | Grades 8–9 stretch | Working towards grades 8–9 · not a promised grade |

Finish every lesson in a stage to unlock the next. Adaptive order still prioritises weaker skills from the placement test.

## Features

- Placement tests in **English**, **Maths** and **Science**
- **Six-stage pathway** to GCSE, working towards grades 8–9, with unlock progression
- Personalised paths that prioritise weaker skills (GCSE AO / topic mapping)
- Stage-appropriate practice for **George (KS2)** and **Bella-Rose (KS3)** where tagged
- **Adaptive lessons**: goal, ready check, teach, worked example, guided practice, then practice; struggle path + BBC Bitesize / Oak links
- Optional **Grok (xAI) AI tutor** + **Grok Voice** (Coach speaks greetings, answers and lesson intros)
- Parent zone: AI key, voice prefs, weekly/monthly goals
- Pathway map, XP, levels, streaks and badges
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

## Lesson checks

```bash
node scripts/check-lessons.js
# Click through every lesson in a headless browser (needs Chrome + puppeteer-core):
node scripts/check-clickthrough.js --serve . --out /tmp/clickthrough
# Or against the live site:
node scripts/check-clickthrough.js --base https://stewraw25.github.io/rawson-learning-lab/ --out /tmp/clickthrough
```

The click-through test answers every question for both children, in every subject, topic and stage. It checks that the next set loads, the screen does not go blank, buttons do not stick, questions do not repeat, and progress is saved under `rawson-learning-lab-v1`.


## Curriculum note

Stage 1 starts at Year 2–4 (George is 10 and Bella-Rose is 12, both catching up at home). Later stages still climb toward GCSE. Progress bars count **lessons finished**, not the placement-test score.

Fun extras: **Go-karting** (George) and **Horses** (Bella-Rose) use the same six-level climb as core subjects — First steps is very easy, then each unlock is harder. **Money & investing** is a shared extra (compound investing, the 20% rule, gold & silver, Bitcoin, S&P 500 ETFs, stocks, plus a calculator at `#/invest`). Past returns in the calculator are illustrations, not promises.
