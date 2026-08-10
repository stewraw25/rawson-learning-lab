# Rawson Learning Lab

Fun UK curriculum practice hub for **Bella-Rose Rawson** (12) and **George Rawson** (10).

## Features

- Placement tests in **English**, **Maths** and **Science**
- **Foundation → Intermediate** course stages (unlock Intermediate when Foundation is finished)
- Personalised paths that prioritise weaker skills (GCSE pathway mapping)
- Stage-appropriate practice for **George (KS2)** and **Bella-Rose (KS3)**
- **Adaptive lessons**: teach → worked example → practice; struggle path + diagrams + BBC Bitesize / Oak links
- Optional **Grok (xAI) AI tutor** for personalised explanations (see Parent zone → AI settings)
- XP, levels, streaks and badges
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

Aligned to the English National Curriculum (KS2 for George, KS3 for Bella-Rose) with skills mapped toward GCSE Maths, English Language and Science foundations. Complements school work — not a full exam-board course.
